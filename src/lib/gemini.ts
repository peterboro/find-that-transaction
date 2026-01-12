const GEMINI_API_KEY = process.env.GEMINI_API_KEY

interface Transaction {
  date: string
  description: string
  debit: number | null
  credit: number | null
  balance: number | null
}

export async function parseStatementWithGemini(imageBase64Array: string[]): Promise<Transaction[]> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured')
  }

  const prompt = `Extract ALL transactions from this bank statement. For each transaction provide:
- date (original format)
- description (full text)
- debit (money out as number, or null)
- credit (money in as number, or null)
- balance (as number, or null)

Return ONLY a valid JSON array, no other text. Example:
[{"date":"01-03-2025","description":"ATM WITHDRAWAL","debit":5000,"credit":null,"balance":45000}]

Remove commas from numbers. Use null for empty fields.`

  // Build parts with images
  const parts: any[] = imageBase64Array.map(base64 => ({
    inline_data: {
      mime_type: 'image/png',
      data: base64,
    },
  }))
  parts.push({ text: prompt })

  // Try models in order of preference (more stable models first)
  const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp']
  let lastError = ''

  for (const model of models) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts }],
              generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 8192,
              },
            }),
          }
        )

        if (response.status === 429) {
          // Rate limited - wait and retry
          lastError = 'Rate limit exceeded. Waiting before retry...'
          await new Promise(resolve => setTimeout(resolve, attempt * 10000))
          continue
        }

        if (response.status === 404) {
          lastError = `Model ${model} not found (404). Trying next model...`
          break // Try next model
        }

        if (!response.ok) {
          let errorText = await response.text()
          try {
            const errorJson = JSON.parse(errorText)
            if (errorJson.error?.message) {
              errorText = errorJson.error.message
            } else if (errorJson.error) {
              errorText = JSON.stringify(errorJson.error)
            }
          } catch {
            // Keep the original error text if parsing fails
          }
          
          // Handle common API errors
          if (response.status === 400 && errorText.includes('API_KEY_INVALID')) {
            lastError = 'Invalid Gemini API key. Please check your GEMINI_API_KEY in .env.local'
          } else if (response.status === 429) {
            lastError = 'Rate limit exceeded. Please try again later.'
          } else if (response.status === 403) {
            lastError = 'API access forbidden. Check your API key permissions.'
          } else {
            lastError = `API error (${response.status}): ${errorText}`
          }
          break
        }

        let data
        try {
          data = await response.json()
        } catch (jsonError: any) {
          lastError = `Failed to parse JSON response: ${jsonError.message}`
          console.error('Failed to parse Gemini API JSON response:', jsonError)
          break
        }

        // Check for safety filters or blocked content
        if (data.candidates?.[0]?.finishReason === 'SAFETY') {
          lastError = 'Content blocked by safety filters. The statement may contain sensitive content.'
          console.error('Gemini API blocked content due to safety filters')
          break
        }

        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
          const finishReason = data.candidates?.[0]?.finishReason || 'UNKNOWN'
          lastError = `No response text from Gemini API. Finish reason: ${finishReason}. The model may have been blocked or the request format is invalid.`
          console.error('Gemini API returned no text. Response data:', JSON.stringify(data).substring(0, 500))
          break
        }

        const responseText = data.candidates[0].content.parts[0].text
        const jsonMatch = responseText.match(/\[[\s\S]*\]/)
        
        if (jsonMatch) {
          try {
            return JSON.parse(jsonMatch[0])
          } catch (parseError: any) {
            lastError = `Failed to parse JSON response: ${parseError.message}. Response: ${responseText.substring(0, 200)}`
            break
          }
        }

        lastError = 'No valid JSON array found in Gemini response. The model may not have followed the format correctly.'
        break
      } catch (e: any) {
        lastError = `Network or parsing error: ${e.message}`
        console.error(`Gemini API error (model: ${model}, attempt: ${attempt}):`, e.message)
        if (attempt < 3) {
          await new Promise(resolve => setTimeout(resolve, 5000))
        }
      }
    }
  }

  if (!lastError) {
    lastError = 'All parsing attempts failed. No error details captured. Check your API key and network connection.'
  }

  console.error('Gemini parsing failed after all attempts. Last error:', lastError)
  throw new Error(`Failed to parse with Gemini: ${lastError}`)
}

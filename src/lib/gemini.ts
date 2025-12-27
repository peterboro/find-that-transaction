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

  const models = ['gemini-2.0-flash-exp', 'gemini-1.5-flash']
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
          await new Promise(resolve => setTimeout(resolve, attempt * 10000))
          continue
        }

        if (response.status === 404) {
          break // Try next model
        }

        if (!response.ok) {
          const error = await response.text()
          lastError = error
          break
        }

        const data = await response.json()

        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
          break
        }

        const responseText = data.candidates[0].content.parts[0].text
        const jsonMatch = responseText.match(/\[[\s\S]*\]/)
        
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0])
        }

        break
      } catch (e: any) {
        lastError = e.message
        if (attempt < 3) {
          await new Promise(resolve => setTimeout(resolve, 5000))
        }
      }
    }
  }

  throw new Error(`Failed to parse with Gemini: ${lastError}`)
}

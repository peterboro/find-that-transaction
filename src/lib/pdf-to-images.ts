import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

const execAsync = promisify(exec)

export async function convertPdfToImages(pdfBuffer: Buffer, maxPages = 20, password?: string): Promise<string[]> {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-'))
  const pdfPath = path.join(tempDir, 'input.pdf')
  
  try {
    await fs.writeFile(pdfPath, pdfBuffer)
    
    // Use Python with pdf2image
    // Properly escape password for Python string (handle quotes, backslashes, newlines)
    const pythonScript = `
import sys, json, base64, os
try:
    from pdf2image import convert_from_path
except ImportError:
    print("INSTALL_NEEDED")
    sys.exit(0)
try:
    pdf_path = "${pdfPath.replace(/\\/g, '\\\\')}"
    ${password ? `password = ${JSON.stringify(password)}` : ''}
    convert_params = {
        "dpi": 150,
        "first_page": 1,
        "last_page": ${maxPages}${password ? ',\n        "userpw": password' : ''}
    }
    images = convert_from_path(pdf_path, **convert_params)
    result = []
    for i, img in enumerate(images):
        img_path = os.path.join("${tempDir.replace(/\\/g, '\\\\')}", f"page_{i}.png")
        img.save(img_path, "PNG")
        with open(img_path, "rb") as f:
            b64 = base64.b64encode(f.read()).decode("utf-8")
            result.append(b64)
    print("SUCCESS:" + json.dumps(result))
except Exception as e:
    print("ERROR:" + str(e))
`
    
    const scriptPath = path.join(tempDir, 'convert.py')
    await fs.writeFile(scriptPath, pythonScript)
    
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3'
    const { stdout } = await execAsync(`${pythonCmd} "${scriptPath}"`, {
      maxBuffer: 100 * 1024 * 1024,
    })
    
    if (stdout.includes('INSTALL_NEEDED')) {
      throw new Error('pdf2image not installed. Run: pip install pdf2image')
    }
    
    if (stdout.includes('SUCCESS:')) {
      const jsonStr = stdout.substring(stdout.indexOf('SUCCESS:') + 8)
      return JSON.parse(jsonStr)
    }
    
    // Check for password-related errors
    if (stdout.includes('Incorrect password') || (stdout.includes('password') && stdout.includes('incorrect'))) {
      throw new Error('PASSWORD_REQUIRED:Incorrect password. Please provide the correct password.')
    }
    if (stdout.includes('encrypted') && !password) {
      throw new Error('PASSWORD_REQUIRED:This PDF is password-protected. Please provide the password.')
    }
    
    throw new Error(`PDF conversion failed: ${stdout}`)
  } finally {
    // Cleanup temp files
    try {
      const files = await fs.readdir(tempDir)
      await Promise.all(files.map(f => fs.unlink(path.join(tempDir, f))))
      await fs.rmdir(tempDir)
    } catch (e) {}
  }
}

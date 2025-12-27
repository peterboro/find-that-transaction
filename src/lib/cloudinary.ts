import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadPdf(buffer: Buffer, fileName: string): Promise<{
  url: string
  publicId: string
}> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'find-that-transaction/statements',
        public_id: `${Date.now()}-${fileName.replace('.pdf', '')}`,
      },
      (error, result) => {
        if (error) reject(error)
        else resolve({
          url: result!.secure_url,
          publicId: result!.public_id,
        })
      }
    )
    uploadStream.end(buffer)
  })
}

export async function deletePdf(publicId: string) {
  return cloudinary.uploader.destroy(publicId, { resource_type: 'raw' })
}

export { cloudinary }

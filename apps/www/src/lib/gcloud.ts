import { Storage } from "@google-cloud/storage"

// Creates a client
const storage = new Storage()

const bucketName = "mta630-images"

async function uploadFile(filePath: string, generationMatchPrecondition = 0) {
  const destFileName = filePath.substring(filePath.lastIndexOf("/"))
  const options = {
    destination: destFileName,
    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
  }

  await storage.bucket(bucketName).upload(filePath, options)
  console.log(`${filePath} uploaded to ${bucketName}`)
}

export { uploadFile }

export const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_CLOUD_JSON!, "base64").toString("utf-8")
)

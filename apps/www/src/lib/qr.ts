import QRCode from "qrcode"

export async function generateQRCode(text: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(text)
    return dataUrl
  } catch (err) {
    throw new Error("Failed to generate QR code: " + err)
  }
}

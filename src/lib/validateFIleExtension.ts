export default function validateFileExtension(
  value: any,
  allowedExtensions: string[]
) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return true; // Jika value adalah string, misal base64
  if (value instanceof File) {
    const extension = value.name.split(".").pop();
    return extension ? allowedExtensions.includes(`.${extension}`) : false;
  }
  return false;
}

export default function getAuthToken() {
  const token = localStorage.getItem("__auth_token");
  if (!token) {
    // Token tidak ada, kembalikan nilai null atau nilai default
    return null;
  }

  // Jika token ada, parse dan kembalikan hasilnya
  try {
    return JSON.parse(token as string);
  } catch (e) {
    // Jika terjadi error saat parsing, kembalikan null atau log error
    console.error("Error parsing auth token:", e);
    return null;
  }
}

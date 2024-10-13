export default function getUserData() {
  const ls = localStorage.getItem("__user_data");

  // Cek apakah data ada di localStorage
  if (!ls) {
    return null; // Kembalikan null jika tidak ada data
  }

  // Coba parsing JSON dan tangani potensi error
  try {
    return JSON.parse(ls);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

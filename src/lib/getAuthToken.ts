export default function getAuthToken() {
  return JSON.parse(localStorage.getItem("__auth_token") as string);
}

export default function getUserData() {
  return JSON.parse(localStorage.getItem("__user_data") as string);
}

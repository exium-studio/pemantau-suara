export default function getUserData() {
  const ls = localStorage.getItem("__user_data");
  if (ls && ls !== "undefined") {
    return JSON.parse(ls);
  }
  return null;
}

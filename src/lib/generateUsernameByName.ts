export function generateUsernameByName(name?: string): string {
  if (name) {
    const trimmedName = name.trim().toLowerCase();

    const nameParts = trimmedName.split(" ");

    if (nameParts.length === 1) {
      return nameParts[0];
    }

    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return `${firstName}.${lastName}`;
  }

  return "";
}

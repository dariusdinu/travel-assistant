export function formatDate(dateInput) {
  const date = new Date(dateInput);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function formatTime(dateInput) {
  const date = new Date(dateInput);
  const options = { hour: "2-digit", minute: "2-digit" };
  return date.toLocaleTimeString("en-US", options);
}

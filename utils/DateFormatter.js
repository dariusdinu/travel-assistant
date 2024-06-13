export default function formatDate(dateInput) {
  const date = new Date(dateInput);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// Greeting.jsx
export default function getGreeting() {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 6) {
    return "Good late evening";
  } else if (hours < 12) {
    return "Top of the morning";
  } else if (hours < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

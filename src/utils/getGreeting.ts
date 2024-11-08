export const getGreeting = () => {
  const currentIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const hour = currentIST.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}; 
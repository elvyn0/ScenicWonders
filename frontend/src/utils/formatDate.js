//  Format date for UI display

export const formatDate = (dateString) => {
  if (!dateString) return "Please select date";

  const date = new Date(dateString);

  if (isNaN(date)) return "Invalid date";

  return date.toLocaleDateString("en-IN", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

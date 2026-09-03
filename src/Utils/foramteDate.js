/**
 * Formats an ISO date string into a human-readable date, e.g. "September 2, 2026".
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

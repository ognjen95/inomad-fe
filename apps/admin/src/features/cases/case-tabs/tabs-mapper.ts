export const tabMapper = (tab: string) => {
  if (tab === "requests") return "REQUESTS";
  if (tab === "proposals") return "PROPOSALS";
  if (tab === "available") return "AVAILABLE CASES";

  return "MY CASES";
};

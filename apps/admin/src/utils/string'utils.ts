export const capitalizeFirst = (word: string) =>
  word?.length
    ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    : word;

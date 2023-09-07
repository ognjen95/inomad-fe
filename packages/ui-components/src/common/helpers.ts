export const formatBytes = (bytes: number) => {
  const marker = 1024;
  const kiloBytes = marker;
  const megaBytes = marker * marker;
  const gigaBytes = marker * marker * marker;

  if (bytes < kiloBytes) return `${bytes} Bytes`;
  if (bytes < megaBytes) return `${Math.round(bytes / kiloBytes)} KB`;
  if (bytes < gigaBytes) return `${Math.round(bytes / megaBytes)} MB`;
  return `${Math.round(bytes / gigaBytes)} GB`;
};

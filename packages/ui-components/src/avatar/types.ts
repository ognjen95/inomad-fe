export type AvatarSize = "SMALL" | "MEDIUM" | "LARGE";

export type IAvatarSizeMapper = {
  [key in AvatarSize]: [number, string];
};

import TailwindConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const tailwindConfig = resolveConfig(TailwindConfig);

export const colors = tailwindConfig.theme.colors as Record<string, string>;

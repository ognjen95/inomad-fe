import { useMediaQuery } from "react-responsive";
import resolveConfig from "tailwindcss/resolveConfig";

import TailwindConfig from "../../tailwind.config";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

const useBreakpoints = (breakpoint: Breakpoint): boolean => {
  const tailwindConfig = resolveConfig(TailwindConfig);
  const screens = tailwindConfig.theme.screens as Record<Breakpoint, string>;

  return useMediaQuery({
    query: `(max-width: ${screens[breakpoint]})`,
  });
};

export default useBreakpoints;

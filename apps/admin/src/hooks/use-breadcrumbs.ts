import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useBreadcrumbs = (): {
  text: string;
  link: string;
  isActive?: boolean;
}[] => {
  const pathName = usePathname();

  return useMemo(() => {
    const crumbs = pathName.split("/");
    const trimmedCrumbs = crumbs.filter(Boolean);

    return trimmedCrumbs.map((breadcrumb, index) => ({
      text: breadcrumb.replaceAll("-", " "),
      link: `/${trimmedCrumbs.slice(0, index + 1).join("/")}`,
      isActive: index === trimmedCrumbs.length - 1,
    }));
  }, [pathName]);
};

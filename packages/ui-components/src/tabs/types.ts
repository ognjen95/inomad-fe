import { ReactNode } from "react";

export type Tab = {
  text: string;
  feature: ReactNode;
  disableContentScroll?: boolean;
};

export type TabsAndFeatures = {
  tabs: ReactNode[];
  features: ReactNode[];
};

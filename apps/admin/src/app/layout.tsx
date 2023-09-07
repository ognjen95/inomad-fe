import { FontLinks } from "ui-components";
import { FCWithChildren } from "ui-components/src/common/types";

import DefaultLayout from "~components/default-layout/DefaultLayout";

import "~styles/tailwind.css";

export const metadata = {
  title: "iNomad",
  description: "iNomad",
};

const RootLayout: FCWithChildren = ({ children }) => (
  <html lang="en">
    <head>
      <FontLinks />
    </head>
    <body>
      <DefaultLayout>{children}</DefaultLayout>
    </body>
  </html>
);

export default RootLayout;

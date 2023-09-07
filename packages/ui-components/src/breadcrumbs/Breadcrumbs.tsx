import clsx from "clsx";
import Link from "next/link";

import Text from "../text";
import { TextVariant } from "../text/enums";

type BreadcrumbsProps = {
  content: { text: string; link: string; isActive?: boolean }[];
};

const Breadcrumbs = ({ content }: BreadcrumbsProps) => (
  <div className="flex">
    {content.map(({ text, isActive, link }, index) => (
      <Link href={link} className="flex flex-row" key={index}>
        <Text
          customClasses={clsx("capitalize", isActive ? "font-medium" : "")}
          variant={
            index !== content.length - 1
              ? TextVariant.BODY2
              : TextVariant.BUTTON1
          }
        >
          {text}
        </Text>
        {index !== content.length - 1 && <span className="mx-2">/</span>}
      </Link>
    ))}
  </div>
);

export default Breadcrumbs;

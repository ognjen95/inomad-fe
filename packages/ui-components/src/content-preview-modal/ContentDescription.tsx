import { FC } from "react";

import Chip from "../chip";
import Text from "../text";
import { TextVariant } from "../text/enums";

export type ContentDescriptionProps = {
  name: string;
  description: string;
  language: string;
  categories: string[];
  types: string[];
  tags: string[];
};

const ContentDescription: FC<ContentDescriptionProps> = ({
  name,
  description,
  language,
  categories,
  tags,
  types,
}) => (
  <div className="flex flex-col self-start justify-start space-y-6 min-h-0 overflow-y-auto">
    <Text variant={TextVariant.HEADING6} color="text-white">
      Content information
    </Text>
    <div className="flex flex-col">
      <Text variant={TextVariant.BODY4} color="text-grey-400">
        Name
      </Text>
      <Text variant={TextVariant.BODY3} color="text-white">
        {name}
      </Text>
    </div>
    <div className="flex flex-col">
      <Text variant={TextVariant.BODY4} color="text-grey-400">
        description
      </Text>
      <Text variant={TextVariant.BODY3} color="text-white">
        {description}
      </Text>
    </div>
    <div className="flex flex-col">
      <Text variant={TextVariant.BODY4} color="text-grey-400">
        Language
      </Text>
      <Text variant={TextVariant.BODY3} color="text-white">
        {language}
      </Text>
    </div>
    <div className="flex flex-col space-y-2">
      <Text variant={TextVariant.BODY4} color="text-grey-400">
        Category
      </Text>
      <div className="flex space-x-2">
        {categories.map((category) => (
          <Chip selected text={category} key={`content-category-${category}`} />
        ))}
      </div>
    </div>
    <div className="flex flex-col space-y-2">
      <Text variant={TextVariant.BODY4} color="text-grey-400">
        Type
      </Text>
      <div className="flex space-x-2">
        {types.map((type) => (
          <Chip selected text={type} key={`content-type-${type}`} />
        ))}
      </div>
    </div>
    <div className="flex flex-col space-y-2">
      <Text variant={TextVariant.BODY4} color="text-grey-400">
        Tags
      </Text>
      <div className="flex space-x-2">
        {tags.map((tag) => (
          <Chip selected text={tag} key={`content-tag-${tag}`} />
        ))}
      </div>
    </div>
  </div>
);

export default ContentDescription;

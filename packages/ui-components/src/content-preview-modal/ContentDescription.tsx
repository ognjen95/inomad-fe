import { FC } from "react";

import { ContentType } from "./enums";
import Chip from "../chip";
import Text from "../text";
import { TextVariant } from "../text/enums";

export type ContentDescriptionProps = {
  categories: string[];
  name: string;
  description: string;
  language: string;
  types: string[];
  tags: string[];
  isTemplate: boolean;
  templateName?: string;
  templateFocusArea?: string;
  templateIntensityLevel?: string;
  templateNumberOfRepeats?: number;
  templateTags?: string[];
  contentType?: ContentType;
};

const ContentDescription: FC<ContentDescriptionProps> = ({
  categories,
  name,
  description,
  language,
  types,
  tags,
  isTemplate,
  contentType,
  templateName,
  templateFocusArea,
  templateIntensityLevel,
  templateTags,
  templateNumberOfRepeats,
}) => (
  <div className="flex flex-col self-start justify-start space-y-6 min-h-0 overflow-y-auto">
    {isTemplate && (
      <>
        <Text variant={TextVariant.HEADING6} color="text-white">
          Template information
        </Text>
        <div className="flex flex-col">
          <Text variant={TextVariant.BODY4} color="text-grey-400">
            Name
          </Text>
          <Text variant={TextVariant.BODY3} color="text-white">
            {templateName}
          </Text>
        </div>
        <div className="flex flex-col">
          <Text variant={TextVariant.BODY4} color="text-grey-400">
            Focus area
          </Text>
          <Text variant={TextVariant.BODY3} color="text-white capitalize">
            {templateFocusArea}
          </Text>
        </div>
        <div className="flex flex-col">
          <Text variant={TextVariant.BODY4} color="text-grey-400">
            Intensity level
          </Text>
          <Text variant={TextVariant.BODY3} color="text-white capitalize">
            {templateIntensityLevel}
          </Text>
        </div>
        <div className="flex flex-col">
          <Text variant={TextVariant.BODY4} color="text-grey-400 capitalize">
            Number of repeats
          </Text>
          <Text variant={TextVariant.BODY3} color="text-white">
            {templateNumberOfRepeats}
          </Text>
        </div>
        <div className="flex flex-col space-y-2 pb-6">
          <Text variant={TextVariant.BODY4} color="text-grey-400">
            Tags
          </Text>
          <div className="flex gap-2 flex-wrap">
            {templateTags?.map((tag) => (
              <Chip text={tag} key={`content-tag-${tag}`} />
            ))}
          </div>
        </div>
      </>
    )}
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
    {!isTemplate && (
      <div className="flex flex-col">
        <Text variant={TextVariant.BODY4} color="text-grey-400">
          Description
        </Text>
        <Text variant={TextVariant.BODY3} color="text-white">
          {description}
        </Text>
      </div>
    )}
    {!isTemplate && (
      <div className="flex flex-col">
        <Text variant={TextVariant.BODY4} color="text-grey-400">
          Language
        </Text>
        <Text variant={TextVariant.BODY3} color="text-white">
          {language}
        </Text>
      </div>
    )}
    {isTemplate && (
      <div className="flex flex-col space-y-2">
        <Text
          variant={TextVariant.BODY4}
          color="text-grey-400"
          customClasses="capitalize"
        >
          Format
        </Text>
        <Text
          variant={TextVariant.BODY3}
          color="text-white"
          customClasses="capitalize"
        >
          {contentType?.toLocaleLowerCase()}
        </Text>
      </div>
    )}
    <div className="flex flex-col space-y-2">
      <Text variant={TextVariant.BODY4} color="text-grey-400">
        Category
      </Text>
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Chip text={category} key={`content-category-${category}`} />
        ))}
      </div>
    </div>
    {!isTemplate && (
      <div className="flex flex-col space-y-2">
        <Text variant={TextVariant.BODY4} color="text-grey-400">
          Type
        </Text>
        <div className="flex gap-2 flex-wrap">
          {types.map((type) => (
            <Chip text={type} key={`content-type-${type}`} />
          ))}
        </div>
      </div>
    )}
    {!isTemplate && (
      <div className="flex flex-col space-y-2">
        <Text variant={TextVariant.BODY4} color="text-grey-400">
          Tags
        </Text>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Chip text={tag} key={`content-tag-${tag}`} />
          ))}
        </div>
      </div>
    )}
  </div>
);

export default ContentDescription;

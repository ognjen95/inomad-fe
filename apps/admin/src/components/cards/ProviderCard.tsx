import React, { FC } from "react";
import {
  Avatar,
  Button,
  Chip,
  Icon,
  IconType,
  Paper,
  Text,
  TextVariant,
  Tooltip,
} from "ui-components";
import { ButtonColor } from "ui-components/src/button/enums";
import { colors } from "ui-components/src/config/tailwind-config";

export type ProviderCardProps = {
  name: string;
  avatarImgSrc: string;
  location: string;
  description: string;
  numOfApplicants: number;
  numOfCases: number;
  price: number;
  onInfoClick: () => void;
  onApplyClick: () => void;
};

const ProviderCard: FC<ProviderCardProps> = ({
  name,
  avatarImgSrc,
  location,
  description,
  numOfApplicants,
  numOfCases,
  price,
  onInfoClick,
  onApplyClick,
}) => (
  <Paper fullHeight fullWidth allowShadowHover>
    <div className="flex space-x-2 w-full">
      <div className="flex space-x-5  w-full">
        <Avatar imageSrc={avatarImgSrc} />
        <div className="flex flex-col justify-center w-full flex-1">
          <Text variant={TextVariant.BODY2} customClasses="font-semibold">
            {name}
          </Text>
          <Text light>{location}</Text>
        </div>
        <div>
          <Chip text={`${price} $`} />
        </div>
      </div>
    </div>
    <div className="py-5">
      <Text>{description}</Text>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex justify-between items-center space-x-3">
        <Tooltip
          triggerEl={
            <div className="flex items-center space-x-2">
              <Icon
                type={IconType.USERS}
                fill="none"
                stroke={colors.primary[900]}
              />
              <Text customClasses="font-semibold">{numOfApplicants}</Text>
            </div>
          }
          text={`${numOfApplicants} Applicants relocated`}
        />
        <Tooltip
          triggerEl={
            <div className="flex items-center space-x-2">
              <Icon
                type={IconType.FOLDER_DOCUMENT}
                fill="none"
                stroke={colors.primary[900]}
              />
              <Text customClasses="font-semibold">{numOfCases}</Text>
            </div>
          }
          text={`${numOfCases} Cases closed`}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={onInfoClick} color={ButtonColor.TRANSPARENT}>
          Info
        </Button>
        <Button onClick={onApplyClick}>Apply</Button>
      </div>
    </div>
  </Paper>
);

export default ProviderCard;

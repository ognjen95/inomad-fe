import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

import { AVATAR_SIZE_MAPPER } from "./constants";
import { AvatarSize } from "./types";

export type AvatarProps = {
  personName?: string;
  imageSrc?: StaticImageData | string;
  size?: AvatarSize;
};

const Avatar: FC<AvatarProps> = ({ size = "MEDIUM", imageSrc, personName }) => {
  const [avatarSize, textClass] = AVATAR_SIZE_MAPPER[size];

  return (
    <div
      style={{
        height: `${avatarSize}px`,
        width: `${avatarSize}px`,
      }}
      className="inline-flex rounded-full justify-center items-center bg-primary-100 cursor-pointer overflow-hidden"
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt="Profile picture"
          width={avatarSize}
          height={avatarSize}
          objectFit="contain"
        />
      ) : (
        <div className={clsx("text-primary-600", textClass)}>
          {personName?.slice(0, 1) || "A"}
        </div>
      )}
    </div>
  );
};

export default Avatar;

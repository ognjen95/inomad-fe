import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { FC, useMemo } from "react";

import { AVATAR_SIZE_MAPPER } from "./constants";
import { AvatarSize } from "./types";

export type AvatarProps = {
  personName?: string;
  imageSrc?: StaticImageData | string;
  size?: AvatarSize;
  noImage?: boolean;
};

const Avatar: FC<AvatarProps> = ({
  size = "MEDIUM",
  imageSrc,
  personName,
  noImage,
}) => {
  const [avatarSize, textClass] = AVATAR_SIZE_MAPPER[size];

  const renderImage = useMemo(() => {
    if (noImage) {
      return (
        <Image
          src="/images/avatar.png"
          alt="Profile picture"
          width={avatarSize}
          height={avatarSize}
          objectFit="contain"
          quality={100}
          className="scale-110"
        />
      );
    }
    return imageSrc ? (
      <Image
        src={imageSrc}
        alt="Profile picture"
        width={avatarSize}
        height={avatarSize}
        objectFit="cover"
        objectPosition="center"
        className="scale-150"
      />
    ) : (
      <div className={clsx("text-primary-600", textClass)}>
        {personName?.slice(0, 1) || "A"}
      </div>
    );
  }, [avatarSize, imageSrc, noImage, personName, textClass]);

  return (
    <div
      style={{
        height: `${avatarSize}px`,
        width: `${avatarSize}px`,
      }}
      className={clsx(
        "inline-flex rounded-2xl justify-center items-center cursor-pointer overflow-hidden",
        imageSrc ? "transparent" : "bg-primary-100"
      )}
    >
      {renderImage}
    </div>
  );
};

export default Avatar;

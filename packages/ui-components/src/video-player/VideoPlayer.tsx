import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from "@vidstack/react";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import { FC, memo } from "react";

export type VideoPlayerProps = {
  id?: string;
  title: string;
  src?: string;
  thumbnail?: string;
  file?: File;
};

const VideoPlayer: FC<VideoPlayerProps> = ({
  id,
  src,
  file,
  title,
  thumbnail,
}) => (
  <div className="w-full h-full">
    <MediaPlayer
      key={id}
      onClick={(event) => event.stopPropagation()}
      src={src || URL.createObjectURL(file!)}
      title={title}
      poster={thumbnail || ""}
      aspectRatio={window.innerWidth / window.innerHeight}
    >
      <MediaOutlet>
        <MediaPoster />
      </MediaOutlet>
      <MediaCommunitySkin />
    </MediaPlayer>
  </div>
);

export default memo(VideoPlayer);

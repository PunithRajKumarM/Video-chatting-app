import { FC, useEffect, useRef } from "react";
import styles from "./VideoStream.module.css";

const participants =
  JSON.parse(localStorage.getItem("participants") as string) || [];
const videoSize = participants.length > 1 ? "30vw" : "50vw";
console.log(videoSize);

const VideoStream: FC<{ stream: MediaStream }> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <>
      <video
        style={{ width: videoSize }}
        ref={videoRef}
        autoPlay
        muted={true}
      />
    </>
  );
};

export default VideoStream;

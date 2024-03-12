import { FC, useEffect, useRef } from "react";

const participants =
  JSON.parse(localStorage.getItem("participants") as string) || [];
const videoSize = participants.length > 1 ? "40%" : "100%";
console.log(videoSize);

const VideoStream: FC<{ stream: MediaStream }> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <video style={{ width: videoSize }} ref={videoRef} autoPlay muted={true} />
  );
};

export default VideoStream;

import { FC, useEffect, useRef } from "react";

const VideoStream: FC<{ stream: MediaStream }> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        width: "50%",
      }}
    >
      <video style={{ width: "100%" }} ref={videoRef} autoPlay muted={true} />
    </div>
  );
};

export default VideoStream;

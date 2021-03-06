import React, { useRef, useEffect } from "react";

const styles = {
  videoContainer: {
    width: "150px",
    height: "150px",
    borderRadius: "8px",
    position: "absolute",
    top: "5%",
    right: "23%",
  },
  videoElement: {
    width: "100%",
    height: "100%",
  },
};

const LocalVideoView = (props) => {
  const { localStream } = props;
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <video
      id="userVideo"
      style={{
        position: "absolute",
        "z-index": "1",
        height: "22.5vh",
        right: "0vw",
        bottom: "0vh",
      }}
      ref={localVideoRef}
      autoPlay
      muted
    />
  );
};

export default LocalVideoView;

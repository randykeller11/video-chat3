import React, { useRef, useEffect } from "react";

const styles = {
  videoContainer: {
    width: "300px",
    height: "300px",
  },
  videoElement: {
    width: "100%",
    height: "100%",
  },
};

const GroupCallVideo = ({ stream, index, videoRendered, setVideoRendered }) => {
  const videoRef = useRef();

  useEffect(() => {
    const remoteGroupCallVideo = videoRef.current;
    remoteGroupCallVideo.srcObject = stream;
    remoteGroupCallVideo.onloadedmetadata = () => {
      remoteGroupCallVideo.play();
    };
    let localArray = [...videoRendered];
    localArray.push(true);
    setVideoRendered(localArray);
  }, [stream]);

  return (
    <div style={styles.videoContainer}>
      <video
        id={`${stream.id}`}
        ref={videoRef}
        autoPlay
        style={styles.videoElement}
      />
    </div>
  );
};

export default GroupCallVideo;

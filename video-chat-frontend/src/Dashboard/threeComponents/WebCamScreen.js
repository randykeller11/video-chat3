import React, { useRef } from "react";
import Video from "./Video";

function WebCamScreen(props) {
  return (
    <>
      <Video
        scale={[1.2, 0.9, 1]}
        position={[1, 2, 0]}
        videoElement={props.videoElement}
      />
      <Video
        rotation={[0, Math.PI / 1, 0]}
        scale={[1.2, 0.9, 1]}
        position={[1, 2, 0]}
        videoElement={props.videoElement}
      />
    </>
  );
}

export default WebCamScreen;

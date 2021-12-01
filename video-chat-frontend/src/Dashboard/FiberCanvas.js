import React, { Suspense, useEffect, useState } from "react";
import DirectCall from "./components/DirectCall/DirectCall";
import GroupCall from "./components/GroupCall/GroupCall";
import { connect } from "react-redux";
import Video from "./threeComponents/Video";

import * as webRTCHandler from "../utils/webRTC/webRTCHandler";
import * as webRTCGroupHandler from "../utils/webRTC/webRTCGroupCallHandler";

import LocalVideoView from "./components/LocalVideoView/LocalVideoView";
import Gui from "./Gui";
import "./FiberCanvas.css";
import * as THREE from "three";
import Pyramidion from "./threeComponents/Pyramidion";
import Avatar5 from "./threeComponents/Avatar5";
import GroupCallCanvas from "./GroupCallCanvas";
import {
  useProgress,
  Html,
  OrbitControls,
  Sky,
  useAspect,
} from "@react-three/drei";
import { useLoader, Canvas } from "@react-three/fiber";

import * as Y from "yjs";
import { bindProxyAndYMap } from "valtio-yjs";
import { WebrtcProvider } from "y-webrtc";
import { proxy, subscribe, useSnapshot } from "valtio";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function FiberCanvas({
  activeUsers,
  localStream,
  groupCallStreams,
  groupCallActive,
}) {
  const [videoRendered, setVideoRendered] = useState([]);

  useEffect(() => {
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, []);

  return (
    <>
      {!groupCallActive && (
        <div className="fiberCanvas">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 4, 6] }}>
              <Suspense fallback={<Loader />}>
                <Pyramidion scale={[1, 1, 1]} position={[0, 0, 10]} />
                <Avatar5 videoElement={document.getElementById("userVideo")} />

                <ambientLight intensity={0.9} />
              </Suspense>
            </Canvas>
          </Suspense>
          <LocalVideoView localStream={localStream} />
          <GroupCall
            videoRendered={videoRendered}
            setVideoRendered={setVideoRendered}
          />
          <Gui />
        </div>
      )}

      {groupCallActive && <GroupCallCanvas />}
    </>
  );
}
const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call,
});

export default connect(mapStateToProps)(FiberCanvas);

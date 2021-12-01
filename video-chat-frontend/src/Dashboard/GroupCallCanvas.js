import React, { Suspense, useEffect, useState } from "react";
import DirectCall from "./components/DirectCall/DirectCall";
import GroupCall from "./components/GroupCall/GroupCall";
import { connect } from "react-redux";
import Video from "./threeComponents/Video";
import LocalVideoView from "./components/LocalVideoView/LocalVideoView";
import Gui from "./Gui";
import "./FiberCanvas.css";
import * as THREE from "three";
import Pyramidion from "./threeComponents/Pyramidion";
import Avatar5 from "./threeComponents/Avatar5";
import DummyAvatar from "./threeComponents/DummyAvatar";

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

const ydoc = new Y.Doc();
const ymap = ydoc.getMap("map");
const provider = new WebrtcProvider("multiplayer-test10", ydoc);
let avatarStore = proxy({ users: {} });
bindProxyAndYMap(avatarStore, ymap);

function GroupCallCanvas({
  activeUsers,
  localStream,
  groupCallStreams,
  groupCallActive,
}) {
  const [videoRendered, setVideoRendered] = useState([]);

  //   provider.on("peers", (e) => console.log(e));
  const storeSnap = useSnapshot(avatarStore);
  const otherUsers = Object.keys(storeSnap.users).filter(
    (user) => user != provider.doc.guid
  );

  useEffect(() => {
    let localArray = [];
    groupCallStreams.map((user) => localArray.push(user.id));

    if (!storeSnap.users.hasOwnProperty(`${provider.doc.guid}`)) {
      avatarStore.users = {
        ...storeSnap.users,
        [`${provider.doc.guid}`]: {
          callStreamIDs: localArray,
          position: { x: 0, y: 0, z: 0 },
          rotation: { y: 0 },
          animation: "idle",
        },
      };
    } else if (storeSnap.users.hasOwnProperty(`${provider.doc.guid}`)) {
      avatarStore.users = {
        ...storeSnap.users,
        [`${provider.doc.guid}`]: {
          ...storeSnap.users[`${provider.doc.guid}`],
          callStreamIDs: localArray,
        },
      };
    }
  }, [groupCallStreams]);

  //   useEffect(() => {
  //     console.log(storeSnap.users[`${provider.doc.guid}`]);
  //   }, [storeSnap.users[`${provider.doc.guid}`]]);

  //   useEffect(() => {
  //     console.log("my guid", provider.doc.guid);

  //     console.log("other users", otherUsers);
  //   }, [otherUsers]);

  return (
    <div className="fiberCanvas">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 4, 6] }}>
          <Suspense fallback={<Loader />}>
            <Pyramidion scale={[1, 1, 1]} position={[0, 0, 10]} />
            <Avatar5 store={avatarStore} userID={provider.doc.guid} />
            {
              videoRendered.length === groupCallStreams.length &&
                otherUsers &&
                otherUsers.map((targetKey) => {
                  let vidFilter = groupCallStreams.filter(
                    (stream) =>
                      !storeSnap.users[targetKey].callStreamIDs.includes(
                        stream.id
                      )
                  );
                  let storeTarget = storeSnap.users[targetKey];

                  let videoTarget = vidFilter[0];
                  //   console.log("store target", storeTarget.position.z);
                  if (videoTarget) {
                    return (
                      <DummyAvatar
                        position={[
                          storeTarget.position.x,
                          storeTarget.position.y,
                          storeTarget.position.z,
                        ]}
                        rotation={[0, storeTarget.rotation.y, 0]}
                        animation={storeTarget.animation}
                        videoElement={document.getElementById(
                          `${vidFilter[0].id}`
                        )}
                      />
                    );
                  }
                })

              // // console.log(storeSnap.users[snapTarget].position.x, i);
            }

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
  );
}

const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call,
});

export default connect(mapStateToProps)(GroupCallCanvas);

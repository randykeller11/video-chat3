import React, { useEffect, useState } from "react";
import { useAspect } from "@react-three/drei";

export default function Scene({ ...props }) {
  const size = useAspect(1800, 1000);
  return (
    <mesh scale={size} {...props}>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[props.videoElement]} />
      </meshBasicMaterial>
    </mesh>
  );
}

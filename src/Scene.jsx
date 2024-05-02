import { useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import Model from "./Model";
import { useEffect, useState } from "react";
import * as THREE from "three";

const Scene = () => {
  const [focus, onFocus] = useState(null);
  const [lerp, onLerp] = useState(false);

  useEffect(() => {
    if (!focus) {
      console.log("lerp on");
      onLerp(true);
      setTimeout(() => {
        console.log("lerp off");
        onLerp(false);
      }, 3000);
    }
  }, [focus]);

  useFrame((state) => {
    if (!focus && lerp) {
      console.log("lerping to normal");

      state.camera.lookAt(new THREE.Vector3(0, 0, 0));
      state.camera.position.lerp(new THREE.Vector3(-10, 10, 15), 0.01);
      state.camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      <Environment files="/assets/sunset.hdr" blur={0.5} />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[2.5, 10, 5]}
        intensity={0.8}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-5, 5, 5, -5, 1, 50]}
        />
      </directionalLight>
      <Model focus={focus} onFocus={onFocus} model={1} pos={[0.75, 0.5, 1]}>
        <mesh position={[0.75, 0.5, 1]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      </Model>
      <Model focus={focus} onFocus={onFocus} model={2} pos={[-0.75, 0.5, -1]}>
        <mesh position={[-0.75, 0.5, -1]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      </Model>
      <mesh scale={20} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
      <OrbitControls enableRotate={false} enabled={!focus} makeDefault />
      <Stats />
      <pointLight intensity={0.75} position={[5, 5, 5]} />
    </>
  );
};
export default Scene;

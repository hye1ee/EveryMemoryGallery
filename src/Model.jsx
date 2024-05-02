/* eslint-disable react/prop-types */
import { animated, useSpring, config } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

import * as THREE from "three";

const Model = (props) => {
  const [active, setActive] = useState(false);

  useFrame((state) => {
    const pos = new THREE.Vector3(...props.pos);
    const lookPos = new THREE.Vector3()
      .copy(pos)
      .add(new THREE.Vector3(0, 1, 0));
    const focusPos = new THREE.Vector3()
      .copy(pos)
      .add(new THREE.Vector3(-10, 5, -5));

    if (props.focus === props.model) {
      // lerp to focus position
      console.log("lerping to focus");

      state.camera.lookAt(lookPos);
      state.camera.position.lerp(focusPos, 0.01);
      state.camera.updateProjectionMatrix();
    }
  });

  const { scale } = useSpring({
    scale: active ? 1.2 : 1,
    config: config.wobbly,
  });

  const onClick = () => {
    if (props.focus === props.model) props.onFocus(null);
    else props.onFocus(props.model);
  };
  return (
    <animated.mesh
      scale={scale}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {props.children}
    </animated.mesh>
  );
};
export default Model;

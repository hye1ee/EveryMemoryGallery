/* eslint-disable react/prop-types */
import { animated, useSpring, config } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import * as THREE from "three";
import { useAnimations, useGLTF } from "@react-three/drei";

export const Sculpture = (props) => {
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
      // console.log("lerping to focus");

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

export const Building = (props) => {
  const gltf = useLoader(GLTFLoader, `/assets/building${props.index}.glb`);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }, [gltf]);
  return (
    <primitive position={props.pos} scale={props.scale} object={gltf.scene} />
  );
};

const MOVE = 0.6;
export const Human = (props) => {
  const group = useRef();
  const { scene, animations } = useGLTF(`/assets/human${props.index}.glb`);
  const { actions, mixer, ref } = useAnimations(animations, group);

  useEffect(() => {
    if (group.current) {
      group.current.position.set(...props.pos);
      group.current.rotation.y += (Math.PI * Math.floor(Math.random() * 4)) / 2;

      setInterval(() => {
        if (group.current.rotation.y === 0) {
          group.current.position.add(new THREE.Vector3(0, 0, MOVE));
        } else if (group.current.rotation.y % Math.PI === 0) {
          group.current.position.add(new THREE.Vector3(0, 0, -MOVE));
        } else if (group.current.rotation.y < Math.PI) {
          group.current.position.add(new THREE.Vector3(MOVE, 0, 0));
        } else {
          group.current.position.add(new THREE.Vector3(-MOVE, 0, 0));
        }
      }, 900);
      setInterval(() => {
        group.current.rotation.y += Math.PI / 2;
        group.current.rotation.y %= 2 * Math.PI;
      }, props.interval);
    }
  }, [group]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    // Play the animation
    actions["animation"].play();
  }, [actions]);

  useFrame(({ clock }) => {
    mixer.update(clock.getDelta());
  });

  return (
    <group ref={ref} {...props}>
      <primitive scale={props.scale} object={scene} />
    </group>
  );
};

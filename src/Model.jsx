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
  const { scene } = useGLTF(`/assets/sculpture${props.model}.glb`);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }, [scene]);

  useFrame((state) => {
    const pos = new THREE.Vector3(...props.pos);
    const lookPos = new THREE.Vector3()
      .copy(pos)
      .add(new THREE.Vector3(...props.look));
    const focusPos = new THREE.Vector3()
      .copy(pos)
      .add(new THREE.Vector3(...props.foc));

    if (props.focus === props.model) {
      // lerp to focus position
      // console.log("lerping to focus");
      scene.rotation.y += 0.005;
      state.camera.lookAt(lookPos);
      state.camera.position.lerp(focusPos, 0.01);
      state.camera.updateProjectionMatrix();
    }
  });

  const { scale } = useSpring({
    scale: active ? props.scale * 1.1 : props.scale,
    config: config.wobbly,
  });

  const onClick = () => {
    if (props.focus === props.model) props.onFocus(null);
    else props.onFocus(props.model);
  };
  return (
    <animated.group
      scale={scale}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onClick={onClick}
      position={props.pos}
    >
      <primitive object={scene} />
    </animated.group>
  );
};

export const Building = (props) => {
  const gltf = useLoader(GLTFLoader, `/assets/${props.name}.glb`);

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
  const [move, setMove] = useState(false);
  const { scene, animations } = useGLTF(`/assets/human${props.index}.glb`);
  const { actions, mixer, ref } = useAnimations(animations, group);

  useEffect(() => {
    if (group.current && !move) {
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
      setMove(true);
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

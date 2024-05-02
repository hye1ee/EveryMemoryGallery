import styled from "styled-components";
import Scene from "./Scene";
import { Canvas } from "@react-three/fiber";
import ReactAudioPlayer from "react-audio-player";
import { useEffect } from "react";

const Body = () => {
  useEffect(() => {
    document.getElementById("backgroundMusic").play();
  }, []);

  return (
    <PageWrapper>
      <ReactAudioPlayer
        id="backgroundMusic"
        src="public/assets/street.mp3"
        autoPlay
        loop
      />
      <Canvas
        shadows
        raycaster={{ params: { Line: { threshold: 0.15 } } }}
        camera={{ position: [-20, 20, 40], fov: 20 }}
      >
        <Scene />
      </Canvas>
    </PageWrapper>
  );
};

export default Body;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

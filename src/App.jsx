import styled from "styled-components";
import Scene from "./Scene";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <PageWrapper>
      <LogoWrapper src="/public/assets/logo.png" />
      <Canvas
        shadows
        raycaster={{ params: { Line: { threshold: 0.15 } } }}
        camera={{ position: [-10, 10, 15], fov: 20 }}
      >
        <Scene />
      </Canvas>
    </PageWrapper>
  );
}

export default App;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

const LogoWrapper = styled.img`
  width: 200px;

  opacity: 0.8;
  position: absolute;
  left: 25px;
  top: 20px;
  z-index: 10;
`;

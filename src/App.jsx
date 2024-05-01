import styled from "styled-components";
import Scene from "./Scene";

function App() {
  return (
    <PageWrapper>
      <LogoWrapper src="/public/assets/logo.png" />
      <Scene />
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

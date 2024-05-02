import { useState } from "react";
import styled from "styled-components";
import Intro from "./Intro";
import Body from "./Body";

function App() {
  const [intro, setIntro] = useState(true);

  return (
    <PageWrapper>
      <LogoWrapper src="/public/assets/logo.png" />
      {intro ? <Intro setIntro={setIntro} /> : <Body />}
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

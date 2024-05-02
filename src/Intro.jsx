/* eslint-disable react/prop-types */
import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";
import ReactAudioPlayer from "react-audio-player";
import { useEffect, useState } from "react";

const Intro = (props) => {
  const [out, setOut] = useState(null);

  useEffect(() => {
    if (out) {
      document.getElementById("introMusic").play();
      setTimeout(() => {
        props.setIntro(false);
      }, 5000);
    }
  }, [out]);

  useEffect(() => {
    setTimeout(() => {
      setOut(false);
    }, 15000);
  }, []);

  return (
    <PageWrapper
      out={out}
      onClick={() => {
        if (out === false) setOut(true);
      }}
    >
      <ReactAudioPlayer id="introMusic" src="public/assets/subway.mp3" />
      <TypeAnimation
        sequence={[
          "Welcome to Every Memory Gallery!",
          2000,
          "Our gallery is currently exhibiting Hyewon's New York.",
          3000,
          "Please turn on your speaker for better experience.",
          3000,
          "Click the screen if you are ready to enter.",
        ]}
        wrapper="span"
        speed={60}
        deletionSpeed={100}
        style={{ fontSize: "2em", display: "inline-block" }}
      />
    </PageWrapper>
  );
};
export default Intro;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;

  background-color: rgba(255, 255, 255, 0.8);
  z-index: 100;

  opacity: ${(props) => (props.out ? 0 : 1)};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: all 5s;
  ${(props) => props.out !== null && "cursor: pointer;"}
`;

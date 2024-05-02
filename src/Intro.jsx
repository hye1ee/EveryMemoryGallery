/* eslint-disable react/prop-types */
import styled from "styled-components";

const Intro = (props) => {
  return (
    <PageWrapper>
      <button onClick={() => props.setIntro(false)}>Enter</button>
    </PageWrapper>
  );
};
export default Intro;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

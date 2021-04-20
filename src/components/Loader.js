import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingDotContainer = styled.div`
  width: 174px;
  height: 50px;
`;

const AnimatedLoadingDot = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: black;
  position: relative;
  z-index: 2;
  animation-name: load;
  animation-duration 2s;
  animation-timing-function: steps(3);
  animation-iteration-count: infinite;

  @keyframes load {
    from {
      left: 0;
    }

    to {
      left: 184px;
    }
  }
`;

const LoadingDot = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: #e1e2e1;
`;

const Spacer = styled.div`
  height: 100%;
  width: 12px;
`;

export default function Loader() {
  return (
    <>
      <Container>
        <LoadingDotContainer>
          <LoadingDot />
          <Spacer />
          <LoadingDot />
          <Spacer />
          <LoadingDot />
        </LoadingDotContainer>
      </Container>
      <Container>
        <LoadingDotContainer>
          <AnimatedLoadingDot />
        </LoadingDotContainer>
      </Container>
    </>
  );
}

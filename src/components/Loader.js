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
  width: 400px;
  height: 50px;
`;

const LoadingDot = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: #e1e2e1;
  margin: 0.5rem;
  position: relative;
  animation-name: load;
  animation-duration 1s;
  animation-timing-function: steps(3, jump-start);
  animation-iteration-count: infinite;

  @keyframes load {
    from {
      left: 0;
    }

    to {
      left: 100%;
    }
  }
`;

export default function Loader() {
  return (
    <Container>
      <LoadingDotContainer>
        <LoadingDot />
      </LoadingDotContainer>
    </Container>
  );
}

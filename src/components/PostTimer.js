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
  flex-direction: column;
  justify-content: flex-end;
`;

const Spacer = styled.div`
  width: 100%;
  height: 80px;
`;

const Remaining = styled.div`
  height: 5px;
  background-color: #f48024;
  animation-name: remaining;
  animation-duration: ${({ remaining }) => remaining}s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  z-index: 1;

  @keyframes remaining {
    from {
      width: ${({ remaining }) => remaining * 10}%;
    }

    to {
      width: 0%;
    }
  }
`;

export default function PostTimer({ remaining }) {
  return (
    <Container>
      <Remaining remaining={remaining} />
      <Spacer />
    </Container>
  );
}

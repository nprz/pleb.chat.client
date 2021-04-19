import React, { useState, useEffect } from "react";
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

const LoadingDot = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: ${({ value, current }) =>
    current === value ? "black" : "#e1e2e1"};
  margin: 0.5rem;
`;

export default function Loader() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setInterval(() => {
      if (current < 2) {
        setCurrent(current + 1);
      } else {
        setCurrent(0);
      }
    }, 1000);
  }, []);

  return (
    <Container>
      <LoadingDot value={0} current={current} />
      <LoadingDot value={1} current={current} />
      <LoadingDot value={2} current={current} />
    </Container>
  );
}

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  justify-content: center;
  align-items: center;
  background-color: #f2efe4;
`;

const Emoji = styled.div`
  font-size: 4rem;
`;

const Spacer = styled.div`
  height: 4rem;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function NoMatch() {
  return (
    <Container>
      <Emoji>4️⃣ 0️⃣ 4️⃣</Emoji>
      <Spacer />
      <StyledLink to="/">
        <Emoji>🏠</Emoji>
      </StyledLink>
    </Container>
  );
}

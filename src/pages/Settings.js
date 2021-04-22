import React from "react";
import styled from "styled-components";
import { useAuth0 } from "../utils/auth";
import { useHistory } from "react-router-dom";

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
  background-color: #f2efe4;
`;

const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  background-color: #bfbdb0;
  font-weight: bold;
  font-size: 18px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0rem 1.25rem;
`;

const BackArrow = styled.div`
  font-size: 2rem;
`;

const Spacer = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
`;

const InfoListItem = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 2rem;
  margin-top: 60px;
`;

const IconContainer = styled.div`
  margin-right: 1rem;
`;

const Text = styled.div`
  font-weight: 2rem;
`;

// TODO: block this path if a user is not logged in
export default function Settings() {
  const { user } = useAuth0();
  const history = useHistory();

  return (
    <Container>
      <Header>
        <Spacer>
          <BackArrow onClick={() => history.goBack()}>⬅️</BackArrow>
        </Spacer>
        <HeaderText>Settings</HeaderText>
        <Spacer />
      </Header>
      <InfoListItem>
        <IconContainer>👤</IconContainer>
        <Text> {user?.email}</Text>
      </InfoListItem>
    </Container>
  );
}

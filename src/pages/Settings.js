import React from "react";
import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import { useAuth0 } from "../utils/auth";

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

const InfoListItem = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 2rem 1rem;
  margin-top: 60px;
`;

// TODO: block this path if a user is not logged in
export default function Settings() {
  const { user } = useAuth0();

  return (
    <Container>
      <Header>Settings</Header>
      <InfoListItem>
        <PersonIcon /> {user?.email}
      </InfoListItem>
    </Container>
  );
}

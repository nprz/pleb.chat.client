import React from "react";
import styled from "styled-components";
import { useAuth0 } from "../utils/auth";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cardRoot: {
    borderRadius: 20,
    margin: "5rem 2rem 0rem 2rem",
    padding: "0rem 1rem",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
});

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
  padding: 1.5rem 0rem;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
  width: 100%;
  padding: 1.5rem 0rem;
`;

const IconContainer = styled.div`
  margin-right: 0.5rem;
`;

const Text = styled.div`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// TODO: block this path if a user is not logged in
export default function Settings() {
  const { user, logout } = useAuth0();
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container>
      <Header>
        <Spacer>
          <BackArrow onClick={() => history.goBack()}>⬅️</BackArrow>
        </Spacer>
        <HeaderText>Settings</HeaderText>
        <Spacer />
      </Header>
      <Card
        classes={{
          root: classes.cardRoot,
        }}
      >
        <InfoListItem>
          <IconContainer>👤</IconContainer>
          <Text> {user?.email}</Text>
        </InfoListItem>
        <ButtonContainer>
          <Button variant="contained" onClick={logout}>
            Logout 👋
          </Button>
        </ButtonContainer>
      </Card>
    </Container>
  );
}

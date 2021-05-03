import React, { useMemo } from "react";
import styled from "styled-components";
import { useAuth0 } from "../utils/auth";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// Query
import { loader } from "graphql.macro";
import { useQuery, useMutation } from "@apollo/client";
const GET_USER = loader("../queries/getUserLastMessage.gql");

const useStyles = makeStyles({
  cardRoot: {
    borderRadius: 20,
    marginTop: "5rem",
    width: "calc(100% - 4rem)",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
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
  align-items: center;
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
  flex-direction: column;
  width: 100%;
  padding-bottom: 1rem;
`;

const Text = styled.div`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ListItemTitle = styled.div`
  font-size: 0.75rem;
  opacity: 50%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
  width: 100%;
  padding: 1.5rem 0rem;
`;

export default function Settings({ user }) {
  const { logout } = useAuth0();
  const history = useHistory();
  const classes = useStyles();
  const userId = useMemo(() => {
    const { sub = "|" } = user || {};
    return sub.split("|")[1];
  }, [user]);
  const { loading: userLoading, user: { name } = {} } = useQuery(GET_USER, {
    variables: {
      userId,
    },
  });

  console.log(name);
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
          <ListItemTitle>Email</ListItemTitle>
          <Text> {user?.email}</Text>
        </InfoListItem>
        <InfoListItem>
          <ListItemTitle>User Name</ListItemTitle>
          <Text> {name}</Text>
        </InfoListItem>
        <InfoListItem>
          <ListItemTitle>Email Verified</ListItemTitle>
          <Text> {user?.email_verified ? "✅" : "❌"}</Text>
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

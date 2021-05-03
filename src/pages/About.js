import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  cardRoot: {
    borderRadius: 20,
    margin: "5rem 2rem 0rem 2rem",
    padding: "0rem 1rem",
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

const HeaderText = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
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

export default function About() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container>
      <Header>
        <Spacer>
          <BackArrow onClick={() => history.goBack()}>⬅️</BackArrow>
        </Spacer>
        <HeaderText>About</HeaderText>
        <Spacer />
      </Header>
      <Card
        classes={{
          root: classes.cardRoot,
        }}
      >
        Thanks for using Pleb Chat 🙂
      </Card>
    </Container>
  );
}

import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import ReactGA from "react-ga";

const useStyles = makeStyles({
  cardRoot: {
    borderRadius: 20,
    marginTop: "5rem",
    width: "calc(100% - 4rem)",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
  },
});

const StyledTextField = withStyles({
  root: {
    flex: 1,
    "& .MuiOutlinedInput-root": {
      "& input": {
        padding: "0.35rem",
      },
    },
  },
})(TextField);

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

const InfoListItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 1rem;
`;

const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ListItemTitle = styled.div`
  font-size: 0.75rem;
  opacity: 50%;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 8px;
`;

const CopyButton = styled.div`
  font-size: 24px;
  margin-left: 0.25rem;
`;

const BottomText = styled.div`
  margin-top: 1rem;
`;

export default function About() {
  const history = useHistory();
  const classes = useStyles();
  const [copy, setCopy] = useState(false);

  function handleCopy() {
    setCopy(true);
    ReactGA.event({
      category: "Click",
      action: "address copied",
    });
  }

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
        <InfoListItem>
          <ListItemTitle>Twitter</ListItemTitle>
          <Text>@joinPlebChat</Text>
        </InfoListItem>
        <InfoListItem>
          <ListItemTitle>Donate</ListItemTitle>
          <InputContainer>
            <StyledTextField
              value="1BHxcGzNiP3EM9n6iemJWc6BYyyvPMLaSx"
              label="BTC"
              variant="outlined"
              spellcheck="false"
            />
            <CopyToClipboard
              text="1BHxcGzNiP3EM9n6iemJWc6BYyyvPMLaSx"
              onCopy={handleCopy}
            >
              <CopyButton>📄</CopyButton>
            </CopyToClipboard>
          </InputContainer>
        </InfoListItem>
        <BottomText>Thanks for using Pleb Chat 🙂</BottomText>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={copy}
        autoHideDuration={3000}
      >
        <MuiAlert onClose={() => setCopy(false)} severity="success">
          Address Copied
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

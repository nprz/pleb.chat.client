import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../components/Loader";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Close";
import PlebChatModal from "../components/Modal";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ReactGA from "react-ga";
import { useAuth0 } from "../utils/auth";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";
import isEmpty from "lodash/isEmpty";
import { useMutation, useLazyQuery } from "@apollo/client";

const CREATE_CHATROOM = loader("../mutations/createChatRoom.gql");
const GET_CHATROOM = loader("../queries/getChatRoom.gql");

// 2 styling solutions, this is bad lol
const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  settingsIconRoot: {
    color: "black",
  },
}));

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

const ContentContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 24px 0px;
  padding: 0rem 1.25rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-left: 12px;
  color: #333;
`;

const Emoji = styled.div`
  font-size: 32px;
  animation-duration: 3s;
  animation-name: wave;
  animation-iteration-count: 1;
  transform-origin: 70% 70%;

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }

    5% {
      transform: rotate(-5deg);
    }

    10% {
      transform: rotate(10deg);
    }

    20% {
      transform: rotate(-10deg);
    }

    30% {
      transform: rotate(12deg);
    }

    40% {
      transform: rotate(-10deg);
    }

    50% {
      transform: rotate(12deg);
    }

    60% {
      transform: rotate(-10deg);
    }

    70% {
      transform: rotate(12deg);
    }

    80% {
      transform: rotate(-10deg);
    }

    90% {
      transform: rotate(9deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
`;

const Text = styled.div`
  font-size: 20px;
  text-align: center;
  color: #4f4f4f;
`;

const Spacer = styled.div`
  width: 100%;
  height: 24px;
`;

const Header = styled.div`
  height: 60px;
  width: calc(100% - 2.5rem);
  padding: 0rem 1.25rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #f2efe4;
`;

const Footer = styled.div`
  height: 60px;
  width: calc(100% - 2.5rem);
  padding: 0rem 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2efe4;
`;

const FooterText = styled.div`
  color: #5476aa;
  font-size: 0.75rem;
`;

const IconContainer = styled.div`
  font-size: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-top: 0.5rem;
`;

const StyledAboutLink = styled(Link)`
  text-decoration: none;
`;

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [chatRoomId, setChatRoomId] = useState();
  const [urlError, setUrlError] = useState();
  const [roomEndedModal, setRoomEndedModal] = useState();

  const classes = useStyles();
  const history = useHistory();
  const {
    isAuthenticated,
    loading: authLoading,
    loginWithRedirect,
    user,
  } = useAuth0();
  const [createChatRoom, { loading: createChatRoomLoading }] = useMutation(
    CREATE_CHATROOM
  );
  const [getChatRoom, { loading: getChatRoomLoading }] = useLazyQuery(
    GET_CHATROOM,
    {
      fetchPolicy: "network-only",
      onCompleted: async ({ chatRoom = {} }) => {
        if (!isEmpty(chatRoom)) {
          history.push(`/room/${chatRoomId}`);
          return;
        }

        if (isEmpty(chatRoom) && !isAuthenticated) {
          setViewModal(true);
          return;
        }

        // else
        const response = await fetch(inputValue);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const hasEnded = doc.getElementsByClassName(
          "mt-4 px-2 text-center text-base text-gray-800"
        );

        if (hasEnded.length) {
          setRoomEndedModal(true);
          return;
        }

        const roomTitle = doc.title.split("-")[0];
        await createChatRoom({
          variables: {
            title: roomTitle,
            url: inputValue,
            id: chatRoomId,
          },
        });
        history.push(`/room/${chatRoomId}`);
      },
    }
  );

  useEffect(() => {
    if (user) {
      ReactGA.set({ userId: user.sub });
    }
  }, [user]);

  const loading = createChatRoomLoading || getChatRoomLoading;

  useEffect(() => {
    document.title = "Pleb Chat";
  }, []);

  useEffect(() => {
    if (chatRoomId) {
      getChatRoom({
        variables: {
          chatRoomId,
        },
      });
    }
  }, [chatRoomId, getChatRoom]);

  function handleType(e) {
    setInputValue(e.target.value);

    try {
      const url = new URL(e.target.value);

      if (url.hostname !== "www.clubhouse.com") {
        setUrlError(true);
        return;
      }

      const path = url.pathname.split("/");
      if (path.length !== 3 || path[1] !== "room" || !path[2]?.length) {
        setUrlError(true);
        return;
      }

      setUrlError(false);
    } catch (error) {
      setUrlError(true);
    }
  }

  function handleClear() {
    setInputValue("");
  }

  /*
    TODO:
    - Check settings for all these services
    - Turn off AWS
    
    - make sure loading is not weird, maybe remake clubhouse's loading indicator ✅
    - use state instead of loading indicator for fluid loading state
    - Logic to make sure room actually exists and is ongoing ✅
    - Show username when logged in, logout / setting screen ✅
    - 404 page ✅
    - About page ✅
    - center and max width for desktop
    - limit posting to 15sec per post✅
    - cool gradient on posting limit
    - Install GA ✅
    - center for desktop, max-width
    - make a twitter ✅
    - Make sure DB url is pointing in the correct spot ✅
    - dumb bug when loading directly into a chatroom ✅
    - chron job to delete inactive rooms - will be doing this manually for the time being
    - Ship it >:)

    - Make sure GA is working ✅
    - Make sure email forwarding is working ✅
    - Set up Auth0
    - Set up a new db ✅
    - get off hobby heroku plan ✅
    - fix issue with link ?
    - 404 page ✅
    - Better color scheme ?
    - Why does it log you out when you refresh?
  */

  /*
    post limit: set timer for 10s after posting
    fetch user on page load and get latest comment from 
  */
  function handleCreateRoom() {
    const splitURL = inputValue.split("/");
    setChatRoomId(splitURL[4]);
  }

  function handleClearViewModal() {
    setChatRoomId("");
    setViewModal(false);
  }

  function handleClearRoomEndedModal() {
    setChatRoomId("");
    setRoomEndedModal(false);
  }

  function renderHeaderContent() {
    if (authLoading) return;

    if (isAuthenticated) {
      return (
        <StyledLink to="/settings">
          <IconContainer>⚙️</IconContainer>
        </StyledLink>
      );
    }

    return (
      <Button size="small" variant="contained" onClick={loginWithRedirect}>
        Login
      </Button>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <Container>
        <Header>{renderHeaderContent()}</Header>
        <ContentContainer>
          <TitleContainer>
            <Emoji>👋</Emoji>
            <TitleText>Pleb Chat</TitleText>
          </TitleContainer>
          <Spacer />
          <Text>
            Text chat rooms for clubhouse. Enter the url of an ongoing clubhouse
            room below to start chatting.
          </Text>

          <Spacer />
          <Text>Join the conversation. Join Pleb Chat.</Text>
          <Spacer />

          <TextField
            label="Room URL"
            value={inputValue}
            onChange={handleType}
            className={classes.textField}
            error={urlError}
            helperText={urlError ? "Invalid clubhouse URL" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear}>
                    {inputValue.length ? <ClearIcon /> : undefined}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Spacer />
          <Spacer />

          <Button
            onClick={handleCreateRoom}
            variant="contained"
            disabled={!inputValue.length || urlError}
          >
            Join Room
          </Button>
        </ContentContainer>
        <Footer>
          <StyledAboutLink to="/about">
            <FooterText>About</FooterText>
          </StyledAboutLink>
        </Footer>

        <PlebChatModal
          open={viewModal}
          handleClose={handleClearViewModal}
          number={220}
        >
          <div>That room has not been created yet.</div>
          <div>Log in to create a new room.</div>
          <Spacer />
          <Button variant="contained" onClick={loginWithRedirect}>
            Login
          </Button>
        </PlebChatModal>
        <PlebChatModal
          open={roomEndedModal}
          handleClose={handleClearRoomEndedModal}
          number={220}
        >
          <div>This room does not exist or has already ended </div>
          <Spacer />
          <Button onClick={handleClearRoomEndedModal} variant="contained">
            Okay 😔
          </Button>
        </PlebChatModal>
      </Container>
    </>
  );
}

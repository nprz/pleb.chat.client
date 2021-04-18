import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import ClearIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

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
  modalRoot: {
    border: "1px solid red",
  },
}));

const Container = styled.div`
  height: 100%;
  width: 100%;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: #f2efe4;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 24px 0px;
  height: 100%;
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
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 0rem 1.25rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f2efe4;
`;

const ModalBody = styled.div`
  background-color: #f2efe4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  text-align: center;
  transform: translate(0%, 120%);
  outline-style: none;
`;

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [chatRoomId, setChatRoomId] = useState();
  const [urlError, setUrlError] = useState();

  const classes = useStyles();
  const history = useHistory();
  const {
    isAuthenticated,
    user,
    loading: authLoading,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const [createChatRoom, { data, loading }] = useMutation(CREATE_CHATROOM);
  const [
    getChatRoom,
    { loading: getChatRoomLoading, data: { chatRoom } = {} },
  ] = useLazyQuery(GET_CHATROOM, {
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
  });

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
  }, [chatRoomId]);

  function handleType(e) {
    setInputValue(e.target.value);

    try {
      const url = new URL(e.target.value);

      if (url.hostname !== "joinclubhouse.com") {
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
    - Redis server ✅
    - Check settings for all these services
    - Turn off AWS
    - Scroll down when posting ✅
    - Regex url 
    - Making sure flow on log in actually works
    - Make sure flow when logged out actually works
    - Fetch and scrape data from clubhouse
    - Test on phone

    - Switch out the favicon ✅
    - make sure loading is not weird, maybe remake clubhouse's loading indicator
    - center and max width for desktop
    - CSS when input extends beyond 3 lines
    - Logic to make sure room actually exists and is ongoing
    - Ship it >:)
  */

  async function handleCreateRoom() {
    const splitURL = inputValue.split("/");
    setChatRoomId(splitURL[4]);
  }

  return (
    <Container>
      <Header>
        <Button
          size="small"
          variant="contained"
          onClick={isAuthenticated ? logout : loginWithRedirect}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </Button>
      </Header>
      <ContentContainer>
        <TitleContainer>
          <Emoji>👋</Emoji>
          <TitleText>Pleb Chat</TitleText>
        </TitleContainer>
        <Spacer />
        <Text>
          Hey, you don't have enough followers to get on stage and you don't
          know what you'd say in front of all those people anyway.
        </Text>

        <Spacer />
        <Text>Pleb Chat is here for you.</Text>

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
          Create Room
        </Button>
      </ContentContainer>
      <Modal
        open={viewModal}
        onClose={() => setViewModal(false)}
        classes={{ root: classes.modalRoot }}
      >
        <ModalBody>
          <div>That room has not been created yet.</div>
          <div>Log in to create a new room.</div>
          <Spacer />
          <Button variant="contained" onClick={loginWithRedirect}>
            {authLoading ? <CircularProgress /> : "Login"}
          </Button>
        </ModalBody>
      </Modal>
    </Container>
  );
}

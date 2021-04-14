import React, { useState, useMemo, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth0 } from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const GET_CHATROOM = loader("../../queries/getChatRoom.gql");
const NEW_MESSAGE = loader("../../subscriptions/newMessage.gql");
const POST = loader("../../mutations/post.gql");

const useStyles = makeStyles((theme) => ({
  iconButton: {
    margin: "0px 16px 0px 8px",
  },
  textInputRoot: {
    margin: " 12px",
    backgroundColor: "#fff",
    borderRadius: "4px",
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
  background-color: #f2efe4;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  background-color: #bfbdb0;
`;

const ChatContainer = styled.div`
  overflow: scroll;
  background-color: #f2efe4;
  padding: 0px 12px;
  max-height: 100%;
  flex-grow: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const InputContainer = styled.div`
  width: 100%;
  min-height: 80px;
  background-color: #bfbdb0;
  display: flex;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 100%;
  min-height: 80px;
  background-color: #bfbdb0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Chat = styled.div`
  width: 100%;
  margin: 12px 0px;
`;

const DateText = styled.div`
  font-size: 0.75rem;
  opacity: 40%;
`;

export default function ChatRoom() {
  const classes = useStyles();
  const [textValue, setTextValue] = useState();
  const messageEndRef = useRef(null);
  const { chatRoomId } = useParams();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const userId = useMemo(() => {
    const { sub = "|" } = user || {};
    return sub.split("|")[1];
  }, [user]);
  const {
    loading,
    data: { chatRoom: { messages = [] } = {} } = {},
    subscribeToMore = () => {},
  } = useQuery(GET_CHATROOM, {
    variables: {
      chatRoomId,
    },
  });
  const [post, { loading: postLoading }] = useMutation(POST);

  useEffect(() => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleClick() {
    post({
      variables: {
        chatRoomId,
        userId,
        content: textValue,
      },
    });

    setTextValue("");
  }

  subscribeToMore({
    document: NEW_MESSAGE,
    variables: { chatRoomId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newMessage = subscriptionData.data.newMessage;
      const exists = prev.chatRoom.messages.find((m) => m.id === newMessage.id);

      if (exists) return prev;

      return {
        chatRoom: {
          ...prev.chatRoom,
          messages: [...prev.chatRoom.messages, newMessage],
          __typename: prev.chatRoom.__typename,
        },
      };
    },
  });

  console.log(isAuthenticated);
  return (
    <Container>
      <Header>{chatRoomId}</Header>
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <ChatContainer>
          {messages.map((message) => (
            <Chat key={message.id}>
              <div>
                <b>{`${message.user.name}:`}</b> {`${message.content}`}
              </div>
              <DateText>
                {message.createdAt.includes("T")
                  ? moment(message.createdAt).format("h:mm a")
                  : moment(new Date(parseInt(message.createdAt))).format(
                      "h:mm a"
                    )}
              </DateText>
            </Chat>
          ))}
          <div ref={messageEndRef} />
        </ChatContainer>
      )}
      {isAuthenticated ? (
        <InputContainer>
          <TextField
            id="outlined-multiline-static"
            multiline
            variant="outlined"
            style={{ width: "100%" }}
            size="small"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            classes={{
              root: classes.textInputRoot,
            }}
          />
          <IconButton
            aria-label="delete"
            size="small"
            disabled={!textValue?.length}
            onClick={handleClick}
            className={classes.iconButton}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </InputContainer>
      ) : (
        <LoginContainer>
          <Button variant="contained" onClick={loginWithRedirect}>
            Login to chat
          </Button>
        </LoginContainer>
      )}
    </Container>
  );
}

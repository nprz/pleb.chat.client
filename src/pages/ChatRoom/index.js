import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const GET_CHATROOM = loader("../../queries/getChatRoom.gql");
const NEW_MESSAGE = loader("../../subscriptions/newMessage.gql");

const useStyles = makeStyles((theme) => ({
  button: {
    position: "absolute",
    right: 0,
    top: 0,
  },
}));

const Container = styled.div`
  background-color: #f2efe4;
`;

const Header = styled.div`
  height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f2efe4;
`;

const ChatContainer = styled.div`
  height: calc(100vh - 117px);
  overflow: auto;
  background-color: #bfbdb0;
`;

const InputContainer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 56px;
  background-color: #f2efe4;
`;

const Chat = styled.div`
  min-height: 40px;
  width: 100%;
  border: 1px solid black;
`;

export default function ChatRoom() {
  const classes = useStyles();
  const { chatRoomId } = useParams();
  const {
    loading,
    data: { chatRoom: { messages = [] } = {} } = {},
    subscribeToMore,
  } = useQuery(GET_CHATROOM, {
    variables: {
      chatRoomId,
    },
  });

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

  return (
    <Container>
      <Header>{chatRoomId}</Header>
      <ChatContainer>
        {messages.map((message) => (
          <Chat key={message.id}>
            <div>{message.user.name}</div>
            <div>{message.content}</div>
          </Chat>
        ))}
      </ChatContainer>
      <InputContainer>
        <TextField
          id="outlined-multiline-static"
          multiline
          variant="outlined"
          style={{ width: "100%" }}
        />
        <Button className={classes.button} variant="contained">
          Send
        </Button>
      </InputContainer>
    </Container>
  );
}

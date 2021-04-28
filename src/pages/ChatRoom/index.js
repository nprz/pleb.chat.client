import React, { useState, useMemo, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Loader from "../../components/Loader";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth0 } from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const GET_CHATROOM = loader("../../queries/getChatRoom.gql");
const GET_USER_LAST_MESSAGE = loader("../../queries/getUserLastMessage.gql");
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
  font-weight: bold;
  font-size: 18px;
`;

const HeaderText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 1rem;
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

const SendIt = styled.div`
  font-size: 1.5rem;
  margin-right: 12px;
  opacity: ${({ disabled }) => (disabled ? "30%" : "100%")};
`;

const PostTimerContainer = styled.div`
  height: 5px;
  width: 100%;
`;

const Remaining = styled.div`
  height: 5px;
  background-color: red;
  animation-name: remaining;
  animation-duration: ${({ remaining }) => remaining}s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  @keyframes remaining {
    from {
      width: ${({ remaining }) => remaining * 10}%;
    }

    to {
      width: 0%;
    }
  }
`;

export default function ChatRoom() {
  const classes = useStyles();
  const [textValue, setTextValue] = useState();
  const [timeRemaining, setTimeRemaining] = useState();
  const [canPost, setCanPost] = useState();
  const messageEndRef = useRef(null);
  const { chatRoomId } = useParams();
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    loading: authLoading,
  } = useAuth0();

  const userId = useMemo(() => {
    const { sub = "|" } = user || {};
    return sub.split("|")[1];
  }, [user]);

  const {
    loading: roomLoading,
    data: { chatRoom: { messages = [], title = "" } = {} } = {},
    subscribeToMore = () => {},
  } = useQuery(GET_CHATROOM, {
    variables: {
      chatRoomId,
    },
    fetchPolicy: "network-only",
  });

  const {
    loading: userLoading,
    data: { user: { messages: lastMessage = [] } = {} } = {},
  } = useQuery(GET_USER_LAST_MESSAGE, {
    variables: {
      userId,
    },
    skip: !userId,
  });

  const [post] = useMutation(POST, {
    onCompleted() {
      setTimeRemaining(10);
    },
  });

  const loading = roomLoading || authLoading || userLoading;

  useEffect(() => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const current = moment();
    const last = moment(new Date(parseInt(lastMessage[0]?.createdAt)));
    const difference = current.diff(last, "seconds");
    const timeLeft = 10 - difference;

    if (difference && timeLeft > 0) {
      setTimeRemaining(difference);
    }
  }, [lastMessage]);

  useEffect(() => {
    setTimeout(() => {
      setCanPost(true);
    }, timeRemaining);
  }, [timeRemaining]);

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

  console.log(timeRemaining);
  function checkForSubscribe() {
    if (subscribeToMore) {
      subscribeToMore({
        document: NEW_MESSAGE,
        variables: { chatRoomId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.newMessage;
          const exists = prev.chatRoom.messages.find(
            (m) => m.id === newMessage.id
          );

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
    }
  }

  checkForSubscribe();

  return (
    <>
      {loading && <Loader />}
      <Container>
        <Header>
          <Tooltip title={title}>
            <HeaderText>{loading ? "" : title}</HeaderText>
          </Tooltip>
        </Header>
        {loading ? (
          <LoadingContainer />
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
        {timeRemaining && (
          <PostTimerContainer>
            <Remaining remaining={timeRemaining} />
          </PostTimerContainer>
        )}
        {loading ? (
          <InputContainer />
        ) : isAuthenticated ? (
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
            {/* fix styling on this and disable correctly */}
            <SendIt
              disabled={!textValue?.length}
              onClick={textValue?.length ? handleClick : () => {}}
            >
              🚀
            </SendIt>
          </InputContainer>
        ) : (
          <LoginContainer>
            <Button variant="contained" onClick={loginWithRedirect}>
              Login to chat
            </Button>
          </LoginContainer>
        )}
      </Container>
    </>
  );
}

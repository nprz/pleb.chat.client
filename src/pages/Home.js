import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import { loader } from "graphql.macro";
import { useMutation } from "@apollo/client";

const CREATE_CHATROOM = loader("../mutations/createChatRoom.gql");

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
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

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();
  const [createChatRoom, { data, loading }] = useMutation(CREATE_CHATROOM);

  function handleType(e) {
    setInputValue(e.target.value);
  }

  // TODO: validate URL with regex
  // display modal indicating the input
  // is not a url, don't talk like a robot
  // maybe a gif showing where to get the url?
  // maby use link instead of history?
  async function handleCreateRoom() {
    const splitURL = inputValue.split("/");
    if (splitURL.length !== 5) return;
    await createChatRoom({
      variables: {
        title: "temp title",
        url: inputValue,
        id: splitURL[4],
      },
    });

    history.push(`/room/${splitURL[4]}`);
  }

  return (
    <Container>
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

        <TextField label="Room URL" value={inputValue} onChange={handleType} />
        <Button onClick={handleCreateRoom}>Create Room</Button>
      </ContentContainer>
    </Container>
  );
}

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f2efe4;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  max-width: 400px;
  margin: 24px 0px;
  height: 100%;
  margin-bottom: 124px;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TitleText = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-left: 12px;
`
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
`
const Text = styled.div`
  font-size: 20px;
  text-align: center;
`

const Spacer = styled.div`
  width: 100%;
  height: 24px;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  margin-left: 12px;
  height: 20px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 20px;
background-color: #f2efe4;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`

export default function Home() {
  return (
    <Container>
      <ContentContainer>
      
      <TitleContainer>
        <Emoji>👋</Emoji>
        <TitleText>Pleb Chat</TitleText>
      </TitleContainer>
      <Spacer />
      <Text>
        Hey, you don't have enough followers to get on stage and you don't know what you'd say in front of all those people anyway.
      </Text>
      
      <Spacer />
      <Text>
        Pleb Chat is here for you.
      </Text>
      
      <Spacer />
      <Text>
        Join the conversation. Join Pleb Chat.
      </Text>

      <Spacer />
      <Spacer />
      <Spacer />
      <InputContainer>
        <Text>Clubhouse room URL:</Text> <StyledInput />
      </InputContainer>
      </ContentContainer>
    </Container>
  )
}

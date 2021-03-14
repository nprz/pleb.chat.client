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
`
const Text = styled.div`
  margin-top: 24px; 
  font-size: 20px;
  text-align: center;
`

export default function Home() {
  return (
    <Container>
      <ContentContainer>
      <TitleContainer>
      <Emoji>👋</Emoji>
      <TitleText>Pleb Chat</TitleText>

      </TitleContainer>
      <Text>
        Hey, you don't have enough followers to get on stage and you don't know what you'd say in front of all those people anyway.
      </Text>

      <Text>
        Pleb Chat is here for you.
      </Text>

      <Text>
        Join the conversation. Join Pleb Chat.
      </Text>

      </ContentContainer>
    </Container>
  )
}

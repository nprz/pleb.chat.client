import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f2efe4;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  overflow: scroll;
`

const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
`

export default function ChatRoom() {
  const { chatRoomId } = useParams();
  
  return (
    <Container>
      <Header>
        {chatRoomId}
      </Header>
      <ChatContainer>
        chats go here
      </ChatContainer>
      <InputContainer>
        Input goes here
      </InputContainer>
    </Container>
  )
}
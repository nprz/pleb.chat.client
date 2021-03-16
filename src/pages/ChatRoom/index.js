import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

const GET_CHATROOM = loader('../../queries/getChatRoom.gql');

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
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  overflow: scroll;
`

const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  height: 40px;
  border: 1px solid red;
`

export default function ChatRoom() {
  const { chatRoomId } = useParams();
  const { loading, data } = useQuery(GET_CHATROOM, { 
    variables: {
      chatRoomId  
    }
  }) 
  
  console.log(data)
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
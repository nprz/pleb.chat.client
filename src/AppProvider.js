import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

export default function AppProvider() {
  return (
    <ApolloProvider client={client}>
      <App /> 
    </ApolloProvider>
  )
}
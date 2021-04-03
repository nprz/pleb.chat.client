import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { useAuth0 } from "./utils/auth";

export default function AuthWrapper({ children }) {
  const { isAuthenticated, getTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getTokenSilently() : "";
      setBearerToken(token);
    };

    getToken();
  }, [getTokenSilently, isAuthenticated]);

  const authLink = setContext((_, { headers, ...rest }) => {
    if (!bearerToken) return { headers, ...rest };

    return {
      ...rest,
      headers: {
        ...headers,
        authorization: `Bearer: ${bearerToken}`,
      },
    };
  });

  const wsLink = new WebSocketLink({
    uri: `ws://pleb-chat.herokuapp.com/`,
    options: {
      reconnect: true,
    },
  });

  const httpLink = new HttpLink({
    uri: "https://pleb-chat.herokuapp.com/",
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

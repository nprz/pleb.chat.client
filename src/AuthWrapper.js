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

  const host = {
    mobile: {
      ws: "ws://169.254.113.189/subscriptions",
      http: "http://169.254.113.189",
    },
    local: {
      ws: `ws://localhost:4001/subscriptions`,
      http: `http://localhost:4001/`,
    },
    heroku: {
      ws: `wss://pleb-chat.herokuapp.com/subscriptions`,
      http: `https://pleb-chat.herokuapp.com/`,
    },
  };

  const wsLink = new WebSocketLink({
    uri: host.heroku.ws,
    options: {
      reconnect: true,
    },
  });

  const httpLink = new HttpLink({
    uri: host.heroku.http,
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

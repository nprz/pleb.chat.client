import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "./utils/auth";
import history from "./utils/history";

import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.target.Url
      ? appState.targetUrl
      : window.location.pathname
  );
};

export default function AppProvider() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_CLIENT_ID}
      audience={process.env.REACT_APP_AUDIENCE}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Auth0Provider>
  );
}

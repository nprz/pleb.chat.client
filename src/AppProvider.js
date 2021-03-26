import React from "react";
import { Auth0Provider } from "./utils/auth";
import AuthWrapper from "./AuthWrapper";
import history from "./utils/history";

import App from "./App";

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
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </Auth0Provider>
  );
}

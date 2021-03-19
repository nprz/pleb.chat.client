import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "auth0/auth0-spa-js";

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context)

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK
}) => {

}
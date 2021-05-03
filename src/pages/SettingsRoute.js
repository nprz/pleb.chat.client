import React from "react";
import { useAuth0 } from "../utils/auth";
import Loader from "../components/Loader";
import { Redirect } from "react-router-dom";
import Settings from "./Settings";

export default function SettingsRoute() {
  const { user, loading, isAuthenticated } = useAuth0();

  if (loading || typeof isAuthenticated === "undefined") {
    return <Loader />;
  }

  return isAuthenticated ? <Settings user={user} /> : <Redirect to="/" />;
}

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from "./utils/history";
import { useAuth0 } from "./utils/auth";

// Components
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import Settings from "./pages/Settings";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/room/:chatRoomId">
          <ChatRoom />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        {isAuthenticated && (
          <Route path="/settings">
            <Settings />
          </Route>
        )}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

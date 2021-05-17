import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from "./utils/history";
import ReactGA from "react-ga";

// Components
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import SettingsRoute from "./pages/SettingsRoute";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";

const trackingId = "UA-140853999-2";

history.listen(({ location }) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

// comment 6
function App() {
  useEffect(() => {
    ReactGA.initialize(trackingId);
  }, []);

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
        <Route path="/settings">
          <SettingsRoute />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

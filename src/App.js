import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Home from './pages/Home';
import ChatRoom from './pages/ChatRoom';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/room/:chatRoomId">
          <ChatRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

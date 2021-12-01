import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { connectWithWebSocket } from "./utils/wssConnection/wssConnection";
import LoginPage from "./LoginPage/LoginPage";
import FiberCanvas from "./Dashboard/FiberCanvas";

function App() {
  useEffect(() => {
    connectWithWebSocket();
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <FiberCanvas />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

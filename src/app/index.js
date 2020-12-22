import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Component imports
import Home from "../components/Home"
import State from "../components/State"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/state/:name" children={<State />}></Route>
      </Switch>
    </Router>
  );
}

export default App;

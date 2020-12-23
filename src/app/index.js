import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Component imports
import Home from "../components/Home"
import State from "../components/State"
import Navbar from "../components/Navbar"
import { useHistory } from 'react-router-dom';

const App = () => {
  const history = useHistory();

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:code" children={<State />}></Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

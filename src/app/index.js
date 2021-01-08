import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Component imports
import Home from "../components/Home";
import CountryDetailPage from "../components/CountryDetailPage";

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:type/:countryName" children={<CountryDetailPage />}></Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

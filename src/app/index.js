import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Component imports
import Home from "../components/Home";
import CountryDetailPage from "../components/CountryDetailPage";
import { useHistory } from 'react-router-dom';

const App = () => {
  const history = useHistory();

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

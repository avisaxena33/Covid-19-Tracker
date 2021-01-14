import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Component imports
import Home from "../components/Home";
import RegionDetailPage from "../components/RegionDetailPage";
import AreaDetailPage from "../components/AreaDetailPage";

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Region/:regionType/:regionIsoCode/:regionName" children={<RegionDetailPage />}></Route>
        <Route exact path="/Area/:areaType/:areaIsoCode/:areaName" children={<AreaDetailPage />}></Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

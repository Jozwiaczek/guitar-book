import * as React from 'react';
import { render } from 'react-dom';
import { init, locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import WikiText from './extensions/wiki-text';

const App = ({ sdk }) => {
  return (
    <HashRouter basename="/">
      <Switch>
        <div>
          <Route exact path="/">
            <p>{'use route <host>/#/<extenstion-name>'}</p>
          </Route>
          <Route path="/wiki-text">
            <WikiText sdk={sdk} />
          </Route>
        </div>
      </Switch>
    </HashRouter>
  );
};

init((sdk) => {
  if (sdk.location.is(locations.LOCATION_DIALOG)) {
    render(<App sdk={sdk} />, document.getElementById('root'));
  } else {
    render(<App sdk={sdk} />, document.getElementById('root'));
  }
});

import * as React from 'react';
import { render } from 'react-dom';
import { init, locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import WikiText from './extensions/wiki-text';
import ChordPreview from './extensions/chords-preview';

const App = ({ sdk }) => {
  // {/*<p>{'use route <host>/#/<extenstion-name>'}</p>*/}

  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/">
          <ChordPreview sdk={sdk} />
        </Route>
        <Route path="/wiki-text">
          <WikiText sdk={sdk} />
        </Route>
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

// IMPORTS
// react
import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './views/onboarding/Landing';
import CreateAccount from './views/onboarding/CreateAccount';
import Atoms from './views/componentTesting/componentTesting';

// COMPONENT
const App = props => {
  return (
    <React.Fragment>
      <Landing {...props} />
      {/* Atom overview currently over top of landing page. Comment out if needed */}
      <Atoms {...props} /> 
    </React.Fragment>
  );
};

// STYLED COMPONENTS
// todo

export default App;

import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from '../Homepage/Homepage';
import AdoptionPage from '../AdoptionPage/AdoptionPage';

function Root() {
  return (
    <div>
      <Route exact path={'/'} component={Homepage} />
      <Route path={'/adoption'} component={AdoptionPage} />
    </div>
  );
}

export default Root;

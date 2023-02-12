import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import { LandingScreen } from '../screens/LandingScreen';
import { CrushedScreen } from '../screens/CrushedScreen';

export const MainRouter = (props) => {
  return (
    <Fragment>
      <div id='main-screen'>
        <Routes>
          <Route path='/' element={<LandingScreen />} />
          <Route path='/get-advice' element={<CrushedScreen />} />
        </Routes>
      </div>
    </Fragment>
  )
}

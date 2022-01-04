import PrivateRoute from 'components/Routes/Private/Private';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import StoreProvider from 'Store/Provider';
import Home from './Home/Home';
import Login from './Login/Login';

const PagesRoot = () => (
  <Router>
    <StoreProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
    </StoreProvider>
  </Router>
)


export default PagesRoot;

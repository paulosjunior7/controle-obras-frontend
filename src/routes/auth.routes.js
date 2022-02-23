import React from 'react';
import Login from '../pages/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const AuthRoutes = () => {
    return (
        <Route path="/" exact component={Login} />
    );
}

export default AuthRoutes;

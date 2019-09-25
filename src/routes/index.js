import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/login" exact component={SignIn} />
            <Route path="/register" component={SignUp} />
            <Route path="/dashboard" isPrivate component={Dashboard} />
            <Route path="/profile" isPrivate component={Profile} />
            <Route path="/" component={() => <h1>404</h1>} />
        </Switch>
    );
}

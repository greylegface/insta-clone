import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

import ProtectedRoute from './helpers/protected-routes';
import IsUserLoggedIn from './helpers/is-user-logged-in';

const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p />}>
          <Switch>
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN} exact>
              <Login />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE} component={Profile} exact />
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP} exact>
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
            </IsUserLoggedIn>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

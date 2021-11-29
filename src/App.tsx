import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { NotFoundPage } from './pages/404/404';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { SignupPage } from './pages/signup/signup';
import { SignupStepTwoPage } from './pages/signup/step-two';
import { VerifyingPage } from './pages/signup/verifying';
import { VerificationPage } from './pages/verification';

import { Layout } from './components/layout/layout';
import { PrivateRoute } from './components/private-route/private-route';

import { useLazyAuthenticateQuery } from './services/auth';
import { GLOBAL_CONSTANTS } from './constants/global';
import { useAppDispatch } from './hooks/store';
import { setJwtToken, setAuthenticating } from './slices/auth';
import { useHttpError } from './hooks/http';

import './App.less';

function App() {
  const dispatch = useAppDispatch();
  const httpError = useHttpError();

  const [authenticate, { error }] = useLazyAuthenticateQuery();

  useEffect(() => {
    const storedToken = localStorage.getItem(
      GLOBAL_CONSTANTS.LOCAL_STORE_JWT_TOKEN
    );

    if (storedToken) {
      dispatch(setJwtToken(storedToken));

      authenticate();
    } else {
      dispatch(setAuthenticating(false));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      httpError(error, false);
    }
    //eslint-disable-next-line
  }, [error]);

  return (
    <>
      <Layout>
        <Switch>
          <PrivateRoute path="/signup/step-two" exact>
            <SignupStepTwoPage />
          </PrivateRoute>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/signup/verifying" exact>
            <VerifyingPage />
          </Route>
          <Route path="/signup" exact>
            <SignupPage />
          </Route>
          <Route path="/verification/:id" exact>
            <VerificationPage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;

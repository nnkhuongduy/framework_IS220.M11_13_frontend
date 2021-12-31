import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { NotFoundPage } from './pages/404/404';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { SignupPage } from './pages/signup/signup';
import { SignupStepTwoPage } from './pages/signup/step-two';
import { VerifyingPage } from './pages/signup/verifying';
import { VerificationPage } from './pages/verification';
import { PostSupply } from './pages/post/post';
import { SupplyPage } from './pages/supply/supply';
import { ContactPage } from './pages/contact/contact';
import { PostsManagementPage } from './pages/management/management';
import { CategoryPage } from './pages/category/category';
import { QueryPage } from './pages/query/query';

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
          <Route path="/signup/step-two" exact>
            <SignupStepTwoPage />
          </Route>
          <PrivateRoute path="/post" exact>
            <PostSupply />
          </PrivateRoute>
          <PrivateRoute path="/contact/" exact>
            <ContactPage />
          </PrivateRoute>
          <PrivateRoute path="/contact/:id" exact>
            <ContactPage />
          </PrivateRoute>
          <PrivateRoute path="/management" exact>
            <PostsManagementPage />
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
          <Route path="/supply/:id" exact>
            <SupplyPage />
          </Route>
          <Route path="/category/:slug" exact>
            <CategoryPage />
          </Route>
          <Route path="/query" exact>
            <Redirect to="/" />
          </Route>
          <Route path="/query/:query" exact>
            <QueryPage />
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

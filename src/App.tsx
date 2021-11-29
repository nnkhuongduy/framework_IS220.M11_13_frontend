import { Route, Switch } from 'react-router-dom';

import { NotFoundPage } from './pages/404/404';
import { HomePage } from './pages/home/home';

import { Layout } from './components/layout/layout';

import './App.less';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

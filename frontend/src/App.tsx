import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import ErrorBoundary from 'components/ErrorBoundary';
import MainHeader from 'components/MainHeader';
import PrivateRouter from 'components/PrivateRouter';
import { ApiMethods, useApiGet } from 'hooks/useApi';
import { getUser } from 'reducers/actions/user';
import { authSelector } from 'selectors/user';
import MainScreen from 'screens/MainScreen';
import CreateScreen from 'screens/CreateScreen';
import AdminScreen from 'screens/AdminScreen';
import NotFoundScreen from 'screens/NotFoundScreen';

const App: FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(authSelector);

  const userFetcher = useApiGet(ApiMethods.GET_USER)

  useEffect(() => {
    dispatch(getUser(userFetcher))
  }, []);

  return (<ErrorBoundary contentId="APP">
    <MainHeader />
    <div className="content">
      <Switch>
        <Route exact path="/">
          <MainScreen />
        </Route>
        <PrivateRouter exact path="/admin" component={AdminScreen} active={isAuth} />
        <Route exact path="/create">
          <CreateScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </div>
  </ErrorBoundary>)
}

export default App;

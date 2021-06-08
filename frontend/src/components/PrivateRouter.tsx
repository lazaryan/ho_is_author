import { FC } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import NotFoundScreen from 'screens/NotFoundScreen'

interface IProps extends RouteProps {
  component: FC<any>;
  active: boolean;
}

const PrivateRouter: FC<IProps> = ({ component: Component, active, ...props }) => {
  return (<Route
    {...props}
    render={props => (
      active ? <Component {...props} /> : <NotFoundScreen />
    )}
  />)
}

export default PrivateRouter;

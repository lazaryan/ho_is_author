import { FC } from 'react';
import { Header } from 'semantic-ui-react';
import Layout from 'components/Layout';
import User from './admin/User';
import Info from './admin/Info';

const AdminScreen: FC = () => {
  return (<div className="admin-screen">
    <Header as="h1">Личный кабинет</Header>
    <Layout
      id="admin-screen"
      sidebar={<User />}
      content={<Info />}
    />
  </div>)
}

export default AdminScreen;

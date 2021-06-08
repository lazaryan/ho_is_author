import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Dropdown, Button } from 'semantic-ui-react';
import Icon from 'components/Icon';
import { userSelector } from 'selectors/user';
import { ReactComponent as UserIcon } from 'assets/images/user.svg';

const MainHeader: FC = () => {
  const user = useSelector(userSelector);

  return (<div className="main-header">
    <Link to="/"><Header>Кто автор?</Header></Link>
    {!user.auth
      ? <div>
        <a href="/login"><Button>Войти</Button></a>
        <a href="/register"><Button>Регистрация</Button></a>
      </div>
      : <Dropdown
          icon={null}
          trigger={<Button basic className="toggle-menu">
            <Icon><UserIcon /></Icon>
            <p className="user-name">{ user.name || user.email }</p>
          </Button>}
        >
          <Dropdown.Menu>
            <a className="item" href="/api/user/logout">Выйти</a>
            <a className="item" href="/register">Регистрация</a>
            <Link className="item" to="/">На главную</Link>
            <Link className="item" to="/admin">Личный кабинет</Link>
            <Link className="item" to="/create">Создать историю</Link>
          </Dropdown.Menu>
        </Dropdown>
    }
  </div>)
}

export default MainHeader;

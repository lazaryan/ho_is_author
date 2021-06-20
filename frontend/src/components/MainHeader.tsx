import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Header, Dropdown, Button } from 'semantic-ui-react';
import Icon from 'components/Icon';
import { userSelector } from 'selectors/user';
import { ReactComponent as UserIcon } from 'assets/images/user.svg';

const MainHeader: FC = () => {
  const user = useSelector(userSelector);

  const { pathname } = useLocation();

  return (<div className="main-header">
    <Link to="/"><Header>Кто автор?</Header></Link>
    {!user.auth
      ? <div>
        {pathname !== '/' ?
          <Link to="/">
            <Button>На главную</Button>
          </Link>
        : null}
        <a href="/login"><Button>Войти</Button></a>
        <a href="/register"><Button>Регистрация</Button></a>
      </div>
      : <div className="actions">
        {pathname !== '/' ?
          <Link to="/">
            <Button>На главную</Button>
          </Link>
        : null}
        {user.role && user.role === 'author' && pathname === '/' ?
          <Link to="/create">
            <Button>Создать историю</Button>
          </Link>
        : null}
        <Dropdown
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
            {user.role && user.role === 'author' ?
              <Link className="item" to="/create">Создать историю</Link>
            : null}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    }
  </div>)
}

export default MainHeader;

import { RouteAction } from 'routes';

import { login, logout, register } from './passport';
import { getUserInfo } from './user';
import { createHistory, getHistories } from './history';

const routes: RouteAction[] = [
    {
        path: '/api/user/login',
        method: 'post',
        action: login
    },
    {
        path: '/api/user/logout',
        method: 'get',
        action: logout
    },
    {
        path: '/api/user/register',
        method: 'post',
        action: register
    },
    {
        path: '/api/user',
        method: 'get',
        action: getUserInfo
    },
    {
        path: '/api/create',
        method: 'put',
        action: createHistory
    },
    {
        path: '/api/histories',
        method: 'get',
        action: getHistories
    }
]

export default routes;

import { Action } from 'routes';
import { User } from 'types/interface';

export const getUserInfo = ({ req, res }: Action) => {
  //@ts-ignore
  const user: User = req.session.user;

  const data = {
    meta: {
      status: 'OK'
    },
    data: {
      auth: !!user,
      ...(!!user ? {
        email: user.email || '',
        name: user.name || '',
        about: user.about || '',
        photo: user.photo || ''
      } : {})
    }
  }

  res.send(data)
}

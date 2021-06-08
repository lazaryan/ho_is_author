import { FC } from 'react';
import ErrorBox from 'components/ErrorBox';

const NotFoundScreen: FC = () => {
  return (<ErrorBox
    title="Страница не существует."
    description="Запрашиваемая страница не существует или недоступна."
  />);
}

export default NotFoundScreen;

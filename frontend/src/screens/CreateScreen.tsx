import { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { useApiPut, ApiMethods } from 'hooks/useApi';
import ErrorBoundary from 'components/ErrorBoundary';
import Info from './create/Info';
import History from './create/History';
import { IHistory } from 'types/interfaces';

export type Action = <T extends IHistory, U extends keyof T>(field: U, value: T[U]) => void;

export interface IProps {
  state: IHistory;
  update: Action;
  create: Function;
}

const CreateScreen: FC = () => {
  const history = useHistory();
  const [state, setState] = useState<IHistory>({});

  const createFetcher = useApiPut(ApiMethods.CREATE_TASK)

  const update = useCallback<Action>((field, value) => {
    setState(oldState => ({
      ...oldState,
      [field]: value
    }))
  }, [setState])

  const create = useCallback(async () => {
    const data = await createFetcher(state)

    history.push('/')
  }, [createFetcher, state, history])

  return (<ErrorBoundary contentId="CREATE_SCREEN">
    <div className="create-screen">
      <Header as="h1">Новая история</Header>
      <Info state={state} update={update} create={create} />
      <History state={state} update={update} create={create} />
    </div>
  </ErrorBoundary>)
}

export default CreateScreen;

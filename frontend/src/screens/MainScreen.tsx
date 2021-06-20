import { FC, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Input, Button, Header } from 'semantic-ui-react';
import { useApiGet } from 'hooks/useApi';
import ErrorBoundary from 'components/ErrorBoundary';
import { IHistory } from 'types/interfaces';

const mapFields = {
  description: 'Описание',
  autors: 'Авторы',
  keywords: 'Ключевые слова'
}

const MainScreen: FC = () => {
  const historiesFetcher = useApiGet('histories')

  const [histories, setHistories] = useState<IHistory[]>([]);

  const loadHistory = useCallback(async () => {
    const { data } = await historiesFetcher();

    setHistories(data.data || [])
  }, [historiesFetcher, setHistories]);

  useEffect(() => {
    loadHistory()
  }, []);
  
  return (<ErrorBoundary contentId="MAIN_SCREEN">
    <div className="main-screen">
      <Segment className="search">
        <Input fluid placeholder="Найти рассказ..." />
        <Button primary>Найти</Button>
      </Segment>
      <Segment className="statistics">
        {!histories.length ? <div>Empty</div> : histories.map(history => <Segment raised key={history.entity_id} className="history">
          <Header as="h2">{ history.name }</Header>
          {Object.entries(mapFields).map(([field, label]) =>
            history[field as keyof IHistory] ? <p key={field}>{ label }: <span>{ history[field as keyof IHistory] }</span></p> : null
          )}
          <Link to={`history/${history.entity_id}`}><Button primary>Пройти историю</Button></Link>
        </Segment>)}
      </Segment>
    </div>
  </ErrorBoundary>)
}

export default MainScreen;

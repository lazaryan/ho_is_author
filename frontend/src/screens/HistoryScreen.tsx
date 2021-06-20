import { FC, useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Segment, Header, Button } from 'semantic-ui-react';
import { useApiGet } from 'hooks/useApi';
import ErrorBoundary from 'components/ErrorBoundary';
import Spinner from 'components/Spinner';
import { ILoadHistory, ICard } from 'types/interfaces';

interface IParams {
  id: string;
}

const mapFields = {
  description: 'Описание',
  autors: 'Авторы',
  keywords: 'Ключевые слова',
  created: 'Дата создания',
  author_name: 'Автор истории'
}

const HistoryScreen: FC = () => {
  const params = useParams<IParams>();
  
  const [processLoad, setProcessLoad] = useState<boolean>(false);
  const [isFirstScreen, setIsFirstScreen] = useState<boolean>(true);
  const [history, setHistory] = useState<ILoadHistory | null>(null);
  const [activeCard, setActiveCard] = useState<ICard>({});
  const [isCards, setIsCards] = useState<boolean>(true);
  const [isLastCard, setIsLaseCard] = useState<boolean>(false);

  console.log(history);

  const historyFetcher = useApiGet('history', {
    id: params.id
  });

  const updateCard = useCallback((card: ICard) => {
    console.log(2222, card.children, !card.children || !card.children.length)
    setActiveCard(card);
    setIsLaseCard(!card.children || !card.children.length)
  }, [setIsCards, setIsLaseCard])

  useEffect(() => {
    setProcessLoad(true);
    historyFetcher()
      .then(response => {
        const history = response.data.data;
        const cards = history ? JSON.parse(history.cards) : {};

        setIsCards(!!Object.keys(cards).length);
        setHistory(!history ? null : {
          ...history,
          cards
        });
        updateCard(cards);
      })
      .catch(console.error)
      .finally(() => setProcessLoad(false))
  }, []);

  return (<ErrorBoundary contentId="HISTORY_SCREEN">
    {!history ? <Segment>
      Упс. История не найдена!
    </Segment> :
    isFirstScreen
      ? <Segment>
        <Header as="h2">{ history.name }</Header>
        {Object.entries(mapFields).map(([field, label]) =>
          history[field as keyof ILoadHistory] ? <p key={field}>{ label }: <span>{ history[field as keyof ILoadHistory] }</span></p> : null
        )}
        <Button primary onClick={() => setIsFirstScreen(false)}>Начать историю</Button>
      </Segment>
      : isCards
          ? <>
            <Segment>
              <Header as="h2">{ activeCard.name }</Header>
              <p>{ activeCard.description }</p>
              <div className="actions">
                {activeCard.children?.map(node =>
                  <Button primary onClick={() => updateCard(node)} key={node.path}>{ node.name }</Button>
                )}
              </div>
            </Segment>
            {isLastCard ? <Segment>
              <p>На этом история подошла к концу!</p>
              <Button primary onClick={() => updateCard(history.cards || {})}>Пройти историю снова</Button>
              <Link to="/"><Button>Вернуться на главную</Button></Link>
            </Segment> : null}
          </>
          : <>
            <Segment>
              <p>Упс. История еще не доделана!</p>
              <Link to="/"><Button>Вернуться на главную</Button></Link>
            </Segment>
          </>
    }
    {processLoad && <Spinner />}
  </ErrorBoundary>)
}

export default HistoryScreen;

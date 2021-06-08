import { FC } from 'react';
import { Segment, Grid, TextArea, Input, Header, Button } from 'semantic-ui-react';
import { IProps } from 'screens/CreateScreen';

const Info: FC<IProps> = ({ state, update, create }) => {
  return (<Segment className="info-segment">
    <Grid>
      <Grid.Row>
        <Grid.Column width="8">
          <Header as="h2" className="require">Название истории</Header>
          <Input fluid placeholder="Введите имя..." value={state.name || ''} onChange={(event, { value }) => update('name', value)} />
          <Header as="h2">Авторы</Header>
          <Input fluid placeholder="Введите авторов..." value={state.autors || ''} onChange={(event, { value }) => update('autors', value)} />
          <Header as="h2">Ключевые слова</Header>
          <Input fluid placeholder="Введите ключевые слова..." value={state.keywords || ''} onChange={(event, { value }) => update('keywords', value)} />
        </Grid.Column>
        <Grid.Column width="8" className="right-column">
          <div>
            <Header as="h2">Описание истории</Header>
            <TextArea placeholder="Описание..." value={state.description || ''} onChange={(event, { value }) => update('description', value as string)} />
          </div>
          <div>
            <Button primary disabled={!state.name} onClick={() => create()}>Сохранить</Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>)
}

export default Info;

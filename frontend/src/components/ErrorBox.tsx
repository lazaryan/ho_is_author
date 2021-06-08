import { FC, ReactNode } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';

interface IProps {
  title: string;
  description?: string | ReactNode;
  buttonText?: string | ReactNode;
  buttonAction?: () => void;
  extra?: any;
}

const ErrorBox: FC<IProps> = ({ title, description, buttonText, buttonAction, extra = null }) => {
  return (<Grid>
    <Grid.Row columns={1}>
      <Grid.Column width={16}>
        <div className="error-box">
          {/*<img src={ErrorImage} alt="" />*/}
          <Header as="h1">{ title }</Header>
          <p>{ description }</p>
          {(buttonAction && buttonText) &&
            <Button type="primary" size="large" onClick={buttonAction}>{ buttonText }</Button>
          }
          { extra }
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>)
}

export default ErrorBox;

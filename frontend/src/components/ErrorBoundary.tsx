import React from 'react';
import { Message, Accordion } from 'semantic-ui-react';

interface IProps {
  contentId?: string;
}

class ErrorBoundary extends React.Component<IProps> {
  state = {
    error: false,
    details: false
  };

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    
    return {
      error: `${error}`
    };
  }

  render() {
    const { error, details } = this.state;
    const { children, contentId } = this.props;

    if (error) {
      return (
        <Message negative>
          <Message.Header>Ошибка во время выполнения приложения.</Message.Header>
          {(<>
          {contentId ? (<p><span>Компонент(ы) вызвавшие ошибку:</span> <em>{contentId}</em></p>) : ''}
            {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
              <Accordion styled>
                <Accordion.Title active={details} onClick={() => this.setState({details: !details})}>Подробнее...</Accordion.Title>
                <Accordion.Content active={details}>
	                <strong>{error}</strong>
                </Accordion.Content>
              </Accordion> :
              null}
          </>)}
        </Message>
      );
    }
    return children ? children : null;
  }
}

export default ErrorBoundary;

import { FC } from 'react';
import { Dimmer, Loader, SemanticSIZES } from 'semantic-ui-react';

interface IProps {
  size?: SemanticSIZES;
  inverted?: boolean;
}

const Spinner: FC<IProps> = ({ size = 'large', inverted = true }) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader active size={size} />
    </Dimmer>
  )
}

export default Spinner;

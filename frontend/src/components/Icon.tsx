import { FC, SyntheticEvent } from 'react';
import { IconContext } from 'react-icons';
import classNames from 'classnames';

interface IProps extends IconContext {
  innerClassname?: string;
  onClick?: (e: SyntheticEvent) => void;
}

const Icon: FC<IProps> = ({ children, innerClassname = '', onClick, ...props }) =>
  (<IconContext.Provider value={props}>
    <span className={classNames('ion-icon', innerClassname)} onClick={onClick}>
      {children}
    </span>
  </IconContext.Provider>);

export default Icon;

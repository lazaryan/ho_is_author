import classNames from 'classnames';
import isString from 'lodash/isString';

type TCls = null | string | undefined;

export const cxPrefix = process.env.REACT_APP_CX_PREFIX;

const cx = <T = TCls>(cls: T[] | string) => {
  const clsArray = typeof cls === 'string' ? [cls] : cls;
  // @ts-ignore
  const classes = clsArray.map((c) => isString(c) ? `${cxPrefix}${c}` : c);
  
  return classNames(classes);
};

export default cx;

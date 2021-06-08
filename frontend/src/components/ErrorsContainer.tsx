import { FC, useState, useEffect, useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import Icon from 'components/Icon';
import { IKeyValue } from 'types/interfaces';

interface IErrorText {
  id: number;
  text: string;
}

const errorMark = 'contentFilteringError';

export const postError = (errorText: string) => {
  window.postMessage(`${errorMark}${errorText}`, '*');
};

let errorsList: IErrorText[] = [];
const runningTimeouts: IKeyValue = {};
const displayTimout = 7000;

const now = () => new Date().getTime();

const ErrorsContainer: FC = () => {
  const [updated, setUpdated] = useState(0);
  const forceUpdate = useCallback(() => setUpdated(now()), []);

  const receiveMessage = useCallback(event => {
    try {
      const { data } = event;

      if (typeof data === 'string' && data.substr(0, errorMark.length) === errorMark) {
        const errorText = data.substr(errorMark.length);
        const isIncludes = Boolean(errorsList.filter(({ text }) => errorText === text).length);

        if(!isIncludes) {
          errorsList.push({ id: now(), text: errorText });
          forceUpdate();

          const tid = setTimeout(() => {
            delete(runningTimeouts[`${tid}`]);
            errorsList = errorsList.filter(({ text }) => text !== errorText);
            forceUpdate();
          }, displayTimout);

          runningTimeouts[`${tid}`] = tid;
        }
      }
    } catch {}
  }, [forceUpdate]);

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);

    return () => {
      window.removeEventListener('message', receiveMessage);
      Object.values(runningTimeouts).forEach(tid => clearTimeout(tid));
    }
  }, [receiveMessage]);

  return (errorsList.length ?
    (<div className="fatal-errors-container" data-updated={updated}>
      <div className="api-response-error">
          <>
            <div className="api-response-error-text">
              <p>Ошибка получения данных от сервера</p>
              {errorsList.map(({text, id}) => <p key={id}>{text}</p>)}
            </div>
            <div
              onClick={() => { errorsList = []; forceUpdate() }}
              className="api-response-error-close">
              <Icon><IoMdClose/></Icon>
            </div>
          </>
      </div>
    </div>) :
    null)
}

export default ErrorsContainer;

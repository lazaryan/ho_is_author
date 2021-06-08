import { IServerMeta } from 'types/interfaces';

export const isRequestMetaOk = ({status}: IServerMeta) =>
  (!status || status === 'OK');

const checkMetaError = async (meta: IServerMeta) => {
  if (isRequestMetaOk(meta)) return;
  
  const { code, message, status } = meta;
  return Promise.reject(`${status}: ${message} [${code}]`);
};

export default checkMetaError;

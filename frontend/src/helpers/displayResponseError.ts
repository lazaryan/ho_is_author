import { AxiosError, AxiosResponse } from 'axios';
import { postError } from 'components/ErrorsContainer';
import { IServerResponseData } from 'types/interfaces';

export const getDescriptionFromError = (err: AxiosError) => {
  const axiosError = err;
  let description = `${err}`;

  try {
    if (axiosError.isAxiosError) {
      if (axiosError?.response?.data?.meta) {
        const { meta }: IServerResponseData = axiosError.response.data;
        const { code, message, status } = meta;
        description = `${status}: ${message} [${code}]`;
      } else if (axiosError?.response) {
        const { status, statusText }: AxiosResponse = axiosError.response;
        description = `${statusText} [${status}]`;
      }
    }
  } catch {}

  return description;
};

const displayResponseError = (error: AxiosError) => {
  postError(getDescriptionFromError(error));
};

export default displayResponseError;

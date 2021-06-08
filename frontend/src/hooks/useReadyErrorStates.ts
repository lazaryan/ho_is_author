import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { errorDetailsSelector, isErrorSelector, isPendingSelector, isReadySelector } from 'selectors/readyErrorStates';

const useReadyErrorStates = (key: string) => {
  const error = useSelector(isErrorSelector);
  const pending = useSelector(isPendingSelector);
  const ready = useSelector(isReadySelector);
  const errorDetails = useSelector(errorDetailsSelector);
  
  return useMemo(() => ({
    error: error[key],
    pending: pending[key],
    ready: ready[key],
    errorDetails: errorDetails[key],
  }), [error, errorDetails, key, pending, ready]);
};

export default useReadyErrorStates;

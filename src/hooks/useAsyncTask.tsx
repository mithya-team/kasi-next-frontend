/* eslint-disable @typescript-eslint/no-explicit-any */
import get from 'lodash/get';
import { useState } from 'react';

export type TStatus = 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';

/**
 * A hook for async functions
 * 
 * Returns a handler with method: run and property: status
 * 
 * example:
 * ```ts
    const submitHandler = useAsyncTask(async () => {
        // Your async function goes here
    });

    // to use the handler
    submitHandler.run();

    // Its has 4 status: IDLE, PROCESSING, ERROR, SUCCESS
    if(submitHandler.status === 'PROCESSING')
        return loader()
 * ```
 */

type AnyFuntion = (...args: any[]) => any;

function useAsyncTask<F extends AnyFuntion, T extends Parameters<F>>(task: F) {
  const [status, setStatus] = useState<TStatus>('IDLE');
  const [message, setMessage] = useState('');
  const run = async (...arg: T): Promise<ReturnType<F>> => {
    setStatus('PROCESSING');
    try {
      const resp: any = await task(...arg);
      setStatus('SUCCESS');
      setMessage(resp?.message || '');
      return resp;
    } catch (error: any) {
      const message =
        get(error, 'response.data.error.message') ?? error.message;
      setMessage(message);
      setStatus('ERROR');

      throw error;
    }
  };

  const reset = () => {
    setMessage('');
    setStatus('IDLE');
  };

  return {
    run,
    status,
    message,
    reset,
    isLoading: status === 'PROCESSING',
  };
}

export default useAsyncTask;

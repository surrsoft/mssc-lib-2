import { UseQueryResult } from '@tanstack/react-query';

export interface RqQueryHandleReturnType {
  /** TRUE означает что запрос выполнился без "базовых" ошибок */
  isDone: boolean
}

// TODO add to lib
/**
 * ID [[230127224021]] rev 1 1.0.0 2023-01-27
 * @param {UseQueryResult<unknown>} result
 */
export function rqQueryHandle(result: UseQueryResult<unknown>) {
  const { isFetched, isFetching, isPaused, isError } = result;
  const isDone = isFetched && !isFetching && !isPaused && !isError;

  return {
    isDone
  }
}

import { T5TIdType } from "../../types";
import { TG3TResultType } from "../FnFindType/types";

/**
 * DESC поиск нескольких элементов
 *
 * Должен вернуть массив той же длины что и длина {@param ids}, с информацией о результатах поиска для каждого id
 */
export type FnFindMultiType<T extends T5TIdType, C> = (
  ids: string[]
) => Promise<Array<TG3TResultType<T, C>>>;

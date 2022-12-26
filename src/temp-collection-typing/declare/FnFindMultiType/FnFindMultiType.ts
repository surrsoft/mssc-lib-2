import { IdType } from "../../types";
import { FindResultType } from "../FnFindType/types";

/**
 * DESC поиск нескольких элементов
 *
 * Должен вернуть массив той же длины что и длина {@param ids}, с информацией о результатах поиска для каждого id
 */
export type FnFindMultiType<T extends IdType, C> = (
  ids: string[]
) => Promise<Array<FindResultType<T, C>>>;

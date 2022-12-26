import { IdType } from "../../types";
import { FindResultType } from "./types";

/**
 * DESC поиск элемента
 *
 * Должен выполнить поиск элемент по идентификатору {@param id}
 */
export type FnFindType<T extends IdType, C> = (
  id: string
) => Promise<FindResultType<T, C>>;

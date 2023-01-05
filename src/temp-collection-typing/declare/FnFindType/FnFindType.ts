import { T5TIdType } from "../../types";
import { TG3TResultType } from "./types";

/**
 * SHORT DESC поиск элемента
 *
 * Должен выполнить поиск элемент по идентификатору {@param id}
 */
export type FnFindType<T extends T5TIdType, C> = (
  id: string
) => Promise<TG3TResultType<T, C>>;

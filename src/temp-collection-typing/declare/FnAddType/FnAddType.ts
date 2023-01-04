import { T5TIdType } from "../../types";
import { TG4TResultType } from "./types";

/**
 * добавление элемента {@param elem} в конец коллекции
 */
export type FnAddType<T extends T5TIdType, C> = (elem: T) => Promise<TG4TResultType<T, C>>;


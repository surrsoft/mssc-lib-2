import { IdType } from "../../types";
import { AddResultType } from "./types";

/**
 * добавление элемента {@param elem} в конец коллекции
 */
export type FnAddType<T extends IdType, C> = (elem: T) => Promise<AddResultType<T, C>>;


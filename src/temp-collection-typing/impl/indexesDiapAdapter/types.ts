export enum DisEnum {
  /** см. {@link BaseType} */
  BASE = "BASE",
  /** см. {@link ResultEmptyArrType} */
  EMPTY_ARR = "EMPTY_ARR",
}

export enum InfoEnum {
  /** indexStart больше и равен чем "длина множества" */
  INDEX_START_GREAT_OR_EQ_LEN = "INDEX_START_GREAT_OR_EQ_LEN",
  /** indexStart меньше нуля */
  INDEX_START_LESS_NIL = "INDEX_START_LESS_NIL",
  /** indexEnd больше "длины множества" */
  INDEX_END_GREAT_LEN = "INDEX_END_GREAT_LEN",
  /** indexEnd меньше indexStart */
  END_GREAT_START = "END_GREAT_START",
  /** indexEnd равен indexStart */
  END_EQUAL_START = "END_EQUAL_START",
}

/**
 * Наличие этого типа в результате, означает что входные данные не удалось адаптировать, и поэтому следует
 * просто вернуть пользователю пустой массив, не выполняя реальных выборок данных
 */
export interface ResultEmptyArrType {
  _tag: DisEnum.EMPTY_ARR;
}

/**
 * Наличие этого типа в результате, означает что входные данные удалось адаптировать.
 * Если поле {@link infos} не пустое, то значит выполнялись некоторые корректировки, информация о которых
 * и содержится в этом поле
 */
export interface BaseType {
  _tag: DisEnum.BASE;
  indexStart: number;
  indexEnd: number;
  infos: InfoEnum[];
}

/** discriminated union */
export type ResultType = BaseType | ResultEmptyArrType;

export enum TG1TDisEnum {
  /** см. {@link TG1TBaseType} */
  BASE = "BASE",
  /** см. {@link TG1TResultEmptyArrType} */
  EMPTY_ARR = "EMPTY_ARR",
}

export enum TG1TInfoEnum {
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
export interface TG1TResultEmptyArrType {
  _tag: TG1TDisEnum.EMPTY_ARR;
}

/**
 * Наличие этого типа в результате, означает что входные данные удалось адаптировать.
 * Если поле {@link infos} не пустое, то значит выполнялись некоторые корректировки, информация о которых
 * и содержится в этом поле
 */
export interface TG1TBaseType {
  _tag: TG1TDisEnum.BASE;
  indexStart: number;
  indexEnd: number;
  infos: TG1TInfoEnum[];
}

/** discriminated union */
export type TG1TResultType = TG1TBaseType | TG1TResultEmptyArrType;

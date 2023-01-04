export enum TG1TDisEnum {
  /** см. {@link TG1TBaseType} */
  TG1T_DIS_BASE = "TG1T_DIS_BASE",
  /** см. {@link TG1TResultEmptyArrType} */
  TG1T_DIS_EMPTY_ARR = "TG1T_DIS_EMPTY_ARR",
}

export enum TG1TInfoEnum {
  /** indexStart больше и равен чем "длина множества" */
  TG1T_INF_INDEX_START_GREAT_OR_EQ_LEN = "TG1T_INF_INDEX_START_GREAT_OR_EQ_LEN",
  /** indexStart меньше нуля */
  TG1T_INF_INDEX_START_LESS_NIL = "TG1T_INF_INDEX_START_LESS_NIL",
  /** indexEnd больше "длины множества" */
  TG1T_INF_INDEX_END_GREAT_LEN = "TG1T_INF_INDEX_END_GREAT_LEN",
  /** indexEnd меньше indexStart */
  TG1T_INF_END_GREAT_START = "TG1T_INF_END_GREAT_START",
  /** indexEnd равен indexStart */
  TG1T_INF_END_EQUAL_START = "TG1T_INF_END_EQUAL_START",
}

/**
 * Наличие этого типа в результате, означает что входные данные не удалось адаптировать, и поэтому следует
 * просто вернуть пользователю пустой массив, не выполняя реальных выборок данных
 */
export interface TG1TResultEmptyArrType {
  _tag: TG1TDisEnum.TG1T_DIS_EMPTY_ARR;
}

/**
 * Наличие этого типа в результате, означает что входные данные удалось адаптировать.
 * Если поле {@link infos} не пустое, то значит выполнялись некоторые корректировки, информация о которых
 * и содержится в этом поле
 */
export interface TG1TBaseType {
  _tag: TG1TDisEnum.TG1T_DIS_BASE;
  indexStart: number;
  indexEnd: number;
  infos: TG1TInfoEnum[];
}

/** discriminated union */
export type TG1TResultType = TG1TBaseType | TG1TResultEmptyArrType;

import { DisEnum, InfoEnum, ResultType } from './types';

/**
 * SHORT DESC адаптирует данные диапазона индексов
 *
 * Принимает на вход начальный-индекс-диапазона (1), конечный-индекс-диапазона (2) и длину-множества (3),
 * обрабатыавет эти данные, и возвращает их адапатированный корректный вариант так как эти входные
 * данные могут быть некорректными. Например если (1) указан меньше нуля, что некорректно, то
 * в результате он будет равен нулю
 *
 * ID [[230103175044]] rev 1 1.0.0 2023-01-03
 *
 * @param indexStart (1) начальный индекс диапазона
 * @param indexEnd (2) конечный индекс диапазона
 * @param len (3) длина множества в котором предположительно располагается диапазон
 * @return ResultType технология "discriminated union"
 */
export function indexesDiapAdapter(indexStart: number, indexEnd: number, len: number): ResultType {
  if (len < 0 || len === 0) {
    return { _tag: DisEnum.EMPTY_ARR }
  }
  if (indexStart >= len) {
    return { _tag: DisEnum.BASE, indexStart: len - 1, indexEnd: len, infos: [InfoEnum.INDEX_START_GREAT_OR_EQ_LEN] }
  }
  const infos: InfoEnum[] = []
  let indexStartActual = indexStart
  if (indexStart < 0) {
    indexStartActual = 0
    infos.push(InfoEnum.INDEX_START_LESS_NIL)
  }
  let indexEndActual = indexEnd;
  if (indexEnd > len) {
    indexEndActual = len
    infos.push(InfoEnum.INDEX_END_GREAT_LEN)
  }
  if (indexEndActual < indexStartActual) {
    infos.push(InfoEnum.END_GREAT_START)
    indexEndActual = indexStartActual + 1
  }
  if (indexEndActual === indexStartActual) {
    infos.push(InfoEnum.END_EQUAL_START)
    indexEndActual = indexStartActual + 1
  }
  return { _tag: DisEnum.BASE, indexStart: indexStartActual, indexEnd: indexEndActual, infos }
}

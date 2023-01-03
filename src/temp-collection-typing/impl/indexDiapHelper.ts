enum DisEnum {
  EMPTY_ARR, BASE
}

enum InfoEnum {
  INDEX_END_OUT,
  LEN_NILLABLE,
  INDEX_START_LESS_NIL,
  INDEX_END_GREAT_LEN,
  END_GREAT_START,
  END_EQUAL_START
}

interface ResultEmptyArrType {
  _tag: DisEnum.EMPTY_ARR
  infos: InfoEnum[]
}

interface BaseType {
  _tag: DisEnum.BASE
  indexStart: number
  indexEnd: number
  infos: InfoEnum[]
}

type ResultType = BaseType | ResultEmptyArrType;

export function indexDiapHelper(indexStart: number, indexEnd: number, len: number): ResultType {
  if (len < 0 || len === 0) {
    return { _tag: DisEnum.EMPTY_ARR, infos: [InfoEnum.LEN_NILLABLE] }
  }
  if (indexStart >= len) {
    return { _tag: DisEnum.BASE, indexStart: len - 1, indexEnd: len, infos: [InfoEnum.INDEX_END_OUT] }
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

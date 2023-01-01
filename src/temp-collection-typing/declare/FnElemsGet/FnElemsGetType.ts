export enum ElemsGetResultEnum {
  SUCCESS = "SUCCESS",
}

export interface ElemsGetSuccessType<T> {
  _tag: ElemsGetResultEnum.SUCCESS;
  elems: T[];
}

export type ElemsGetResultType<T> = ElemsGetSuccessType<T>;

export type FnElemsGetType<T> = (
  indexStart: number,
  indexEnd: number
) => Promise<ElemsGetResultEnum<T>>;

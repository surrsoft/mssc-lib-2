export enum ElemsGetResultEnum {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum ElemsGetCommentEnum {
  INDEX_END_OUT_OF_RANGE = 'INDEX_END_OUT_OF_RANGE',
  INDEX_END_GREATER = 'INDEX_END_GREATER',
  INDEX_START_NIL = 'INDEX_START_NIL',
  INDEX_START_GREATER = 'INDEX_START_GREATER',
}

export interface ElemsGetSuccessType<T> {
  _tag: ElemsGetResultEnum.SUCCESS;
  elems: T[];
  comments: ElemsGetCommentEnum[]
}

export interface ElemsGetErrorType<C> {
  _tag: ElemsGetResultEnum.ERROR
  code: C,
  desc?: string
}

export type ElemsGetResultType<T, C> = ElemsGetSuccessType<T> | ElemsGetErrorType<C>;

/**
 * SHORT DESC возвращает элементы указанного диапазона
 *
 * Должен вернуть содержимое ячеек расположенных между индексами {@param indexStart} и {@param indexEnd}.
 *
 * Если {@param indexEnd} больше чем "длина коллекции", то должны быть возвращены элементы
 * от {@param indexStart} и до конца коллекции.
 * При этом в комментариях должен быть {@link ElemsGetCommentEnum#INDEX_END_OUT_OF_RANGE}
 *
 * Если {@param indexEnd} меньше {@param indexStart} то должен вернуться один элемент расположенный на
 * {@param indexStart}.
 * При этом в комментариях должен быть {@link ElemsGetCommentEnum#INDEX_END_GREATER}
 *
 * Если indexStart меньше нуля, то indexStart должен считаться равным нулю.
 * При этом в комментариях должен быть {@link ElemsGetCommentEnum#INDEX_START_NIL}.
 *
 * Если indexStart больше чем "длина коллекции", то должен быть возвращён последний элемент.
 * При этом в комментариях должен быть {@link ElemsGetCommentEnum#INDEX_START_GREATER}.
 *
 */
export type FnElemsGetType<T, C> = (
  indexStart: number,
  indexEnd: number
) => Promise<ElemsGetResultType<T, C>>;

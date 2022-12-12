import { RsuvTxStringAB } from "rsuv-lib";

/**
 * Тип представляющий *элемент
 */
export interface VanxElemType<TModel> {
  /** идентификатор *элемента */
  id: RsuvTxStringAB;
  /** JSX *элемента */
  elem: JSX.Element;
  /** модель данных *элемента */
  elemModel: TModel;
}

// noinspection JSUnusedGlobalSymbols
export function isVanxElemType<TModel>(data: any): data is VanxElemType<TModel> {
  return !!(
    data?.id &&
    data.elem &&
    data.elemModel &&
    data.id.bnuwIsValid()?.success
  );
}

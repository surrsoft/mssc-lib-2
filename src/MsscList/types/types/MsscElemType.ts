import { RsuvTxStringAB } from "rsuv-lib";

/**
 * Тип представляющий *с-элемент (см. понятие [221204121005])
 */
export interface MsscElemType {
  /** идентификатор */
  id: RsuvTxStringAB;
  /** JSX элемента */
  elem: JSX.Element;
  /** модель элемента */
  elemModel: object;
}

export function isMsscElemType(data: any): data is MsscElemType {
  return !!(
    data?.id &&
    data.elem &&
    data.elemModel &&
    data.id.bnuwIsValid()?.success
  );
}

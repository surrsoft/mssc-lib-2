/*
ПОНЯТИЯ
-- *id - идентификатор элемента
-- *selList, *в-список - список *id выбранных элементов
-- *активный-элемент - элемент с которым в последний раз производились действия и т.п.
 */

/** идентификатор элемента (*id) */
export type ListSelectingElemIdType = string;
/** идентификатор элемента или null */
export type ListSelectingElemIdOrNullType = ListSelectingElemIdType | null;

/**
 * Предназначен для хранения текущего состояния какого-либо списка.
 * Хранит 1) какие элементы выбраны (методы `select...()`) 2) какой элемент является сейчас активным (методы `active...()`)
 *
 * ID [[asau59]] [[221204151130]] rev 1 1.0.0 2022-12-04
 */
export class ListSelectingModelCls {
  /**
   * список id выбранных элементов
   */
  private readonly _selectedIds: Set<ListSelectingElemIdType> = new Set();

  /**
   * id *активного-элемента
   * @private
   */
  private _activeId: ListSelectingElemIdOrNullType = null;

  /** установка значения id *активного-элемента */
  activeIdSet(id: ListSelectingElemIdType) {
    this._activeId = id;
  }

  /**
   * Возвращает идентификатор активного элемента или null
   */
  activeId(): ListSelectingElemIdOrNullType {
    return this._activeId;
  }

  /** сброс id *активного-элемента */
  activeIdReset() {
    this._activeId = null;
  }

  /**
   * возвращает TRUE если id (1) соответствует *активному-элементу
   * @param id идентификатор элемента
   */
  activeIdIs(id: ListSelectingElemIdType): boolean {
    return !!id && this._activeId === id;
  }

  /**
   * Возвращает (2) (обычно это имя класса) если id (1) соответствует *активному-элементу, иначе
   * возвращает пустую строку
   * @param id (1) --
   * @param str (2) --
   */
  activeIdIsB(id: ListSelectingElemIdType, str: string): string {
    return this.activeIdIs(id) ? str : "";
  }

  /**
   * Возвращает количество выбранных элементов
   */
  selectElemsCount(): number {
    return this._selectedIds.size;
  }

  /**
   * Добавить ids (1) в список выбранных
   * @param ids (1) -- ids элементов
   */
  selectElemsAdd(ids: ListSelectingElemIdType[]) {
    ids
      .filter((id) => !!id)
      .forEach((id: ListSelectingElemIdType) => {
        this._selectedIds.add(id);
      });
  }

  /**
   * Удалить из *selList элементы (1)
   * @param ids (1) --
   */
  selectElemsDelete(ids: ListSelectingElemIdType[]) {
    ids
      .filter((el) => !!el)
      .forEach((el) => {
        this._selectedIds.delete(el);
      });
  }

  /**
   * Возвращает TRUE если элемент (1) есть в *в-списке (т.е. среди выбранных)
   * @param id (1) --
   */
  selectElemIs(id: ListSelectingElemIdType): boolean {
    return this._selectedIds.has(id);
  }

  /**
   * Очищает *в-список
   */
  selectElemsClear() {
    this._selectedIds.clear();
  }

  /**
   * Возвращает один ID из выбранных. Если ни одного нет, то возвращает null
   */
  selectElemOne(): ListSelectingElemIdOrNullType {
    if (this.selectElemsCount() > 0) {
      return this._selectedIds.values().next().value;
    }
    return null;
  }

  /**
   * выбранные идентификаторы
   */
  selectElems(): ListSelectingElemIdType[] {
    return Array.from(this._selectedIds);
  }
}

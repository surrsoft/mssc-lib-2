// [[asau59]]

/*
ПОНЯТИЯ
-- *id - идентификатор элемента
-- *selList - список *id выбранных элементов
-- *активный-элемент - элемент с которым в последний раз производились действия и т.п.
 */

// *id
export type IdAtAsau59PMT = string
export type IdAtAsau59PMT_B = string | null

/**
 * Предназначен для хранения текущего состояния какого-либо списка, например того какмие элементы "выбраны"
 */
export default class ListModelAsau59 {
  /**
   * список id выбранных элементов
   */
  private _selectedIds: Set<IdAtAsau59PMT> = new Set()

  /**
   * id *активного-элемента
   * @private
   */
  private _activeId: IdAtAsau59PMT | null = null

  activeIdSet(id: IdAtAsau59PMT) {
    this._activeId = id
  }

  activeId(): IdAtAsau59PMT_B {
    return this._activeId
  }

  activeIdReset() {
    this._activeId = null
  }

  /**
   * возвращает TRUE если id (1) соответствует *активному-элементу
   * @param id
   */
  activeIdIs(id: IdAtAsau59PMT): boolean {
    return !!id && this._activeId === id
  }

  /**
   * Возвращает (2) (обычно это имя класса) если id (1) соответствует *активному-элементу, иначе возвращает пустую строку
   * @param id (1) --
   * @param str (2) --
   */
  activeIdIsB(id: IdAtAsau59PMT, str: string): string {
    return this.activeIdIs(id) ? str : ''
  }

  /**
   * Возвращает количество выбранных элементов
   */
  selectElemsCount(): number {
    return this._selectedIds.size
  }

  /**
   * Добавить ids (1) в список выбранных
   * @param ids (1) -- ids элементов
   */
  selectElemsAdd(ids: IdAtAsau59PMT[]) {
    ids
      .filter(id => !!id)
      .forEach((id: IdAtAsau59PMT) => {
        this._selectedIds.add(id)
      })
  }

  /**
   * Удалить из *selList элементы (1)
   * @param ids (1) --
   */
  selectElemsDelete(ids: IdAtAsau59PMT[]) {
    ids
      .filter(el => !!el)
      .forEach(el => {
        this._selectedIds.delete(el)
      })
  }

  /**
   * Возвращает TRUE если элемент (1) есть среди выбранных
   * @param id (1) --
   */
  selectElemIs(id: IdAtAsau59PMT): boolean {
    return this._selectedIds.has(id)
  }

  /**
   * Очищает список выбранных элементов
   */
  selectElemsClear() {
    this._selectedIds.clear()
  }

  /**
   * Возвращает один ID из выбранных. Если ни одного нет, то возвращает null
   */
  selectElemOne(): IdAtAsau59PMT_B {
    if (this.selectElemsCount() > 0) {
      return this._selectedIds.values().next().value
    }
    return null
  }

  /**
   * выбранные идентификаторы
   */
  selectElems(): IdAtAsau59PMT[] {
    return Array.from(this._selectedIds)
  }
}

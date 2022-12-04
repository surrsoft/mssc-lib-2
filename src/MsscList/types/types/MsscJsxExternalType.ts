/**
 * Представление *г-объекта. Сущность этого типа, *компонент предоставляет *клиенту, чтобы он разместил элементы так как ему нужно
 */
export interface MsscJsxExternalType {
  /** главный элемент - непосредственно сам список элементов */
  listJsx?: JSX.Element
  infosJsx?: JSX.Element
  paginator1Jsx?: JSX.Element
  paginator2Jsx?: JSX.Element
  /**
   * Объект с JSX-ами кнопок "Удалить", "Создать", "Сбросить все выделения", "Случайный порядок"
   */
  buttonsJsx?: {
    /**
     * Кнопка "Удалить"
     */
    btnDelete?: JSX.Element,
    /**
     * Кнопка "Создать"
     */
    btnCreate?: JSX.Element,
    /**
     * Кнопка "Сбросить все выделения"
     */
    btnDeselectAll?: JSX.Element,
    /**
     * Кнопка "Случайный порядок"
     */
    btnDice?: JSX.Element,
  }
  sortJsx?: JSX.Element
  searchJsx?: JSX.Element
  multiselectJsxArr?: JSX.Element[]
}

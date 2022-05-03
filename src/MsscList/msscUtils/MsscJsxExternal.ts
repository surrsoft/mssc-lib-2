/**
 * Параметры для *г-билдера
 */
export interface MsscJsxExternal {
  /** главный элемент - непосредственно сам список элементов */
  listJsx?: JSX.Element
  infosJsx?: JSX.Element
  paginator1Jsx?: JSX.Element
  paginator2Jsx?: JSX.Element
  buttonsJsx?: {
    btnDelete?: JSX.Element,
    btnCreate?: JSX.Element,
    btnDeselectAll?: JSX.Element,
    btnDice?: JSX.Element,
  }
  sortJsx?: JSX.Element
  searchJsx?: JSX.Element
  multiselectJsxArr?: JSX.Element[]
}

export declare type IdAtAsau59PMT = string;
export declare type IdAtAsau59PMT_B = string | null;
/**
 * Предназначен для хранения текущего состояния какого-либо списка, например того какмие элементы "выбраны"
 */
export default class ListModelAsau59 {
    /**
     * список id выбранных элементов
     */
    private _selectedIds;
    /**
     * id *активного-элемента
     * @private
     */
    private _activeId;
    activeIdSet(id: IdAtAsau59PMT): void;
    activeId(): IdAtAsau59PMT_B;
    activeIdReset(): void;
    /**
     * возвращает TRUE если id (1) соответствует *активному-элементу
     * @param id
     */
    activeIdIs(id: IdAtAsau59PMT): boolean;
    /**
     * Возвращает (2) (обычно это имя класса) если id (1) соответствует *активному-элементу, иначе возвращает пустую строку
     * @param id (1) --
     * @param str (2) --
     */
    activeIdIsB(id: IdAtAsau59PMT, str: string): string;
    /**
     * Возвращает количество выбранных элементов
     */
    selectElemsCount(): number;
    /**
     * Добавить ids (1) в список выбранных
     * @param ids (1) -- ids элементов
     */
    selectElemsAdd(ids: IdAtAsau59PMT[]): void;
    /**
     * Удалить из *selList элементы (1)
     * @param ids (1) --
     */
    selectElemsDelete(ids: IdAtAsau59PMT[]): void;
    /**
     * Возвращает TRUE если элемент (1) есть среди выбранных
     * @param id (1) --
     */
    selectElemIs(id: IdAtAsau59PMT): boolean;
    /**
     * Очищает список выбранных элементов
     */
    selectElemsClear(): void;
    /**
     * Возвращает один ID из выбранных. Если ни одного нет, то возвращает null
     */
    selectElemOne(): IdAtAsau59PMT_B;
    /**
     * выбранные идентификаторы
     */
    selectElems(): IdAtAsau59PMT[];
}

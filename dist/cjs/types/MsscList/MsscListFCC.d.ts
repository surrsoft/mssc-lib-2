import './msscListStyles.scss';
import { MsscSource } from './msscUtils/MsscSource';
import { BrSelectSortData } from './commonUI/BrSelect/brSelectUtils';
import { MsscColumnName } from './msscUtils/msscUtils';
export interface MsscJsxExternal {
    infosJsx?: JSX.Element;
    paginator1Jsx?: JSX.Element;
    paginator2Jsx?: JSX.Element;
    buttonsJsx?: {
        btnDelete?: JSX.Element;
        btnCreate?: JSX.Element;
        btnDeselectAll?: JSX.Element;
        btnDice?: JSX.Element;
    };
    sortJsx?: JSX.Element;
    listJsx?: JSX.Element;
    searchJsx?: JSX.Element;
    multiselectJsxArr?: JSX.Element[];
}
export declare enum MsscEnMenuAction {
    EDIT = "edit",
    SELECT = "select",
    DELETE = "delete"
}
export declare type MsscElemStruct = {
    isActive?: boolean;
    checkboxJsx?: JSX.Element;
    bodyJsx?: JSX.Element;
    menuJsx?: JSX.Element;
};
interface MsscListProps {
    /**
     *
     */
    source: MsscSource<any> | null;
    sortData?: BrSelectSortData<MsscColumnName>;
    /**
     * *клиент определяет как должны распологаться элементы отдельного элемента списка
     * @param checkboxJsx
     * @param bodyJsx
     * @param menuJsx
     */
    listElemStruct?: ({ checkboxJsx, bodyJsx, menuJsx }: MsscElemStruct) => JSX.Element;
    children?: any;
    tagsFieldNameArr?: MsscMultFields[];
}
/**
 * идентификатор группы тегов
 */
declare type MsscTagsID = string;
export declare type MsscMultFields = {
    id: MsscTagsID;
    fieldName: string;
    visibleName: string;
};
declare const MsscListFCC: ({ source, sortData, children, listElemStruct, tagsFieldNameArr }: MsscListProps) => JSX.Element;
export default MsscListFCC;

import { BrSelectId, BrSelectItem, BrSelectSortData } from './brSelectUtils';
import './brSelect.scss';
export interface BrSelectProps<T> {
    data: BrSelectSortData<T>;
    /**
     * вызывается когда пользователь делает выбор
     * @param selectedId
     */
    cbSelect?: (selected: BrSelectItem<T>) => void;
    /**
     * id выбранного элемента. Если указан, то переопределяет id из 'data`
     */
    selectedId?: BrSelectId | undefined;
}
export default function BrSelect<T>({ data, cbSelect, selectedId }: BrSelectProps<T>): JSX.Element;

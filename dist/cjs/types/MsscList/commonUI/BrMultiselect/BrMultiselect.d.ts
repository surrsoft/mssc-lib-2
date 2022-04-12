import './brMultiselectStyles.scss';
import { RsuvTxChecked } from 'rsuv-lib';
export interface PropsAtAsau73 {
    /**
     *
     */
    datas?: RsuvTxChecked[];
    /**
     * *Т-компонент вызывает это при установке/снятии галки, передавая в (1) список текущих чекнутых элементов
     * (т.е. в состоянии после установки/снятия галки)
     * @param data (1) --
     */
    cbOnChange?: (checkedList: RsuvTxChecked[]) => void;
    /**
     *
     */
    text?: string;
}
export default function BrMultiselect({ datas, cbOnChange, text }: PropsAtAsau73): JSX.Element;

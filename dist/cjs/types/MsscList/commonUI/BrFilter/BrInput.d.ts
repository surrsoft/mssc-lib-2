import './brFilter.scss';
export declare enum BrInputEnIcon {
    SEARCH = "search",
    FILTER = "filter"
}
interface BrInputProps {
    icon?: BrInputEnIcon;
    /**
     * колбэк через который потребитель получает вводимый пользователем текст текст
     * @param value
     */
    cbOnChange?: (value: string) => void;
    /**
     * debounce-задержка вызова {@link cbOnChange}, в милисекундах
     */
    debounceMillisec?: number;
    /**
     * начальное содержимое поля ввода
     */
    initialValue?: string;
    /**
     * если TRUE то input будет автоматически получать фокус
     */
    autoFocus?: boolean;
}
export default function BrInput({ icon, cbOnChange, debounceMillisec, initialValue, autoFocus }: BrInputProps): JSX.Element;
export {};

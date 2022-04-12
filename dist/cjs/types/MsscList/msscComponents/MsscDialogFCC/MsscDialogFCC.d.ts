import './msscDialogStyles.scss';
export declare class MsscDialogProps {
    show: boolean;
    title?: string;
    body?: string;
    /**
     * вызов при отмене
     */
    cbCancel?: () => void;
    /**
     * вызов при ОК
     */
    cbOk?: () => void;
}
export default function MsscDialogFCC({ show, title, body, cbOk, cbCancel }: MsscDialogProps): JSX.Element | null;

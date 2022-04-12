export interface MsscPaginatorProps {
    pageCurrNum?: number;
    pageAllCountNum?: number;
    disabled?: boolean;
    cbChange?: (nextPageNum: number) => void;
}
export default function MsscPaginatorFCC({ pageCurrNum, pageAllCountNum, cbChange, disabled }: MsscPaginatorProps): JSX.Element;

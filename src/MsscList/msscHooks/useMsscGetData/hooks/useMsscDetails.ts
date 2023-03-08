import { useQuery } from "@tanstack/react-query";
import { RsuvPaginationGyth, RsuvTxNumIntAB, RsuvTxNumIntDiap, RsuvTxSort } from "rsuv-lib";

import { rqQueryHandle } from "../../../common/rqQueryHandle";
import { BrSelectIdType, BrSelectSortDataType } from "../../../commonUI/BrSelect/types";
import { hxhgQueryConfigs } from "../../../libs/hxhg-lib/hxhgQueryConfigs";
import { hxhgWaitMin } from "../../../libs/hxhg-lib/hxhgWaitMin";
import { LOG_TAG, msscLogger } from "../../../msscUtils/msscLogger";
import { msscSortsCreate } from "../../../msscUtils/msscSortsCreate";
import { MSSC_SETTINGS } from "../../../settings";
import { MsscSourceType } from "../../../types/MsscSourceType";
import { MsscColumnNameType } from "../../../types/types/MsscColumnNameType";
import { MsscElemType } from "../../../types/types/MsscElemType";
import { MsscFilterType } from "../../../types/types/MsscFilterType";
import { MsscIdObjectType } from "../../../types/types/MsscIdObjectType";

const shuffleUtils = {
  /**
   * Получить ids из (3) начиная с (1) включительно по (2) исключительно
   * @param ixStart (1) -- индекс
   * @param ixEnd (2) -- индекс
   * @param idsShuffled
   */
  elems(ixStart: number, ixEnd: number, idsShuffled: string[]): MsscIdObjectType[] {
    return idsShuffled.slice(ixStart, ixEnd + 1).map((el) => ({ id: el }));
  },
};

interface ReturnDetailsType {
  elemsResult: MsscElemType[];
  /** общее кол-во элементов в хранилище, то есть без учёта каких-либо фильтров */
  twoIsDone: boolean;
  twoIsError: boolean;
}

interface ParamsType {
  source: MsscSourceType<any> | null;
  randomEnabled?: boolean;
  sortIdCurr?: BrSelectIdType;
  pageNumCurrent: number;
  sortData?: BrSelectSortDataType<MsscColumnNameType>;
  countByFilter: number;
  idsShiffled: string[];
  enabled: boolean;
  filters: MsscFilterType[];
}

/**
 * Выполняет *д-получение ([asau206])
 *
 * ID [[230308174626]]
 *
 * @param source
 * @param randomEnabled
 * @param sortIdCurr
 * @param pageNumCurrent
 * @param sortData
 * @param countByFilter
 * @param idsShiffled
 * @param enabled
 * @param filters
 */
export function useMsscDetails({
  source,
  randomEnabled = false,
  sortIdCurr,
  pageNumCurrent,
  sortData,
  countByFilter,
  idsShiffled,
  enabled,
  filters,
}: ParamsType): ReturnDetailsType {
  const twoResult = useQuery(
    ["request-detail", `pageNum=[${pageNumCurrent}]`],
    async ({ queryKey }) => {
      const timeStart = Date.now();
      msscLogger.info(LOG_TAG, `whole request; queryKey [${queryKey.toString()}]`);
      let elemsResult: MsscElemType[] = [];
      // --- pagination - ixStart, ixEnd
      const pagination = new RsuvPaginationGyth(countByFilter, MSSC_SETTINGS.elemsOnPage);
      let pageCurrent = pageNumCurrent;
      if (pageNumCurrent > pagination.pageCount) {
        // если в результате удаления элементов, страниц стало меньше чем было раньше
        pageCurrent = pagination.pageCount;
      }
      const indexes = pagination.indexesByPageNum(pageCurrent);
      const ixStart = indexes.indexStart;
      const ixEnd = indexes.indexLast;
      // сортировка
      const sorts: RsuvTxSort[] = msscSortsCreate(sortData, sortIdCurr);
      if (!randomEnabled) {
        elemsResult =
          (await source?.elems(
            new RsuvTxNumIntDiap(new RsuvTxNumIntAB(ixStart), new RsuvTxNumIntAB(ixEnd)),
            filters,
            sorts
          )) ?? [];
      } else {
        const idObjs = shuffleUtils.elems(ixStart, ixEnd, idsShiffled);
        const elems: Array<MsscElemType | null> = (await source?.elemsById(idObjs)) ?? [];
        elemsResult = elems.filter((el: MsscElemType | null) => el !== null) as MsscElemType[];
      }
      // гарантированная задержка
      await hxhgWaitMin(500, timeStart);
      return elemsResult;
    },
    { enabled, ...hxhgQueryConfigs }
  );
  const { data: elemsResult = [] } = twoResult;
  const { isDone: twoIsDone, isError: twoIsError } = rqQueryHandle(twoResult);

  console.log("!!-!!-!!  twoIsDone {230130212727}\n", twoIsDone); // del+

  return {
    elemsResult,
    twoIsDone,
    twoIsError,
  };
}

import loIsEmpty from 'lodash/isEmpty';
import loShuffle from 'lodash/shuffle';
import React, { useEffect, useState } from "react";
import {
  RsuvEnResultCrudSet,
  RsuvPaginationGyth,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
} from "rsuv-lib";
import { useScrollFix } from "ueur-lib";

import "./msscListStyles.scss";
import { nxxTemp } from "../temp-collection-typing/temp"; // del+
import { SvgIconDice } from "./commonIcons/SvgIcons/SvgIconDice";
import { ColorsCls } from "./commonIcons/SvgIcons/utils/ColorsCls";
import { BrSelectIdType } from "./commonUI/BrSelect/types";
import { BrSpinner } from "./commonUI/BrSpinner/BrSpinner";
import { ListSelectingModelCls } from "./commonUtils/ListSelectingModelCls";
import { ButtonCreateLocal } from "./msscComponents/ButtonCreateLocal";
import { MsscButtonDelete } from "./msscComponents/MsscButtonDelete";
import { MsscButtonDeselectAll } from "./msscComponents/MsscButtonDeselectAll";
import { MsscDialogDelete } from "./msscComponents/MsscDialogDelete";
import { MsscInfos } from "./msscComponents/MsscInfos";
import { MsscList } from "./msscComponents/MsscList/MsscList";
import { MsscListElemPropsBaseType } from "./msscComponents/MsscList/types/MsscListElemPropsBaseType";
import { MsscMultiselect } from "./msscComponents/MsscMultiselect";
import { MsscPaginator } from "./msscComponents/MsscPaginator/MsscPaginator";
import { MsscSearch } from "./msscComponents/MsscSearch";
import { MsscSort } from "./msscComponents/MsscSort";
import { msscElemsCountByFilterAndIf } from "./msscUtils/msscElemsCountByFilterAndIf";
import { msscFiltersCreate } from "./msscUtils/msscFiltersCreate";
import { MsscListAreaHeightCls } from "./msscUtils/MsscListAreaHeightCls";
import { msscSortsCreate } from "./msscUtils/msscSortsCreate";
import { msscTagsCookAndSet } from "./msscUtils/msscTagsCookAndSet";
import { MSSC_SETTINGS } from "./settings";
import { MsscSourceType } from "./types/MsscSourceType";
import { MsscDialogCreateEditCallbacksType } from "./types/types/MsscDialogCreateEditCallbacksType";
import { MsscElemType } from "./types/types/MsscElemType";
import { MsscFilterType } from "./types/types/MsscFilterType";
import { MsscIdObjectType } from "./types/types/MsscIdObjectType";
import { MsscJsxExternalType } from "./types/types/MsscJsxExternalType";
import { MsscListPropsType } from "./types/types/MsscListPropsType";
import { MsscRefreshesType } from "./types/types/MsscRefreshesType";
import { MsscTagGroupElemsPlusType } from "./types/types/MsscTagGroupElemsPlusType";
import { MsscTagGroupElemsType } from "./types/types/MsscTagGroupElemsType";

const scrollTop = 0;

const MsscListFCC = ({
  source,
  sortData,
  children,
  listElemStruct,
  tagsFieldNameArr,
  listAreaHeight = new MsscListAreaHeightCls(),
}: MsscListPropsType): JSX.Element => {
  nxxTemp(); // del+

  // номер текущей страницы (пагинация)
  const [$pageNumCurrent, $pageNumCurrentSet] = useState(1);
  // номер страницы который был перед тем как изменить его на новый
  const [$pageNumBeforChange, $pageNumBeforChangeSet] = useState(1);
  // всего страниц
  const [$pageCountAll, $pageCountAllSet] = useState(0);
  // текущие элементы для отображения
  const [$elems, $elemsSet] = useState<MsscElemType[]>([]);
  // общее количество элементов хранилища (без учёта каких-либо фильтров)
  const [$elemsCountAll, $elemsCountAllSet] = useState(-1);
  // общее количество элементов хранилища по фильтру
  const [$elemsCountByFilter, $elemsCountByFilterSet] = useState(0);
  // сколько отображается элементов сейчас на текущей странице
  const [$elemsCountOnCurrPage, $elemsCountOnCurrPageSet] = useState(0);
  // для показа спиннера при первоначальной загрузке
  const [$isLoadingInitial, $isLoadingInitialSet] = useState(false);
  // для показа спиннера при запросе данных страницы (пагинация страниц)
  const [$isLoadingPage, $isLoadingPageSet] = useState(false);
  // показ спиннера для диалогов
  const [$loadingDialog, $loadingDialogSet] = useState(false);
  // для того чтобы содержимое второго useEffect отрабатывало строго после содержимого первого
  const [$fdone, $fdoneSet] = useState(false);
  // для инициации полного перезапроса данных, например после удаления/добавления элемента(ов)
  const [$needUpdate1, $needUpdate1Set] = useState(false);
  // для инициации запроса данных при нажатии изменения страницы в пагинации
  const [$needUpdate2, $needUpdate2Set] = useState(false);
  // для показа ошибки запроса данных
  const [$isError, $isErrorSet] = useState(false);
  // --- диалоги
  const [$isDialogDeleteShowed, $isDialogDeleteShowedSet] = useState(false);
  const [$dialogTitle, $dialogTitleSet] = useState("");
  const [$dialogBody, $dialogBodySet] = useState("");
  const [$dialogCreateEditJsx, $dialogCreateEditJsxSet] =
    useState<JSX.Element | null>(null);
  const [$isDialogCreateEditShowed, $isDialogCreateEditShowedSet] =
    useState(false);
  // ---
  const [$listModel] = useState(() => {
    return new ListSelectingModelCls();
  });
  const [$refresh, $refreshSet] = useState(false);
  // ---
  // id выбранной в настоящее время сортировки
  const [$sortIdCurr, $sortIdCurrSet] = useState<BrSelectIdType | undefined>(
    sortData?.selectedId
  );
  // текст введённый в поле поиска
  const [$searchText, $searchTextSet] = useState("");
  const [$randomEnabled, $randomEnabledSet] = useState(false);
  // ids элементов в случайном порядке
  const [$idsShuffled, $idsShuffledSet] = useState<string[]>([]);
  // --- теги (мультивыбор)
  // все *группы-тегов
  const [$tagGroupArr, $tagGroupArrSet] = useState<MsscTagGroupElemsPlusType[]>(
    []
  );
  // информация о выбранных-тегах каждой *т-группы
  const [$tagGroupSelectedArr, $tagGroupSelectedArrSet] = useState<
    MsscTagGroupElemsType[]
  >([]);

  // ---
  const scrollFixFn = useScrollFix($isDialogCreateEditShowed);

  const shuffleUtils = {
    /**
     * Получить ids из {@link $idsShuffled} начиная с (1) включительно по (2) исключительно
     * @param ixStart (1) -- индекс
     * @param ixEnd (2) -- индекс
     */
    elems(ixStart: number, ixEnd: number): MsscIdObjectType[] {
      return $idsShuffled.slice(ixStart, ixEnd + 1).map((el) => ({ id: el }));
    },
  };

  const fnError = (): void => {
    $isErrorSet(true);
    setTimeout(() => {
      $isErrorSet(false);
    }, 2000);
  };

  /**
   * получение всех основных данных
   * @param sourcePrm
   */
  const requestFirst = async (sourcePrm: MsscSourceType<any>): Promise<any> => {
    try {
      // --- получаем общее кол-во элементов без учета фильтра
      $elemsCountAllSet(-1);
      sourcePrm
        ?.elemsCountByFilter([])
        .then((result: RsuvTxNumIntAB) => {
          $elemsCountAllSet(result.val);
        })
        .catch((err) => {
          console.log("!!-!!-!! err {220130133850}\n", err);
          fnError();
        });
      // --- готовка фильтров
      $isLoadingInitialSet(true);
      const filters: MsscFilterType[] = msscFiltersCreate({
        source: sourcePrm,
        tagGroupSelectedArr: $tagGroupSelectedArr,
        searchText: $searchText,
        isTagsExist: loIsEmpty(tagsFieldNameArr),
      });
      // --- получение общего количества элементов с учетом фильтров; в random-режиме также получаем список всех ids
      const { elemsCountByFilter, ids } = await msscElemsCountByFilterAndIf({
        source: sourcePrm,
        filters,
        randomEnabled: $randomEnabled,
        sortData,
        sortIdCurr: $sortIdCurr,
      });
      if ($randomEnabled) {
        const idsShuffled = loShuffle(ids);
        $idsShuffledSet(idsShuffled);
      }
      // --- получение тегов и передача их в стейт через $tagGroupArrSet
      await msscTagsCookAndSet({
        source: sourcePrm,
        filters,
        $selectedTags: $tagGroupSelectedArr,
        tgroups: tagsFieldNameArr,
        $selectedTagsSet: $tagGroupArrSet,
      });
      // --- pagination
      const pagination = new RsuvPaginationGyth(
        elemsCountByFilter,
        MSSC_SETTINGS.elemsOnPage
      );
      // ---
      $pageCountAllSet(pagination.pageCount);
      $elemsCountByFilterSet(elemsCountByFilter);
    } catch (err) {
      console.log("!!-!!-!! err {220119120755}\n", err);
      fnError();
    } finally {
      $isLoadingInitialSet(false);
    }
  };

  /**
   * получение данных конкретной страницы
   * @param source
   */
  const requestTwo = async (source: MsscSourceType<any>): Promise<any> => {
    try {
      $isLoadingPageSet(true);
      // await fnWait(3000)
      // --- pagination - ixStart, ixEnd
      const pagination = new RsuvPaginationGyth(
        $elemsCountByFilter,
        MSSC_SETTINGS.elemsOnPage
      );
      if ($pageNumCurrent > pagination.pageCount) {
        // если в результате удаления элементов, страниц стало меньше чем было раньше
        $pageNumCurrentSet(pagination.pageCount);
      }
      const indexes = pagination.indexesByPageNum($pageNumCurrent);
      const ixStart = indexes.indexStart;
      const ixEnd = indexes.indexLast;
      // --- --- получение элементов из source
      // --- сортировка
      const sorts: RsuvTxSort[] = msscSortsCreate(sortData, $sortIdCurr);
      // --- filters
      const filter0 = msscFiltersCreate({
        source,
        tagGroupSelectedArr: $tagGroupSelectedArr,
        searchText: $searchText,
        isTagsExist: loIsEmpty(tagsFieldNameArr),
      });
      // ---
      let elemsResult: MsscElemType[];
      if (!$randomEnabled) {
        elemsResult = await source.elems(
          new RsuvTxNumIntDiap(
            new RsuvTxNumIntAB(ixStart),
            new RsuvTxNumIntAB(ixEnd)
          ),
          filter0,
          sorts
        );
      } else {
        const idObjs = shuffleUtils.elems(ixStart, ixEnd);
        const res: any = await source?.elemsById(idObjs);
        elemsResult = res?.filter(
          (el: MsscElemType | null) => el !== null
        ) as MsscElemType[];
      }
      // --- ---
      $elemsCountOnCurrPageSet(elemsResult.length);
      // ---
      $elemsSet(elemsResult);
    } catch (err) {
      console.log("!!-!!-!! err {220119120754}\n", err);
      // возвращаем старый номер страницы
      $pageNumCurrentSet($pageNumBeforChange);
      fnError();
    } finally {
      $isLoadingPageSet(false);
    }
  };

  // --- useEffect() 1

  useEffect(() => {
    $fdoneSet(false);
    if (source !== null) {
      (async () => {
        await requestFirst(source);
        $fdoneSet(true);
      })();
    }
  }, [$needUpdate1]);

  // --- useEffect() 2

  useEffect(() => {
    if (source !== null && $fdone) {
      (async () => {
        await requestTwo(source);
      })();
    }
  }, [$fdone, $needUpdate2]);

  // ---

  const refreshes: MsscRefreshesType = {
    pageDataRefresh: () => {
      $needUpdate2Set(!$needUpdate2);
    },
    /**
     * Выполнение полного перезапроса всех данных
     *
     * СМ, ТАКЖЕ {@link refresh}
     */
    whole: () => {
      $needUpdate1Set(!$needUpdate1);
    },
    /**
     * Перезапрос данных страницы только.
     *
     * СМ. ТАКЖЕ {@link refreshes#whole}
     */
    refreshPage: () => {
      $refreshSet(!$refresh);
    },
  };

  const handleDialogDeleteShow = (): void => {
    $dialogTitleSet("удаление");
    $dialogBodySet(`удалить элемент(ы) ? ${$listModel.selectElemsCount()} шт.`);
    $isDialogDeleteShowedSet(true);
  };

  const dialogCreateEditCallbacks: MsscDialogCreateEditCallbacksType = {
    /**
     * [[220128213044]]
     * Будет вызыван при нажатии ОК в диалоге создания/редактировании элемента. Если у (1) не пустое (truthy) поле `id` то
     * значит нужно обновить элемент, иначе - создать элемент
     * @param model
     */
    ok: async (model: any) => {
      let success = false;
      try {
        $loadingDialogSet(true);
        if (!model?.id) {
          // ^ создание нового элемента
          const result = await source?.elemsAdd([model]);
          if (result && result.length === 1 && result[0].id) {
            success = true;
            $listModel.activeIdSet(result[0].id);
            $searchTextSet("");
          }
        } else {
          // ^ обновление элемента
          const result = await source?.elemsSet([model]);
          if (result && result.length === 1) {
            const rr = result[0];
            if (rr.success) {
              const enCrudResult: RsuvEnResultCrudSet | undefined = rr.value;
              if (!enCrudResult) {
                console.error("[[220129123729]]");
                return;
              }
              if (enCrudResult === RsuvEnResultCrudSet.ERROR) {
                console.error("[[220129123837]]");
                return;
              }
              success = true;
            } else {
              console.error("[[220129123902]]");
              return;
            }
          } else {
            console.error("[[220129123916]]");
            return;
          }
        }
      } catch (err) {
        console.log("!!-!!-!! err {220126221404}\n", err);
      } finally {
        $loadingDialogSet(false);
        scrollFixFn(false);
        if (success) {
          $isDialogCreateEditShowedSet(false);
          refreshes.whole();
        } else {
          fnError();
        }
      }
    },
    /**
     * для вызова при нажатии Cancel в диалоге создания/редатирования нового элемента
     */
    cancel: async () => {
      $isDialogCreateEditShowedSet(false);
      scrollFixFn(false);
    },
  };

  function ButtonDiceLocalFCC() {
    const fnColorsForRandom = () => {
      if (!$randomEnabled) {
        return new ColorsCls();
      }
      return new ColorsCls().buNormal("#71fc22").buHover("#71fc22");
    };

    /**
     * [[220130202338]]
     */
    function diceHandler() {
      $randomEnabledSet(!$randomEnabled);
      refreshes.whole();
    }

    // [[220130202258]] random button
    return (
      <button onClick={diceHandler} title="random">
        <SvgIconDice
          svgProps={{ width: "20px", height: "20px" }}
          colors={fnColorsForRandom()}
        />
      </button>
    );
  }

  const paginatorJsx = (
    <MsscPaginator
      refreshes={refreshes}
      $loadingPage={$isLoadingPage}
      $pageNumBeforChangeSet={$pageNumBeforChangeSet}
      $pageCountAll={$pageCountAll}
      $pageNumCurrent={$pageNumCurrent}
      $pageNumCurrentSet={$pageNumCurrentSet}
    />
  );

  const mainListObj: MsscListElemPropsBaseType = {
    listModel: $listModel,
    dialogDeleteShow: handleDialogDeleteShow,
    elems: $elems,
    dialogCreateEditJsxSet: $dialogCreateEditJsxSet,
    dialogCreateOrEdit: source?.dialogCreateOrEdit,
    dialogCreateEditCallbacks,
    refreshes,
    listElemStruct,
    isDialogCreateEditShowedSet: $isDialogCreateEditShowedSet,
  };

  const childrenBlock: MsscJsxExternalType = {
    infosJsx: (
      <MsscInfos
        $elemsCountByFilter={$elemsCountByFilter}
        $elemsCountOnCurrPage={$elemsCountOnCurrPage}
        elemsAll={$elemsCountAll === -1 ? "-" : `${$elemsCountAll}`}
        elemsCountSelected={$listModel.selectElemsCount()}
      />
    ),
    paginator1Jsx: paginatorJsx,
    paginator2Jsx: paginatorJsx,
    buttonsJsx: {
      btnDelete: (
        <MsscButtonDelete
          listModel={$listModel}
          dialogDeleteShow={handleDialogDeleteShow}
          iconsConf={MSSC_SETTINGS.iconsConf}
        />
      ),
      btnCreate: (
        <ButtonCreateLocal
          sourceDialogCreateOrEdit={source?.dialogCreateOrEdit}
          dialogCreateEditCallbacks={dialogCreateEditCallbacks}
          $dialogCreateEditJsxSet={$dialogCreateEditJsxSet}
          $isDialogCreateEditShowedSet={$isDialogCreateEditShowedSet}
        />
      ),
      btnDeselectAll: (
        <MsscButtonDeselectAll
          listModel={$listModel}
          refreshes={refreshes}
          iconsConf={MSSC_SETTINGS.iconsConf}
        />
      ),
      btnDice: <ButtonDiceLocalFCC />,
    },
    sortJsx: (
      <MsscSort
        sortData={sortData}
        sortIdCurr={$sortIdCurr}
        sortIdCurrSet={$sortIdCurrSet}
        refreshes={refreshes}
      />
    ),
    searchJsx: (
      <MsscSearch
        searchText={$searchText}
        searchTextSet={$searchTextSet}
        refreshes={refreshes}
      />
    ),
    listJsx: (
      <MsscList
        scrollTop={scrollTop}
        listAreaHeight={listAreaHeight}
        $isLoadingPage={$isLoadingPage}
        mainList={mainListObj}
      />
    ),
    multiselectJsxArr: tagsFieldNameArr?.map((elTagGroup) => (
      <MsscMultiselect
        key={elTagGroup.id}
        tagsGroupId={elTagGroup.id}
        $tagGroupSelectedArr={$tagGroupSelectedArr}
        $tagGroupSelectedArrSet={$tagGroupSelectedArrSet}
        $tagGroupArr={$tagGroupArr}
        refreshes={refreshes}
      />
    )),
  };

  // ---
  return (
    <div className="mssc-base">
      {$isError ? <div className="mssc-base__error">ошибка</div> : null}
      {source ? "" : <div>MsscListFCC-info: source is empty</div>}
      {!$isLoadingInitial && children?.(childrenBlock)}
      {/* // --- dialog delete */}
      <MsscDialogDelete
        listModel={$listModel}
        refreshes={refreshes}
        elemsDelete={source?.elemsDelete}
        dialogBody={$dialogBody}
        isDialogDeleteShowed={$isDialogDeleteShowed}
        isDialogDeleteShowedSet={$isDialogDeleteShowedSet}
        dialogTitle={$dialogTitle}
        scrollFixFn={scrollFixFn}
        loadingDialogSet={$loadingDialogSet}
        fnError={fnError}
      />
      {/* // --- dialog create/edit */}
      {$isDialogCreateEditShowed && $dialogCreateEditJsx}
      {/* // --- spinner */}
      <BrSpinner show={$isLoadingInitial || $loadingDialog} />
    </div>
  );
};

export default MsscListFCC;

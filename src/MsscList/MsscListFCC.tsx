import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import { RsuvEnResultCrudSet, RsuvPaginationGyth, RsuvTxNumIntAB, RsuvTxNumIntDiap, RsuvTxSort, } from 'rsuv-lib';
import { useScrollFix } from 'ueur-lib';

import './msscListStyles.scss';

import SvgIconPlus from './commonIcons/SvgIcons/SvgIconPlus';
import { MsscSourceType } from './types/MsscSourceType';
import { ColorsCls } from './commonIcons/SvgIcons/utils/ColorsCls';
import SvgIconDice from './commonIcons/SvgIcons/SvgIconDice';
import BrSpinner from './commonUI/BrSpinner/BrSpinner';
import { BrSelectIdType } from './commonUI/BrSelect/types';
import { filtersCreate } from './msscUtils/filtersCreate';
import { elemsCountByFilterAndIf } from './msscUtils/elemsCountByFilterAndIf';
import { tagsCookAndSet } from './msscUtils/tagsCookAndSet';
import { sortsCreate } from './msscUtils/sortsCreate';
import { MsscFilterType } from './types/types/MsscFilterType';
import { MsscElemType } from './types/types/MsscElemType';
import { MsscListAreaHeightModeEnum } from './types/enums/MsscListAreaHeightModeEnum';
import { MsscJsxExternalType } from './types/types/MsscJsxExternalType';
import { MsscListPropsType } from './types/types/MsscListPropsType';
import { MsscTagGroupType } from './types/types/MsscTagGroupType';
import { MsscTagGroupSelectedType } from './types/types/MsscTagGroupSelectedType';
import { MsscIdObjectType } from './types/types/MsscIdObjectType';
import { MsscListAreaHeightCls } from './msscUtils/MsscListAreaHeightCls';
import { MsscSort } from './msscComponents/MsscSort';
import { MsscRefreshesType } from './types/types/MsscRefreshesType';
import { ListSelectingModelCls } from './commonUtils/ListSelectingModelCls';
import { MsscListElem } from './msscComponents/ListElem/MsscListElem';
import { MsscDialogDelete } from './msscComponents/MsscDialogDelete';
import { MsscButtonDelete } from './msscComponents/MsscButtonDelete';
import { MsscIconsConfType } from './types/types/MsscIconsConfType';
import { MsscInfos } from './msscComponents/MsscInfos';
import { MsscButtonDeselectAll } from './msscComponents/MsscButtonDeselectAll';
import { MsscMultiselect } from './msscComponents/MsscMultiselect';
import { MsscPaginator } from './msscComponents/MsscPaginator';
import { MsscSearch } from './msscComponents/MsscSearch';

let scrollTop = 0;

const MsscListFCC = ({
                       source,
                       sortData,
                       children,
                       listElemStruct,
                       tagsFieldNameArr,
                       listAreaHeight = new MsscListAreaHeightCls()
                     }: MsscListPropsType
): JSX.Element => {
  const configSTA = {
    // записей на странице
    elemsOnPage: 10
  }

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
  const [$dialogTitle, $dialogTitleSet] = useState('');
  const [$dialogBody, $dialogBodySet] = useState('');
  const [$dialogCreateEditJsx, $dialogCreateEditJsxSet] = useState<JSX.Element | null>(null);
  const [$isDialogCreateEditShowed, $isDialogCreateEditShowedSet] = useState(false);
  // ---
  const [$listModel] = useState(() => {
    return new ListSelectingModelCls()
  });
  const [$refresh, $refreshSet] = useState(false);
  // ---
  // id выбранной в настоящее время сортировки
  const [$sortIdCurr, $sortIdCurrSet] = useState<BrSelectIdType | undefined>(sortData?.selectedId);
  const [$searchText, $searchTextSet] = useState('');
  const [$randomEnabled, $randomEnabledSet] = useState(false);
  // ids элементов в случайном порядке
  const [$idsShuffled, $idsShuffledSet] = useState<string[]>([]);
  // --- теги (мультивыбор)
  // все *группы-тегов
  const [$tagGroupArr, $tagGroupArrSet] = useState<MsscTagGroupType[]>([]);
  // *группы-тегов только с выбранными тегами (отмеченными галками)
  const [$tagGroupSelectedArr, $tagGroupSelectedArrSet] = useState<MsscTagGroupSelectedType[]>([]);

  // ---
  const scrollFixFn = useScrollFix($isDialogCreateEditShowed)

  const shuffleUtils = {
    /**
     * Получить ids из {@link $idsShuffled} начиная с (1) включительно по (2) исключительно
     * @param ixStart (1) -- индекс
     * @param ixEnd (2) -- индекс
     */
    elems(ixStart: number, ixEnd: number): MsscIdObjectType[] {
      return $idsShuffled.slice(ixStart, ixEnd + 1).map((el) => ({ id: el }))
    },
  }

  const fnError = (): void => {
    $isErrorSet(true)
    setTimeout(() => {
      $isErrorSet(false)
    }, 2000);
  }

  /**
   * получение всех основных данных
   * @param sourcePrm
   */
  const requestFirst = async (sourcePrm: MsscSourceType<any>): Promise<any> => {
    try {
      // --- общее кол-во элементов без учета фильтра
      $elemsCountAllSet(-1)
      sourcePrm?.elemsCountByFilter([]).then((result: RsuvTxNumIntAB) => {
        $elemsCountAllSet(result.val);
      }).catch((err) => {
        console.log('!!-!!-!! err {220130133850}\n', err);
      })
      // --- готовка фильтров
      $isLoadingInitialSet(true);
      const filters: MsscFilterType[] = filtersCreate(
        {
          source: sourcePrm,
          tagGroupSelectedArr: $tagGroupSelectedArr,
          searchText: $searchText,
          tagsFieldNameArr
        }
      );
      // --- получение общего количества элементов с учетом фильтров; в random-режиме также получаем список всех ids
      const { elemsCountByFilter, ids } = await elemsCountByFilterAndIf({
        source: sourcePrm,
        filters,
        randomEnabled: $randomEnabled,
        sortData,
        sortIdCurr: $sortIdCurr
      });
      if ($randomEnabled) {
        const idsShuffled = _.shuffle(ids)
        $idsShuffledSet(idsShuffled)
      }
      // --- получение тегов
      await tagsCookAndSet({
        source: sourcePrm,
        filters,
        tagGroupSelectedArr: $tagGroupSelectedArr,
        tagsFieldNameArr,
        $tagGroupArrSet
      })
      // --- pagination - pageCountAll
      const pagination = new RsuvPaginationGyth(elemsCountByFilter, configSTA.elemsOnPage)
      // ---
      $pageCountAllSet(pagination.pageCount)
      $elemsCountByFilterSet(elemsCountByFilter)
    } catch (err) {
      console.log('!!-!!-!! err {220119120755}\n', err)
      fnError()
    } finally {
      $isLoadingInitialSet(false)
    }
  };

  /**
   * получение данных конкретной страницы
   * @param source
   */
  const requestTwo = async (source: MsscSourceType<any>): Promise<any> => {
    try {
      $isLoadingPageSet(true)
      // await fnWait(3000)
      // --- pagination - ixStart, ixEnd
      const pagination = new RsuvPaginationGyth($elemsCountByFilter, configSTA.elemsOnPage)
      if ($pageNumCurrent > pagination.pageCount) {
        // если в результате удаления элементов, страниц стало меньше чем было раньше
        $pageNumCurrentSet(pagination.pageCount)
      }
      const indexes = pagination.indexesByPageNum($pageNumCurrent)
      const ixStart = indexes.indexStart
      const ixEnd = indexes.indexLast
      // --- --- получение элементов из source
      // --- сортировка
      const sorts: RsuvTxSort[] = sortsCreate(sortData, $sortIdCurr);
      // --- filters
      const filter0 = filtersCreate({
        source,
        tagGroupSelectedArr: $tagGroupSelectedArr,
        searchText: $searchText,
        tagsFieldNameArr
      });
      // ---
      let elemsResult: MsscElemType[]
      if (!$randomEnabled) {
        elemsResult = await source.elems(
          new RsuvTxNumIntDiap(new RsuvTxNumIntAB(ixStart), new RsuvTxNumIntAB(ixEnd)),
          filter0,
          sorts
        )
      } else {
        const idObjs = shuffleUtils.elems(ixStart, ixEnd)
        elemsResult = (
          (await source?.elemsById(idObjs))
            .filter((el: MsscElemType | null) => (el !== null)) as MsscElemType[]
        )
      }
      // --- ---
      $elemsCountOnCurrPageSet(elemsResult.length)
      // ---
      $elemsSet(elemsResult)
    } catch (err) {
      console.log('!!-!!-!! err {220119120754}\n', err)
      // возвращаем старый номер страницы
      $pageNumCurrentSet($pageNumBeforChange)
      fnError()
    } finally {
      $isLoadingPageSet(false)
    }
  }

  // --- useEffect() 1

  useEffect(() => {
    $fdoneSet(false)
    if (source !== null) {
      (async () => {
        await requestFirst(source)
        $fdoneSet(true)
      })()
    }
  }, [$needUpdate1]);

  // --- useEffect() 2

  useEffect(() => {
    if (source !== null && $fdone) {
      (async () => {
        await requestTwo(source)
      })();
    }
  }, [$fdone, $needUpdate2]);

  // ---

  const refreshes: MsscRefreshesType = {
    pageDataRefresh: () => {
      $needUpdate2Set(!$needUpdate2)
    },
    /**
     * Выполнение полного перезапроса всех данных
     *
     * СМ, ТАКЖЕ {@link refresh}
     */
    whole: () => {
      $needUpdate1Set(!$needUpdate1)
    },
    /**
     * Перезапрос данных страницы только.
     *
     * СМ. ТАКЖЕ {@link refreshes#whole}
     */
    refreshPage: () => {
      $refreshSet(!$refresh)
    }
  }

  const dialogDeleteShow = (): void => {
    $dialogTitleSet('удаление')
    $dialogBodySet(`удалить элемент(ы) ? ${$listModel.selectElemsCount()} шт.`)
    $isDialogDeleteShowedSet(true)
  }

  const dialogCreateEditCallbacks = {
    /**
     * [[220128213044]]
     * Будет вызыван при нажатии ОК в диалоге создания/редактировании элемента. Если у (1) не пустое (truthy) поле `id` то
     * значит нужно обновить элемент, иначе - создать элемент
     * @param model
     */
    ok: async (model: any) => {
      let success = false;
      try {
        $loadingDialogSet(true)
        if (!model?.id) {
          // ^ создание нового элемента
          const result = await source?.elemsAdd([model])
          if (result && result.length === 1 && result[0].id) {
            success = true;
            $listModel.activeIdSet(result[0].id)
            $searchTextSet('')
          }
        } else {
          // ^ обновление элемента
          const result = await source?.elemsSet([model])
          if (result && result.length === 1) {
            const rr = result[0];
            if (rr.success) {
              const enCrudResult: RsuvEnResultCrudSet | undefined = rr.value
              if (!enCrudResult) throw new Error('[[220129123729]]')
              if (enCrudResult === RsuvEnResultCrudSet.ERROR) throw new Error('[[220129123837]]')
              success = true;
            } else {
              throw new Error('[[220129123902]]')
            }
          } else {
            throw new Error('[[220129123916]]')
          }
        }
      } catch (err) {
        console.log('!!-!!-!! err {220126221404}\n', err)
      } finally {
        $loadingDialogSet(false)
        scrollFixFn(false)
        if (success) {
          $isDialogCreateEditShowedSet(false)
          refreshes.whole()
        } else {
          fnError()
        }
      }
    },
    /**
     * для вызова при нажатии Cancel в диалоге создания/редатирования нового элемента
     */
    cancel: async () => {
      $isDialogCreateEditShowedSet(false)
      scrollFixFn(false)
    }
  }

  const iconsConf: MsscIconsConfType = {
    svgProps: { width: '20px', height: '20px' },
    colors: new ColorsCls().buNormal('#474747')
  }

  function ButtonCreateLocalFCC() {
    const createHandler = async () => {
      const jsxCreate = await source?.dialogCreateOrEdit(dialogCreateEditCallbacks.ok, dialogCreateEditCallbacks.cancel)
      $dialogCreateEditJsxSet(jsxCreate ?? null)
      if (jsxCreate) {
        $isDialogCreateEditShowedSet(true)
      }
    }
    return (
      <button title="создать новый элемент" onClick={createHandler}>
        <SvgIconPlus {...iconsConf}/>
      </button>
    )
  }

  function ButtonDiceLocalFCC() {
    const fnColorsForRandom = () => {
      if (!$randomEnabled) {
        return new ColorsCls()
      }
      return new ColorsCls().buNormal('#71fc22').buHover('#71fc22')
    }

    /**
     * [[220130202338]]
     */
    function diceHandler() {
      $randomEnabledSet(!$randomEnabled)
      refreshes.whole()
    }

    // [[220130202258]] random button
    return (
      <button onClick={diceHandler} title="random">
        <SvgIconDice svgProps={{ width: '20px', height: '20px' }} colors={fnColorsForRandom()}/>
      </button>
    )
  }

  function ListLocalFCC() {
    const refDivScroll = useRef(null)

    function onScrollHandler(ev: any) {
      scrollTop = ev?.target?.scrollTop
    }

    useEffect(() => {
      const node: any = refDivScroll.current
      node.scrollTo(0, scrollTop)
    });

    const listAreaHeightCssObj = useMemo(() => {
      if (listAreaHeight?.mode === MsscListAreaHeightModeEnum.FIXED) {
        return { height: listAreaHeight.value }
      } else if (listAreaHeight.mode === MsscListAreaHeightModeEnum.STICKY_DOWN) {
        return { height: `calc(100vh - ${listAreaHeight.value}px)` }
      }
    }, [listAreaHeight, listAreaHeight?.mode, listAreaHeight?.value]) as CSSProperties || {}

    return (
      <div
        ref={refDivScroll}
        className="mssc-list-block"
        style={Object.assign({}, { position: 'relative' }, listAreaHeightCssObj)}
        onScroll={onScrollHandler}
      >
        <BrSpinner show={$isLoadingPage} fullscreen={false}/>
        {
          $elems.map((elObj: MsscElemType) => {
            return (<MsscListElem
              key={elObj.id.val}
              dialogCreateOrEdit={source?.dialogCreateOrEdit}
              elem={elObj}
              elems={$elems}
              listModel={$listModel}
              refreshes={refreshes}
              listElemStruct={listElemStruct}
              dialogCreateEditCallbacks={dialogCreateEditCallbacks}
              dialogCreateEditJsxSet={$dialogCreateEditJsxSet}
              isDialogCreateEditShowedSet={$isDialogCreateEditShowedSet}
              dialogDeleteShow={dialogDeleteShow}
            />)
          })
        }
      </div>
    )
  }

  const paginatorJsx = <MsscPaginator
    refreshes={refreshes}
    $loadingPage={$isLoadingPage}
    $pageNumBeforChangeSet={$pageNumBeforChangeSet}
    $pageCountAll={$pageCountAll}
    $pageNumCurrent={$pageNumCurrent}
    $pageNumCurrentSet={$pageNumCurrentSet}
  />

  const childrenBlock: MsscJsxExternalType = {
    infosJsx: <MsscInfos
      $elemsCountByFilter={$elemsCountByFilter}
      $elemsCountOnCurrPage={$elemsCountOnCurrPage}
      elemsAll={$elemsCountAll === -1 ? '-' : (`${$elemsCountAll}`)}
      elemsCountSelected={$listModel.selectElemsCount()}
    />,
    paginator1Jsx: paginatorJsx,
    paginator2Jsx: paginatorJsx,
    buttonsJsx: {
      btnDelete: <MsscButtonDelete
        listModel={$listModel}
        dialogDeleteShow={dialogDeleteShow}
        iconsConf={iconsConf}
      />,
      btnCreate: <ButtonCreateLocalFCC/>,
      btnDeselectAll: <MsscButtonDeselectAll
        listModel={$listModel}
        refreshes={refreshes}
        iconsConf={iconsConf}
      />,
      btnDice: <ButtonDiceLocalFCC/>
    },
    sortJsx: <MsscSort
      sortData={sortData}
      sortIdCurr={$sortIdCurr}
      sortIdCurrSet={$sortIdCurrSet}
      refreshes={refreshes}
    />,
    searchJsx: <MsscSearch searchText={$searchText} searchTextSet={$searchTextSet} refreshes={refreshes}/>,
    listJsx: <ListLocalFCC/>,
    multiselectJsxArr: tagsFieldNameArr?.map(el => (<MsscMultiselect
      key={el.id}
      tagsGroupId={el.id}
      $tagGroupSelectedArr={$tagGroupSelectedArr}
      $tagGroupSelectedArrSet={$tagGroupSelectedArrSet}
      $tagGroupArr={$tagGroupArr}
      refreshes={refreshes}
    />))
  }

  // --- === ---
  return (
    <div className="mssc-base">
      {$isError ? <div className="mssc-base__error">ошибка</div> : null}

      {source ? '' : (<div>MsscListFCC-info: source is empty</div>)}

      {
        !$isLoadingInitial && children?.(childrenBlock)
      }

      {/* ^^dialog delete^^ */}
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
      {/* ^^dialog create/edit ^^ */}
      {$isDialogCreateEditShowed && $dialogCreateEditJsx}
      {/* spinner */}
      <BrSpinner show={$isLoadingInitial || $loadingDialog}/>
    </div>
  )
}

export default MsscListFCC;

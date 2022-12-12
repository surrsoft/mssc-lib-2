import React, { CSSProperties, useEffect, useMemo, useRef } from "react";

import { BrSpinner } from "../../commonUI/BrSpinner/BrSpinner";
import { MsscListAreaHeightCls } from "../../msscUtils/MsscListAreaHeightCls";
import { MsscListAreaHeightModeEnum } from "../../types/enums/MsscListAreaHeightModeEnum";
import { VanxElemType } from "../../vanx/types/VanxElemType";
import { MsscListElem } from "./components/MsscListElem/MsscListElem";
import { MsscListElemPropsBaseType } from "./types/MsscListElemPropsBaseType";

export interface PropsType {
  scrollTop: number;
  listAreaHeight?: MsscListAreaHeightCls;
  $isLoadingPage: boolean;
  mainList: MsscListElemPropsBaseType;
}

export function MsscList({
  scrollTop,
  listAreaHeight,
  $isLoadingPage,
  mainList,
}: PropsType) {
  const refDivScroll = useRef(null);

  function onScrollHandler(ev: any) {
    scrollTop = ev?.target?.scrollTop;
  }

  useEffect(() => {
    const node: any = refDivScroll.current;
    node.scrollTo(0, scrollTop);
  });

  const listAreaHeightCssObj =
    (useMemo(() => {
      if (listAreaHeight?.mode === MsscListAreaHeightModeEnum.FIXED) {
        return { height: listAreaHeight.value };
      } else if (
        listAreaHeight?.mode === MsscListAreaHeightModeEnum.STICKY_DOWN
      ) {
        return { height: `calc(100vh - ${listAreaHeight.value}px)` };
      }
    }, [
      listAreaHeight,
      listAreaHeight?.mode,
      listAreaHeight?.value,
    ]) as CSSProperties) || {};

  return (
    <div
      ref={refDivScroll}
      className="mssc-list-block"
      style={Object.assign({}, { position: "relative" }, listAreaHeightCssObj)}
      onScroll={onScrollHandler}
    >
      <BrSpinner show={$isLoadingPage} fullscreen={false} />
      {mainList.elems.map((elObj: VanxElemType) => {
        return (
          <MsscListElem
            key={elObj.id.val}
            dialogCreateOrEdit={mainList.dialogCreateOrEdit}
            elem={elObj}
            elems={mainList.elems}
            listModel={mainList.listModel}
            refreshes={mainList.refreshes}
            listElemStruct={mainList.listElemStruct}
            dialogCreateEditCallbacks={mainList.dialogCreateEditCallbacks}
            dialogCreateEditJsxSet={mainList.dialogCreateEditJsxSet}
            isDialogCreateEditShowedSet={mainList.isDialogCreateEditShowedSet}
            dialogDeleteShow={mainList.dialogDeleteShow}
          />
        );
      })}
    </div>
  );
}

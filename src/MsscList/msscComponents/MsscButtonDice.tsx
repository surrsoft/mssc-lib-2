import React, { Dispatch, SetStateAction } from 'react';

import { SvgIconDice } from '../commonIcons/SvgIcons/SvgIconDice';
import { ColorsCls } from '../commonIcons/SvgIcons/utils/ColorsCls';
import { MsscRefreshesType } from '../types/types/MsscRefreshesType';

interface Props {
  randomEnabled: boolean
  randomEnabledSet: Dispatch<SetStateAction<boolean>>
  refreshes: MsscRefreshesType
}

export function MsscButtonDice({ randomEnabled, randomEnabledSet, refreshes }: Props) {
  const fnColorsForRandom = () => {
    if (!randomEnabled) {
      return new ColorsCls();
    }
    return new ColorsCls().buNormal("#71fc22").buHover("#71fc22");
  };

  /**
   * [[220130202338]]
   */
  function diceHandler() {
    randomEnabledSet(!randomEnabled);
    refreshes.whole();
  }

  // [[220130202258]] random button
  return (
    <button onClick={diceHandler} title="random">
      <SvgIconDice svgProps={{ width: "20px", height: "20px" }} colors={fnColorsForRandom()}/>
    </button>
  );
}

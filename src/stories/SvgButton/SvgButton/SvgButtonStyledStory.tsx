import React, { useState } from 'react';
import styled from 'styled-components';

import { SvgButtonBaseStyledR1 } from '../../../MsscList/common/components/SvgButtonBaseStyledR1';
import { ButtonColorsTypeR1 } from '../../../MsscList/common/types/L2/ButtonColorsTypeR1';
import { ReactComponent as SvgIconEdit } from './IconEdit.svg';

const SvgButtonStyled = styled.button`
  ${SvgButtonBaseStyledR1};

  border: 1px silver solid;
  border-radius: 8px;
  background-color: transparent;
  width: 42px;
  height: 42px;
`;

const colors: ButtonColorsTypeR1 = { normal: 'black', hover: 'orange', disabled: 'silver', click: 'green' };

interface Props {
  disabled?: boolean;
  isLoading?: boolean;
  whPx?: number;
}

export function SvgButtonStyledStory({disabled = false, isLoading = false, whPx = 32}: Props) {

  return <div>
    <SvgButtonStyled disabled={disabled} colors={colors} svgSizesPx={{ whPx }} isLoading={isLoading}>
      <SvgIconEdit />
    </SvgButtonStyled>
  </div>;
}
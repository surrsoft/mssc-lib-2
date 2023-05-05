import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as SvgIconCheck } from './IconCheck.svg';
import { ReactComponent as SvgIconEdit } from './IconEdit.svg';
import { ButtonColorsType, SvgButtonBaseStyled } from './SvgButtonBaseStyled';

const SvgButtonStyled = styled.button`
  ${SvgButtonBaseStyled};

  border: 1px silver solid;
  border-radius: 8px;
  background-color: transparent;
  width: 42px;
  height: 42px;
`;

const colors: ButtonColorsType = { normal: 'magenta', hover: 'orange', disabled: 'silver', click: 'green' }

export function SvgButton() {

  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsLoading(!isLoading);
  };

  return <div>
    <div>SvgButton</div>
    <SvgButtonStyled
      disabled={isLoading}
      colors={colors}
      svgSizesPx={32}
      isLoading={isLoading}
    >
      <SvgIconEdit />
    </SvgButtonStyled>
    <SvgButtonStyled
      disabled={isLoading}
      colors={colors}
      svgSizesPx={32}
      isLoading={isLoading}
    >
      <SvgIconCheck />
    </SvgButtonStyled>
    <button onClick={handleClick}>{isLoading ? 'isLoading: true' : 'isLoading: false'}</button>
  </div>;
}
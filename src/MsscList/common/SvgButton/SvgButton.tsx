import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as SvgIconEdit } from './IconEdit.svg';
import { SvgButtonBaseStyled } from './SvgButtonBaseStyled';

const SvgButtonStyled = styled.button`
  ${SvgButtonBaseStyled};

  border: 1px silver solid;
  border-radius: 8px;
  background-color: transparent;
  width: 42px;
  height: 42px;
`;

export function SvgButton() {

  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsLoading(!isLoading);
  };

  return <div>
    <div>SvgButton</div>
    <SvgButtonStyled
      disabled={isLoading}
      colors={{ normal: 'blue', hover: 'red', disabled: 'silver' }}
      svgSizesPx={32}
      onClick={handleClick}
      isLoading={isLoading}
    >
      <SvgIconEdit />
    </SvgButtonStyled>
    <div>{isLoading ? 'true' : 'false'}</div>
  </div>;
}
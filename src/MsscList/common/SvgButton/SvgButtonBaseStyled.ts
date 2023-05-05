import { CSSProperties, css, keyframes } from 'styled-components';

/** цвет в формате принятом в JS и CSS, например: '#000000', 'red' */
type ColorType = string;
/** размер ширины и высоты в пикселях */
type SizesPxType = number;

export interface ButtonColorsType {
  normal?: ColorType;
  hover?: ColorType;
  disabled?: ColorType;
  click?: ColorType;
}

export const SvgButtonBaseStyled = css<{
  colors?: ButtonColorsType,
  svgSizesPx?: SizesPxType,
  css?: CSSProperties,
  isLoading?: boolean
}>`
  border: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  width: ${({ css }) => (css?.width ?? 'unset')};
  height: ${({ css }) => (css?.height ?? 'unset')};

  svg {
    width: ${({ svgSizesPx }) => `${svgSizesPx ?? 42}px`};
    height: ${({ svgSizesPx }) => `${svgSizesPx ?? 42}px`};
    fill: ${({ colors }) => (colors?.normal ?? 'unset')};;
  }

  &:hover svg {
    fill: ${({ colors }) => (colors?.hover ?? colors?.normal ?? 'unset')};
  }

  &:active svg {
    fill: ${({ colors }) => (colors?.click ?? colors?.normal ?? 'unset')};
  }

  &:disabled svg {
    fill: ${({ colors }) => (colors?.disabled ?? colors?.normal ?? 'unset')};
  }

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    animation: fade ${({ isLoading }) => isLoading ? '1.2s' : '0'} infinite;
    animation-timing-function: ease;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

`;
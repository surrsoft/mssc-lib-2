import { MsscEnListAreaHeightModeEnum } from './types/types';

/**
 * Сущность определяющая высоту области прокрутки списка
 */
export class MsscListAreaHeightCls {
  /**
   * режим, см. {@link MsscEnListAreaHeightModeEnum}
   */
  public mode: MsscEnListAreaHeightModeEnum = MsscEnListAreaHeightModeEnum.STICKY_DOWN
  /**
   * Размер в пикселях. Как используется, зависит от режима {@link mode}
   */
  public value: number = 280
}

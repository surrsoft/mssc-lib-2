import { MsscListAreaHeightModeEnum } from '../types/enums/MsscListAreaHeightModeEnum';

/**
 * Сущность определяющая высоту области прокрутки списка
 */
export class MsscListAreaHeightCls {
  /**
   * режим, см. {@link MsscListAreaHeightModeEnum}
   */
  public mode: MsscListAreaHeightModeEnum = MsscListAreaHeightModeEnum.STICKY_DOWN
  /**
   * Размер в пикселях. Как используется, зависит от режима {@link mode}
   */
  public value: number = 280
}

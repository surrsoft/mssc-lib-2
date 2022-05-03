import { MsscEnListAreaHeightMode } from './MsscEnListAreaHeightMode';

/**
 * Сущность определяющая высоту области прокрутки списка
 */
export class MsscListAreaHeight {
  /**
   * режим, см. {@link MsscEnListAreaHeightMode}
   */
  public mode: MsscEnListAreaHeightMode = MsscEnListAreaHeightMode.STICKY_DOWN
  /**
   * Размер в пикселях. Как используется, зависит от режима {@link mode}
   */
  public value: number = 280
}

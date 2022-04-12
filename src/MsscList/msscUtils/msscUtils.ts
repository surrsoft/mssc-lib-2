export async function fnWait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, duration);
  });
}

/**
 * имя колонки таблицы БД
 */
export type MsscColumnName = string

/**
 *
 */
export class SquareBrackets {
  static bracketsRemove(str: string): string {
    if (str && str.length > 0) {
      return str.replace('[', '').replace(']', '')
    }
    return str
  }

  static bracketsAdd(str: string): string {
    if (str && str.length > 0) {
      return `[${str}]`
    }
    return str
  }
}

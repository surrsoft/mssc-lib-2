/**
 * Представление для: "имя значения" (тега) + "количество таких значений"
 */
export class VanxTagType {
  value: string;
  count: number;

  // не использованы public прямо в конструкторе потому, что Typescript в Storybook не понимает такой синтаксис
  constructor(value: string, count: number) {
    this.value = value;
    this.count = count;
  }
}

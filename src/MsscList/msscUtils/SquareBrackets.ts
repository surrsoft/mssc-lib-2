// noinspection JSUnusedGlobalSymbols
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

import _ from 'lodash';
import { RsuvTuTree } from 'rsuv-lib';

const VNCZ_ENABLED = process.env.REACT_APP_VNCZ_ENABLED;
const VNCZ_PREFIX = '!!-!!-!!**';
const VNCZ_PAD = '.';

export class Vncz {

  static isEnabled(): boolean {
    return !!VNCZ_ENABLED
  }

  static groupStart(groupId: string) {
    if (VNCZ_ENABLED) {
      console.group(`${VNCZ_PREFIX} ${groupId}`)
    }
  }

  static groupEnd(groupId: string) {
    if (VNCZ_ENABLED) {
      console.groupEnd()
    }
  }

  static log(id: string, text: string, level: number = 0) {
    this.fnLogIf(id, text, level)
  }

  private static fnLogIf(id: string, text: string, level: number = 0) {
    if (VNCZ_ENABLED) {
      console.log(`${_.repeat(VNCZ_PAD, level)} ${VNCZ_PREFIX} ${text} id-${id} [${Date.now()}]`)
    }
  }

  /**
   * *накопитель
   */
  static cwrcStore: CwrcGroupOrLogElem[] = []

  static cwrcGroupAdd(groupIdParent: CwrcGroupId | null, groupId: CwrcGroupId, name?: CwrcGroupName) {
    if (VNCZ_ENABLED && groupId) {
      const groupNew = {[groupId]: {groupElems: [], groupName: name}} as CwrcGroup
      if (groupIdParent) {
        const groupParent = Vncz.cwrcGroupFind(groupIdParent)
        if (groupParent) {
          groupParent[groupIdParent].groupElems.push(groupNew)
        }
      } else {
        Vncz.cwrcStore.push(groupNew)
      }
    }
  }

  static cwrcLog(groupId: CwrcGroupId, message: string) {
    if (VNCZ_ENABLED && groupId) {
      const group = Vncz.cwrcGroupFind(groupId)
      if (group) {
        group[groupId].groupElems.push({logElemMessage: message} as CwrcLogElem)
      }
    }
  }

  static cwrcStoreGet() {
    return Vncz.cwrcStore
  }

  static cwrcStoreToConsole() {
    if (VNCZ_ENABLED) {
      const store = Vncz.cwrcStoreGet()
      const st = JSON.stringify(store, null, 2)
      console.log(VNCZ_PREFIX, st)
    }
  }

  static cwrcStoreClear() {
    Vncz.cwrcStore = []
  }

  /**
   * Рекурсивно ищет cwrc-группу (1). Если находит, возвращает её, если нет - возвращает null
   * @param groupId (1) -- id cwrc-группы
   * @private
   */
  private static cwrcGroupFind(groupId: CwrcGroupId): CwrcGroup | null {
    const res = RsuvTuTree.findDeepBy(Vncz.cwrcStore, (key, value) => {
      return key === groupId
    }, false)
    if (res?.length === 1) {
      return res[0]
    }
    return null
  }

}

type CwrcGroupId = string;
type CwrcGroupName = string;

interface CwrcGroupR {
  groupElems: CwrcGroupOrLogElem[]
  groupName?: CwrcGroupName
}

type CwrcGroup = Record<CwrcGroupId, CwrcGroupR>

interface CwrcLogElem {
  logElemMessage: string;
}

type CwrcGroupOrLogElem = CwrcGroup | CwrcLogElem

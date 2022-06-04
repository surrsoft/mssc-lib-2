import _ from 'lodash';
import { RsuvTuTree } from 'rsuv-lib';

const VNCZ_ENABLED = process.env.REACT_APP_VNCZ_ENABLED;
const VNCZ_PREFIX = '!!-!!-!!**';
const VNCZ_PAD = '.';

export class Vncz {

  static isEnabled(): boolean {
    return !!VNCZ_ENABLED
  }

  /**
   * *накопитель
   */
  static cwrcStore: CwrcGroupOrLogElem[] = []

  static cwrcGroupAdd(
    groupIdParent: CwrcGroupId | null,
    groupId: CwrcGroupId,
    name?: CwrcGroupName,
    callId?: CwrcCallId
  ) {
    if (VNCZ_ENABLED && groupId) {
      const groupNew = {groupId: groupId, groupElems: [], callId} as CwrcGroup
      if (groupIdParent) {
        const groupParent = Vncz.cwrcGroupFind(groupIdParent, callId)
        if (groupParent) {
          groupParent.groupElems.push(groupNew)
        }
      } else {
        Vncz.cwrcStore.push(groupNew)
      }
      Vncz.cwrcLog(groupNew.groupId, 'GROUP MSG: ' + name, callId)
    }
  }

  static cwrcLog(groupId: CwrcGroupId, message?: string, callId?: CwrcCallId) {
    if (VNCZ_ENABLED && groupId) {
      const group = Vncz.cwrcGroupFind(groupId, callId)
      if (group) {
        group.groupElems.push(message)
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
   * @param callId
   * @private
   */
  private static cwrcGroupFind(groupId: CwrcGroupId, callId?: CwrcCallId): CwrcGroup | null {
    const res = RsuvTuTree.findDeepByB(Vncz.cwrcStore, (key, value, parent) => {
      return key === 'groupId' && value === groupId && (callId ? parent?.callId === callId : true)
    }, false)
    if (res?.length === 1) {
      return res[0].parent
    }
    return null
  }

}

type CwrcGroupId = string;
type CwrcGroupName = string;
type CwrcCallId = string;

interface CwrcGroup {
  groupId: CwrcGroupId
  groupElems: any[]
  callId?: CwrcCallId
}


interface CwrcLogElem {
  logElemMessage: string;
}

type CwrcGroupOrLogElem = CwrcGroup | CwrcLogElem

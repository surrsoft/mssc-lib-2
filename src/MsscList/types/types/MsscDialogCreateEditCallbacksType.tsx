export interface MsscDialogCreateEditCallbacksType {
  cancel: () => Promise<void>;
  ok: (model: any) => Promise<void>;
}

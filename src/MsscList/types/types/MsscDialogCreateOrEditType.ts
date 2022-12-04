export type MsscDialogCreateOrEditType<TModel> = (cbOk: (model: TModel) => void, cbCancel: () => void, initialValues?: object) => Promise<JSX.Element>

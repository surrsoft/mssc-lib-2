export type VanxSourceDialogCreateOrEditType<TModel> = (cbOk: (model: TModel) => void, cbCancel: () => void, initialValues?: object) => Promise<JSX.Element>

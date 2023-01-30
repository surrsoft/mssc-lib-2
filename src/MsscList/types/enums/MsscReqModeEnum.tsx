/** режимы для хука {@link useGetData} */
export enum MsscReqModeEnum {
  /** это в режим в котором сначала выполняется 'whole' useQuery() и следом 'detail' useQuery() */
  WHOLE = "WHOLE",
  /** режим в котором выполняется только 'detail' useQuery() - получение данных "деталки" */
  DETAIL = "DETAIL",
  /** неопределённый режим */
  UNDEF = "UNDEF",
}

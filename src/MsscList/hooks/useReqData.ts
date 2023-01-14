import { useQuery } from "@tanstack/react-query";

import { MsscSourceType } from "../types/MsscSourceType";

interface ParamsType {
  enabled: boolean;
  source: MsscSourceType<any> | null;
}

export function useReqData({ enabled, source }: ParamsType) {
  return useQuery(
    ["some"],
    async () => {
      const countAllGetPromise = source?.elemsCountByFilter([]);
      const promises = [countAllGetPromise];
      const result = await Promise.all(promises);

    },
    { enabled }
  );
}

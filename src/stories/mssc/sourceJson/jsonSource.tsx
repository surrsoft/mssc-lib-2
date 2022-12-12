import _ from 'lodash';
import React from 'react';
import { RsuvTxStringAC } from 'rsuv-lib';

import { Asau88JsonSourceParams } from '../../../MsscList/commonUtils/jsonSource/Asau88JsonSourceParams';
import { JsonSourceAsau88 } from '../../../MsscList/commonUtils/jsonSource/JsonSourceAsau88';
import { VanxFilterType } from '../../../MsscList/vanx/types/VanxFilterType';
import { EnJsonFieldName } from './EnJsonFieldName';

const params: Asau88JsonSourceParams<any> = {
  endpointUrl: 'http://localhost:22121/',
  fieldPath: 'data',
  elemJsx: (obj: any) => {
    return (
      <div>
        <div>id: {obj?.id}</div>
        <div>email: {obj[EnJsonFieldName.EMAIL]}</div>
        <div>username: {obj[EnJsonFieldName.USERNAME]}</div>
        <div>profile.about: {_.get(obj, EnJsonFieldName.PROFILE_ABOUT, '')}</div>
        <div>tags: {JSON.stringify(obj.roles)}</div>
      </div>
    )
  },
  cbFilterFromSearchText: (searchText: string): VanxFilterType[] | null => {
    if (searchText) {
      const rr1 = EnJsonFieldName.EMAIL
      const rr2 = EnJsonFieldName.USERNAME
      const rr3 = EnJsonFieldName.PROFILE_ABOUT
      return [
        { paramId: new RsuvTxStringAC('_'), paramIdB: rr1, filterValue: searchText },
        { paramId: new RsuvTxStringAC('_'), paramIdB: rr2, filterValue: searchText },
        { paramId: new RsuvTxStringAC('_'), paramIdB: rr3, filterValue: searchText },
      ];
    }
    return null;
  },
  cbFilterFromTags: (tags: string[], fieldName: string): VanxFilterType[] | null => {
    if (tags && tags.length > 0) {
      const filters: VanxFilterType[] = []
      tags.forEach(elTag => {
        const filter: VanxFilterType = {
          paramId: new RsuvTxStringAC('_'),
          paramIdB: fieldName,
          filterValue: elTag,
          isArrElemFind: true
        }
        filters.push(filter)
      })
      return filters;
    }
    return null;
  }
};

export const jsonSource = new JsonSourceAsau88(params);

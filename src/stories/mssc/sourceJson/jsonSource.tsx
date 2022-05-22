import React from 'react';
import { JsonSourceAsau88 } from '../../../MsscList/commonUtils/jsonSource/JsonSourceAsau88';
import { Asau88JsonSourceParams } from '../../../MsscList/commonUtils/jsonSource/Asau88JsonSourceParams';
import { MsscFilter } from '../../../MsscList/msscUtils/MsscFilter';
import { RsuvTxStringAC } from 'rsuv-lib';
import { EnJsonFieldName } from './EnJsonFieldName';
import _ from 'lodash';

const params = {
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
  cbFilterFromSearchText: (searchText: string): MsscFilter[] | null => {
    if (searchText) {
      const rr1 = EnJsonFieldName.EMAIL
      const rr2 = EnJsonFieldName.USERNAME
      const rr3 = EnJsonFieldName.PROFILE_ABOUT
      return [
        {paramId: new RsuvTxStringAC('_'), paramIdB: rr1, filterValue: searchText} as MsscFilter,
        {paramId: new RsuvTxStringAC('_'), paramIdB: rr2, filterValue: searchText} as MsscFilter,
        {paramId: new RsuvTxStringAC('_'), paramIdB: rr3, filterValue: searchText} as MsscFilter,
      ]
    }
    return null;
  },
  cbFilterFromTags: (tags: string[], fieldName: string): MsscFilter[] | null => {
    if (tags && tags.length > 0) {
      const filters: MsscFilter[] = []
      tags.map(elTag => {
        const filter = {
          paramId: new RsuvTxStringAC('_'),
          paramIdB: fieldName,
          filterValue: elTag,
          isArrElemFind: true
        } as MsscFilter
        filters.push(filter)
      })
      return filters;
    }
    return null;
  }
} as Asau88JsonSourceParams<any>;

export const jsonSource = new JsonSourceAsau88(params);

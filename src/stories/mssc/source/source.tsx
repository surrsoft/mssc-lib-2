import React from 'react';
import _ from 'lodash';
import './source-styles.scss';
import { EnField } from '../EnField';
import { SquareBrackets } from '../../../MsscList/msscUtils/msscUtils';
import { AirSource, AirSourceParams } from '../../../MsscList/commonUtils/AirSource';


const airSourceParams = {
  dbKey: 'appZoHaX4a5tRLJlv', // mssc-training-3
  // dbKey: 'appXv6ry7Vn262nGR', // sites
  // dbKey: 'appskGCKvIZEdVBTO',
  // dbKey: 'appHOzDglc28fCztP',
  tableName: 'main',
  columns: [
    'id',
    EnField.URL,
    EnField.TITLE,
    EnField.COMM,
    'body',
    'trans_count',
    'trans_date_last',
    'show_date_last',
    EnField.TIME_CREATED,
    EnField.TIME_LAST_MODIFIED,
    EnField.TAGS,
    EnField.TAGS2,
  ],
  elemJsx: (elObj: any) => {
    return (
      <div className="list-elem" key={elObj.tid}>
        <div className="list-elem__title">{elObj.title}</div>
        <div><a className="list-elem__url" href={elObj.url} target="_blank">{elObj.url}</a></div>
        <div className="list-elem__comm">{elObj[EnField.COMM] || ''}</div>
        <div className="list-elem__tags-con">
          {(!elObj.tags || elObj.tags.length < 0) ? null : <div className="list-elem__tags">
            {
              elObj.tags.map((elTag: string) => {
                return (
                  <div key={elTag} className="list-elem__tag">{SquareBrackets.bracketsRemove(elTag)}</div>
                )
              })
            }
          </div>}
          {_.isEmpty(elObj[EnField.TAGS2]) ? null : <div className="list-elem__tags2">
            {elObj[EnField.TAGS2].map((elTag: string) => {
              return (<div key={elTag} className="list-elem__tag2">{SquareBrackets.bracketsRemove(elTag)}</div>)
            })}
          </div>}
        </div>
        <div className="list-elem__times">
          <div className="list-elem__time-lastmodif">
            <span className="list-elem__name">last modif:</span> {elObj[EnField.TIME_LAST_MODIFIED] || ''}
          </div>
          <div className="list-elem__time-created">
            <span className="list-elem__name">created:</span> {elObj[EnField.TIME_CREATED] || ''}
          </div>
        </div>
        <div className="list-elem__id">{elObj.tid}</div>
      </div>
    )
  }
} as AirSourceParams<any>

export const airSource = new AirSource(airSourceParams)

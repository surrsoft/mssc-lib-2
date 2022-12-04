import React from 'react';
import _ from 'lodash';
import './source-styles.scss';
import { EnAirField } from './EnAirField';
import { AirSource} from '../../../MsscList/commonUtils/airSource/AirSource';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { AirSourceParams } from '../../../MsscList/commonUtils/airSource/AirSourceParams';
import { RsuvTxStringAC } from 'rsuv-lib';
import {SquareBrackets} from "../../../MsscList/msscUtils/SquareBrackets";
import { MsscFilterType } from '../../../MsscList/types/types/MsscFilterType';

const airSourceParams = {
  dbKey: 'appZoHaX4a5tRLJlv', // mssc-training-3
  // dbKey: 'appXv6ry7Vn262nGR', // sites
  // dbKey: 'appskGCKvIZEdVBTO',
  // dbKey: 'appHOzDglc28fCztP',
  tableName: 'main',
  columns: [
    'id',
    EnAirField.URL,
    EnAirField.TITLE,
    EnAirField.COMM,
    'body',
    'trans_count',
    'trans_date_last',
    'show_date_last',
    EnAirField.TIME_CREATED,
    EnAirField.TIME_LAST_MODIFIED,
    EnAirField.TAGS,
    EnAirField.TAGS2,
  ],
  elemJsx: (elObj: any) => {
    return (
      <div className="list-elem" key={elObj.tid}>
        <div className="list-elem__title">{elObj.title}</div>
        <div><a className="list-elem__url" href={elObj.url} target="_blank">{elObj.url}</a></div>
        <div className="list-elem__comm">{elObj[EnAirField.COMM] || ''}</div>
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
          {_.isEmpty(elObj[EnAirField.TAGS2]) ? null : <div className="list-elem__tags2">
            {elObj[EnAirField.TAGS2].map((elTag: string) => {
              return (<div key={elTag} className="list-elem__tag2">{SquareBrackets.bracketsRemove(elTag)}</div>)
            })}
          </div>}
        </div>
        <div className="list-elem__times">
          <div className="list-elem__time-lastmodif">
            <span className="list-elem__name">last modif:</span> {elObj[EnAirField.TIME_LAST_MODIFIED] || ''}
          </div>
          <div className="list-elem__time-created">
            <span className="list-elem__name">created:</span> {elObj[EnAirField.TIME_CREATED] || ''}
          </div>
        </div>
        <div className="list-elem__id">{elObj.tid}</div>
      </div>
    )
  },
  dialogCreateEditJsx: async (cbOk: (newElemData: any) => void, cbCancel: () => void, initialValues) => {
    const isEditMode = !!initialValues
    const isCreateMode = !isEditMode

    const btnHandlers = {
      cancel: () => {
        cbCancel?.()
      },
      ok: async (model: any) => {
        const obj = Object.assign({}, {id: ''}, model)
        if (isEditMode) {
          obj.id = (initialValues as any).id
        }
        cbOk?.(obj)
      }
    }

    const fieldNames = [EnAirField.TITLE, EnAirField.COMM, EnAirField.URL]
    const initialValues0 = fieldNames.reduce((acc: any, elFieldName) => {
      acc[elFieldName] = initialValues ? ((initialValues as any)[elFieldName] || '') : '';
      return acc;
    }, {})

    return (
      <div className="cls2326FormContainer">
        <Formik
          initialValues={initialValues0}
          validationSchema={Yup.object({
            [EnAirField.TITLE]: Yup.string().required('обязательное поле')
          })}
          onSubmit={async (values) => {
            return btnHandlers.ok(values)
          }}
        >
          {({errors}) => (<Form className="cls2326Form">
            <div className="cls2326Title">{isCreateMode ? 'Создание' : 'Редактирование'} элемента</div>
            <div className="cls2326ELem">
              <label>{EnAirField.TITLE}</label>
              <Field type="text" name={EnAirField.TITLE}/>
              <ErrorMessage className="cls2326FieldError" name={EnAirField.TITLE} component="div"/>
            </div>
            <div className="cls2326ELem">
              <label>{EnAirField.COMM}</label>
              <Field type="text" name={EnAirField.COMM}/>
            </div>
            <div className="cls2326ELem">
              <label>{EnAirField.URL}</label>
              <Field type="text" name={EnAirField.URL}/>
            </div>
            <div className="cls2326Buttons">
              <button onClick={btnHandlers.cancel}>Отмена</button>
              <button type="submit">OK</button>
            </div>
          </Form>)}
        </Formik>
      </div>
    )
  },
  cbFilterFromSearchText: (searchText: string): MsscFilterType[] | null => {
    if (searchText) {
      const fieldNameTitle = new RsuvTxStringAC(EnAirField.TITLE)
      const fieldNameComm = new RsuvTxStringAC(EnAirField.COMM)
      const fieldNameUrl = new RsuvTxStringAC(EnAirField.URL)
      return [
        {paramId: fieldNameTitle, filterValue: searchText} as MsscFilterType,
        {paramId: fieldNameComm, filterValue: searchText} as MsscFilterType,
        {paramId: fieldNameUrl, filterValue: searchText} as MsscFilterType,
      ];
    }
    return null
  },
  cbFilterFromTags: (tags: string[], fieldName: string): MsscFilterType[] | null => {
    if (tags && tags.length > 0) {
      const filters: MsscFilterType[] = []
      tags.map(elTag => {
        const fieldNameTags = new RsuvTxStringAC(fieldName)
        const filter = {paramId: fieldNameTags, filterValue: elTag, isArrElemFind: true} as MsscFilterType
        filters.push(filter)
      })
      return filters;
    }
    return null;
  }
} as AirSourceParams<any>

export const airSource = new AirSource(airSourceParams)

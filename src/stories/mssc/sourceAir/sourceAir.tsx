import { ErrorMessage, Field, Form, Formik } from "formik";
import _ from "lodash";
import React from "react";
import "./source-styles.scss";
import { RsuvTxStringAC } from "rsuv-lib";
import { object as yupObject, string as yupString } from "yup";

import { AirSource } from "../../../MsscList/commonUtils/airSource/AirSource";
import { AirSourceParams } from "../../../MsscList/commonUtils/airSource/AirSourceParams";
import { MsscSquareBracketsCls } from "../../../MsscList/msscUtils/MsscSquareBracketsCls";
import { MsscFilterType } from "../../../MsscList/types/types/MsscFilterType";
import { AirtableFieldEnum } from "./AirtableFieldEnum";

const airSourceParams: AirSourceParams<any> = {
  dbKey: "appZoHaX4a5tRLJlv", // mssc-training-3
  // dbKey: 'appXv6ry7Vn262nGR', // sites
  // dbKey: 'appskGCKvIZEdVBTO',
  // dbKey: 'appHOzDglc28fCztP',
  tableName: "main",
  columns: [
    "id",
    AirtableFieldEnum.URL,
    AirtableFieldEnum.TITLE,
    AirtableFieldEnum.COMM,
    "body",
    "trans_count",
    "trans_date_last",
    "show_date_last",
    AirtableFieldEnum.TIME_CREATED,
    AirtableFieldEnum.TIME_LAST_MODIFIED,
    AirtableFieldEnum.TAGS,
    AirtableFieldEnum.TAGS2,
  ],
  elemJsx: (elObj: any) => {
    return (
      <div className="list-elem" key={elObj.tid}>
        <div className="list-elem__title">{elObj.title}</div>
        <div>
          <a
            className="list-elem__url"
            href={elObj.url}
            target="_blank"
            rel="noreferrer"
          >
            {elObj.url}
          </a>
        </div>
        <div className="list-elem__comm">{elObj[AirtableFieldEnum.COMM] || ""}</div>
        <div className="list-elem__tags-con">
          {!elObj.tags || elObj.tags.length < 0 ? null : (
            <div className="list-elem__tags">
              {elObj.tags.map((elTag: string) => {
                return (
                  <div key={elTag} className="list-elem__tag">
                    {MsscSquareBracketsCls.bracketsRemove(elTag)}
                  </div>
                );
              })}
            </div>
          )}
          {_.isEmpty(elObj[AirtableFieldEnum.TAGS2]) ? null : (
            <div className="list-elem__tags2">
              {elObj[AirtableFieldEnum.TAGS2].map((elTag: string) => {
                return (
                  <div key={elTag} className="list-elem__tag2">
                    {MsscSquareBracketsCls.bracketsRemove(elTag)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="list-elem__times">
          <div className="list-elem__time-lastmodif">
            <span className="list-elem__name">last modif:</span>{" "}
            {elObj[AirtableFieldEnum.TIME_LAST_MODIFIED] || ""}
          </div>
          <div className="list-elem__time-created">
            <span className="list-elem__name">created:</span>{" "}
            {elObj[AirtableFieldEnum.TIME_CREATED] || ""}
          </div>
        </div>
        <div className="list-elem__id">{elObj.tid}</div>
      </div>
    );
  },
  dialogCreateEditJsx: async (
    cbOk: (newElemData: any) => void,
    cbCancel: () => void,
    initialValues
  ) => {
    const isEditMode = !!initialValues;
    const isCreateMode = !isEditMode;

    const btnHandlers = {
      cancel: () => {
        cbCancel?.();
      },
      ok: async (model: any) => {
        const obj = Object.assign({}, { id: "" }, model);
        if (isEditMode) {
          obj.id = (initialValues as any).id;
        }
        cbOk?.(obj);
      },
    };

    const fieldNames = [AirtableFieldEnum.TITLE, AirtableFieldEnum.COMM, AirtableFieldEnum.URL];
    const initialValues0 = fieldNames.reduce((acc: any, elFieldName) => {
      acc[elFieldName] = initialValues
        ? (initialValues as any)[elFieldName] || ""
        : "";
      return acc;
    }, {});

    return (
      <div className="cls2326FormContainer">
        <Formik
          initialValues={initialValues0}
          validationSchema={yupObject({
            [AirtableFieldEnum.TITLE]: yupString().required("обязательное поле"),
          })}
          onSubmit={async (values) => {
            return await btnHandlers.ok(values);
          }}
        >
          {() => (
            <Form className="cls2326Form">
              <div className="cls2326Title">
                {isCreateMode ? "Создание" : "Редактирование"} элемента
              </div>
              <div className="cls2326ELem">
                <label>{AirtableFieldEnum.TITLE}</label>
                <Field type="text" name={AirtableFieldEnum.TITLE} />
                <ErrorMessage
                  className="cls2326FieldError"
                  name={AirtableFieldEnum.TITLE}
                  component="div"
                />
              </div>
              <div className="cls2326ELem">
                <label>{AirtableFieldEnum.COMM}</label>
                <Field type="text" name={AirtableFieldEnum.COMM} />
              </div>
              <div className="cls2326ELem">
                <label>{AirtableFieldEnum.URL}</label>
                <Field type="text" name={AirtableFieldEnum.URL} />
              </div>
              <div className="cls2326Buttons">
                <button onClick={btnHandlers.cancel}>Отмена</button>
                <button type="submit">OK</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  },
  cbFilterFromSearchText: (searchText: string): MsscFilterType[] | null => {
    if (searchText) {
      const fieldNameTitle = new RsuvTxStringAC(AirtableFieldEnum.TITLE);
      const fieldNameComm = new RsuvTxStringAC(AirtableFieldEnum.COMM);
      const fieldNameUrl = new RsuvTxStringAC(AirtableFieldEnum.URL);
      return [
        { paramId: fieldNameTitle, filterValue: searchText },
        { paramId: fieldNameComm, filterValue: searchText },
        { paramId: fieldNameUrl, filterValue: searchText },
      ];
    }
    return null;
  },
  cbFilterFromTags: (
    tags: string[],
    fieldName: string
  ): MsscFilterType[] | null => {
    if (tags && tags.length > 0) {
      const filters: MsscFilterType[] = [];
      tags.forEach((elTag) => {
        const fieldNameTags = new RsuvTxStringAC(fieldName);
        const filter: MsscFilterType = {
          paramId: fieldNameTags,
          filterValue: elTag,
          isArrElemFind: true,
        };
        filters.push(filter);
      });
      return filters;
    }
    return null;
  },
};

export const airSource = new AirSource(airSourceParams);

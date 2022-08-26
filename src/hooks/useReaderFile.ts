import React from "react";
import { isJSONString } from "utils/isJSONString";
import * as d3 from "d3";

export type FILE_TYPE =
  | "application/json"
  | "text/tab-separated-values"
  | "text/comma-separated-values"
  | "";

/**
 * useReaderFile is a hook function use FileReader to read json file from user selection
 * reference link: https://stackoverflow.com/questions/23344776/how-to-access-data-of-uploaded-json-file
 * @returns {
 *  readData: ({
 *      files: FileList; // data input
 *      callbackSetData: (jsonData: string) => void; // a callback function use to handle read JSON data
 *      callbackHandleError?: (error: any) => void; // a callback function use to handle error JSON data
 * }) => void
 * }
 */
export const useReaderFile = () => {
  const handleValidateAcceptType = React.useCallback(
    (file: File, accept: FILE_TYPE) => !!file.type.match(accept),
    []
  );
  const readData = React.useCallback(
    ({
      files,
      callbackSetData,
      callbackHandleError,
    }: {
      files: FileList | File[];
      callbackSetData: (jsonData: string, ...rest: any) => void;
      callbackHandleError?: (error: any) => void;
    }) => {
      try {
        const file = files[0];
        if (file) {
          const { type } = file;
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            const result = reader.result as string;
            let jsonString = "";
            if (type.match("application/json")) {
              if (isJSONString(result)) {
                jsonString = result;
              }
            } else if (
              type.match("text/tab-separated-values") ||
              type.match("text/tsv")
            ) {
              jsonString = JSON.stringify(d3.tsvParse(result));
            } else if (
              type.match("text/comma-separated-values") ||
              type.match("text/csv")
            ) {
              jsonString = JSON.stringify(d3.csvParse(result));
            } else {
              jsonString = result;
            }
            callbackSetData(jsonString, file);
          });
          reader.removeEventListener("load", () => null);
          reader.readAsText(file);
        }
      } catch (error) {
        if (typeof callbackHandleError === "function") {
          callbackHandleError(error);
        }
      }
    },
    []
  );
  return {
    readData,
    handleValidateAcceptType,
  };
};

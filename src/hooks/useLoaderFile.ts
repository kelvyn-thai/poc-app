import React from "react";
import * as d3 from "d3";

export const useLoaderFile = () => {
  const loadFile = React.useCallback(
    async ({
      url,
      type,
      options,
    }: {
      url: RequestInfo | URL | any;
      type?: string;
      options?: { determine: "," };
    }) => {
      const { determine = "," } = options || {};
      switch (type) {
        case "txt": {
          const data = await fetch(url).then((res) => res.text());
          return JSON.stringify(
            data.split(/\r\n|\n/).map((i) => i.split(determine))
          );
        }
        case "csv": {
          const data = await fetch(url).then((res) => res.text());
          return JSON.stringify(d3.csvParse(data));
        }
        case "tsv": {
          const data = await fetch(url).then((res) => res.text());
          return JSON.stringify(d3.tsvParse(data));
        }
        default: {
          return fetch(url).then((res) => res.text());
        }
      }
    },
    []
  );

  return {
    loadFile,
  };
};

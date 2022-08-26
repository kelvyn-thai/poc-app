/* eslint-disable react/no-danger */
import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface IState {
  jsonData: { [key: string]: any };
}

export const JSONHighlights: React.FC<IState> = ({ jsonData }) => {
  const syntaxHighlight = React.useMemo(() => {
    let json = JSON.stringify(jsonData, undefined, 2);
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const html = json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls: any = "text-orange-400";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-red-400";
          } else {
            cls = "text-green-400";
          }
        } else if (/true|false/.test(match)) {
          cls = "text-blue-400";
        } else if (/null/.test(match)) {
          cls = "text-pink-400";
        }
        return `<span class="${classNames(cls)}">${match}</span>`;
      }
    );
    return html;
  }, [jsonData]);
  return (
    <pre
      className={styles.pre}
      dangerouslySetInnerHTML={{ __html: syntaxHighlight }}
    />
  );
};

export default React.memo(JSONHighlights);

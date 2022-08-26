import React from "react";
// import ReactDOM from "react-dom";
import styles from "./styles.module.scss";

const ModalCore = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => <div className={styles.modalContainer}>{children}</div>;
// ReactDOM.createPortal(
//   <div className={styles.modalContainer}>{children}</div>,
//   document.querySelector("#modal-root") as Element
// );

export default React.memo(ModalCore);

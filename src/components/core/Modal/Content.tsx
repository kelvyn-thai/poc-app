import React from "react";
import styles from "./styles.module.scss";
import { useModalStore } from "./zustand";

const Content: React.FC<{
  children: React.ReactNode | React.ReactElement | any;
}> = (props) => {
  const { children } = props;
  const { setVisibleModal } = useModalStore();
  return (
    <div className={`absolute bg-white text-black p-5 ${styles.modalContent}`}>
      <div className="text-right flex justify-end h-6 items-center mb-5">
        <i
          className="cursor-pointer text-right fa-solid fa-xmark fa-xl text-black"
          onClick={() => setVisibleModal({ isVisible: false })}
        />
      </div>
      {children}
    </div>
  );
};

export default Content;

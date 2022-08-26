import React from "react";

export const useCoreModal = () => {
  const [isVisible, setVisibleModal] = React.useState(false);
  return {
    isVisible,
    setVisibleModal,
  };
};

import ModalCore from "components/core/Modal/Modal.core";
import { useCoreModal } from "components/core/Modal/Modal.hook";
import React from "react";

const ModalUploadImage = () => <div>Upload image here</div>;

const ModalContentData = () => {
  const { isVisible, setVisibleModal } = useCoreModal();
  return (
    <div>
      This is modal to Edit profile
      <button type="button" onClick={() => setVisibleModal(true)}>
        Click to edit profile image
      </button>
      {isVisible && (
        <ModalCore>
          <ModalUploadImage />
        </ModalCore>
      )}
    </div>
  );
};
const ModalTest = () => {
  const { isVisible, setVisibleModal } = useCoreModal();
  return (
    <div>
      <button type="button" onClick={() => setVisibleModal(true)}>
        Choose Image
      </button>
      {isVisible && (
        <ModalCore>
          <ModalContentData />
        </ModalCore>
      )}
    </div>
  );
};
export default React.memo(ModalTest);

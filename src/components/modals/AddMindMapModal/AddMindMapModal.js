import React, { useState } from "react";
import Modal from "../../common/Modal/Modal";
import { capitalize, postData } from "../../utils/helper";

const AddMindMapModal = ({
  showAddMindMapModal,
  setShowAddMindMapModal,
  mainNodeDetails,
  setMainNodeDetails,
  onAddMindMapBtnClick,
}) => {
  const renderInput = ({ id, fieldName }) => {
    return (
      <div
        className="d-flex justify-content-between align-items-center mb-2"
        style={{ width: "65%" }}
      >
        <label
          htmlFor={id}
          className="form-label mb-0 inline-block text-gray-700"
        >
          {fieldName ? capitalize(fieldName) : ""}:
        </label>
        <input
          id={id}
          className="
            form-control
            block
            w-full
            px-3
            py-1
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0 ms-3
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          "
          value={(mainNodeDetails && mainNodeDetails[fieldName]) || ""}
          onChange={(e) =>
            setMainNodeDetails((mainNodeDetails) => ({
              ...mainNodeDetails,
              [fieldName]: e.target.value,
            }))
          }
          placeholder={`Enter ${capitalize(fieldName)}`}
        />
      </div>
    );
  };

  const modalBody = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        {renderInput({ id: "mindMapName", fieldName: "name" })}
        {renderInput({ id: "mindMapDescription", fieldName: "description" })}
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-primary me-2"
            style={{ width: 100 }}
            onClick={onAddMindMapBtnClick}
          >
            Add
          </button>
          <button
            className="btn btn-secondary"
            style={{ width: 100 }}
            onClick={() => setShowAddMindMapModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      show={showAddMindMapModal}
      onClose={() => setShowAddMindMapModal(false)}
      title="Add new mind map"
      width={480}
    >
      {modalBody()}
    </Modal>
  );
};

export default AddMindMapModal;

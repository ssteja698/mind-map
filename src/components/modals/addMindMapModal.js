import React, { useState } from "react";
import Modal from "../common/Modal/Modal";
import { capitalize, postData } from "../utils/helper";

const AddMindMapModal = ({
  fetchMindMaps,
  showAddMindMapModal,
  setShowAddMindMapModal,
}) => {
  const [mainNodeDetails, setMainNodeDetails] = useState({
    name: "",
    description: "",
    children: null,
  });

  const renderInput = ({ id, fieldName }) => {
    return (
      <div
        className="d-flex justify-content-between mb-2"
        style={{ width: "65%" }}
      >
        <label htmlFor={id}>{fieldName ? capitalize(fieldName) : ""}:</label>
        <input
          id={id}
          value={mainNodeDetails[fieldName] || ""}
          onChange={(e) =>
            setMainNodeDetails((mainNodeDetails) => ({
              ...mainNodeDetails,
              [fieldName]: e.target.value,
            }))
          }
        />
      </div>
    );
  };

  const onAddBtnClick = async () => {
    if (!mainNodeDetails.name) {
      alert("A new mind map should have a name");
      return;
    }

    await postData("http://localhost:4000/mindMaps/", mainNodeDetails);
    await fetchMindMaps();
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
            onClick={onAddBtnClick}
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

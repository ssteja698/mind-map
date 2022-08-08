import React, { useEffect, useState } from "react";
import Modal from "../common/Modal/Modal";
import { capitalize, putData } from "../utils/helper";

const MindMap = ({
  mindMap,
  fetchMindMaps,
  selectedMindMap,
  setSelectedMindMap,
  currMindMap,
  showAddNodeModal,
  setShowAddNodeModal,
}) => {
  const [showMindMap, setShowMindMap] = useState(false);
  const [newNodeDetails, setNewNodeDetails] = useState({
    name: "",
    description: "",
    children: null,
    id: Math.floor(Math.random() * 1e16),
  });

  useEffect(() => {
    if (selectedMindMap && selectedMindMap.id === mindMap.id) {
      setSelectedMindMap(mindMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mindMap]);

  const renderInput = ({ id, fieldName }) => {
    return (
      <div
        className="d-flex justify-content-between mb-2"
        style={{ width: "65%" }}
      >
        <label htmlFor={id}>{fieldName ? capitalize(fieldName) : ""}:</label>
        <input
          id={id}
          value={newNodeDetails ? newNodeDetails[fieldName] : ""}
          onChange={(e) =>
            setNewNodeDetails((newNodeDetails) => ({
              ...newNodeDetails,
              id: Math.floor(Math.random() * 1e16),
              [fieldName]: e.target.value,
            }))
          }
        />
      </div>
    );
  };

  const modalBody = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        {renderInput({ id: "name", fieldName: "name" })}
        {renderInput({ id: "description", fieldName: "description" })}
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
            onClick={() => setShowAddNodeModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const modifyCurrMindMap = ({ currMindMap, mainMindMap, newNode }) => {
    if (
      currMindMap.name === mainMindMap.name &&
      currMindMap.description === mainMindMap.description &&
      currMindMap.children?.length === mainMindMap.children?.length
    ) {
      mainMindMap.children ||= [];
      mainMindMap.children.push(newNode);
      return mainMindMap.children;
    }

    if (mainMindMap.children) {
      for (let node of mainMindMap.children) {
        let finalCurrMindMap = modifyCurrMindMap({
          currMindMap,
          mainMindMap: node,
          newNode,
        });
        if (finalCurrMindMap) {
          return finalCurrMindMap;
        }
      }
    }

    return null;
  };

  const onAddBtnClick = async () => {
    if (!newNodeDetails.name) {
      alert("A new node should have a name");
      return;
    }

    const mainMindMap = { ...selectedMindMap };
    modifyCurrMindMap({
      currMindMap: { ...currMindMap },
      mainMindMap,
      newNode: newNodeDetails,
    });
    await putData(
      `http://localhost:4000/mindMaps/${selectedMindMap.id}`,
      mainMindMap
    );
    await fetchMindMaps();
    setNewNodeDetails({
      name: "",
      description: "",
      children: null,
      id: Math.floor(Math.random() * 1e16),
    });
    setShowAddNodeModal(false);
  };

  useEffect(() => {
    setShowMindMap(selectedMindMap?.id === mindMap?.id);
  }, [mindMap?.id, selectedMindMap]);

  return (
    <div
      style={{
        color: "#000",
      }}
    >
      <button
        className={`p-1 px-2 cursor-pointer btn ${
          showMindMap ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => {
          if (showMindMap) {
            setSelectedMindMap(null);
          } else {
            setSelectedMindMap(mindMap);
          }
        }}
      >
        {showMindMap ? "Hide" : "Show"} {mindMap.name} mind map
      </button>
      <Modal
        show={showAddNodeModal}
        onClose={() => setShowAddNodeModal(false)}
        title="Add new node into the current mind map"
        width={500}
      >
        {modalBody()}
      </Modal>
    </div>
  );
};

export default MindMap;

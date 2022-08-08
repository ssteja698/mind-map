// The entire credits goes to Sai Siva Teja B (https://github.com/ssteja698) as the entire idea and implementation belongs to him
import React, { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/common/Modal/Modal";
import RenderIf from "./components/common/RenderIf";
import MindMap from "./components/mindMap";
import DisplayMindMap from "./components/mindMap/displayMindMap";
import { capitalize, postData } from "./components/utils/helper";

function App() {
  const [mindMaps, setMindMaps] = useState([]);
  const [showAddMindMapModal, setShowAddMindMapModal] = useState(false);
  const [showCurrMindMaps, setShowCurrMindMaps] = useState(false);
  const [selectedMindMap, setSelectedMindMap] = useState(null);
  const [mainNodeDetails, setMainNodeDetails] = useState({
    name: "",
    description: "",
    children: null,
  });
  const [currMindMap, setCurrMindMap] = useState(null);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);

  async function fetchMindMaps() {
    const mindMapsResp = await fetch("http://localhost:4000/mindMaps");
    const mindMapsJson = await mindMapsResp.json();
    setMindMaps(mindMapsJson);
    setShowAddMindMapModal(false);
  }

  useEffect(() => {
    fetchMindMaps();
  }, []);

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
    <div
      className="App p-4"
      style={{
        color: "#000",
      }}
    >
      <div className="d-flex flex-column align-items-center">
        <button
          className="btn btn-dark w-25 mb-2"
          onClick={() =>
            setShowAddMindMapModal(
              (showAddMindMapModal) => !showAddMindMapModal
            )
          }
        >
          Add new mind map
        </button>
        <button
          className="btn btn-primary w-25"
          onClick={() =>
            setShowCurrMindMaps((showCurrMindMaps) => !showCurrMindMaps)
          }
        >
          {showCurrMindMaps ? "Hide" : "View"} current mind maps
        </button>
      </div>
      <RenderIf condition={showCurrMindMaps}>
        <div
          className="d-flex justify-content-center flex-wrap text-nowrap gap-2 mt-2 p-2"
          style={{
            overflow: "auto",
            cursor: "auto",
            width: "fit-content",
            margin: "auto",
          }}
        >
          {mindMaps.map((mindMap) => (
            <React.Fragment key={mindMap.id}>
              <MindMap
                mindMap={mindMap}
                fetchMindMaps={fetchMindMaps}
                selectedMindMap={selectedMindMap}
                setSelectedMindMap={setSelectedMindMap}
                currMindMap={currMindMap}
                showAddNodeModal={showAddNodeModal}
                setShowAddNodeModal={setShowAddNodeModal}
              />
            </React.Fragment>
          ))}
        </div>
      </RenderIf>
      <div className="mt-3 overflow-auto">
        <DisplayMindMap
          mindMap={selectedMindMap}
          setCurrMindMap={setCurrMindMap}
          setShowAddNodeModal={setShowAddNodeModal}
        />
      </div>
      <Modal
        show={showAddMindMapModal}
        onClose={() => setShowAddMindMapModal(false)}
        title="Add new mind map"
        width={480}
      >
        {modalBody()}
      </Modal>
    </div>
  );
}

export default App;

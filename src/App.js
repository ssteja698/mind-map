// The entire credits goes to Sai Siva Teja B (https://github.com/ssteja698) as the entire idea and implementation belongs to him
import React, { useEffect, useState } from "react";
import "./App.css";
import AddMindMapModal from "./components/modals/addMindMapModal";
import AddNewNodeModal from "./components/modals/addNewNodeModal";
import RenderIf from "./components/common/RenderIf";
import MindMapBtn from "./components/mindMap";
import DisplayMindMap from "./components/mindMap/displayMindMap";

function App() {
  const [mindMaps, setMindMaps] = useState([]);
  const [showAddMindMapModal, setShowAddMindMapModal] = useState(false);
  const [showCurrMindMaps, setShowCurrMindMaps] = useState(false);
  const [selectedMindMap, setSelectedMindMap] = useState(null);
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
              <MindMapBtn
                {...{ mindMap, selectedMindMap, setSelectedMindMap }}
              />
            </React.Fragment>
          ))}
        </div>
      </RenderIf>
      <div className="mt-3 overflow-auto">
        <DisplayMindMap
          {...{ mindMap: selectedMindMap, setCurrMindMap, setShowAddNodeModal }}
        />
      </div>
      <AddMindMapModal
        {...{
          fetchMindMaps,
          showAddMindMapModal,
          setShowAddMindMapModal,
        }}
      />
      <AddNewNodeModal
        {...{
          fetchMindMaps,
          showAddNodeModal,
          setShowAddNodeModal,
          selectedMindMap,
          currMindMap,
        }}
      />
    </div>
  );
}

export default App;

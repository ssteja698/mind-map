import React, { useEffect, useState } from "react";

const MindMapBtn = ({ mindMap, selectedMindMap, setSelectedMindMap }) => {
  const [showMindMap, setShowMindMap] = useState(false);

  useEffect(() => {
    if (selectedMindMap && selectedMindMap.id === mindMap.id) {
      setSelectedMindMap(mindMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mindMap]);

  useEffect(() => {
    if (selectedMindMap) {
      setShowMindMap(selectedMindMap.id === mindMap.id);
    } else {
      setShowMindMap(false);
    }
  }, [mindMap.id, selectedMindMap]);

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
    </div>
  );
};

export default MindMapBtn;

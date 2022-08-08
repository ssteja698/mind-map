import React, { useState } from "react";
import RenderIf from "../common/RenderIf";
import { generateNewColor, invertColor } from "../utils/helper";
import "./styles.css";

const DisplayMindMap = ({ mindMap, setCurrMindMap, setShowAddNodeModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddBtnForLeaf, setShowAddBtnForLeaf] = useState(false);
  const mindMapColor = mindMap?.color || generateNewColor();
  const nameColor = invertColor(mindMapColor, true);
  const mindMapStyles = {
    width: "fit-content",
    position: "relative",
    border: `2px solid ${nameColor}`,
    backgroundColor: mindMapColor,
    color: nameColor,
  };

  if (!mindMap) {
    return null;
  }

  mindMap.color ||= mindMapColor;

  const renderVerticalLine = ({ nameColor }) => {
    return (
      <div
        style={{
          height: 20,
          width: 2,
          background: nameColor,
        }}
      ></div>
    );
  };

  const renderAddBtn = ({ hideTooltip = false }) => {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center mindMap__addBtn"
          style={{
            width: 20,
            height: 20,
            cursor: "pointer",
            background: "#000",
            color: "#fff",
            borderRadius: "50%",
            position: "relative",
          }}
          onClick={() => {
            setCurrMindMap(mindMap);
            setShowAddNodeModal(true);
          }}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </div>
        {!hideTooltip && <div className="tooltipDiv">Add a new node</div>}
      </>
    );
  };

  if (isOpen && mindMap?.children?.length) {
    return (
      <div
        className="d-flex flex-column align-items-center m-auto p-2 rounded-3 text-nowrap overflow-auto"
        style={mindMapStyles}
      >
        <h4 className="p-0 m-0">{mindMap?.name}</h4>
        <RenderIf condition={mindMap?.description}>
          <h5>{mindMap?.description}</h5>
        </RenderIf>
        {renderVerticalLine({ nameColor })}
        {renderAddBtn({})}
        <div
          className="d-flex"
          style={{
            borderTop: `2px solid ${nameColor}`,
          }}
        >
          {mindMap?.children.map((node, index, children) => (
            <div
              key={`${node.name}--${node.description}--${node.children?.length}`}
              className="d-flex flex-column align-items-center"
            >
              {renderVerticalLine({ nameColor })}
              <div
                className="mindMap__triangleDown"
                style={{
                  borderTop: `8px solid ${nameColor}`,
                }}
              ></div>
              <div
                key={`${node.name}_${node.description}`}
                className={index === children.length - 1 ? "" : "me-3"}
              >
                <DisplayMindMap
                  {...{ mindMap: node, setCurrMindMap, setShowAddNodeModal }}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-3 cursor-pointer border-0 rounded-3"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          Hide mind map
        </button>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center m-auto p-2 rounded-3"
      style={mindMapStyles}
      onMouseEnter={() => {
        if (!mindMap?.children?.length) {
          setShowAddBtnForLeaf(true);
        }
      }}
      onMouseLeave={() => {
        if (showAddBtnForLeaf) setShowAddBtnForLeaf(false);
      }}
    >
      <RenderIf condition={mindMap?.description || mindMap?.children?.length}>
        <h4 className="p-0 m-0">{mindMap?.name}</h4>
      </RenderIf>
      <RenderIf
        condition={!(mindMap?.description || mindMap?.children?.length)}
      >
        <h5>{mindMap?.name}</h5>
      </RenderIf>
      <RenderIf
        condition={
          mindMap?.description &&
          (!mindMap?.children || !mindMap?.children.length)
        }
      >
        <h5>{mindMap?.description}</h5>
      </RenderIf>
      <RenderIf condition={showAddBtnForLeaf}>
        {renderAddBtn({ hideTooltip: true })}
      </RenderIf>
      <RenderIf condition={mindMap?.children?.length}>
        <button
          className="mt-1 p-1 px-2 cursor-pointer border-0 rounded-3"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          Show mind map
        </button>
      </RenderIf>
    </div>
  );
};

export default DisplayMindMap;

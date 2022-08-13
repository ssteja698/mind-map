import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AddMindMapModal from "../AddMindMapModal";

const mockedSetShowAddMindMapModal = jest.fn();
const mockedSetMainNodeDetails = jest.fn();
const mockedAddMindMapBtnClick = jest.fn();

it("renders body in the modal", () => {
  render(
    <AddMindMapModal
      showAddMindMapModal={true}
      setShowAddMindMapModal={mockedSetShowAddMindMapModal}
      mainNodeDetails={{
        name: "",
        description: "",
        children: null,
      }}
      setMainNodeDetails={mockedSetMainNodeDetails}
      onAddMindMapBtnClick={mockedAddMindMapBtnClick}
    />
  );
  const heading = screen.getByRole("heading", { name: "Add new mind map" });
  expect(heading).toBeInTheDocument();
  const nameInputEl = screen.getByPlaceholderText("Enter Name");
  expect(nameInputEl).toBeInTheDocument();
  const descInputEl = screen.getByPlaceholderText("Enter Description");
  expect(descInputEl).toBeInTheDocument();
  const btnEl = screen.getByRole("button", { name: "Add" });
  expect(btnEl).toBeInTheDocument();
  const cancelBtnEl = screen.getByRole("button", { name: "Cancel" });
  expect(cancelBtnEl).toBeInTheDocument();
});

it("checks if modal close is triggered when cancel clicked", () => {
  render(
    <AddMindMapModal
      showAddMindMapModal={true}
      setShowAddMindMapModal={mockedSetShowAddMindMapModal}
      mainNodeDetails={{
        name: "",
        description: "",
        children: null,
      }}
      setMainNodeDetails={mockedSetMainNodeDetails}
      onAddMindMapBtnClick={mockedAddMindMapBtnClick}
    />
  );
  const cancelBtnEl = screen.getByRole("button", { name: "Cancel" });
  fireEvent.click(cancelBtnEl);
  expect(mockedSetShowAddMindMapModal).toHaveBeenCalledTimes(1);
});

it("checks if modal addBtnCall is triggered when add clicked", () => {
  render(
    <AddMindMapModal
      showAddMindMapModal={true}
      setShowAddMindMapModal={mockedSetShowAddMindMapModal}
      mainNodeDetails={{
        name: "",
        description: "",
        children: null,
      }}
      setMainNodeDetails={mockedSetMainNodeDetails}
      onAddMindMapBtnClick={mockedAddMindMapBtnClick}
    />
  );
  const addBtnEl = screen.getByRole("button", { name: "Add" });
  fireEvent.click(addBtnEl);
  expect(mockedAddMindMapBtnClick).toHaveBeenCalledTimes(1);
});

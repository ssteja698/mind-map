import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "../Modal";

const mockedOnClose = jest.fn();

it("renders title in the modal", () => {
  render(
    <Modal
      show={true}
      title="add mind map modal"
      width="500px"
      onClose={mockedOnClose}
    />
  );
  const headingEl = screen.getByRole("heading", { name: "add mind map modal" });
  expect(headingEl).toBeInTheDocument();
});

it("renders body in the modal", () => {
  render(
    <Modal
      show={true}
      title="add mind map modal"
      children={<div>modal body</div>}
      width="500px"
      onClose={mockedOnClose}
    />
  );
  const divEl = screen.getByText("modal body");
  expect(divEl).toBeInTheDocument();
});

it("renders footer in the modal", () => {
  render(
    <Modal
      show={true}
      title="add mind map modal"
      children={<div>modal body</div>}
      footer="modal footer"
      width="500px"
      onClose={mockedOnClose}
    />
  );
  const divEl = screen.getByText("modal footer");
  expect(divEl).toBeInTheDocument();
});

it("checks if modal close btn click is triggered", () => {
  render(
    <Modal
      show={true}
      title="add mind map modal"
      children={<div>modal body</div>}
      footer="modal footer"
      width="500px"
      onClose={mockedOnClose}
    />
  );
  const closeBtn = screen.getByTestId("close-btn");
  fireEvent.click(closeBtn);
  expect(mockedOnClose).toHaveBeenCalledTimes(1);
});

import React from "react";
import { render } from "react-testing-library";
import renderer from "react-test-renderer";
import UI from "../ui";

jest.mock("../helpers", () => {
  return {
    getMediaStream: jest.fn(() => ({})),
  };
});

describe("Video", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<UI />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Displays the correct video title", () => {
    const { getByTestId } = render(<UI />);
    expect(getByTestId("video-title")).toHaveTextContent("Video Title");
  });

  test("Displays the correct video button", () => {
    const { getByTestId } = render(<UI />);
    expect(getByTestId("video-button")).toHaveTextContent("Open Camera");
  });

  test("Displays the 'Take Photo' video button", () => {
    const { getByText } = render(<UI />);
    expect(getByText(/Take Photo/i)).toBeTruthy();
  });

  test("Renders a canvas element", () => {
    const { getByTestId } = render(<UI />);
    expect(getByTestId("canvas")).toBeTruthy();
  });
});

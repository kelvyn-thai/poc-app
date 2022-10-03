import { render } from "@testing-library/react";
import Home from "./Home";
import { sum } from "./Home.utils";

describe("test home page", () => {
  test("test fn cal sum", () => {
    expect(sum(1, 2)).toEqual(3);
  });
});

test("load and display home greetings", () => {
  const renderObj = render(<Home />);
  const { getByText } = renderObj;
  expect(getByText("MEETING THE CHALLENGES")).toBeInTheDocument();
});

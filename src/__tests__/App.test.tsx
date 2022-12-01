import { render, screen } from "@testing-library/react";
import App from "../App";

test("App renders properly", () => {
  render(<App />);
  const linkElement = screen.getByText(/add your feedback/i);
  expect(linkElement).toBeInTheDocument();
});
test("Header renders properly", () => {
  render(<App />);
  const header = screen.getByRole("heading", { name: /checkout/i });
  expect(header).toBeInTheDocument();
});

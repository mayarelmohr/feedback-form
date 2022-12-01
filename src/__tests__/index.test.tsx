import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Index from "pages/Home";
import { getTextField } from "test-utils";
import userEvent from "@testing-library/user-event";
import App from "App";

describe("Home page renders all elements", () => {
  it("Home page matches snapshot", () => {
    const { container } = render(<Index />, { wrapper: BrowserRouter });
    expect(container).toMatchSnapshot();
  });

  it("Home page has heading", () => {
    render(<Index />, { wrapper: BrowserRouter });
    const heading = screen.getByRole("heading", {
      name: /add your feedback/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe("Feedback Form", () => {
  it("Form has all inputs rendered", () => {
    render(<Index />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
    const button = screen.getByText(/submit feedback/i);
    expect(button).toBeInTheDocument();
  });

  it("goes to next page when all fields pass validation and submit feedback", async () => {
    render(<App />);
    userEvent.type(getTextField("name"), "John");
    userEvent.type(getTextField("email"), "john.doe@gmail.com");
    userEvent.type(getTextField("comment"), "Amazing product");
    userEvent.click(screen.getByTestId("2-stars"));
    userEvent.click(screen.getByText(/submit feedback/i));
    const heading = await screen.findByRole("heading", {
      name: /feedback results/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("has all fields required before submission", () => {
    render(<Index />, { wrapper: BrowserRouter });
    userEvent.click(screen.getByText(/submit feedback/i));
    expect(screen.getByText(/please add your name./i)).toBeInTheDocument();
    expect(screen.getByText(/please add your email./i)).toBeInTheDocument();
    expect(screen.getByText(/please add your comment./i)).toBeInTheDocument();
    expect(screen.getByText(/please add your rating./i)).toBeInTheDocument();
  });

  it("shows error when email is invalid", async () => {
    render(<Index />, { wrapper: BrowserRouter });
    const email = getTextField("email");
    userEvent.type(getTextField("email"), "john.doe");
    fireEvent.focusOut(email);
    const emailError = await screen.getByText(/Email is not valid./i);
    expect(emailError).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Results from "pages/Results";
import { getTextField } from "test-utils";
import userEvent from "@testing-library/user-event";
import { FeedbackListProvider } from "store/context/feedbackProvider";
import { InitialStateType } from "store/types";
import App from "App";

const initialState: InitialStateType = {
  feedbackList: [
    {
      name: "john doe",
      email: "john.doe@gmail.com",
      rating: 4,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quod impedit alias vitae molestias aperiam animi sunt tenetur harum molestiae repellat dolorum, exercitationem veritatis reprehenderit obcaecati. Ratione quaerat minus odit.",
    },
  ],
  ratingList: [0, 0, 0, 1, 0],
};

const initialEmptyState: InitialStateType = {
  feedbackList: [],
  ratingList: [0, 0, 0, 0, 0],
};

const renderResultsPageWithContext = (initialState: InitialStateType) => {
  return render(
    <FeedbackListProvider initialState={initialState}>
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    </FeedbackListProvider>
  );
};

describe("Feedback results", () => {
  it("Results page matches snapshot", () => {
    const { container } = renderResultsPageWithContext(initialState);
    expect(container).toMatchSnapshot();
  });

  it("Go back button shows an empty form", async () => {
    render(<App />);
    userEvent.type(getTextField("name"), "John");
    userEvent.type(getTextField("email"), "john.doe@gmail.com");
    userEvent.type(getTextField("comment"), "Amazing product");
    userEvent.click(screen.getByTestId("2-stars"));
    userEvent.click(screen.getByText(/submit feedback/i));
    userEvent.click(screen.getByText(/go back/i));
    const heading = await screen.findByRole("heading", {
      name: /add your feedback/i,
    });
    expect(heading).toBeInTheDocument();
    expect(getTextField("name")).toHaveValue("");
    expect(getTextField("email")).toHaveValue("");
    expect(getTextField("comment")).toHaveValue("");
    const ratings = screen.getAllByRole("radio");
    ratings.forEach((rating) => {
      expect(rating).not.toBeChecked();
    });
  });

  it("shows list of feedbacks", () => {
    renderResultsPageWithContext(initialState);
    expect(
      screen.getByText(initialState.feedbackList[0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(initialState.feedbackList[0].email)
    ).toBeInTheDocument();
    expect(
      screen.getByText(initialState.feedbackList[0].comment)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`rating-${initialState.feedbackList[0].rating}-stars`)
    ).toBeInTheDocument();
  });

  it("shows no results when feedback is empty", () => {
    renderResultsPageWithContext(initialEmptyState);
    expect(screen.getByText(/there are no results/i)).toBeInTheDocument();
  });
});

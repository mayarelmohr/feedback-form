import { Dispatch } from "react";

// Generic types
export type FeedbackItem = {
  name: string;
  email: string;
  comment: string;
  rating: number;
};

export type FeedbackList = FeedbackItem[];

// Reducer types
export enum FeedbackActions {
  ADD = "ADD_FEEDBACK",
}

export type Action = {
  type: FeedbackActions;
  payload: FeedbackItem;
};

export type InitialStateType = {
  feedbackList: FeedbackList;
  ratingList: Array<number>;
};

// Context types
export type FeedbackContextType = {
  state: InitialStateType;
  dispatch: Dispatch<Action>;
};

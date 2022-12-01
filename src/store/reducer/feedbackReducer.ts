import {
  FeedbackItem,
  FeedbackActions,
  Action,
  InitialStateType,
} from "../types";

export const feedbackListReducer = (
  state: InitialStateType,
  action: Action
) => {
  const { type, payload } = action;
  if (type === FeedbackActions.ADD) {
    const newRatingList = [...state.ratingList];
    newRatingList[payload.rating - 1] += 1;
    return {
      ...state,
      feedbackList: [...state.feedbackList, payload],
      ratingList: [...newRatingList],
    };
  }
  return state;
};

export const addFeedback = (data: FeedbackItem) => {
  return { type: FeedbackActions.ADD, payload: data };
};

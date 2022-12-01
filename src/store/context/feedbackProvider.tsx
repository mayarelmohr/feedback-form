import { createContext, useContext, useReducer, ReactNode, FC } from "react";
import { FeedbackContextType, InitialStateType } from "../types";
import { feedbackListReducer } from "store/reducer/feedbackReducer";
import { MAX_RATING } from "utils/constants";

// Initial state here is empty feedback list
// Rating list that has count of ratings mapping to index
// For example if we have 2 ratings for 5 stars then the array should have the number 2 at Index 4
// [0,0,0,0,2]

const initialFeedbackState: InitialStateType = {
  feedbackList: [],
  ratingList: new Array(MAX_RATING).fill(0),
};

const FeedbackListContext = createContext<FeedbackContextType>({
  state: initialFeedbackState,
  dispatch: () => null,
});

export const FeedbackListProvider: FC<{
  children: ReactNode;
  initialState?: InitialStateType;
}> = ({ children, initialState = initialFeedbackState }) => {
  const [state, dispatch] = useReducer(feedbackListReducer, initialState);
  return (
    <FeedbackListContext.Provider value={{ state, dispatch }}>
      {children}
    </FeedbackListContext.Provider>
  );
};

export const useFeedbackListContext = () => {
  return useContext(FeedbackListContext);
};

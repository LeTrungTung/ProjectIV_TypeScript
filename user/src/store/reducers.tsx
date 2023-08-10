// import { combineReducers } from "redux";
// import userSlice from "./userSlice";

// const rootReducer = combineReducers({
//   user: userSlice,
// });

// export default rootReducer;

import {
  combineReducers,
  AnyAction,
  CombinedState,
  Reducer,
} from "redux";
import userSlice, { UserState } from "./userSlice"; // Make sure to import the correct UserState type

interface RootState {
  user: UserState; // Update with the correct type if needed
}

const rootReducer: Reducer<
  CombinedState<RootState>,
  AnyAction
> = combineReducers({
  user: userSlice,
});

export default rootReducer;

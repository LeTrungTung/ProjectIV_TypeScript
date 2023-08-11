import {
  combineReducers,
  AnyAction,
  CombinedState,
  Reducer,
} from "redux";
import userSlice, { UserState } from "./userSlice"; // Make sure to import the correct UserState type
import editNameSlice from "./editNameSlice";

interface RootState {
  user: UserState; // Update with the correct type if needed
  editName: any;
}

const rootReducer: Reducer<
  CombinedState<RootState>,
  AnyAction
> = combineReducers({
  user: userSlice,
  editName: editNameSlice,
});

export default rootReducer;

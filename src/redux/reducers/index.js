import { combineReducers } from "redux";
import ShowAddGroupTabReducer from "./ShowAddGroupTabReducer";
import SetThemeReducer from "./SetThemeReducer";

const reducers = combineReducers({
  showAddGroupTab: ShowAddGroupTabReducer,
  setTheme: SetThemeReducer,
});

export default reducers;

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import dashReducer from "./dashReducer";
import subReducer from "./subReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  dash: dashReducer,
  subject: subReducer,
});

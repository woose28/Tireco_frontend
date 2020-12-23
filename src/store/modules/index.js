import { combineReducers } from "redux";
import imgAnalysis from "./imgAnalysis";
import imgLoad from "./imgLoad";

export default combineReducers({
    imgAnalysis,
    imgLoad
});

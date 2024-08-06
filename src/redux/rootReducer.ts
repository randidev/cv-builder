import { combineReducers } from "@reduxjs/toolkit";

import { candidateReducer, tempCandidateReducer } from "./candidate/slices";
import { utilsReducer } from "./utils/slices";
import { templateReducer, tempTemplateReducer } from "./templates/slices";

const appReducer = combineReducers({
  candidate: candidateReducer,
  utils: utilsReducer,
  templates: templateReducer,
  templateTemporary: tempTemplateReducer,
  candidateTemporary: tempCandidateReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export { rootReducer };

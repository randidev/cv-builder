import { RootState } from "../store";
import { initialState } from "./slices";

const templates = (state: RootState) => state.templates.items || initialState;
const templateTemporary = (state: RootState) =>
  state.templateTemporary.detail || initialState;

const selectors = {
  templates,
  templateTemporary,
};

export default selectors;

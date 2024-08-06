import { RootState } from "../store";
import { initialState } from "./slices";

const utils = (state: RootState) => state.utils || initialState;

const selectors = {
  utils,
};

export default selectors;

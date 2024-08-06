import { RootState } from "../store";
import { initialState } from "./slices";

const candidate = (state: RootState) => state.candidate || initialState;

const selectors = {
  candidate,
};

export default selectors;

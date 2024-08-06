import { RootState } from "../store";
import { initialState } from "./slices";

const candidate = (state: RootState) => state.candidate.items || initialState;
const candidateTemporary = (state: RootState) =>
  state.candidateTemporary.detail || initialState;

const selectors = {
  candidate,
  candidateTemporary,
};

export default selectors;

import { candidateActions, tempCandidateActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { addNewCandidate, editCandidate, removeCandidate } = candidateActions;
const { setTempCandidate } = tempCandidateActions;

const addNewCandidateAction =
  (payload: CandidateItem): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(addNewCandidate(payload));
  };

const editCandidateAction =
  (payload: CandidateItem): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(editCandidate(payload));
  };

const removeCandidateAction =
  (payload: CandidateItem): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(removeCandidate(payload));
  };

const setTempCandidateAction =
  (payload: CandidateItem): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setTempCandidate(payload));
  };

const actions = {
  addNewCandidateAction,
  removeCandidateAction,
  editCandidateAction,
  setTempCandidateAction,
};

export default actions;

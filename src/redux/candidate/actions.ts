import { candidateActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setCandidateProfile } = candidateActions;

const setCandidateProfileAction =
  (payload: Candidate): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setCandidateProfile(payload));
  };

const actions = {
  setCandidateProfileAction,
};

export default actions;

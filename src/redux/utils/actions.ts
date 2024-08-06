import { utilsActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setUtils } = utilsActions;

const setUtilsAction =
  (payload: Utils["interface"]): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setUtils(payload));
  };

const actions = {
  setUtilsAction,
};

export default actions;

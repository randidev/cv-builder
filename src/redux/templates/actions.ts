import { templateActions, tempTemplateActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { addNewTemplate, editTemplate, removeTemplate } = templateActions;
const { setTempTemplate } = tempTemplateActions;

const addNewTemplateAction =
  (payload: Template): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(addNewTemplate(payload));
  };

const editTemplateAction =
  (payload: Template): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(editTemplate(payload));
  };

const removeTemplateAction =
  (payload: Template): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(removeTemplate(payload));
  };

const setTempTemplateAction =
  (payload: Template): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setTempTemplate(payload));
  };

const actions = {
  addNewTemplateAction,
  removeTemplateAction,
  editTemplateAction,
  setTempTemplateAction,
};

export default actions;

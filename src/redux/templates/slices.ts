import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: TemplateState = {
  items: [],
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    addNewTemplate: (state, { payload }: PayloadAction<Template>) => {
      const newState = [...state.items];
      newState.push(payload);

      state.items = newState;
    },
    editTemplate: (state, { payload }: PayloadAction<Template>) => {
      const currentState = [...state.items];
      const newStateIndex = currentState.findIndex((t) => t.id === payload.id);
      if (newStateIndex !== -1) {
        currentState[newStateIndex] = payload;
      }

      state.items = currentState;
    },
    removeTemplate: (state, { payload }: PayloadAction<Template>) => {
      const currentState = [...state.items];
      const newState = currentState.filter((t) => t.id !== payload.id);

      state.items = newState;
    },
  },
});

// Temporary template use when creating a new template
const initialTempState: TemporaryTemplateState = {
  detail: {
    id: "",
    type: "1",
    title: "",
    fontSize: 100,
    colourScheme: "#000",
    margin: 100,
    watermark: "",
  },
};

const tempTemplateSlice = createSlice({
  name: "templateTemporary",
  initialState: initialTempState,
  reducers: {
    setTempTemplate: (state, { payload }: PayloadAction<Template>) => {
      state.detail = payload;
    },
  },
});

const { actions: templateActions, reducer: templateReducer } = templateSlice;
const { actions: tempTemplateActions, reducer: tempTemplateReducer } =
  tempTemplateSlice;

export {
  templateActions,
  templateReducer,
  tempTemplateActions,
  tempTemplateReducer,
};

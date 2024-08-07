import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: Utils = {
  interface: {
    showEditor: false,
  },
};

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setUtils: (state, { payload }: PayloadAction<Utils["interface"]>) => {
      state.interface = { ...payload };
    },
    PURGE: (state) => {
      state = initialState;
    },
  },
});

const { actions: utilsActions, reducer: utilsReducer } = utilsSlice;

export { utilsActions, utilsReducer };

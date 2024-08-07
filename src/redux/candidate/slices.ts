import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: CandidateState = { items: [] };

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    addNewCandidate: (state, { payload }: PayloadAction<CandidateItem>) => {
      const newState = [...state.items];
      newState.push(payload);

      state.items = newState;
    },
    editCandidate: (state, { payload }: PayloadAction<CandidateItem>) => {
      const currentState = [...state.items];
      const newStateIndex = currentState.findIndex((t) => t.id === payload.id);
      if (newStateIndex !== -1) {
        currentState[newStateIndex] = payload;
      }

      state.items = currentState;
    },
    removeCandidate: (state, { payload }: PayloadAction<CandidateItem>) => {
      const currentState = [...state.items];
      const newState = currentState.filter((t) => t.id !== payload.id);

      state.items = newState;
    },
    PURGE: (state) => {
      state = initialState;
    },
  },
});

// Temporary template use when creating a new template
export const initialTempState: TemporaryCandidateState = {
  detail: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    experiences: [],
    education: [],
    certifications: [],
    description: "",
    references: [],
    linkedin: "",
    skills: [],
    jobTitle: "",
    idTemplate: "",
  },
};

const tempCandidateSlice = createSlice({
  name: "candidateTemporary",
  initialState: initialTempState,
  reducers: {
    setTempCandidate: (state, { payload }: PayloadAction<CandidateItem>) => {
      state.detail = payload;
    },
  },
});

const { actions: candidateActions, reducer: candidateReducer } = candidateSlice;
const { actions: tempCandidateActions, reducer: tempCandidateReducer } =
  tempCandidateSlice;

export {
  candidateActions,
  candidateReducer,
  tempCandidateActions,
  tempCandidateReducer,
};

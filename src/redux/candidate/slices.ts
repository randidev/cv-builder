import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: Candidate = {
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
};

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    setCandidateProfile: (state, { payload }: PayloadAction<Candidate>) => {
      state = payload;
    },
    PURGE: (state) => {
      state = initialState;
    },
  },
});

const { actions: candidateActions, reducer: candidateReducer } = candidateSlice;

export { candidateActions, candidateReducer };

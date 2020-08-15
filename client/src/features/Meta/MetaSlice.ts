import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface MetaState {
  status: string;
  error: Error | null;
  data: unknown[];
}

const initialState: MetaState = {
  status: "idle",
  error: null,
  data: [],
};

export const metaSlice = createSlice({
  name: "metaSlice",
  initialState,
  reducers: {
    SetLoading: (state) => ({
      ...state,
      status: "loading",
    }),
    SetError: (state, action: PayloadAction<Error>) => ({
      ...state,
      status: "error",
      error: action.payload,
    }),
    SetReady: (state) => ({
      ...state,
      status: "ready",
    }),
    SetData: (state, action: PayloadAction<unknown>) => ({
      ...state,
      data: [action.payload],
    }),
  },
});

export const { SetLoading, SetError, SetReady, SetData } = metaSlice.actions;

export const getStatus = (state: RootState) => state.meta.status;
export const getError = (state: RootState) => state.meta.error;
export const getData = (state: RootState) => state.meta.data;

export default metaSlice.reducer;

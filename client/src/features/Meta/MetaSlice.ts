import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface MetaState {
  status: string;
  error: string | null;
  users: any[];
}

const initialState: MetaState = {
  status: "idle",
  error: null,
  users: [],
};

export const metaSlice = createSlice({
  name: "metaSlice",
  initialState,
  reducers: {
    SetLoading: (state) => ({
      ...state,
      status: "loading",
    }),
    SetError: (state, action: PayloadAction<string>) => ({
      ...state,
      status: "error",
      error: action.payload,
    }),
    SetReady: (state) => ({
      ...state,
      status: "ready",
    }),
    SetUsers: (state, action: PayloadAction<any>) => ({
      ...state,
      users: action.payload,
    }),
  },
});

export const { SetLoading, SetError, SetReady, SetUsers } = metaSlice.actions;

export const getStatus = (state: RootState) => state.meta.status;
export const getError = (state: RootState) => state.meta.error;
export const getUsers = (state: RootState) => state.meta.users;

export default metaSlice.reducer;

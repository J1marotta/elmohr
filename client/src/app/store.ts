import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import SearchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    search: SearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

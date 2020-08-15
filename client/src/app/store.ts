import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import SearchReducer from '../features/search/searchSlice'
import MetaReducer from '../features/Meta/MetaSlice'

export const store = configureStore({
    reducer: {
        search: SearchReducer,
        meta: MetaReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

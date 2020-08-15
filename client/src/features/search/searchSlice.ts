import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface QueryState {
  query: string;
}

const initialState: QueryState = {
  query: '',
}

export const searchSlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    SetQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    ClearQuery: (state) => ({
      ...state,
      query: '',
    }),
  },
})

export const { SetQuery, ClearQuery } = searchSlice.actions

export const selectSearchQuery = (state: RootState): string => state.search.query

export default searchSlice.reducer

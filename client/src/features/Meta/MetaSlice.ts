import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { FullUser as TwitterUser } from 'twitter-d'


interface MetaState {
    status: string;
    error: string | null;
    users: TwitterUser[];
}

const initialState: MetaState = {
    status: 'idle',
    error: null,
    users: [],
}

export const metaSlice = createSlice({
    name: 'metaSlice',
    initialState,
    reducers: {
        SetIdle: (state) => ({
            ...state,
            status: 'idle',
        }),
        SetLoading: (state) => ({
            ...state,
            status: 'loading',
        }),
        SetError: (state, action: PayloadAction<string>) => ({
            ...state,
            status: 'error',
            error: action.payload,
        }),
        SetReady: (state) => ({
            ...state,
            status: 'ready',
        }),
        SetUsers: (state, action: PayloadAction<TwitterUser[]>) => ({
            ...state,
            users: action.payload,
        }),
    },
})

export const {
    SetLoading,
    SetError,
    SetReady,
    SetUsers,
    SetIdle,
} = metaSlice.actions

export const getStatus = (state: RootState): string => state.meta.status
export const getError = (state: RootState): string | null => state.meta.error
export const getUsers = (state: RootState): TwitterUser[] => state.meta.users

export default metaSlice.reducer

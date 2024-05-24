import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticated', 'not-authenticated'
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onCheckingAuth: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined; 
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined; 
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        onClearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    }
});


export const { onCheckingAuth, onLogin, onLogout, onClearErrorMessage } = authSlice.actions;
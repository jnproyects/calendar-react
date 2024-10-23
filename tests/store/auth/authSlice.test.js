import { authSlice, onCheckingAuth, onClearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser";


describe('Pruebas en authSlice', () => {
    
    test('debe regresar el estado inicial', () => {
        expect( authSlice.getInitialState() ).toEqual( initialState );
    });

    test('debe revisar el estado de la autenticación', () => {
        const state = authSlice.reducer( authenticatedState, onCheckingAuth() );
        expect( state ).toEqual( initialState );
    });

    test('debe realizar un login', () => {
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        // console.log(state);
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });
    });

    test('debe realizar el logout', () => {
        const state = authSlice.reducer( authenticatedState, onLogout() );
        // console.log(state);
        expect( state ).toEqual(notAuthenticatedState);
    });

    test('debe realizar el logout y regresar un mensaje de error', () => {
        const errorMessage = 'Credenciales incorrectas';
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );
        // console.log(state);
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage
        });
    });

    test('debe limpiar el mensaje de error', () => {
        const errorMessage = 'Credenciales incorrectas';
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        // console.log(state);
        const newState = authSlice.reducer( state, onClearErrorMessage() );
        // console.log(newState);
        expect( newState.errorMessage ).toBe(undefined);
    });
});
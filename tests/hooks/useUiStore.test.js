import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks/useUiStore";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../../src/store";


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Pruebas en useUiStore', () => {
    
    test('debe regresar los valores por defecto', () => {
        
        const mockStore = getMockStore({
            isDateModalOpen: false
        });

        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } > {children} </Provider> 
        });
        // console.log(result);
        
        expect( result.current ).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        });

    });


    test('openDateModal debe cambiar isDateModalOpen a "true"', () => {

        const mockStore = getMockStore({
            isDateModalOpen: false
        });

        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } > {children} </Provider> 
        });

        const { openDateModal } = result.current;

        act( () => {
            openDateModal();
        });

        expect(result.current.isDateModalOpen).toBeTruthy();

    });

    test('closeDateModal debe cambiar isDateModalOpen a "false"', () => {
       
        const mockStore = getMockStore({
            isDateModalOpen: true
        });

        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } > {children} </Provider> 
        });

        act( () => {
            result.current.closeDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();

    });


    test('toggleDateModal debe cambiar el estado', () => {
       
        const mockStore = getMockStore({
            isDateModalOpen: true
        });

        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={ mockStore } > {children} </Provider> 
        });

        act( () => {
            result.current.toggleDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();

        act( () => {
            result.current.toggleDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeTruthy();


    });

});
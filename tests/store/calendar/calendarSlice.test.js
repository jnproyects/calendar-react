import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState";

describe('Pruebas en calendarSlice', () => {
    
    test('debe regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
    });

    test('onSetActiveEvent debe activar el evento', () => {
        const event = events[0];
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( event ) );
        // console.log(state);
        expect( state.activeEvent ).toEqual( event );
    });

    test('onAddNewEvent debe agregar el evento', () => {
        const newEvent = {
            id: '3',
            start: new Date('2024-09-14 10:00:00'),
            end: new Date('2024-09-14 12:00:00'),
            title: 'Examen algoritmos',
            notes: 'Otra nota para el evento',
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
        // console.log(state);
        expect( state.events.length ).toBe(3);
        expect( state.events ).toEqual([ ...events, newEvent ]);
        expect( state.events[state.events.length - 1] ).toEqual( newEvent );
        expect( state.events[state.events.length - 1].id ).toBe( '3' );
    });


    test('onUpdateEvent debe actualizar el evento', () => {
        
        const updatedEvent = {
            id: '1',
            start: new Date('2024-10-21 10:00:00'),
            end: new Date('2024-10-21 12:00:00'),
            title: 'Cumpleaños de Juan actualizado!',
            notes: 'Alguna nota actualizada',
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );
        // console.log(state);

        expect( state.events ).toContain(updatedEvent);

    });

    test('onDeleteEvent debe borrar el evento activo', () => {
        const state = calendarSlice.reducer( calendarWithActiveEventsState, onDeleteEvent() );
        // console.log(state);
        expect( state.events ).not.toContain( events[0] );
        expect( state.events.activeEvent ).toBe(undefined);
    });
    

    test('onLoadEvents debe establecer los eventos y NO agregar eventos repetidos', () => {
       // initialState
        const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
        // console.log(state);
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events.length ).toBeGreaterThanOrEqual(1);
        expect( state.events ).toEqual( events );

        const newState = calendarSlice.reducer( state, onLoadEvents( events ) );
        expect( newState.events.length ).toBe(events.length);

    });

    test('onLogoutCalendar debe limpiar el estado', () => {
        const state = calendarSlice.reducer( calendarWithActiveEventsState, onLogoutCalendar() );
        expect( state ).toEqual( initialState );
    });
    

});
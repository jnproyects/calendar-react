import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { Provider } from "react-redux";
import { store } from "../../../src/store";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";


jest.mock('../../../src/hooks/useCalendarStore');

describe('Pruebas en <FabDelete />', () => {

    const mockStartDeletingEvent = jest.fn();

    beforeEach( () => jest.clearAllMocks() );
    
    test('debe mostrar el componente correctamente', () => {
        
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });

        render( <FabDelete /> );
        // screen.debug();

        const btn = screen.getByLabelText('btn-delete');
        // console.log(btn.classList.toString());
        
        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.classList ).toContain('fab-danger');
        expect( btn.style.display ).toBe('none');

    });

    test('debe mostrar el botón si existe un evento activo', () => {
        
        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });

        render( <FabDelete /> );
        // screen.debug();

        const btn = screen.getByLabelText('btn-delete');

        expect( btn.style.display ).toBe('');

    });


    test('debe llamar startDeletingEvent si existe un evento activo', () => {
        
        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        render( <FabDelete /> );
        // screen.debug();

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalled();

    });

});
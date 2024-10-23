import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar/pages/CalendarPage";

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar/pages/CalendarPage', () => ({
    CalendarPage: () => <h1>Calendar Page</h1>
}));

describe('Pruebas en <AppRouter />', () => {
    
    const mockCheckAuthToken = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('debe mostrar la pantalla de carga y llamar a checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking', 
            checkAuthToken: mockCheckAuthToken
        });
        
        render( <AppRouter /> );

        // screen.debug();

        expect( screen.getByRole('heading', {level: 3}).innerHTML ).toBe('Loading...');
        expect( mockCheckAuthToken ).toHaveBeenCalled();

    });


    test('debe mostrar el login en caso de NO estar autenticado', () => {
        
        useAuthStore.mockReturnValue({
            status: 'not-authenticated', 
            checkAuthToken: mockCheckAuthToken
        });

        const { container } = render(
            <MemoryRouter initialEntries={['/auth2/efka/nada']}>
                <AppRouter />
            </MemoryRouter>
        );

        // screen.debug();

        expect( screen.getByText('Ingreso') ).toBeTruthy();
        expect( container ).toMatchSnapshot();
    });


    test('debe mostrar el calendario si el usuario está autenticado', () => {
        
        useAuthStore.mockReturnValue({
            status: 'authenticated', 
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        // screen.debug();
        expect( screen.getByText('Calendar Page') ).toBeTruthy();


    });



});
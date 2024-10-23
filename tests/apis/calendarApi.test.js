import calendarApi from "../../src/apis/calendarApi";

describe('Pruebas en calendarApi', () => {

    test('debe tener la configuración por defecto', () => {
        // console.log(calendarApi);
        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
    });


    test('debe tener el x-token en el Header de todas las peticiones', async () => {
        // console.log(calendarApi);
        
        const token = 'ABC-123'; 
        localStorage.setItem('token', token );

        const res = await calendarApi.get('/auth')
        .then(res => res)
        .catch(res => res);

        expect( res.config.headers['x-token'] ).toBe( token );
        


    });

});
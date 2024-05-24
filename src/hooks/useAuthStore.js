import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../apis/calendarApi";
import { 
    onCheckingAuth,
    onClearErrorMessage,
    onLogin,
    onLogout,
    onLogoutCalendar } 
from "../store";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( (state) => state.auth );
    const dispatch = useDispatch();


    const startLogin = async ({ email, password }) => {

        dispatch( onCheckingAuth() );

        try {

            const { data } = await calendarApi.post('/auth',{ email, password });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() ); // almacenar la fecha en la que se genero el token
            
            dispatch( onLogin( { name: data.name, uid: data.uid } ) );

        } catch (error) {
            // console.log( error );
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( onClearErrorMessage() );
            }, 10);
        }

    }


    const startRegister = async ({ name, email, password }) => {

        dispatch( onCheckingAuth() );

        try {

            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() ); // almacenar la fecha en la que se genero el token

            dispatch( onLogin({ name: data.name, uid: data.uid }) );
            
        } catch (error) {
            // console.log( error );
            dispatch( onLogout( error.response.data?.msg || '--Error en el registro--') );
            setTimeout(() => {
                dispatch( onClearErrorMessage() );
            }, 10);

        }
    }


    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() ); // almacenar la fecha en la que se genero el token
            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }

    }


    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }



    return {
        // Propiedades
        status, 
        user, 
        errorMessage,

        // Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,

    }



}
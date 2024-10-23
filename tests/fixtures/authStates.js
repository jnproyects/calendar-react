

export const initialState = {
    status: 'checking',
    user: {},
    errorMessage: undefined
}

export const authenticatedState = {
    status: 'authenticated',
    user: {
        uid: '6716cbbb77de5f1574653b8f',
        name: 'Test User',
    },
    errorMessage: undefined
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    user: {},
    errorMessage: undefined
}




export const events = [
    {
        id: '1',
        start: new Date('2024-10-21 10:00:00'),
        end: new Date('2024-10-21 12:00:00'),
        title: 'Cumpleaños de Juan',
        notes: 'Alguna nota',
    },

    {
        id: '2',
        start: new Date('2024-11-09 10:00:00'),
        end: new Date('2024-11-09 12:00:00'),
        title: 'Reunión con Carlos',
        notes: 'Alguna nota para la reunión',
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null
}

export const calendarWithActiveEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] }
}

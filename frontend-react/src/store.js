import { createStore, action, persist  } from 'easy-peasy';

export const store = createStore(
    persist({
    connect: false,
        setConnect: action((state, payload) => {
            state.connect = payload;
        }),
    }),
);
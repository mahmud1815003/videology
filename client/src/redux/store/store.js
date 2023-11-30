import {configureStore} from '@reduxjs/toolkit';
import api from '../api/api';
import globalSlice from '../slice/global';
import authSlice from '../slice/auth';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [globalSlice.name]: globalSlice.reducer,
        [authSlice.name]: authSlice.reducer,
    },
    middleware: (getDefaultMiddlewares) => {
        return getDefaultMiddlewares().concat(api.middleware);
    },
    devTools: !import.meta.env.PROD,
});

export default store;
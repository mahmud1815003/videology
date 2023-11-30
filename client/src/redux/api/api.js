import {createApi, fetchBaseQuery,} from '@reduxjs/toolkit/query/react';

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API,
        prepareHeaders: async (headers, {getState}) => {
            const data = localStorage.getItem('auth');
            let token;
            if(data){
                token = JSON.parse(data)?.token;
            }
            if(token){
                headers.set('authorization', `${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['addFriend'],
    reducerPath: 'api',
    endpoints: (builder) => ({})
});

export default api;
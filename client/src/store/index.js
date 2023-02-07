import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import AccountReducer from './AccoutReducer'


const { composeWithDevTools } = require("redux-devtools-extension");

const reducer = combineReducers({
    account: AccountReducer,
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: composeWithDevTools,
})
export default store;
import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./counter.jsx";
import transferReducer from './reducer/transferReducer.jsx';
const store = configureStore({
    reducer: {
        counter: counterSlice,
        transferReducer
    },
})
export default store
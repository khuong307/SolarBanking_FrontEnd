import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./counter.jsx";
const store = configureStore({
    reducer: {
        counter: counterSlice
    },
})
export default store
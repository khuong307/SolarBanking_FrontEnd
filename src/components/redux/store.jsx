import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./counter.jsx";
import transferReducer from './reducer/transferReducer.jsx';
import notificationSlice from "./notification.jsx";
const store = configureStore({
    reducer: {
        counter: counterSlice,
        transferReducer,
        notification: notificationSlice
    },
})
export default store
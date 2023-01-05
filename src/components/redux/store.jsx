import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./counter.jsx";
import transferReducer from './reducer/transferReducer.jsx';
import notificationSlice from "./notification.jsx";
import LoadingReducer from './reducer/LoadingReducer.jsx';
const store = configureStore({
    reducer: {
        counter: counterSlice,
        transferReducer,
        LoadingReducer,
        notification: notificationSlice
    },
})
export default store
import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notificationList: []
    },
    reducers: {
        setUpNotification: (state, action) => {
            state.notificationList = action.payload;
        },

        updateIsSeen: (state, action) => {
            state.notificationList = state.notificationList.map(notification => {
                if (notification.notification_id === action.payload)
                    return {...notification, is_seen: 1};
                return notification;
            });
        },

        updateAllIsSeen: (state, action) => {
            state.notificationList = state.notificationList.map(notification => {
                if (notification.is_seen === 0)
                    return {...notification, is_seen: 1};
                return notification;
            });
        }
    }
});

export const { setUpNotification, updateIsSeen, updateAllIsSeen } = notificationSlice.actions;
export default notificationSlice.reducer;
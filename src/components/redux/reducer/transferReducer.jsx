import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    banks: [
        {
            value: 'TCB',
            label: 'Techcombank',
        },
        {
            value: 'Agribank',
            label: 'Agribank',
        },
        {
            value: 'VPBank',
            label: 'VPBank',
        },
    ],
    receivers: [
        {
            accountReceiver: "992250925226",
            bank: "Techcombank"
        },
        {
            accountReceiver: "99225092524226",
            bank: "VPBank"
        },
    ]
}

const transferReducer = createSlice({
    name: "transferReducer",
    initialState,
    reducers: {}
});

export const { } = transferReducer.actions

export default transferReducer.reducer
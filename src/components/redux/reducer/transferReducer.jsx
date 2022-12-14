import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    banks: [
        {
            value: 'Techcombank',
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
            accountReceiver: "333533636",
            bank: "VPBank"
        },
    ],
    defaultReceivers: [
        {
            accountReceiver: "992250925226",
            bank: "Techcombank"
        },
        {
            accountReceiver: "333533636",
            bank: "VPBank"
        },
    ],
}

const transferReducer = createSlice({
    name: "transferReducer",
    initialState,
    reducers: {
        searchReceiver: (state,action)=>{
            const textSearch= action.payload
            if(textSearch === ""){
                state.receivers = state.defaultReceivers
            }else{
                state.receivers = state.receivers.filter(item => item.accountReceiver.trim().toLowerCase().includes(textSearch.trim().toLowerCase()))
            }
        }
    }
});

export const {searchReceiver } = transferReducer.actions

export default transferReducer.reducer
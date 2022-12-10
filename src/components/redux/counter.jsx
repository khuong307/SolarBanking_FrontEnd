import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        tab_id: 1
    },
    reducers: {
        changeByID: (state, action) => {
            state.tab_id = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeByID } = counterSlice.actions
export default counterSlice.reducer
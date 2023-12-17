import { createSlice } from '@reduxjs/toolkit';

// Define a slice for addItem and delItem actions
const itemsSlice = createSlice({
    name: 'items',
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
        },
        delItem: (state, action) => {
            return state.filter((x) => x.id !== action.payload.id);
        },
    },
});

// Export actions
export const { addItem, delItem } = itemsSlice.actions;

// Export reducer
export default itemsSlice.reducer;

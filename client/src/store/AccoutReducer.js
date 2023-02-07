import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'account',
    initialState: {
        profile: null,
    },
    reducers: {
        setAccount: (state, action) => {
            state.profile = action.payload;
        },
    },
});
export default slice.reducer
export const { setAccount } = slice.actions
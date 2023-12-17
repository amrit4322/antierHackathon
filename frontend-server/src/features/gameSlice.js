import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../components/api/axios';
import { API_KEY } from '../components/api/apikey';

const gamesURL = `games`;

// Create an async thunk to fetch games
export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async () => {
        try {
            const response = await axios.get(`${gamesURL}?${API_KEY}`);
            return response.data.results;
        } catch (error) {
            throw Error(error.message);
        }
    }
);

// Define the game slice
const gameSlice = createSlice({
    name: 'games',
    initialState: {
        games: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export actions and reducer
export const selectGames = (state) => state.games.games;
export const selectStatus = (state) => state.games.status;
export const selectError = (state) => state.games.error;

export default gameSlice.reducer;

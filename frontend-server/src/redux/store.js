
import {  configureStore } from "@reduxjs/toolkit";


import gameReducer from '../features/gameSlice';
import itemsSlice from '../features/cartSlice';

const store=configureStore({
    reducer:{
        cart:itemsSlice,
        games:gameReducer
    }
    
})


export default store;
import React from 'react'
import { createSlice, configureStore } from '@reduxjs/toolkit'



const stateRedux = createSlice({
    name: "stateRedux",
    initialState: {
        heroes: []
    },
    reducers: {
        /***
         *   incremented: state => {
             
              state.value += 1
          },
          decremented: state => {
              state.value -= 1
          }, 
          mudeTeste: (state, action) => {
              state.teste = action.payload
          }
         */
        setHeroes: (state, action) => {
            state.heroes = action.payload
        }
    }
})


// export const { incremented, decremented, mudeTeste } = stateRedux.actions

export const { setHeroes } = stateRedux.actions

const store = configureStore({
    reducer: stateRedux.reducer
});


export default store;
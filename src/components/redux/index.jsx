import React from 'react'
import { createSlice, configureStore } from '@reduxjs/toolkit'



const stateRedux = createSlice({
    name: "stateRedux",
    initialState: {
        heroes: [],
        selectedHeroes: []
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
        },
        setSelectedHeroes: (state, action) => {
        
            

            const newState = {
                ...state, 
                selectedHeroes: action.payload ?  [...action.payload.slice(0, 2)] : []
            }

           // console.log("Estado após a atualização:", newState);

            return newState;
        }
    }
})


// export const { incremented, decremented, mudeTeste } = stateRedux.actions

export const { setHeroes, setSelectedHeroes } = stateRedux.actions

const store = configureStore({
    reducer: stateRedux.reducer
});


export default store;
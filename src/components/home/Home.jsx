import React, { useEffect, useState } from "react";
import './Home.css';

import axios from 'axios'

// redux
import { useDispatch, useSelector } from 'react-redux';
import store, { setHeroes } from "../redux";
// import store, { mudeTeste, incremented, decremented } from "../redux";



const Home = () => {


    // redux
    const dispatch = useDispatch();
    const heroes = useSelector((state) => {
        return state.heroes
    })
    /**
     *  const valorRedux = useSelector((state) => {
         return state.value
     });
     const teste = useSelector((state) => {
         return state.teste
     });
     */

    // url get heroes 
    const apiUrl = 'http://homologacao3.azapfy.com.br/api/ps/metahumans';

    const [state, setState] = useState({
        loaded: false,
        heroes: [],
        cardsComponent: []
    });

    useEffect(() => {

        if (!state.loaded) {
            getHeroes();
        }

        if (state.heroes.length > 0) {
            createCards();
        }

    }, [state.loaded, state.heroes])

    async function getHeroes() {

        await axios.get(apiUrl)
            .then(response => {

                dispatch(setHeroes(response.data))

                return setState({
                    ...state,
                    heroes: response.data,
                    loaded: true
                })
            })
            .catch(err => {
                console.log(err)

                return setState({
                    ...state,
                    loaded: true
                })
            })

    }

    function createCards() {

        let n = 0

        const cards = state.heroes.map(hero => {

            n++
            let {intelligence, strength, speed, durability, power, combat} = hero.powerstats
            const totalPower = (intelligence + strength + speed + durability + power + combat) 

            return (
                <div
                    className="hero"
                    key={hero.name + n}
                >
                    <img src={hero.images.sm} alt="" />
                    <div>
                        {hero.biography.fullName || hero.name}
                    </div>
                    <div>
                        {totalPower}
                    </div>
                </div>
            )
        })

        return setState({
            ...state,
            cardsComponent: cards
        })

    }

    /**
     *  <div>
            <p>Valor Redux: {valorRedux} palavra: {teste}</p>
            <button onClick={() => dispatch(incremented())}>Incrementar</button>
            <button onClick={() => dispatch(decremented())}>Decrementar</button>
            <button onClick={() => dispatch(mudeTeste('teste'))}>teste</button>
        </div>
     */

    return (
        <div className="Home">
            Home
            <p>
                Heroes length {heroes.length}
            </p>
            {state.cardsComponent}
        </div>
    );
};


export default Home;
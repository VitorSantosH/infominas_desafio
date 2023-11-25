import React, { useEffect, useState } from "react";
import './BattleArena.css';


// redux
import { useDispatch, useSelector } from 'react-redux';
import store, { setHeroes, setSelectedHeroes } from "../redux";


const BatleArena = () => {

    const dispatch = useDispatch();
    const selectedHeroes = useSelector((state) => {
        return state.selectedHeroes
    })
    const heroes = useSelector((state) => {
        return state.heroes
    })

    const [state, setState] = useState({

    })

    // criando cards dos herois 
    function createCards(position) {

        if (!heroes[position]) return 0

        let n = 0

        let hero = heroes[position - 1];



        const compCard = (

            <div
                className={`hero
                      ${hero.biography.alignment == "good" ? 'good' : 'bad'}
                        ${hero.appearance.gender == "Male" ? 'male' : 'female'}
                          ${selectedHeroes.includes(position) ? 'selected' : ''}
                        `}

                key={hero.name + n}

            >
                <img src={hero.images.sm} alt="" />

                <span>
                    {hero.biography.fullName || hero.name}
                </span>

            </div>

        )

        return compCard


    }



    return (
        <div className={`batleArena ${selectedHeroes.length > 1 ? 'active' : ''}`}>


            <div className="containerArena">
                <h1>Battle Arena</h1>
                <i
                    className="fa fa-times-circle"
                    onClick={e => {
                        return dispatch(setSelectedHeroes());
                    }}
                >

                </i>

                <span>
                    <h3>
                        Winner {state.winner}
                    </h3>
                </span>



                <div className="containerHeroes">

                    {createCards(selectedHeroes[0])}
                    <div className="spans">

                    </div>
                    {createCards(selectedHeroes[1])}

                </div>
            </div>

        </div>
    )

}


export default BatleArena;
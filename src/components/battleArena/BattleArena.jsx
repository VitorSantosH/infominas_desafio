import React, { useEffect, useState } from "react";
import './BattleArena.css';


// redux
import { useDispatch, useSelector } from 'react-redux';
import store, { setHeroes, setSelectedHeroes } from "../redux";


const BatleArena = () => {

    let n = 0;
    const dispatch = useDispatch();
    const selectedHeroes = useSelector((state) => {
        return state.selectedHeroes
    })

    const [state, setState] = useState({
        winner: undefined
    })

    useEffect(() => {

        if (state.winner !== calcWinner()) {

            return setState({
                ...state,
                winner: calcWinner()
            })

        }

    }, [selectedHeroes])

    // criando cards dos herois 
    function createCards(hero) {


        n++

        if (!hero) return 0

        const compCard = (

            <div
                className={`hero
                      ${hero.biography.alignment == "good" ? 'good' : 'bad'}
                        ${hero.appearance.gender == "Male" ? 'male' : 'female'}
                          ${selectedHeroes.includes(hero) ? 'selected' : ''}
                        `}

                key={hero.name + n}

            >
                <img src={hero.images.sm} alt="" />

                <span>
                    {hero.name || hero.biography.fullName}
                </span>

            </div>

        )

        return compCard


    }

    function creteSpans() {

        if (!selectedHeroes[0] || !selectedHeroes[1]) return

        const hero1 = selectedHeroes[0];
        const hero2 = selectedHeroes[1];


        return (
            <section className="metricas">

                <section className="linhaSpan">
                    <span>
                        {hero1.powerstats.intelligence}

                        <i
                            className={
                                hero1.powerstats.intelligence >= hero2.powerstats.intelligence ? 'fa fa-arrow-up' : "fa fa-arrow-down"
                            }
                        ></i>
                    </span>

                    <span>
                        Inteligencia
                    </span>

                    <span>

                        <i
                            className={
                                hero1.powerstats.intelligence <= hero2.powerstats.intelligence ? 'fa fa-arrow-up' : "fa fa-arrow-down"
                            }
                        ></i>

                        {hero2.powerstats.intelligence}


                    </span>


                </section>

                <section className="linhaSpan">
                    <span>
                        {hero1.powerstats.combat}
                        <i
                            className={
                                hero1.powerstats.combat >= hero2.powerstats.combat ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                            }
                        ></i>
                    </span>

                    <span>
                        Combate
                    </span>

                    <span>

                        <i
                            className={
                                hero1.powerstats.combat <= hero2.powerstats.combat ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                            }
                        ></i>

                        {hero2.powerstats.combat}

                    </span>
                </section>

                <section className="linhaSpan">
                    <span>
                        {hero1.powerstats.durability}
                        <i
                            className={
                                hero1.powerstats.durability >= hero2.powerstats.durability ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                            }
                        ></i>
                    </span>

                    <span>
                        Durabilidade
                    </span>

                    <span>

                        <i
                            className={
                                hero1.powerstats.durability <= hero2.powerstats.durability ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                            }
                        ></i>

                        {hero2.powerstats.durability}

                    </span>
                </section>

                <section className="linhaSpan">
                    <span>
                        {hero1.powerstats.power}
                        <i
                            className={
                                hero1.powerstats.power >= hero2.powerstats.power ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                            }
                        ></i>
                    </span>

                    <span>
                        Poder
                    </span>

                    <span>

                        <i
                            className={
                                hero1.powerstats.power <= hero2.powerstats.power ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                            }
                        ></i>

                        {hero2.powerstats.power}

                    </span>
                </section>

                <section className="linhaSpan">
                    <span>
                        {hero1.powerstats.speed}
                        <i
                            className={
                                hero1.powerstats.speed >= hero2.powerstats.speed ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                            }
                        ></i>
                    </span>

                    <span>
                        Velocidade
                    </span>

                    <span>

                        <i
                            className={
                                hero1.powerstats.speed <= hero2.powerstats.speed ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                            }
                        ></i>

                        {hero2.powerstats.speed}

                    </span>
                </section>

                <section className="linhaSpan">
                    <span>
                        {hero1.powerstats.strength}
                        <i
                            className={
                                hero1.powerstats.strength >= hero2.powerstats.strength ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                            }
                        ></i>
                    </span>

                    <span>
                        Força
                    </span>

                    <span>

                        <i
                            className={
                                hero1.powerstats.strength <= hero2.powerstats.strength ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
                            }
                        ></i>

                        {hero2.powerstats.strength}

                    </span>
                </section>



            </section>
        )

    }

    function calcWinner() {


        if (!selectedHeroes[0] || !selectedHeroes[1]) return 0

        const hero1 = selectedHeroes[0];
        const hero2 = selectedHeroes[1];

        let winner

        // Calcular a soma de atributos para cada herói
        const sumHero1 = Object.values(hero1.powerstats).reduce((acc, value) => acc + parseInt(value), 0);
        const sumHero2 = Object.values(hero2.powerstats).reduce((acc, value) => acc + parseInt(value), 0);

        // Comparar as somas
        if (sumHero1 > sumHero2) {

            console.log("Heroi 1 tem uma soma maior de atributos.");

            winner = hero1.name || hero1.biography.fullName


        } else if (sumHero2 > sumHero1) {

            console.log("Heroi 2 tem uma soma maior de atributos.");
            winner = hero2.name || hero2.biography.fullName

        } else {

            console.log("Ambos os heróis têm a mesma soma de atributos.");
            winner = "Empate"
        }

        return winner;

    }

    return (
        <div className={`batleArena ${selectedHeroes.length > 1 ? 'active' : ''}`}>


            <div className="containerArena">

                <section id="statusPc">

                    <h1>Battle Arena</h1>

                    <i
                        className="fa fa-times-circle"
                        onClick={e => {
                            return dispatch(setSelectedHeroes());
                        }}
                    >

                    </i>

                    <span className="winnerSpan">
                        <h3>
                            Winner
                            <span className="winnerName">
                                {state.winner}
                            </span>
                        </h3>
                    </span>

                </section>

                <div className="containerHeroes">

                    <div>
                        {createCards(selectedHeroes[0])}
                    </div>

                    {creteSpans()}

                    <div>
                        {createCards(selectedHeroes[1])}
                    </div>

                </div>

            </div>

            <div className="mobileView">
                <section className="statusMobile">
                    <section>
                        <i
                            className="fa fa-times-circle"
                            onClick={e => {
                                return dispatch(setSelectedHeroes());
                            }}
                        >

                        </i>
                    </section>

                    <span className="winnerSpan">
                        <h3>
                            Winner
                            <span className="winnerName">
                                {state.winner}
                            </span>
                        </h3>

                    </span>
                </section>

                <div className="containerHeroesMobile">

                    <div className="heroMoblile">
                        {createCards(selectedHeroes[0])}
                        {createCards(selectedHeroes[1])}
                    </div>

                </div>

                {creteSpans()}
            </div>


        </div>
    )

}


export default BatleArena;
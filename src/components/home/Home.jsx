import React, { useEffect, useState } from "react";
import './Home.css';

import axios from 'axios'

// redux
import { useDispatch, useSelector } from 'react-redux';
import store, { setHeroes, setSelectedHeroes } from "../redux";




const Home = () => {



    // redux
    const dispatch = useDispatch();
    const heroes = useSelector((state) => {
        return state.heroes
    })
    const selectedHeroes = useSelector((state) => {
        return state.selectedHeroes
    });

    // url get heroes 
    const apiUrl = 'https://appdeliveryrapido.com.br/heros' //'http://localhost:8050/heros';

    const [state, setState] = useState({
        loaded: false,
        heroes: [],
        cardsComponent: [],
        inputPesquisa: "",
        selectedHero: [],
    });

    useEffect(() => {

        if (!state.loaded) {
            getHeroes();
        }

        if (state.heroes.length > 0) {
            createCards();
        }

       if(selectedHeroes != state.selectedHero) {

        return setState(prevState => ({
            ...prevState, 
            selectedHero: [...selectedHeroes]
        }))
       }

    }, [state.loaded, state.heroes, state.selectedHero[0], state.selectedHero[1], selectedHeroes])

    // requisição dados herois
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

    // criando cards dos herois 
    function createCards() {

        let n = 0

        const cards = state.heroes.map((hero, i) => {

            n++

            let { intelligence, strength, speed, durability, power, combat } = hero.powerstats
            const heroAttributes = { intelligence, strength, speed, durability, power, combat } = hero.powerstats
            const atributoComMaiorValor = Object.keys(heroAttributes).reduce((a, b) => heroAttributes[a] > heroAttributes[b] ? a : b);

            let classIcon

            switch (atributoComMaiorValor) {
                case 'intelligence':
                    classIcon = 'fa-lightbulb-o';
                    break;
                case 'strength':
                    classIcon = 'fa-hand-rock-o';
                    break;
                case 'speed':
                    classIcon = 'fa-tachometer';
                    break;
                case 'durability':
                    classIcon = 'fa-shield';
                    break;
                case 'power':
                    classIcon = 'fa-bolt';
                    break;
                case 'combat':
                    classIcon = 'fa-fighter-jet';
                    break;
                default:
                    // Caso padrão se nenhum dos atributos corresponder
                    classIcon = 'fa-question'; // ou outra classe padrão
                    break;
            }


            return (
                <div
                    className={`hero 
                            ${hero.biography.alignment == "good" ? 'good' : 'bad'}
                            ${hero.appearance.gender == "Male" ? 'male' : 'female'}
                            ${state.selectedHero.includes(hero) ? 'selected' : ''}
                            `}

                    key={hero.name + n}

                    onClick={e => {

                        // define os herois em "foco"
                        handleSelectecHero(hero)

                    }}

                >
                    <img src={hero.images.sm} alt="" />
                    <span>
                        { hero.name || hero.biography.fullName}
                    </span>
                    <div>
                        <i className={`fa ${classIcon}`}></i>
                        {heroAttributes[atributoComMaiorValor]}
                    </div>
                </div>
            )
        })

        return setState({
            ...state,
            cardsComponent: cards
        })

    }

    // selecionando herois
    function handleSelectecHero(hero) {


    
        if(state.selectedHero.includes(hero)) return  

        if (state.selectedHero.length >= 2) {

            let newArray = state.selectedHero
            newArray[1] = newArray[0]
            newArray[0] = hero;

            dispatch(setSelectedHeroes(newArray))

            return setState(prevState => ({
                ...prevState,
                selectedHero: newArray,
            }));

        } else {

            let newArray = state.selectedHero
            newArray.push(hero)

            dispatch(setSelectedHeroes(newArray))

            return setState(prevState => ({
                ...prevState,
                selectedHero: newArray,
            }));
        }

    }

    // resetando selecao
    function resetSelectedHeroes() {

        setState(prevState => ({
            ...prevState,
            selectedHero: []
        }))

        return dispatch(setSelectedHeroes())

    }

    // filtrando herois
    function handleInputChange(event) {

        const inputValue = event.target.value;
        
        const filtredHeroes = heroes.filter(item => {

            if (item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                item.biography.fullName.toLowerCase().includes(inputValue.toLowerCase()) || !inputValue) {
                return item
            }

        }

        );

        return setState({
            ...state,
            inputPesquisa: inputValue,
            heroes: filtredHeroes

        })


    }


    return (
        <div className="Home">


            <div className="containerPesquisa">
                <i className="fa fa-search">
                    <input
                        type="text"
                        name="pesquisa"
                        id=""
                        value={state.inputPesquisa}
                        onChange={e => {
                            return handleInputChange(e);
                        }}
                    />
                </i>
            </div>
            
               
            <div className="heroesContainer">
                {state.cardsComponent}
            </div>


        </div>
    );
};


export default Home;
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
        cardsComponent: [],
        inputPesquisa: "",
    });

    useEffect(() => {

        if (!state.loaded) {
            getHeroes();
        }

        if (state.heroes.length > 0) {
            createCards();
        }

    }, [state.loaded, state.heroes])

    // requisição dados herois
    async function getHeroes() {

        console.log('aqui')
        await axios.get(apiUrl)
            .then(response => {

                console.log(response)

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

        // armazena valores unicos
        /**
         *   const valoresUnicos = new Set();
  
          state.heroes.forEach(objeto => {
              valoresUnicos.add(objeto.connections.groupAffiliation);
          });
  
          // Agora você pode acessar os valores únicos e contar quantos são
          const quantidadeDeVariacoes = valoresUnicos.size;
  
          console.log(quantidadeDeVariacoes)
         */

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
                    className={`hero ${hero.biography.alignment == "good" ? 'good' : 'bad'}
                            ${hero.appearance.gender == "Male" ? 'male' : 'female'}`}

                    key={hero.name + n}

                >
                    <img src={hero.images.sm} alt="" />
                    <span>
                        {hero.biography.fullName || hero.name}
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
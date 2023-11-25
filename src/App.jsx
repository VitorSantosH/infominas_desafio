import React from 'react';
import '@mui/material/CssBaseline';
import './App.css';
import './assets/font-awesome/css/font-awesome.css'

// redux
import { Provider } from 'react-redux';
import store from './components/redux';

// components
import Home from './components/home/Home';
import BatleArena from './components/battleArena/BattleArena';



function App() {

  return (
    <Provider store={store}>
      <BatleArena />
      <div className='app'>
        <h1>Desafio de Heróis: Confronto Direto com um Clique!</h1>

        <Home />

      </div>
    </Provider>
  );


};



export default App

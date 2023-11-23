import React from 'react';
import '@mui/material/CssBaseline';
import './App.css';


// redux
import { Provider } from 'react-redux';
import store from './components/redux';

// components
import Home from './components/home/Home';



function App() {

  return (
    <Provider store={store}>
      <div>
        <h1>Aplicativo React com Redux</h1>
        <Home />
      </div>

      <h1> teste</h1>
    </Provider>
  );


};



export default App

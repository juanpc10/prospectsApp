
import './App.css';

import React from "react";
import { Router } from "@reach/router";
import Main from './components/Main.js'
import AgregarProspecto from "./components/AgregarProspecto.js";
import VerProspectos from "./components/VerProspectos.js";
import EvaluarProspectos from "./components/EvaluarProspectos.js";

import { GlobalProvider } from './context/globalState';


function App() {

  return (
    <GlobalProvider>
      <Router primary={false}>
        <Main path="/" />
        <AgregarProspecto  path="/agregarProspecto"/>
        <VerProspectos path="/verProspectos" />
        <EvaluarProspectos path="/evaluarProspectos" />
      </Router>
    </GlobalProvider>
  );
}

export default App;

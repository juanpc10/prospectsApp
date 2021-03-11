import React from "react";

import Home from './components/Home.js'
import VerProspectos from "./components/VerProspectos.js";
import EvaluarProspectos from "./components/EvaluarProspectos.js";

import { Router } from "@reach/router";

import { GlobalProvider } from './context/globalState';



function App() {

  return (
    <GlobalProvider>
      <Router primary={false}>
        <Home path="/" />
        <VerProspectos path="/verProspectos" />
        <EvaluarProspectos path="/evaluarProspectos" />
      </Router>
    </GlobalProvider>
  );
}

export default App;

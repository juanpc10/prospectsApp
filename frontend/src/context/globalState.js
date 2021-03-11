import React, { createContext, useReducer } from 'react';
import AppReducer from './appReducer';


// Initial state
const initialState = {
  prospectos: [],
  evaluandoProspectos: []
}

// context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch ] = useReducer(AppReducer, initialState );

  // actions
  function addProspecto (prospecto) {
    dispatch({
      type: 'add_prospecto',
      payload: prospecto
    });
  }
  function deleteProspecto (prospecto) {
    dispatch({
      type: 'delete_prospecto',
      payload: prospecto
    });
  }

  function addEvaluandoProspecto (evaluandoProspecto) {
    dispatch({
      type: 'add_evaluandoProspecto',
      payload: evaluandoProspecto
    });
  }
  function deleteEvaluandoProspecto (evaluandoProspecto) {
    dispatch({
      type: 'delete_evaluandoProspecto',
      payload: evaluandoProspecto
    });
  }
  
  
  return  (
    <GlobalContext.Provider value={{ prospectos: state.prospectos, evaluandoProspectos: state.evaluandoProspectos, addProspecto, deleteProspecto, addEvaluandoProspecto, deleteEvaluandoProspecto}}>
      {children}
    </GlobalContext.Provider>
  )
}

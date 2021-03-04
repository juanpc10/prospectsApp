import React, { createContext, useReducer } from 'react';
import AppReducer from './appReducer';


// Initial state
const initialState = {
  todosProspectos: [],
  enviadosProspectos: []
}

// context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch ] = useReducer(AppReducer, initialState );

  //actions
  // function addSingleEvent (singleEvent) {
  //   dispatch({
  //     type: 'add_singleEvent',
  //     payload: singleEvent
  //   });
  // }
  function addToTodosProspectos (todosProspectos) {
    dispatch({
      type: 'ADD_TOTODOSPROSPECTOS',
      payload: todosProspectos
    });
  }
  function deleteFromTodosProspectos (i) {
    dispatch({
      type: 'DELETE_FROMTODOSPROSPECTOS',
      payload: i
    });
  }
  function addToEnviadosProspectos (enviadosProspectos) {
    dispatch({
      type: 'ADD_TOENVIADOSPROSPECTOS',
      payload: enviadosProspectos
    });
  }
  function deleteFromEnviadosProspectos (i) {
    dispatch({
      type: 'DELETE_FROMENVIADOSPROSPECTOS',
      payload: i
    });
  }
  
  return  (
    <GlobalContext.Provider value={{ todosProspectos: state.todosProspectos, enviadosProspectos: state.enviadosProspectos, addToTodosProspectos, deleteFromTodosProspectos, addToEnviadosProspectos, deleteFromEnviadosProspectos}}>
      {children}
    </GlobalContext.Provider>
  )
}

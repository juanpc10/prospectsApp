export default (state, action) => {
  console.log(state);
  console.log(action);
  switch(action.type) {

    // case 'add_singleEvent':
    //   return {
    //     ...state,
    //     items: [action.payload, ...state.items] 
    //   }
    case 'ADD_TOTODOSPROSPECTOS':
      return {
        ...state,
        todosProspectos: [action.payload, ...state.todosProspectos] 
      }
    case 'DELETE_FROMTODOSPROSPECTOS':
      return {
        ...state,
        todosProspectos: [...state.todosProspectos.slice(0, action.payload), ...state.todosProspectos.slice(action.payload + 1, state.length)]
      }
    case 'ADD_TOENVIADOSPROSPECTOS':
      return {
        ...state,
        enviadosProspectos: [action.payload, ...state.enviadosProspectos] 
      }
    case 'DELETE_FROMENVIADOSPROSPECTOS':
      return {
        ...state,
        enviadosProspectos: [...state.enviadosProspectos.slice(0, action.payload), ...state.enviadosProspectos.slice(action.payload + 1, state.length)]
      }
    default:
      return state;
  }
}
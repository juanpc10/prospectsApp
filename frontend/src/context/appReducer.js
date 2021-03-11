export default (state, action) => {
  // console.log(state);
  // console.log(action);
  switch(action.type) {

    case 'add_prospecto':
      return {
        ...state,
        prospectos: [action.payload, ...state.prospectos] 
      }
    case 'delete_prospecto':
      return {
        ...state,
        prospectos: [...state.prospectos.slice(0, action.payload), ...state.prospectos.slice(action.payload + 1, state.length)]
      }

      case 'add_evaluandoProspecto':
      return {
        ...state,
        evaluandoProspectos: [action.payload, ...state.evaluandoProspectos] 
      }
    case 'delete_evaluandoProspecto':
      return {
        ...state,
        evaluandoProspectos: [...state.evaluandoProspectos.slice(0, action.payload), ...state.evaluandoProspectos.slice(action.payload + 1, state.length)]
      }

  default:
    return state;
  }
}
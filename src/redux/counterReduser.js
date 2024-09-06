const initialState = {
    users: []
  }
  
  export function counterReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD':
        return { ...state, users: [...state.users, action.payload] }
        
      case 'REMOVE':
        return {
          ...state,
          users: state.users.filter(user => user.id !== action.payload)
        }
  
      case 'EDIT':
        return {
          ...state,
          users: state.users.map(user => 
            user.id === action.payload.id ? action.payload : user
          )
        }
  
      default:
        return state
    }
  }
  
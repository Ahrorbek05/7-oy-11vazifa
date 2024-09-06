import { createStore, combineReducers } from 'redux'
import { counterReducer } from '../redux/counterReduser'
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  users: counterReducer
})

export const store = createStore(rootReducer, composeWithDevTools())

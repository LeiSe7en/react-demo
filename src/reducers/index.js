import counterReducer from './counter'
import isLoggedReducer from './isLogged'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  // 在store里面就会有一个叫counter的state，并且这个state的状态由counterReducer管理
  counter: counterReducer,
  // 在store里面就会有一个叫isLogged的state，并且这个state的状态由isLoggedReducer管理
  isLogged: isLoggedReducer
})

export default rootReducer
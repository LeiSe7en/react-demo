// 每一个reducer管理一个state

const isLoggedReducer = (state = true, action) => {
  console.log('in isLoggedReducer')
  switch (action.type) {
      case 'INCREMENT': 
      return state + 1
  }
  return state
}

export default isLoggedReducer
const countReducer = (state = 0, action) => {
  console.log('in counter reducer')
  switch (action.type) {
    case 'INCREMENT': 
      return state + 1
  }
  return state
}

export default countReducer
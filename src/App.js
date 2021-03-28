import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import { createStore } from 'redux'
import RootReducer from './reducers'
import { Provider } from 'react-redux'

const store = createStore(
  RootReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const RoutesConfig = [
  { path: '/home', component: Home }
]
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ul>
            <Link to="/home">Home</Link>
          </ul>
        </div>
        <div>

        </div>
        <Switch>
          {
            RoutesConfig.map((config, index) => {
              return <Route key={index} path={config.path} component={config.component}></Route>
            })
          }
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

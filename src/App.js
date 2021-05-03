import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import PlayGround from './views/PlayGround'
import { createStore } from 'redux'
import RootReducer from './reducers'
import { Provider } from 'react-redux'

const store = createStore(
  RootReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const RoutesConfig = [
  { path: '/home', component: Home },
  { path: '/play-ground', component: PlayGround }
]

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ul>
            <li style={{margin: '0 10px'}}><Link to="/home">Home</Link></li>
            <li style={{margin: '0 10px'}}><Link to="/play-ground">Play Ground</Link></li>
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

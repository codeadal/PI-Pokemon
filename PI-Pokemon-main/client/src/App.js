import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandinPage from './components/LandingPage'
import Home from './components/Home'
import PokemonCreate from './components/PokemonCreate'
import Details from './components/Details'



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ='/' component={LandinPage}/>
        <Route exact path ='/home' component={Home}/>
        <Route exact path ='/create_pokemon' component={PokemonCreate}/>
        <Route exact path ='/id/:id' component={Details}/>

      </Switch>
      <h1>Henry Pokemon</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;

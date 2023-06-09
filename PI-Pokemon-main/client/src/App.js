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
        <Route exact path ='/pokemons_create' component={PokemonCreate}/>
        <Route exact path ='/id/:id' component={Details}/>

      </Switch>
      <h1 style={{ color: 'white' }}>Creado por Adalberto Orta Ochoa</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;

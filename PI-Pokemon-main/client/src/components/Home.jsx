import React from "react";
import {Link} from 'react-router-dom'; 
// importo los hooks que voy a usar de react
import { useState,useEffect } from "react";
//importo los hooks de react-redux (previamente los instalo con mpn i react -reudx)
import { useDispatch, useSelector } from "react-redux";
//importo los actions que me interesa usar en este componente
import { getPokemons, filterPokemonByTypes, filterPokemonCreated, orderByName, orderByPower } from "../actions";
//importo los componentes que voy a usar
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "./Home.module.css";


//Iniciamos
export default function Home (){
    const dispatch = useDispatch();
    const allPokemons = useSelector ((state) => state.pokemons);
    const [orden, setOrden] = useState ('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage, setPokemonPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonPerPage ;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemons = allPokemons.slice(
        indexOfFirstPokemon,
        indexOfLastPokemon
    );
const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
}

    useEffect (() => {
        dispatch(getPokemons());
    }, [dispatch])


function handleClick (e){
    e.preventDefault();
    dispatch(getPokemons());
}

function handleFilterType (e) {
    dispatch (filterPokemonByTypes(e.target.value))
}

function handleFilterPokemonCreated (e) {
    dispatch (filterPokemonCreated (e.target.value))
}

function handleSort (e) {
    e.preventDefault ();
    dispatch (orderByName (e.target.value))
    setCurrentPage (1);
    setOrden( 'Ordenado $(e.target.value)');
};

function handlePower (e) {
    e.preventDefault ();
    dispatch (orderByPower(e.target.value))
    setCurrentPage (1);
    setOrden(`Ordenado ${e.target.value}`);
}
//Filtramos por Tipo y origen - tambien ordenamos por orden ascendente y descendente por nombre y ataque
//Creamos el paginado
return ( 
    <body> 
        <div className={styles.navCont}>
        <div className={styles.linkCreate}>
            <div className={styles.createContainer}>
        <Link to= "/pokemons_create"> Crear nuevo pokemon </Link>
        </div>
        </div>
        <div className={styles.title}>
        <h1>Deck Pokemon </h1>
        </div>
        <div className={styles.refreshButton}>
        <button onClick={ (e) => {handleClick(e)}}> Cargar Pokemons Nuevamente </button>
        </div>
        </div>
    <div className="filter-container">
        <div>
        <h4>Filtrar por Tipo </h4>
        <select className="filter-select" onChange={e => handleFilterType(e)}> 
        <option value = "all" > Todos </option>
        <option value = "unknow"> Desconocido </option>
        <option value = "bug"> Bicho </option>
        <option value = "dark"> Oscuro </option>
        <option value = "dragon"> Dragon </option>
        <option value = "electric"> Electrico </option>
        <option value = "fighting"> Pelea </option>
        <option value = "fairy"> Hada </option>
        <option value = "fire"> Fuego </option>
        <option value = "flying"> Volador </option>
        <option value = "ghost"> Fantasma </option>
        <option value = "grass"> Hierva </option>
        <option value = "ground"> Tierra </option>
        <option value = "ice"> Hielo </option>
        <option value = "normal"> Normal </option>
        <option value = "poison"> Veneno </option>
        <option value = "psychic"> Psiquico </option>
        <option value = "rock"> Piedra </option>
        <option value = "shadow"> Sombra </option>
        <option value = "steel"> Metal </option>
        <option value = "water"> Agua </option>
    </select>
    <h4>Filtrar por Ubicación </h4>
    <select className="filter-select" onChange={e => handleFilterPokemonCreated(e)}>
    <option value = "All" > Todos </option>
    <option value = "created"> Pokemons BD </option>
    <option value = "api"> Pokemons Api </option>
    </select>
    </div>
    <div>
    <h4>Ordenar por Nombre </h4>
    <select className="filter-select" onChange={handleSort}>
        <option value = "asc" > Ascendente </option>
        <option value = "desc"> Descendente </option>
    </select>
    <h4>Ordenar por Fuerza </h4>
    <select className="filter-select" onChange={handlePower}>
        <option value = "weaker"> - Fuerte </option>
        <option value = "stronger" > + Fuerte </option>
    </select>
    <SearchBar/>
    </div>
    </div>
    <div className = {styles.pagination}>
    <Paginado
    pokemonPerPage = {pokemonPerPage}
    allPokemons = {allPokemons.length}
    paginado = {paginado}
    />
    </div>
    <div className={styles.card}>
    {
        currentPokemons?.map ((c) => {
            return (
                <div className={styles.cardContainer}>
                    <Link to = {"/id/" + c.id}>
                        <Card 
                        name={ c.name} 
                        image={c.image} 
                        type={c.types} 
                        />
                    </Link>
                </div>
            );
        })
    }
    </div>

</body>
)


}
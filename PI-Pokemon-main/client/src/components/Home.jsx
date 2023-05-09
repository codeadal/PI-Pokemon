import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterPokemonByTypes, filterPokemonCreated, orderByName, orderByPower } from "../actions";
import {Link} from 'react-router-dom'; 
import Card from "./Card";
import Paginado from "./Paginado";


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

// const handleSort =(event)=>{
//     dispatch(emptyFilter())
//     dispatch(orderByName(event.target.value))
// }
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
    <div> 
        <Link to= "/pokemons_create"> Crear nuevo pokemon </Link>
        <h1>Deck Pokemon </h1>
        <button onClick={ (e) => {handleClick(e)}}> Cargar Pokemons Nuevamente </button>
    <div>
        <h4>Filtrar por Tipo </h4>
        <select onChange={e => handleFilterType(e)}> 
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
    <select onChange={e => handleFilterPokemonCreated(e)}>
        <h4>Filtrar por Ubicación </h4>
    <option value = "All" > Todos </option>
    <option value = "created"> Pokemons BD </option>
    <option value = "api"> Pokemons Api </option>
    </select>
    <select onChange={handleSort}>
        <h4>Ordenar por Nombre </h4>
        <option value = "asc" > Ascendente </option>
        <option value = "desc"> Descendente </option>
    </select>
    <select onChange={handlePower}>
        <h4>Ordenar por Fuerza </h4>
        <option value = "weaker"> - Fuerte </option>
        <option value = "stronger" > + Fuerte </option>
    </select>
    <Paginado
    pokemonPerPage = {pokemonPerPage}
    allPokemons = {allPokemons.length}
    paginado = {paginado}
    />
    {
        currentPokemons?.map ((c) => {
            return (
                <div>
                    <Link to = {"/home/" + c.id}>
                        <Card 
                        name={ c.name} 
                        image={c.image} 
                        type={c.types} 
                        key = {c.id}/>
                    </Link>
                </div>
            );
        })
    }
    </div>
</div>
)


}
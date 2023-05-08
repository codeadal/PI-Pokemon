import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions";
import {Link} from 'react-router-dom'; 
import Card from "./Card";
import { Fragment } from "react";

export default function Home (){
    const dispatch = useDispatch();
    const allPokemons = useSelector ((state) => state.pokemons)

    useEffect (() => {
        dispatch(getPokemons());
    }, [dispatch])


function handleClick (e){
    e.preventDefault();
    dispatch(getPokemons());
}

//Filtramos por Tipo y origen - tambien ordenamos por orden ascendente y descendente por nombre y ataque
return ( 
    <div> 
        <Link to= "/pokemons_create"> Crear nuevo pokemon </Link>
        <h1>Pokemons</h1>
        <button onClick={ (e) => {handleClick(e)}}> Cargar Pokemons </button>
    <div>
        <select> 
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
    <select>
    <option value = "allPok" > Todos </option>
    <option value = "bdPok"> Pokemons BD </option>
    <option value = "apiPok"> Pokemons Api </option>
    </select>
    <select>
        <option value = "asc" > Ascendente </option>
        <option value = "desc"> Descendente </option>
    </select>
    <select>
        <option value = "stronger" > + Fuerte </option>
        <option value = "weaker"> - Fuerte </option>
    </select>
    {
        allPokemons?.map ((c) => {
            return (
                <fragment>
                    <Link to = {"/home/" + c.id}>
                        <Card name={ c.name} image={c.image} type={c.types} key = {c.id}/>
                    </Link>
                </fragment>
            );
        })
    }
    </div>
</div>
)








}
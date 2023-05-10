import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import styles from "./Details.module.css";

export default function Detail(props){
    console.log (props)
const dispatch = useDispatch()

useEffect(() => {
    dispatch (getDetail(props.match.params.id));
},[dispatch])

const myPokemon = useSelector ((state) => state.detail)

return (
    <div className="detail-container">
    {myPokemon && Object.keys(myPokemon).length > 0 ? (
        <div className={styles.pokemonDetails}>
        <h1 className={styles.title}>Soy {myPokemon[0].name}</h1>
        <img  src={myPokemon[0]?.img ? myPokemon[0].img : myPokemon[0].image} alt="" width="500px" height="700px" />
        <h4 > 
            Type:{" "}
        {!myPokemon[0].createdInDb
        ? myPokemon[0].types.join(", ")
        : myPokemon[0].types.map((el) => el.name).join(", ")}
        </h4>
        <p > Vida : {myPokemon[0].hp}</p>
        <p > Ataque : {myPokemon[0].attack}</p>
        <p > Defensa : {myPokemon[0].defense}</p>
        <p > Velocidad : {myPokemon[0].speed}</p>
        <p > Talla : {myPokemon[0].height}</p>
        <p > Peso : {myPokemon[0].weight}</p>
        </div>
    ) : (
        <p>Loading...</p>
    )}
    <Link to="/home">
        <button className={styles.detailButton}>Regresar</button>
    </Link>
    </div>
    )
}
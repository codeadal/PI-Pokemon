import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokeName } from "../actions";

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState ("");

function handleInputChange (e) {
    e.preventDefault();
    const value = e.target.value;
    setName (value);
    console.log(value);
}

function handleSubmit (e){
    e.preventDefault();
    if (name.trim() === '') return;
    dispatch(getPokeName(name));
    setName('');
}

return (
    <div>
        <input 
        type = "text"
        placeholder= {name === "" ? "Buscar...": ""}
        onChange={(e) => handleInputChange(e)}
        />"
        <button type = "submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
    );
}
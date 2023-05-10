import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postPokemons, getTypes} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import styles from "./PokemonCreate.module.css"

function validate (input) {
    let errors = {};
    if (!input.image){
        errors.image = "Se requiere un valor para Imagen"
    }else if (!input.name){
        errors.name  = "Se requiere un name";
    } else if (!input.hp){
        errors.hp = "Se requiere un valor para Vida";
    }else if (!input.attack){
        errors.attack = "Se requiere un valor para Attack";
    }else if (!input.defense){
        errors.defense = "Se requiere un valor para Defense";
    }else if (!input.speed){
        errors.speed = "Se requiere un valor para Speed";
    }else if (!input.height){
        errors.height = "Se requiere un valor para Height";
    }else if (!input.weight){
        errors.weight = "Se requiere un valor para Weight";
    }
    return errors;
}

export default function PokemonCreate (){
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types)
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState ({
        name : "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
    });

function handleChange(e) {
    setInput ({
        ...input,
        [e.target.name]: e.target.value,
    });
    setErrors (validate({
        ...input,
        [e.target.name] : e.target.value,
    }))
    console.log (input)
}

//Código para checkbox (lo cambie para usar una lista desplegable)
// function handleCheck (e) {
//     if (e.target.checked) {
//         setInput ({
//             ...input,
//             types:e.target.value,
//     })
// }
// }

function handleSelect (e) {
    const newType = e.target.value;
    if (!input.types.includes (newType)){
        setInput((prevState)=> ({
            ...prevState,
            types: [...prevState.types, newType],
        }));
    }
} 

function handleSubmit (e) { 
    e.preventDefault();
    console.log (input);
    dispatch(postPokemons({
        ...input,
        types: input.types.map(t => t.name)
    }));
    alert ("¡El pokemon ha sido creado con exito!");
    setInput ({
        name : "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
    });
    history.push ("/home"); //redirimos a home nuevamente 
}

function handleDelete (el) {
    setInput ({
        ...input,
        types: input.types.filter ((ty) => ty !== el),
    });
}

useEffect (() => {
    dispatch(getTypes());
}, [dispatch]);

return (
    <div className={styles.formContainer}>
        <h1> Crea tu propio pokemon </h1>
        <form onSubmit={(e) => handleSubmit(e)}className="formContainer">
            <div>
                <label> Imagen </label>
                <input
                type="text"
                value = {input.image}
                name= "image"
                onChange={(e) => handleChange (e)}
                />
                {errors.image && (
                    <p className='error'>{errors.image}</p>
                )}
            </div>
            <div>
                <label> Nombre </label>
                <input
                type="text"
                value = {input.name}
                name= "name"
                onChange={(e) => handleChange (e)}
                />
                {errors.name && (
                    <p className='error'>{errors.name}</p>
                )}
            </div>
            <div>
                <label> Vida </label>
                <input
                type="text"
                value = {input.hp}
                name= "hp"
                onChange={(e) => handleChange (e)}
                />
                {errors.hp && (
                    <p className='error'>{errors.hp}</p>
                )}
            </div>
            <div>
                <label> Attack </label>
                <input
                type="text"
                value = {input.attack}
                name= "attack"
                onChange={(e) => handleChange (e)}
                />
                {errors.attack && (
                    <p className='error'>{errors.attack}</p>
                )}
            </div>
            <div>
                <label> Defense </label>
                <input
                type="text"
                value = {input.defense}
                name= "defense"
                onChange={(e) => handleChange (e)}
                />
                {errors.defense && (
                    <p className='error'>{errors.defense}</p>
                )}
            </div>
            <div>
                <label> Speed </label>
                <input
                type="text"
                value = {input.speed}
                name= "speed"
                onChange={(e) => handleChange (e)}
                />
                {errors.speed && (
                    <p className='error'>{errors.speed}</p>
                )}
            </div>
            <div>
                <label> Height </label>
                <input
                type="text"
                value = {input.height}
                name= "height"
                onChange={(e) => handleChange (e)}
                />
                {errors.height && (
                    <p className='error'>{errors.height}</p>
                )}
            </div>
            <div>
                <label> Weight </label>
                <input
                type="text"
                value = {input.weight}
                name= "weight"
                onChange={(e) => handleChange (e)}
                />
                {errors.weight && (
                    <p className='error'>{errors.weight}</p>
                )}
            </div>
            
            <label> Type </label>
            <select onChange={handleSelect}>
                {types.map((ty) => (
                    <option value={ty.name}>{ty.name}</option>
                ))}
            </select>
            <div>
            <ul>
                <li> 
                    {input.types.map (el => el + " ,")}
                </li>
            </ul>
            </div>

            {input.types.map ((el) => (
                <div className="divty">
                    <p> {el}</p>
                    <button className="botonX" onClick={ () => handleDelete (el)}>
                        X
                    </button>
                </div>
            ))}
            
            <button type = 'submit' className={styles.buttons} > Crear Pokemon </button>
        </form>
        <Link to="/home">
            <button className={styles.buttons}>Regresar</button>
        </Link>
    </div>
)
}
// codigo para check box 
/*<div>
                <label> Type </label>
                
                <label><input
                type="checkbox"
                name= "bug"
                value = "bug"
                onChange={handleCheck}
                />Bug </label>
                <label><input
                type="checkbox"
                name= "dark"
                value = "dark"
                onChange={handleCheck}
                />Dark </label>
                <label><input
                type="checkbox"
                name= "dragon"
                value = "dragon"
                onChange={handleCheck}
                />Dragon </label>
                <label><input
                type="checkbox"
                name= "electric"
                value = "electric"
                onChange={handleCheck}
                />Electric </label>
                <label><input
                type="checkbox"
                name= "fairy"
                value = "fairy"
                onChange={handleCheck}
                />Fairy </label>
                <label><input
                type="checkbox"
                name= "fighting"
                value = "fighting"
                onChange={handleCheck}
                />Fighting </label>
                <label><input
                type="checkbox"
                name= "fire"
                value = "fire"
                onChange={handleCheck}
                />Fire </label>
                <label><input
                type="checkbox"
                name= "flying"
                value = "flying"
                onChange={handleCheck}
                />Flying </label>
                <label><input
                type="checkbox"
                name= "ghost"
                value = "ghost"
                onChange={handleCheck}
                />Ghost </label>
                <label><input
                type="checkbox"
                name= "grass"
                value = "grass"
                onChange={handleCheck}
                />Grass </label>
                <label><input
                type="checkbox"
                name= "ground"
                value = "ground"
                onChange={handleCheck}
                />Ground </label>
                <label><input
                type="checkbox"
                name= "ice"
                value = "ice"
                onChange={handleCheck}
                />Ice </label>
                <label><input
                type="checkbox"
                name= "normal"
                value = "normal"
                onChange={handleCheck}
                />Normal </label>
                <label><input
                type="checkbox"
                name= "poison"
                value = "poison"
                onChange={handleCheck}
                />Poison </label>
                <label><input
                type="checkbox"
                name= "psychic"
                value = "psychic"
                onChange={handleCheck}
                />Psychic </label>
                <label><input
                type="checkbox"
                name= "rock"
                value = "rock"
                onChange={handleCheck}
                />Rock </label>
                <label><input
                type="checkbox"
                name= "shadow"
                value = "shadow"
                onChange={handleCheck}
                />Shadow </label>
                <label><input
                type="checkbox"
                name= "steel"
                value = "steel"
                onChange={handleCheck}
                />Steel </label>
                <label><input
                type="checkbox"
                name= "unknow"
                value = "unknow"
                onChange={handleCheck}
                />Unknow </label>
                <label><input
                type="checkbox"
                name= "water"
                value = "water"
                onChange={handleCheck}
                />Water </label>
</div>*/


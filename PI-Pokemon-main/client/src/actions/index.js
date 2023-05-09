import axios from 'axios';

export function getPokemons (){
    return async function (dispatch) {
        var json = await axios.get ("http://localhost:3001/pokemons",{
            
        });
        return dispatch ({
            type: "GET_POKEMONS",
            payload: json.data,
        });
    };
}

export function getPokeName (name) {
    return async function (dispatch) {
        try {
            var json = await axios.get ("http://localhost:3001/pokemons_name?name=" + name);
                return dispatch ({
                    type: "GET_POKEMONS_NAME",
                    payload: json.data,
                })
            } catch (error) {
                console.log(error);
        }
    } ;
}

export function filterPokemonByTypes (payload) {
    return {
        type: "FILTER_BY_TYPE",
        payload,
}
}

export function filterPokemonCreated (payload) {
    return {
        type: "FILTER_CREATED",
        payload,
    }
}

export function orderByName (payload) {
    return {
        type: "ORDER_BY_NAME",
        payload,
        }
}

export function orderByPower (payload) {
    return {
        type: "ORDER_BY_POWER",
        payload,
    }
}

const initialState = {
    pokemons: [],
    allPokemons: []
}

function rootReducer (state = initialState,action){
    switch (action.type){
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            }
            case "FILTER_BY_TYPE":
                const allPokemon = state.allPokemons
                const statusFiltered = action.payload === 'all' 
                ? allPokemon 
                : allPokemon.filter (el => el.types.includes(action.payload));
                return {
                    ...state,
                    pokemons: statusFiltered
                }
            case "FILTER_CREATED":
                state.pokemons = state.allPokemons;
                const allPokemons = state.allPokemons;
                const createdFilter = action.payload === "created"
                ? allPokemons.filter((el) => typeof el.id === "string")
                : allPokemons.filter((el) => typeof el.id === "number");
                return {
                    ...state,
                    pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
                };

            case "ORDER_BY_NAME":
                let sortedArr = action.payload === "asc"
                ? [...state.pokemons].sort((a, b) => a.name.localeCompare(b.name))
                : [...state.pokemons].sort((a, b) => b.name.localeCompare(a.name));
                return {
                    ...state,
                    pokemons: sortedArr,
                };
            // case "ORDER_BY_NAME":
            //     let sortedArr = action.payload === "asc"
            //     ? state.pokemons.sort (function (a,b) {
            //         if (a.name > b.name){
            //             return 1;
            //         }
            //         if (b.name > a.name){
            //             return -1;
            //         }
            //         return 0;
            //     }):
            //     state.pokemons.sort ( function (a,b) {
            //         if (a.name > b.name){
            //             return -1;
            //     }
            //     if (b.name > a.name) {
            //         return 1;
            //     }
            //     return 0;
            //     }
            //     )
            //     return {
            //         ...state,
            //         pokemons: sortedArr
            //     }
            
            case "ORDER_BY_POWER":
  let orderPokPower = action.payload === "weaker"
    ? [...state.allPokemons].sort((a, b) => a.attack - b.attack)
    : [...state.allPokemons].sort((a, b) => b.attack - a.attack)
  return {
    ...state,
    pokemons: orderPokPower
  }

//             case "ORDER_BY_POWER":
//   let orderPokPower = action.payload === "weaker"
//     ? state.allPokemons.sort((a, b) => a.attack - b.attack)
//     : state.allPokemons.sort((a, b) => b.attack - a.attack)
//   return {
//     ...state,
//     allPokemons: orderPokPower
//   }
            // case "ORDER_BY_POWER":
            //     let orderPokPower = action.payload === "weaker"
            //     ? state.allPokemons.sort (function (a, b) {
            //         if ( a.attack > b.attack) {
            //             return 1
            //         }
            //         if ( b.attack > a.attack) {
            //             return -1
            //         }
            //         return 0;
            //     })
            //     : state.allPokemons.sort(function (a, b) {
            //         if (a.attack > b.attack) {
            //             return -1
            //         }
            //         if (b.attack > a.attack) {
            //             return 1
            //         }
            //         return 0
            //     })
            //     return {
            //         ...state,
            //         pokemons: orderPokPower
            //     }

            


            default:
                return state;
    }
}

export default rootReducer; 
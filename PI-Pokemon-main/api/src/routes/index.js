const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Pokemons, Type} = require ('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Con las siguientes 3 constantes traemos y concatenamos toda la info de la api y de la DB 
const getApiInfo = async () => {
    const apiUrl = await axios.get ('https://pokeapi.co/api/v2/pokemon '); //?limit=12
    const filteredApiUrl = apiUrl.data.results.map((el) => el.url);
    const results = await Promise.all(
        filteredApiUrl.map((url) => axios.get(url))
    );
    const data = results.map((results) => {
        return results.data;
    });
    
    
    const apiInfo = await data.map (el => {
        return {
            id: el.id,
            name: el.name,
            image: el.sprites.other.dream_world.front_default,
            hp: el.stats[0].base_stat,
            attack: el.stats[1].base_stat,
            defense: el.stats[2].base_stat,
            speed: el.stats[5].base_stat,
            height: el.height,
            weight: el.weight,
            types: el.types.map( (el) => el.type.name),
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Pokemons.findAll({
        includes: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });
};

const getAllInfo = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
};


//Aqui empezamos a definir las rutas solicitadas: 

//GET | /pokemons <--- Thunder OK

router.get("/pokemons", async (req, res) => {
    try {
        const getPokes = await getAllInfo();
        res.status(200).json(getPokes);
    }catch (error) {
        res.status(500).send(error.message);
    }
}),

// GET | /pokemons/:idPokemon   <------ Thunder OK
router.get ("/id/:id", async (req, res) =>{
    const {id} = req.params;
    let pokeAll = await getAllInfo();
    if (id) {
        let pokemonIdDb = pokeAll.filter ((el) => el.id === Number(id));
        if (pokemonIdDb.length > 0){
            return res.status(200).json(pokemonIdDb);
        }
        let pokemonIdApi = pokeAll.filter ((el) => el.id === id);
        if (pokemonIdApi.length > 0){
            return res.status(200).json(pokemonIdApi);
        }
        return res.status(404).send ("Pokemon Id not found");
    }
    return res.status(400).send("Missing id parameter");
});

// GET | /pokemons/name?="..."  <---- Thunder OK 

router.get ("/pokemons_name", async (req, res) => {
    const {name} = req.query;
    let pokeAll = await getAllInfo();
    console.log(pokeAll);
    if (name) {
        let pokeName = pokeAll.filter ( (el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
        );
        if (pokeName){
            res.status(200).json(pokeName);
        } else {
            res.status(404).send ("Pokemon Name not found");
        }
    }
});

//  POST | /pokemons <---- Thunder To check

router.post ("/create_pokemon", async (req, res)=> {
    const {
        name, 
        image, 
        hp, 
        attack, 
        defense, 
        speed, 
        height, 
        weight,
        createdInDb,
        types 
    } = req.body

    let createPokemon = await Pokemons.create ({
        name,
        image, 
        hp, 
        attack, 
        defense, 
        speed, 
        height, 
        weight,
        createdInDb : true 
    })
    
    let typesDb = await Type.findAll ({
        where: {
            name : types}
        })
        createPokemon.addType(typesDb)
    res.send ('Pokemon created')
});

// router.post ("/create_pokemon", async (req, res)=> {
//     const {id, name, image, hp, attack, deffense, speed, height, weight} = req.body
//     const pokemon = {id, name, image, hp, attack, deffense, speed, height, weight}
//     try {
//         const pokemons = await createPokemon (pokemon);
//         res.status(200).send(pokemons);
//     } catch (error) {
//         res.status (500).send(error.message);
//     }
// });

//   GET | /types  <---- Thunder OK

router.get ("/types", async (req, res) => {
    const typesApi = await axios.get ('https://pokeapi.co/api/v2/type'); //?limit=12
    const pokeTypes = await typesApi.data;
    for (t of pokeTypes.results){
        const types = await Type.findOne({
            where:{
                name: t.name,
            },
        });
        if (types) return res.json(await Type.findAll ());
        await Type.create({ name: t.name});
    }
    res.json(await Type.findAll());
});


module.exports = router;

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemons', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.STRING,
    },
    attack: {
      type: DataTypes.STRING,
    },
    defense: {
      type: DataTypes.STRING,
    },
    speed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.STRING,
    
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};

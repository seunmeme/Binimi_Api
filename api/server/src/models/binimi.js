'use strict';
module.exports = (sequelize, DataTypes) => {
  const Binimi = sequelize.define('Binimi', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hospital_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
 
  return Binimi;
};


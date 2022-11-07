module.exports = (sequelize, Sequelize) => {
    const Datos_Extraidos = sequelize.define("datos_extraidos_", {
      name: {
        type: Sequelize.STRING
      },
      middle_names: {
        type: Sequelize.STRING
      },
      last_name_father: {
        type: Sequelize.STRING
      },
      last_name_mother: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false
  });
  
    return Datos_Extraidos;
  };
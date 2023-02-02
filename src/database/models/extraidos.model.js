module.exports = (sequelize, Sequelize) => {
    const Datos_Extraidos = sequelize.define("datos_extraidos_s", {
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
      },
      img_path: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: true,

      createdAt: true,
      updatedAt: false
  });
  
    return Datos_Extraidos;
  };
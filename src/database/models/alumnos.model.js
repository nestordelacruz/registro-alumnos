module.exports = (sequelize, Sequelize) => {
    const Alumnos = sequelize.define("alumnos", {
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
  
    return Alumnos;
  };
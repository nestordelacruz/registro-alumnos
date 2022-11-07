module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("test", {
      name: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false
  });
  
    return Test;
  };
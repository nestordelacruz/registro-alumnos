module.exports = app => {
    const alumnos = require("../controllers/alumnos.controller.js");
  
    var router = require("express").Router();

    router.post("/", alumnos.create);
    router.post('/create_test', alumnos.create_test)
    router.get("/", alumnos.findAll);
  
    router.get("/published", alumnos.findAllPublished);
  
    router.get("/:id", alumnos.findOne);
  
    //router.put("/:id", alumnos.update);
    //router.delete("/:id", alumnos.delete);
    //router.delete("/", alumnos.deleteAll);
  
    app.use('/api/alumnos', router);
  };
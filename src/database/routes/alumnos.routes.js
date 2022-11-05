module.exports = app => {
    const alumnos = require("../controllers/alumnos.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", alumnos.create);
  
    // Retrieve all alumnos
    router.get("/", alumnos.findAll);
  
    // Retrieve all published alumnos
    router.get("/published", alumnos.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", alumnos.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", alumnos.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", alumnos.delete);
  
    // Create a new Tutorial
    router.delete("/", alumnos.deleteAll);
  
    app.use('/api/alumnos', router);
  };
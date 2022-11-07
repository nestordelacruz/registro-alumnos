const db = require("../models");
const Alumnos = db.alumnos;
const Extraidos = db.extraidos;
const Test = db.test;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log('INSIDE', req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const data_extraida = {
    name: req.body.name,
    middle_names: req.body.middle_names,
    last_name_father: req.body.last_name_father,
    last_name_mother: req.body.last_name_mother
  };

  Extraidos.create(data_extraida)
    .then(data => {
      console.log('dentro', data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Record."
      });
    }); 
};

exports.create_test = (req, res) => {
  console.log('INSIDE', req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const data_extraida = {
    name: req.body.name,
  };

  Test.create(data_extraida)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Record."
      });
    }); 
};

exports.findAll = (req, res) => {
    console.log(req)
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Alumnos.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving alumnos."
        });
      });
  };

exports.findOne = (req, res) => {
  const id = req.params.id;
  Alumnos.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Alumno with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Alumno with id=" + id
      });
    });
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};
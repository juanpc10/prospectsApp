const mongoose = require('../db');

const Schema = mongoose.Schema;

const ProspectoSchema = new Schema ({
  key: {type: String, required: true},
  nombre: {type: String, required: true},
  apellido: {type: String, required: true},
  segundoApellido: {type: String, required: true},
  calle: {type: String, required: true},
  numeroCasa: {type: String, required: true},
  colonia: {type: String, required: true},
  codigoPostal: {type: String, required: true},
  telefono: {type: String, required: true},
  rfc: {type: String, required: true},
  estatus: {type: String, required: true},
  observaciones: {type: String, required: false},
});

module.exports = mongoose.model('Prospecto', ProspectoSchema);

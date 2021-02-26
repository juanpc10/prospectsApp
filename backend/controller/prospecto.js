const Prospecto = require('../models/prospecto');



async function getProspectos (req, res) {
  try {
    const prospectos = await Prospecto.find();
    res.status(200);
    res.json(prospectos);
  } catch (error) {
    console.log('error', error);      //eslint-disable-line no-console
    res.sendStatus(400);
  }
}

async function postProspecto (req, res) {
  try {
    const { nombre, apellido, segundoApellido, calle, numeroCasa, colonia, codigoPostal, telefono, rfc, estatus, observaciones } = req.body;
    const prospecto = Prospecto.create( { nombre, apellido, segundoApellido, calle, numeroCasa, colonia, codigoPostal, telefono, rfc, estatus, observaciones } );
    res.status(200);
    res.json(prospecto);
  } catch (error) {
    console.log('error', error);      //eslint-disable-line no-console
    res.sendStatus(400);
  }
}


async function deleteProspecto (req, res) {
  try {
    await Prospecto.findByIdAndDelete({_id: req.params.id});
    res.sendStatus(204);
  } catch (error) {
    console.log('error', error);      //eslint-disable-line no-console
    res.sendStatus(500);
  }
}


// async function changeProspectoStatus (req, res) {
//   try {
//     const status = req.params.active;
//     const prospecto = await Prospecto.findByIdAndUpdate(
//       { _id: req.params.id },
//       { active: status },
//       { new: true }
//     );
//     res.status(200);
//     res.json(prospecto);
//   } catch (error) {
//     console.log('error', error);      //eslint-disable-line no-console
//     res.sendStatus(500);
//   }
// }



module.exports = {
  getProspectos,
  postProspecto,
  deleteProspecto,
  // changeProspectoStatus
};
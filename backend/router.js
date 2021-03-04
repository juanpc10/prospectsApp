const router = require('express').Router();
const controller = require('./controller/prospecto');





router.get('/prospectos', controller.getProspectos);     
router.post('/prospecto', controller.postProspecto);
router.delete('/prospecto/:id', controller.deleteProspecto);
router.put('/prospecto/rechazar/:id/:observaciones', controller.rechazarProspecto);
router.put('/prospecto/autorizar/:id', controller.autorizarProspecto);       










module.exports = router;
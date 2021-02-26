const router = require('express').Router();
const controller = require('./controller/prospecto');





router.get('/prospectos', controller.getProspectos);     /// get by user ===>  username ideally
router.post('/prospecto', controller.postProspecto);
router.delete('/prospecto/:id', controller.deleteProspecto);


// router.put('/prospects/:id/:active', controller.changeProspectoStatus);          // change by username








module.exports = router;
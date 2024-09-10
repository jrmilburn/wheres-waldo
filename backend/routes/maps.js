const { Router } = require('express');
const slopesController = require('../controllers/slopesController');

const mapsRouter = Router();

mapsRouter.use('/slopes', slopesController.posWaldo);

module.exports = mapsRouter;
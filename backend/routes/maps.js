const { Router } = require('express');
const slopesController = require('../controllers/slopesController');
const { passport } = require('../config/passport');

const mapsRouter = Router();

mapsRouter.get('/:mapid', slopesController.getCharacters);
mapsRouter.post('/:mapid', slopesController.posCharacter);
mapsRouter.post('/:mapid/start', passport.authenticate('jwt', { session: false }), slopesController.startGame);
mapsRouter.post('/:mapid/stop', passport.authenticate('jwt', { session: false }), slopesController.stopGame);

module.exports = mapsRouter;
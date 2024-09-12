const { Router } = require('express');
const slopesController = require('../controllers/slopesController');
const { passport } = require('../config/passport');

const leaderboardRouter = Router();

leaderboardRouter.get('/', passport.authenticate('jwt', { session: false }), slopesController.getLeaderboard);

module.exports = leaderboardRouter;
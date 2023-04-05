const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getWorkoutPlan } = require('../controllers/plannerController');

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

router.post('/workout-plan', getWorkoutPlan);

module.exports = router;

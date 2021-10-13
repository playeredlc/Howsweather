const router = require('express').Router();
const mainController = require('../controllers/main.controller');

router.get('/', mainController.showInitialScreen);
router.post('/', mainController.showWeather);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getFootballerById, getAllFootballers, insertFootballer, updateFootballer, deleteFootballer } = require('../controllers/footballers');

router.get('/:id', getFootballerById);
router.get('/', getAllFootballers);
router.post('/', insertFootballer);
router.put('/:id', updateFootballer);
router.delete('/:id', deleteFootballer);

module.exports = router;

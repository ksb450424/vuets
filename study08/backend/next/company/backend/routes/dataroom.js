const express = require('express');
const router = express.Router();
const dataroomController = require('../controllers/DataroomController');

router.get('/', dataroomController.getDatarooms);
router.get('/:id', dataroomController.getDataroom);
router.post('/', dataroomController.createDataroom);
router.put('/:id', dataroomController.updateDataroom);
router.delete('/:id', dataroomController.deleteDataroom);

module.exports = router;
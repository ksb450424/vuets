const express = require('express');
const router = express.Router();
const boardController = require('../controllers/BoardsController');

router.get('/list', boardController.getBoards);
router.get('/detail/:id', boardController.getBoard);
router.post('/insert', boardController.createBoard);
router.put('/update/:id', boardController.updateBoard);
router.delete('/delete/:id', boardController.deleteBoard);

module.exports = router;

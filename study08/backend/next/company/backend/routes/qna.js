const express = require('express');
const router = express.Router();
const qnaController = require('../controllers/QnaController');

router.get('/', qnaController.getQnas);
router.get('/:id', qnaController.getQna);
router.post('/', qnaController.createQna);
router.put('/:id', qnaController.updateQna);
router.delete('/:id', qnaController.deleteQna);

module.exports = router;
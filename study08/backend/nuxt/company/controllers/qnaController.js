const QnaService = require('../services/qnaService');

class QnaController {
  async list(req, res) {
    const qnas = await QnaService.getAllQnas();
    res.json(qnas);
  }

  async detail(req, res) {
    const qna = await QnaService.getQnaById(req.params.qno);
    res.json(qna);
  }

  async insert(req, res) {
    const newQna = await QnaService.createQna(req.body);
    res.json(newQna);
  }

  async edit(req, res) {
    await QnaService.updateQna(req.params.qno, req.body);
    res.json({ success: true });
  }

  async delete(req, res) {
    await QnaService.deleteQna(req.params.qno);
    res.json({ success: true });
  }

  async answer(req, res) {
    const newAnswer = await QnaService.answerQna(req.body.parno, req.body);
    res.json(newAnswer);
  }
}

module.exports = new QnaController();
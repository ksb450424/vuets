const { Qna } = require('../models');

class QnaService {
  async getAllQnas() {
    return await Qna.findAll();
  }

  async getQnaById(qno) {
    return await Qna.findOne({ where: { qno } });
  }

  async createQna(qnaData) {
    return await Qna.create(qnaData);
  }

  async updateQna(qno, qnaData) {
    return await Qna.update(qnaData, { where: { qno } });
  }

  async deleteQna(qno) {
    return await Qna.destroy({ where: { qno } });
  }

  async answerQna(parentQno, answerData) {
    const parentQna = await Qna.findOne({ where: { qno: parentQno } });
    if (!parentQna) throw new Error('Parent Qna not found');
    answerData.parno = parentQno;
    answerData.lev = parentQna.lev + 1;
    return await Qna.create(answerData);
  }
}

module.exports = new QnaService();
const Qna = require('../models/Qna');

async function getAllQnas() {
    return await Qna.findAll();
}

async function getQnaById(id) {
    return await Qna.findByPk(id);
}

async function createQna(data) {
    return await Qna.create(data);
}

async function answerQna(id, data) {
    return await Qna.update(data, { where: { qno: id } });
}

async function editQna(id, data) {
    return await Qna.update(data, { where: { qno: id } });
}

async function deleteQna(id) {
    return await Qna.destroy({ where: { qno: id } });
}

module.exports = { getAllQnas, getQnaById, createQna, answerQna, editQna, deleteQna };
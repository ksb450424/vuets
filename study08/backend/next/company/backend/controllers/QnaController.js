// controllers/QnaController.js
const { Qna } = require('../models');

const getQnas = async (req, res) => {
  try {
    const qnas = await Qna.findAll();
    res.status(200).json(qnas);
  } catch (error) {
    console.error(error); // 로그를 통해 에러를 기록합니다.
    res.status(500).json({ error: 'An error occurred while fetching Qnas' });
  }
};

const getQna = async (req, res) => {
  try {
    const qna = await Qna.findByPk(req.params.id);
    if (qna) {
      res.status(200).json(qna);
    } else {
      res.status(404).json({ error: 'Qna not found' });
    }
  } catch (error) {
    console.error(error); // 로그를 통해 에러를 기록합니다.
    res.status(500).json({ error: 'An error occurred while fetching the Qna' });
  }
};

const createQna = async (req, res) => {
  try {
    const qna = await Qna.create(req.body);
    res.status(201).json(qna);
  } catch (error) {
    console.error(error); // 로그를 통해 에러를 기록합니다.
    res.status(500).json({ error: 'An error occurred while creating the Qna' });
  }
};

const updateQna = async (req, res) => {
  try {
    const [updated] = await Qna.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedQna = await Qna.findByPk(req.params.id);
      res.status(200).json(updatedQna);
    } else {
      res.status(404).json({ error: 'Qna not found' });
    }
  } catch (error) {
    console.error(error); // 로그를 통해 에러를 기록합니다.
    res.status(500).json({ error: 'An error occurred while updating the Qna' });
  }
};

const deleteQna = async (req, res) => {
  try {
    const deleted = await Qna.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).end(); // No Content
    } else {
      res.status(404).json({ error: 'Qna not found' });
    }
  } catch (error) {
    console.error(error); // 로그를 통해 에러를 기록합니다.
    res.status(500).json({ error: 'An error occurred while deleting the Qna' });
  }
};

module.exports = {
  getQnas,
  getQna,
  createQna,
  updateQna,
  deleteQna
};



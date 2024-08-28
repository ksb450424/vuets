// controllers/QnaController.js
const { Qna } = require('../models');

exports.list = async (req, res) => {
  try {
    const qnas = await Qna.findAll();
    res.json(qnas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const qna = await Qna.findByPk(req.params.id);
    if (qna) {
      res.json(qna);
    } else {
      res.status(404).json({ error: 'Qna not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.insert = async (req, res) => {
  try {
    const qna = await Qna.create(req.body);
    res.status(201).json(qna);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Qna.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedQna = await Qna.findByPk(req.params.id);
      res.status(200).json(updatedQna);
    } else {
      res.status(404).json({ error: 'Qna not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Qna.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Qna not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
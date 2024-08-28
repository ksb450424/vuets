// controllers/BoardsController.js
const { Board } = require('../models');

exports.list = async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);
    if (board) {
      res.json(board);
    } else {
      res.status(404).json({ error: 'Board not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.insert = async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Board.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedBoard = await Board.findByPk(req.params.id);
      res.status(200).json(updatedBoard);
    } else {
      res.status(404).json({ error: 'Board not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Board.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Board not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

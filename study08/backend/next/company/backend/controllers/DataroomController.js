//controllers/DataroomController.js
const { Dataroom } = require('../models');

const getDatarooms = async (req, res) => {
  try {
    const datarooms = await Dataroom.findAll();
    res.json(datarooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDataroom = async (req, res) => {
  try {
    const dataroom = await Dataroom.findByPk(req.params.id);
    if (dataroom) {
      res.json(dataroom);
    } else {
      res.status(404).json({ error: 'Dataroom not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDataroom = async (req, res) => {
  try {
    const dataroom = await Dataroom.create(req.body);
    res.status(201).json(dataroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDataroom = async (req, res) => {
  try {
    const [updated] = await Dataroom.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedDataroom = await Dataroom.findByPk(req.params.id);
      res.status(200).json(updatedDataroom);
    } else {
      res.status(404).json({ error: 'Dataroom not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDataroom = async (req, res) => {
  try {
    const deleted = await Dataroom.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Dataroom not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDatarooms,
  getDataroom,
  createDataroom,
  updateDataroom,
  deleteDataroom
};


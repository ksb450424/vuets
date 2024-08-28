// company/backend/services/boardService.js
const Board = require('../models/Board');

async function getAllBoards() {
  console.log("Board Service");
  return await Board.findAll();
}

async function getBoardById(id) {
  return await Board.findByPk(id);
}

async function createBoard(data) {
  return await Board.create(data);
}

async function updateBoard(id, data) {
  return await Board.update(data, { where: { no: id } });
}

async function deleteBoard(id) {
  return await Board.destroy({ where: { no: id } });
}

module.exports = { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };
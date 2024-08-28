const { Board } = require('../models');

class BoardService {
  async getAllBoards() {
    return await Board.findAll();
  }

  async getBoardById(no) {
    return await Board.findOne({ where: { no } });
  }

  async createBoard(boardData) {
    return await Board.create(boardData);
  }

  async updateBoard(no, boardData) {
    return await Board.update(boardData, { where: { no } });
  }

  async deleteBoard(no) {
    return await Board.destroy({ where: { no } });
  }
}

module.exports = new BoardService();
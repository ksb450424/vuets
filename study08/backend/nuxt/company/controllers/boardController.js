const BoardService = require('../services/boardService');

class BoardController {
  async list(req, res) {
    const boards = await BoardService.getAllBoards();
    res.json(boards);
  }

  async detail(req, res) {
    const board = await BoardService.getBoardById(req.params.no);
    res.json(board);
  }

  async insert(req, res) {
    const newBoard = await BoardService.createBoard(req.body);
    res.json(newBoard);
  }

  async update(req, res) {
    await BoardService.updateBoard(req.params.no, req.body);
    res.json({ success: true });
  }

  async delete(req, res) {
    await BoardService.deleteBoard(req.params.no);
    res.json({ success: true });
  }
}

module.exports = new BoardController();
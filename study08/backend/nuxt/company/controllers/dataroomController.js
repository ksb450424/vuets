const DataroomService = require('../services/dataroomService');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

class DataroomController {
  async list(req, res) {
    const datarooms = await DataroomService.getAllDatarooms();
    res.json(datarooms);
  }

  async detail(req, res) {
    const dataroom = await DataroomService.getDataroomById(req.params.dno);
    res.json(dataroom);
  }

  async upload(req, res) {
    upload.single('datafile')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const newDataroom = {
        ...req.body,
        datafile: req.file ? req.file.filename : null
      };
      const createdDataroom = await DataroomService.createDataroom(newDataroom);
      res.json(createdDataroom);
    });
  }

  async update(req, res) {
    upload.single('datafile')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const updatedDataroom = {
        ...req.body,
        datafile: req.file ? req.file.filename : req.body.datafile
      };
      await DataroomService.updateDataroom(req.params.dno, updatedDataroom, req.file ? req.file.filename : null);
      res.json({ success: true });
    });
  }

  async delete(req, res) {
    await DataroomService.deleteDataroom(req.params.dno);
    res.json({ success: true });
  }
}

module.exports = new DataroomController();
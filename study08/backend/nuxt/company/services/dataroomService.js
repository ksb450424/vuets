const { Dataroom } = require('../models');
const fs = require('fs');
const path = require('path');

class DataroomService {
  async getAllDatarooms() {
    return await Dataroom.findAll();
  }

  async getDataroomById(dno) {
    return await Dataroom.findOne({ where: { dno } });
  }

  async createDataroom(dataroomData) {
    return await Dataroom.create(dataroomData);
  }

  async updateDataroom(dno, dataroomData, filePath) {
    const dataroom = await Dataroom.findOne({ where: { dno } });
    if (!dataroom) throw new Error('Dataroom not found');
    if (filePath && dataroom.datafile) {
      fs.unlinkSync(path.join(__dirname, '..', 'uploads', dataroom.datafile));
    }
    return await Dataroom.update(dataroomData, { where: { dno } });
  }

  async deleteDataroom(dno) {
    const dataroom = await Dataroom.findOne({ where: { dno } });
    if (!dataroom) throw new Error('Dataroom not found');
    if (dataroom.datafile) {
      fs.unlinkSync(path.join(__dirname, '..', 'uploads', dataroom.datafile));
    }
    return await Dataroom.destroy({ where: { dno } });
  }
}

module.exports = new DataroomService();
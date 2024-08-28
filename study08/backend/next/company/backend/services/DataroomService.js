const Dataroom = require('../models/Dataroom');

async function getAllDatarooms() {
    return await Dataroom.findAll();
}

async function getDataroomById(id) {
    return await Dataroom.findByPk(id);
}

async function uploadDataroom(data) {
    return await Dataroom.create(data);
}

async function updateDataroom(id, data) {
    return await Dataroom.update(data, { where: { dno: id } });
}

async function deleteDataroom(id) {
    return await Dataroom.destroy({ where: { dno: id } });
}

module.exports = { getAllDatarooms, getDataroomById, uploadDataroom, updateDataroom, deleteDataroom };
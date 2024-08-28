const Member = require('../models/Member');

async function getAllMembers() {
    return await Member.findAll();
}

async function getMemberById(id) {
    return await Member.findByPk(id);
}

async function createMember(data) {
    return await Member.create(data);
}

async function updateMember(id, data) {
    return await Member.update(data, { where: { id: id } });
}

async function deleteMember(id) {
    return await Member.destroy({ where: { id: id } });
}

module.exports = { getAllMembers, getMemberById, createMember, updateMember, deleteMember };
const { Member } = require('../models');
const bcrypt = require('bcrypt');

class MemberService {
  async getAllMembers() {
    return await Member.findAll();
  }

  async getMemberById(id) {
    return await Member.findOne({ where: { id } });
  }

  async createMember(memberData) {
    const hashedPassword = await bcrypt.hash(memberData.pw, 10);
    memberData.pw = hashedPassword;
    return await Member.create(memberData);
  }

  async updateMember(id, memberData) {
    if (memberData.pw) {
      const hashedPassword = await bcrypt.hash(memberData.pw, 10);
      memberData.pw = hashedPassword;
    }
    return await Member.update(memberData, { where: { id } });
  }

  async deleteMember(id) {
    return await Member.destroy({ where: { id } });
  }

  async authenticate(id, pw) {
    const member = await Member.findOne({ where: { id } });
    if (!member) throw new Error('Member not found');
    const isPasswordValid = await bcrypt.compare(pw, member.pw);
    if (!isPasswordValid) throw new Error('Invalid password');
    return member;
  }
}

module.exports = new MemberService();
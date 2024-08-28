const MemberService = require('../services/memberService');
const jwt = require('jsonwebtoken');

class MemberController {
  async getMemberList(req, res) {
    const members = await MemberService.getAllMembers();
    res.json(members);
  }

  async getMember(req, res) {
    const member = await MemberService.getMemberById(req.params.id);
    res.json(member);
  }

  async mypage(req, res) {
    const member = await MemberService.getMemberById(req.params.id);
    res.json(member);
  }

  async join(req, res) {
    const newMember = await MemberService.createMember(req.body);
    res.json(newMember);
  }

  async myInfoEdit(req, res) {
    await MemberService.updateMember(req.params.id, req.body);
    res.json({ success: true });
  }

  async login(req, res) {
    try {
      const member = await MemberService.authenticate(req.body.id, req.body.pw);
      const token = jwt.sign({ id: member.id }, 'your-secret-key', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    res.json({ success: true });
  }
}

module.exports = new MemberController();
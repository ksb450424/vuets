const nodemailer = require('nodemailer');

// 이메일 전송 설정
const transporter = nodemailer.createTransport({
  service: 'gmail', // 사용하는 이메일 서비스 (예: 'gmail')
  auth: {
    user: 'your-email@gmail.com', // 발신자 이메일
    pass: 'your-email-password'    // 발신자 이메일 비밀번호
  }
});

exports.sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    // 이메일 전송
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to,
      subject,
      text,
      html
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
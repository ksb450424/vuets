using MailKit.Net.Smtp;
using MimeKit;
using company.Models;
using System.Net.Mail;

namespace company.Services
{
    public class EmailService
    {
        public void SendEmail(EmailRequest emailRequest)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Your App", "your-email@example.com")); // 발신자 이메일 주소
            message.To.Add(new MailboxAddress(emailRequest.ToName, emailRequest.To));
            message.Subject = emailRequest.Subject;

            var bodyBuilder = new BodyBuilder { HtmlBody = emailRequest.Body };
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.example.com", 587, false); // SMTP 서버 및 포트 설정
                client.Authenticate("your-email@example.com", "your-email-password"); // SMTP 인증 정보 설정
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}
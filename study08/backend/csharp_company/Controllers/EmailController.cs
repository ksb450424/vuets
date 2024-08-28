using Microsoft.AspNetCore.Mvc;
using company.Services;
using company.Models;

namespace company.Controllers
{
    [ApiController]
    [Route("company/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public IActionResult SendEmail([FromBody] EmailRequest emailRequest)
        {
            if (emailRequest == null || string.IsNullOrEmpty(emailRequest.To) || string.IsNullOrEmpty(emailRequest.Subject) || string.IsNullOrEmpty(emailRequest.Body))
            {
                return BadRequest("Invalid email request.");
            }

            _emailService.SendEmail(emailRequest);
            return Ok("Email sent successfully.");
        }
    }
}
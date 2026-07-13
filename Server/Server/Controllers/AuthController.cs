using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Services.Interfaces;
using System.Security.Claims;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var result = _authService.Login(dto);

            if (!result.Success)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = result.Message
                });
            }

            Response.Cookies.Append(
                "access_token",
                result.Token,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false,
                    SameSite = SameSiteMode.Lax,
                    Expires = DateTime.UtcNow.AddDays(7)
                });

            return Ok(new
            {
                success = true,
                message = result.Message,
                user = result.User
            });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("access_token");

            return Ok(new
            {
                success = true,
                message = "Logged out successfully."
            });
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            // At this point [Authorize] has already validated the JWT
            // (pulled from the access_token cookie via OnMessageReceived in Program.cs).
            // We just read the claims that GenerateJwtToken put on the token.

            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var name = User.FindFirstValue(ClaimTypes.Name);
            var email = User.FindFirstValue(ClaimTypes.Email);
            var role = User.FindFirstValue(ClaimTypes.Role);

            return Ok(new
            {
                success = true,
                user = new UserDto
                {
                    Id = int.Parse(id!),
                    Name = name!,
                    Email = email!,
                    Role = role!
                }
            });
        }
    }
}
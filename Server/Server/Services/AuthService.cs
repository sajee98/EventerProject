using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.DTOs;
using Server.Models;
using Server.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public object Login(LoginDto dto)
        {
            var user = _context.Users
                .FirstOrDefault(x => x.Email == dto.Email);

            if (user == null)
            {
                return new
                {
                    success = false,
                    message = "Invalid email or password"
                };
            }

            var hashedPassword = HashPassword(dto.Password);

            if (user.PasswordHash != hashedPassword)
            {
                return new
                {
                    success = false,
                    message = "Invalid email or password"
                };
            }

            var token = GenerateJwtToken(user);

            // ROLE MESSAGE
            string dashboardMessage = "";

            if (user.Role.ToLower() == "admin")
            {
                dashboardMessage = "Welcome Admin Dashboard";
            }
            else if (user.Role.ToLower() == "user")
            {
                dashboardMessage = "Welcome User Dashboard";
            }
            else
            {
                dashboardMessage = "Welcome Vendor Dashboard";
            }

            return new
            {
                success = true,
                token,
                message = dashboardMessage,
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Role
                }
            };
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string HashPassword(string password)
        {
            using (var sha = SHA256.Create())
            {
                var bytes = sha.ComputeHash(
                    Encoding.UTF8.GetBytes(password)
                );

                return Convert.ToBase64String(bytes);
            }
        }
    }
}
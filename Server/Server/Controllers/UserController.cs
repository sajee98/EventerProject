using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.DTOs;
using Server.Models;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;

        //this is contructor
        public UserController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // CREATE USER (PRODUCTION api/user)
        [HttpPost]
        public IActionResult CreateUser(CreateUserDto dto)
        {
            try
            {


                // 1. Validate Name
                if (string.IsNullOrEmpty(dto.Name))
                {
                    return BadRequest("Name is required.");
                }

                // Ensures at least one letter is present, alongside allowed alphanumeric/underscore characters
                if (!Regex.IsMatch(dto.Name, @"^(?=.*[a-zA-Z])[a-zA-Z0-9_]+$"))
                {
                    return BadRequest("Name must contain at least one letter and can only include letters, numbers, or underscoress.");
                }

                // 2. Validate Email
                if (string.IsNullOrEmpty(dto.Email))
                {
                    return BadRequest("Email is required.");
                }

                // Standard email validation that ensures the local part isn't just numbers/symbols
                string emailPattern = @"^(?=.*[a-zA-Z])[a-zA-Z0-9_.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
                if (!Regex.IsMatch(dto.Email, emailPattern))
                {
                    return BadRequest("Invalid email format. The email name must contain at least one letter.");
                }

                if (string.IsNullOrEmpty(dto.Password))
                    return BadRequest("Password is required");

                // 2. Duplicate email check
                var existingUser = _context.Users.FirstOrDefault(x => x.Email == dto.Email);

                if (existingUser != null)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Email already exists"
                    });
                }

                // 3. Hash password
                var hashedPassword = HashPassword(dto.Password);

                // 4. Create user entity
                var user = new User
                {
                    Name = dto.Name,
                    Email = dto.Email,
                    PasswordHash = hashedPassword,
                    Phone = dto.Phone,
                    Address = dto.Address,
                    Role = string.IsNullOrEmpty(dto.Role) ? "user" : dto.Role,
                    IsActive = true
                };

                // 5. Save to DB
                _context.Users.Add(user);
                _context.SaveChanges();

                Console.WriteLine("User saved successfully");

                return Ok(new
                {
                    success = true,
                    message = "User created successfully",
                    data = new
                    {
                        user.Id,
                        user.Name,
                        user.Email,
                        user.Role,
                        user.IsActive
                    }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(" ERROR:");
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Internal server error",
                    error = ex.Message
                });
            }
        }



    

        // GET USERS
        [HttpGet]
        public IActionResult GetUsers()
        {
            try
            {
                var users = _context.Users
                    .Select(u => new
                    {
                        u.Id,
                        u.Name,
                        u.Email,
                        u.Phone,
                        u.Address,
                        u.Role,
                        u.IsActive
                    })
                    .ToList();

                return Ok(new
                {
                    success = true,
                    count = users.Count,
                    data = users
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    error = ex.Message
                });
            }
        }

        // UPDATE USER
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, CreateUserDto dto)
        {
            try
            {
                var user = _context.Users.Find(id);

                if (user == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "User not found"
                    });
                }

                user.Name = dto.Name;
                user.Email = dto.Email;
                user.Phone = dto.Phone;
                user.Address = dto.Address;
                user.Role = dto.Role;

                _context.SaveChanges();

                return Ok(new
                {
                    success = true,
                    message = "User updated successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    error = ex.Message
                });
            }
        }

        // UPDATE ACTIVE STATUS
        [HttpPatch("status/{id}")]
        public IActionResult UpdateStatus(int id, bool isActive)
        {
            try
            {
                var user = _context.Users.Find(id);

                if (user == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "User not found"
                    });
                }

                user.IsActive = isActive;
                _context.SaveChanges();

                return Ok(new
                {
                    success = true,
                    message = "Status updated"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    error = ex.Message
                });
            }
        }

        // PASSWORD HASH FUNCTION
        private string HashPassword(string password)
        {
            using (var sha = SHA256.Create())
            {
                var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }
    }
}
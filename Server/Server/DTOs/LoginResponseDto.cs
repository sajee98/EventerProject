namespace Server.DTOs
{
    public class LoginResponseDto
    {
        public bool Success { get; set; }

        public string Token { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;

        public UserDto User { get; set; } = new();
    }


    public class UserDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;
    }
}
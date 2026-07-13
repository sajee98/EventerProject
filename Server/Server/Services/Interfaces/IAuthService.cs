using Server.DTOs;

namespace Server.Services.Interfaces
{
    public interface IAuthService
    {
        LoginResponseDto Login(LoginDto dto);
    }
}
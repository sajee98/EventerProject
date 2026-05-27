using Server.DTOs;

namespace Server.Services.Interfaces
{
    public interface IAuthService
    {
        object Login(LoginDto dto);
    }
}
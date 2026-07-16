namespace Server.Models.Dtos
{
    public class VendorResponseDto
    {
        public int VendorCategoryId { get; set; }
        public string VendorName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string? Facebook { get; set; }
        public string? Instagram { get; set; }
        public string? Tiktok { get; set; }
    }
}
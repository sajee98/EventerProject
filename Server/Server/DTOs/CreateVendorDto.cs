namespace Server.DTOs
{
    public class CreateVendorDto
    {
        public int UserId { get; set; }

        public int VendorCategoryId { get; set; }

        public string VendorName { get; set; } = string.Empty;

        public string Slug { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string? Facebook { get; set; }

        public string? Instagram { get; set; }

        public string? Tiktok { get; set; }

        public List<PackageDto> Packages { get; set; }
            = new List<PackageDto>();
    }
}
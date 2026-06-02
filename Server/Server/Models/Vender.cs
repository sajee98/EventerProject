namespace Server.Models
{
    public class Vendor
    {
        public int Id { get; set; }

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

        public string LogoImg { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // NAVIGATION
        public User User { get; set; }
        public VendorCategory VendorCategory { get; set; }

        public List<VendorGallery> VendorGalleries { get; set; } = new();
        public List<Package> Packages { get; set; } = new();
        public List<Review> Reviews { get; set; } = new();
    }
}
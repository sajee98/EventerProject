namespace Server.Models
{
    public class VendorGallery
    {
        public int Id { get; set; }

        public int VendorId { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        // Navigation
        public Vendor Vendor { get; set; }
    }
}
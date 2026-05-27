namespace Server.Models
{
    public class Package
    {
        public int Id { get; set; }

        public int VendorId { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string Description { get; set; } = string.Empty;

        public int MaxPeople { get; set; }

        public bool IsPerPerson { get; set; }

        // Navigation
        public Vendor Vendor { get; set; }

        public List<PackageFeature> PackageFeatures { get; set; }
            = new List<PackageFeature>();
    }
}
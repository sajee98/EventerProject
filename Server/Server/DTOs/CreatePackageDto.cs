namespace Server.DTOs
{
    public class CreatePackageDto
    {
        public int VendorId { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string Description { get; set; } = string.Empty;

        public int MaxPeople { get; set; }

        public bool IsPerPerson { get; set; }

        // Optional — lets the caller seed a package with features in one call.
        // Use POST /api/package/{packageId}/features to add more afterward.
        public List<string>? Features { get; set; }
    }
}
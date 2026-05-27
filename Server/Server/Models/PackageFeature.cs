namespace Server.Models
{
    public class PackageFeature
    {
        public int Id { get; set; }

        public int PackageId { get; set; }

        public string FeatureText { get; set; } = string.Empty;

        // Navigation
        public Package Package { get; set; }
    }
}
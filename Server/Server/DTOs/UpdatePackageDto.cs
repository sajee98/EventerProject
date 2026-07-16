namespace Server.DTOs
{
    public class UpdatePackageDto
    {
        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string Description { get; set; } = string.Empty;

        public int MaxPeople { get; set; }

        public bool IsPerPerson { get; set; }
    }
}
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{


    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events {  get; set; }

        public DbSet<VendorCategory> VendorCategories { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorGallery> VendorGalleries { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<PackageFeature> PackageFeatures { get; set; }


        //for email unique
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                 .HasIndex(u => u.Email)
                 .IsUnique();
        }
    }

   
}

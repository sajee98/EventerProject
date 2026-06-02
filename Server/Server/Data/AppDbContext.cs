using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }

        public DbSet<VendorCategory> VendorCategories { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorGallery> VendorGalleries { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<PackageFeature> PackageFeatures { get; set; }
        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // USER EMAIL UNIQUE
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // VENDOR SLUG UNIQUE
            modelBuilder.Entity<Vendor>()
                .HasIndex(v => v.Slug)
                .IsUnique();

            // RELATIONSHIPS 

            modelBuilder.Entity<Vendor>()
                .HasOne(v => v.User)
                .WithMany()
                .HasForeignKey(v => v.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Vendor>()
                .HasOne(v => v.VendorCategory)
                .WithMany()
                .HasForeignKey(v => v.VendorCategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Vendor)
                .WithMany(v => v.Reviews)
                .HasForeignKey(r => r.VendorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Package>()
                .HasOne(p => p.Vendor)
                .WithMany(v => v.Packages)
                .HasForeignKey(p => p.VendorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<VendorGallery>()
                .HasOne(g => g.Vendor)
                .WithMany(v => v.VendorGalleries)
                .HasForeignKey(g => g.VendorId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
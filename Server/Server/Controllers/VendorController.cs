using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using Server.Helpers;
using System.Security.Claims;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VendorController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // CREATE VENDOR
        // =========================
        [HttpPost]
        [Authorize(Roles = "vendor,admin")]
        public async Task<IActionResult> CreateVendor(
            [FromForm] CreateVendorDto dto,
            IFormFile logo,
            List<IFormFile>? galleryImages)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                // LIMIT VENDORS
                var vendorCount = await _context.Vendors
                    .CountAsync(v => v.UserId == userId);

                if (vendorCount >= 3)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "You can only create up to 3 vendors."
                    });
                }

                // SLUG GENERATION
                var baseSlug = SlugHelper.GenerateSlug(dto.VendorName);
                var slug = baseSlug;
                int counter = 1;

                while (await _context.Vendors.AnyAsync(v => v.Slug == slug))
                {
                    slug = $"{baseSlug}-{counter}";
                    counter++;
                }

                // LOGO
                string logoPath = "";

                if (logo != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(logo.FileName);
                    var path = Path.Combine("wwwroot/uploads", fileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await logo.CopyToAsync(stream);
                    }

                    logoPath = "/uploads/" + fileName;
                }

                // CREATE VENDOR
                var vendor = new Vendor
                {
                    UserId = userId,
                    VendorCategoryId = dto.VendorCategoryId,
                    VendorName = dto.VendorName,
                    Slug = slug,
                    Phone = dto.Phone,
                    Email = dto.Email,
                    Address = dto.Address,
                    Facebook = dto.Facebook,
                    Instagram = dto.Instagram,
                    Tiktok = dto.Tiktok,
                    LogoImg = logoPath,
                    IsActive = true
                };

                _context.Vendors.Add(vendor);
                await _context.SaveChangesAsync();

                // =========================
                // GALLERY (SAFE)
                // =========================
                if (galleryImages != null && galleryImages.Count > 0)
                {
                    foreach (var image in galleryImages)
                    {
                        var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
                        var path = Path.Combine("wwwroot/uploads", fileName);

                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        _context.VendorGalleries.Add(new VendorGallery
                        {
                            VendorId = vendor.Id,
                            ImageUrl = "/uploads/" + fileName
                        });
                    }
                }

                // =========================
                // PACKAGES (SAFE)
                // =========================
                if (dto.Packages != null && dto.Packages.Count > 0)
                {
                    foreach (var p in dto.Packages)
                    {
                        var package = new Package
                        {
                            VendorId = vendor.Id,
                            Name = p.Name,
                            Price = p.Price,
                            Description = p.Description,
                            MaxPeople = p.MaxPeople,
                            IsPerPerson = p.IsPerPerson
                        };

                        _context.Packages.Add(package);
                        await _context.SaveChangesAsync();

                        if (p.Features != null)
                        {
                            foreach (var f in p.Features)
                            {
                                _context.PackageFeatures.Add(new PackageFeature
                                {
                                    PackageId = package.Id,
                                    FeatureText = f.FeatureText
                                });
                            }
                        }
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Vendor created successfully",
                    vendorId = vendor.Id,
                    slug = vendor.Slug
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // =========================
        // UPDATE VENDOR (IMPROVED)
        // =========================
        [HttpPut("{id}")]
        [Authorize(Roles = "vendor,admin")]
        public async Task<IActionResult> UpdateVendor(int id, [FromBody] CreateVendorDto dto)
        {
            var vendor = await _context.Vendors.FindAsync(id);

            if (vendor == null)
                return NotFound("Vendor not found");

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            if (vendor.UserId != userId && !User.IsInRole("admin"))
                return Forbid();

            // update fields
            vendor.VendorName = dto.VendorName;
            vendor.Phone = dto.Phone;
            vendor.Email = dto.Email;
            vendor.Address = dto.Address;

            // OPTIONAL: regenerate slug if name changed
            var newSlug = SlugHelper.GenerateSlug(dto.VendorName);

            if (vendor.Slug != newSlug)
            {
                var exists = await _context.Vendors.AnyAsync(v => v.Slug == newSlug && v.Id != id);

                if (exists)
                    return BadRequest("Slug already exists");

                vendor.Slug = newSlug;
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Vendor updated successfully"
            });
        }
    }
}
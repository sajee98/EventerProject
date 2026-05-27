using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.DTOs;
using Server.Models;

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

        [HttpPost]
        [Authorize(Roles = "vendor,admin")]
        public async Task<IActionResult> CreateVendor(
            [FromForm] CreateVendorDto dto,
            IFormFile logo,
            List<IFormFile> galleryImages)
        {
            try
            {
                // LOGO
                string logoPath = "";

                if (logo != null)
                {
                    var fileName = Guid.NewGuid() +
                        Path.GetExtension(logo.FileName);

                    var path = Path.Combine(
                        "wwwroot/uploads",
                        fileName
                    );

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await logo.CopyToAsync(stream);
                    }

                    logoPath = "/uploads/" + fileName;
                }

                // CREATE VENDOR
                var vendor = new Vendor
                {
                    UserId = dto.UserId,
                    VendorCategoryId = dto.VendorCategoryId,
                    VendorName = dto.VendorName,
                    Slug = dto.Slug,
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

                // MULTIPLE GALLERY IMAGES
                foreach (var image in galleryImages)
                {
                    var fileName = Guid.NewGuid() +
                        Path.GetExtension(image.FileName);

                    var path = Path.Combine(
                        "wwwroot/uploads",
                        fileName
                    );

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    var gallery = new VendorGallery
                    {
                        VendorId = vendor.Id,
                        ImageUrl = "/uploads/" + fileName
                    };

                    _context.VendorGalleries.Add(gallery);
                }

                // PACKAGES
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

                    // FEATURES
                    foreach (var f in p.Features)
                    {
                        var feature = new PackageFeature
                        {
                            PackageId = package.Id,
                            FeatureText = f.FeatureText
                        };

                        _context.PackageFeatures.Add(feature);
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Vendor created successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
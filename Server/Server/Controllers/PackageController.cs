using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using System.Security.Claims;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackageController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PackageController(AppDbContext context)
        {
            _context = context;
        }

        // Small helper — every endpoint here needs the current user id.
        private int CurrentUserId =>
            int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);


        // =================================
        // GET PACKAGES FOR A VENDOR
        // GET /api/package/vendor/{vendorId}
        // =================================
        [HttpGet("vendor/{vendorId}")]
        [Authorize]
        public async Task<IActionResult> GetPackagesForVendor(int vendorId)
        {
            var vendor = await _context.Vendors
                .FirstOrDefaultAsync(v => v.Id == vendorId);

            if (vendor == null)
            {
                return NotFound(new { message = "Vendor not found" });
            }

            // Owner or admin only — change this if package listings should be public.
            if (vendor.UserId != CurrentUserId && !User.IsInRole("admin"))
            {
                return Forbid();
            }

            var packages = await _context.Packages
                .Where(p => p.VendorId == vendorId)
                .Include(p => p.PackageFeatures)
                .ToListAsync();

            return Ok(new
            {
                success = true,
                packages
            });
        }


        // =================================
        // GET SINGLE PACKAGE
        // GET /api/package/{id}
        // =================================
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetPackage(int id)
        {
            var package = await _context.Packages
                .Include(p => p.PackageFeatures)
                .Include(p => p.Vendor)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (package == null)
            {
                return NotFound(new { message = "Package not found" });
            }

            if (package.Vendor.UserId != CurrentUserId && !User.IsInRole("admin"))
            {
                return Forbid();
            }

            return Ok(new
            {
                success = true,
                package
            });
        }


        // =================================
        // CREATE PACKAGE
        // POST /api/package
        // =================================
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePackage([FromBody] CreatePackageDto dto)
        {
            var vendor = await _context.Vendors
                .FirstOrDefaultAsync(v => v.Id == dto.VendorId);

            if (vendor == null)
            {
                return NotFound(new { message = "Vendor not found" });
            }

            if (vendor.UserId != CurrentUserId && !User.IsInRole("admin"))
            {
                return Forbid();
            }

            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                return BadRequest(new { message = "Package name is required" });
            }

            var package = new Package
            {
                VendorId = dto.VendorId,
                Name = dto.Name.Trim(),
                Price = dto.Price,
                Description = dto.Description?.Trim() ?? string.Empty,
                MaxPeople = dto.MaxPeople,
                IsPerPerson = dto.IsPerPerson,
            };

            // Optional initial features, seeded in the same call.
            if (dto.Features != null)
            {
                foreach (var featureText in dto.Features)
                {
                    if (string.IsNullOrWhiteSpace(featureText)) continue;

                    package.PackageFeatures.Add(new PackageFeature
                    {
                        FeatureText = featureText.Trim()
                    });
                }
            }

            _context.Packages.Add(package);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Package created",
                id = package.Id
            });
        }


        // =================================
        // UPDATE PACKAGE
        // PUT /api/package/{id}
        // =================================
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePackage(int id, [FromBody] UpdatePackageDto dto)
        {
            var package = await _context.Packages
                .Include(p => p.Vendor)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (package == null)
            {
                return NotFound(new { message = "Package not found" });
            }

            if (package.Vendor.UserId != CurrentUserId && !User.IsInRole("admin"))
            {
                return Forbid();
            }

            if (string.IsNullOrWhiteSpace(dto.Name))
            {
                return BadRequest(new { message = "Package name is required" });
            }

            package.Name = dto.Name.Trim();
            package.Price = dto.Price;
            package.Description = dto.Description?.Trim() ?? string.Empty;
            package.MaxPeople = dto.MaxPeople;
            package.IsPerPerson = dto.IsPerPerson;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Package updated"
            });
        }


        // =================================
        // DELETE PACKAGE
        // DELETE /api/package/{id}
        // =================================
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePackage(int id)
        {
            var package = await _context.Packages
                .Include(p => p.Vendor)
                .Include(p => p.PackageFeatures)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (package == null)
            {
                return NotFound(new { message = "Package not found" });
            }

            if (package.Vendor.UserId != CurrentUserId && !User.IsInRole("admin"))
            {
                return Forbid();
            }

            // Explicitly remove features first in case cascade delete isn't configured.
            _context.PackageFeatures.RemoveRange(package.PackageFeatures);
            _context.Packages.Remove(package);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Package deleted"
            });
        }


        // =================================
        // ADD FEATURE TO PACKAGE
        // POST /api/package/{packageId}/features
        // =================================
        [HttpPost("{packageId}/features")]
        [Authorize]
        public async Task<IActionResult> AddFeature(int packageId, [FromBody] AddPackageFeatureDto dto)
        {
            var package = await _context.Packages
                .Include(p => p.Vendor)
                .FirstOrDefaultAsync(p => p.Id == packageId);

            if (package == null)
            {
                return NotFound(new { message = "Package not found" });
            }

            if (package.Vendor.UserId != CurrentUserId && !User.IsInRole("admin"))
            {
                return Forbid();
            }

            if (string.IsNullOrWhiteSpace(dto.FeatureText))
            {
                return BadRequest(new { message = "Feature text is required" });
            }

            var feature = new PackageFeature
            {
                PackageId = packageId,
                FeatureText = dto.FeatureText.Trim()
            };

            _context.PackageFeatures.Add(feature);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Feature added",
                id = feature.Id
            });
        }


        // =================================
        // DELETE FEATURE
        // DELETE /api/package/features/{featureId}
        // =================================
        [HttpDelete("features/{featureId}")]
        [Authorize]
        public async Task<IActionResult> DeleteFeature(int featureId)
        {
            var feature = await _context.PackageFeatures
                .Include(f => f.Package)
                    .ThenInclude(p => p.Vendor)
                .FirstOrDefaultAsync(f => f.Id == featureId);

            if (feature == null)
            {
                return NotFound(new { message = "Feature not found" });
            }

            if (feature.Package.Vendor.UserId != CurrentUserId && !User.IsInRole("admin"))
            {
                return Forbid();
            }

            _context.PackageFeatures.Remove(feature);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Feature deleted"
            });
        }
    }
}
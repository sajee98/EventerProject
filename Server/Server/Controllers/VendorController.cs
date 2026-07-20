using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Helpers;
using Server.Models;
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



        // GET MY VENDORS
        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetMyVendors()
        {

            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );


           var vendors = await _context.Vendors
    .Where(v => v.UserId == userId)
    .Include(v => v.User)
    .Include(v => v.VendorCategory)
      .Include(v => v.Packages)
        .ThenInclude(p => p.PackageFeatures)
    .Include(v => v.VendorGalleries)
    .Include(v => v.Reviews)
    .ToListAsync();



            return Ok(new
            {
                success = true,
                vendors
            });

        }

        // get logged in vendor by id
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetMyVendorById(int id)
        {
            // Get logged-in user id from JWT
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            // Find only this user's vendor
            var vendor = await _context.Vendors
                .Include(v => v.User)
                .Include(v => v.VendorCategory)
                .Include(v => v.Packages)
                    .ThenInclude(p => p.PackageFeatures)
                .Include(v => v.VendorGalleries)
                .Include(v => v.Reviews)
                .FirstOrDefaultAsync(v => v.Id == id && v.UserId == userId);

            // Vendor not found
            if (vendor == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Vendor not found."
                });
            }

            // Return vendor
            return Ok(new
            {
                success = true,
                vendor
            });
        }

        //patch status for active or inactive
        [HttpPut("{id}/status")]
        [Authorize]

        public async Task<IActionResult> UpdateVendorStatus(int id, [FromBody] bool isActive)
        {
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor == null)
            {
                return NotFound("Vendor not found");
            }
            // OWNER CHECK
            if (vendor.UserId != userId && !User.IsInRole("admin"))
            {
                return Forbid();
            }
            vendor.IsActive = isActive;
            await _context.SaveChangesAsync();
            return Ok(new
            {
                success = true,
                message = "Vendor status updated"
            });
        }



        // GET ALL VENDORS (ADMIN)
        [HttpGet]
[Authorize(Roles = "admin")]
public async Task<IActionResult> GetAllVendors()
{
    var vendors = await _context.Vendors
        .Include(v => v.User)
        .Include(v => v.Packages)
        .Include(v => v.VendorGalleries)
        .Include(v => v.VendorCategory)
        .ToListAsync();


    return Ok(new
    {
        success = true,
        vendors
    });
}





        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateVendor(
          [FromForm] CreateVendorDto dto,
          IFormFile? logo
      )
        {
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var slug = SlugHelper.GenerateSlug(dto.VendorName);

            string? logoPath = null;

            if (logo != null)
            {
                logoPath = await FileUploadHelper.UploadFile(
                    logo,
                    "vendors"
                );
            }

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
                LogoImg = logoPath ?? ""
            };

            _context.Vendors.Add(vendor);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                vendorId = vendor.Id
            });
        }


    



        // UPDATE OWN VENDOR
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateVendor(
            int id,
            [FromBody] CreateVendorDto dto
        )
        {


            var userId=int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );



            var vendor =
                await _context.Vendors
                .FirstOrDefaultAsync(v=>v.Id==id);



            if(vendor==null)
            {
                return NotFound("Vendor not found");
            }



            // OWNER CHECK

            if(vendor.UserId != userId 
               && !User.IsInRole("admin"))
            {
                return Forbid();
            }




            vendor.VendorName=dto.VendorName;

            vendor.Phone=dto.Phone;

            vendor.Email=dto.Email;

            vendor.Address=dto.Address;



            await _context.SaveChangesAsync();



            return Ok(new
            {
                success=true,
                message="Vendor updated"
            });

        }






        // DELETE OWN VENDOR
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVendor(int id)
        {
            var userId=int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );



            var vendor =
                await _context.Vendors
                .FirstOrDefaultAsync(v=>v.Id==id);



            if(vendor==null)
            {
                return NotFound();
            }




            if(vendor.UserId != userId
               && !User.IsInRole("admin"))
            {
                return Forbid();
            }



            _context.Vendors.Remove(vendor);


            await _context.SaveChangesAsync();



            return Ok(new
            {
                success=true,
                message="Vendor deleted"
            });


        }


        // For vendor Galleries
        [HttpPost("{vendorId}/gallery")]
        [Authorize]
public async Task<IActionResult> UploadGallery(
    int vendorId,
    List<IFormFile> images
)
{
    var vendor = await _context.Vendors.FindAsync(vendorId);

    if (vendor == null)
        return NotFound();

    foreach (var image in images)
    {
        var imagePath =
            await FileUploadHelper.UploadFile(
                image,
                "vendors/gallery"
            );

        if (imagePath != null)
        {
            _context.VendorGalleries.Add(
                new VendorGallery
                {
                    VendorId = vendorId,
                    ImageUrl = imagePath
                });
        }
    }

    await _context.SaveChangesAsync();

    return Ok(new
    {
        success = true
    });
}


//get for gallery
[HttpGet("{vendorId}/gallery")]
public async Task<IActionResult> GetGallery(int vendorId)
{
    var images = await _context.VendorGalleries
        .Where(g => g.VendorId == vendorId)
        .ToListAsync();

    return Ok(images);
}


//Delete
[HttpDelete("gallery/{id}")]
public async Task<IActionResult> DeleteGallery(int id)
{
    var image = await _context.VendorGalleries.FindAsync(id);

    if (image == null)
        return NotFound();

    _context.VendorGalleries.Remove(image);

    await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Vendor image deleted"
            });
        }


    }

}
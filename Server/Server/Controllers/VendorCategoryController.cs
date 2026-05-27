using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorCategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VendorCategoryController(AppDbContext context)
        {
            _context = context;
        }

        // CREATE (ADMIN ONLY)
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Create([FromForm] VendorCategoryDtos dto, IFormFile image)
        {
            try
            {
                // 1. Validate image exists
                if (image == null)
                    return BadRequest("Image is required");

                // 2. Validate file size (2MB)
                if (image.Length > 2 * 1024 * 1024)
                    return BadRequest("File too large");

                // 3. Validate extension
                var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
                var ext = Path.GetExtension(image.FileName).ToLower();

                if (!allowed.Contains(ext))
                    return BadRequest("Invalid file type");

                // 4. Create file name
                var fileName = Guid.NewGuid() + ext;

                // 5. Save path (IMPORTANT)
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
                var filePath = Path.Combine(folder, fileName);

                // 6. Save file physically
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                // 7. Create DB entity
                var category = new VendorCategory
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Slug = dto.Slug,
                    Image = "/uploads/" + fileName,
                    IsActive = true
                };

                // 8. Save to DB
                _context.VendorCategories.Add(category);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Category created successfully",
                    data = category
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET ALL (Admin) active and not active
        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _context.VendorCategories.ToList();

            return Ok(new
            {
                success = true,
                data
            });
        }

        // GET ALL (PUBLIC)
        [HttpGet("active")]
        public IActionResult GetAllActive()
        {
            var data = _context.VendorCategories
                .Where(x => x.IsActive == true)
                .ToList();

            return Ok(new
            {
                success = true,
                data
            });
        }

        //  GET BY ID (PUBLIC)
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var data = _context.VendorCategories.Find(id);

            if (data == null)
                return NotFound();

            return Ok(new
            {
                success = true,
                data
            });
        }



        // UPDATE (ADMIN ONLY)
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Update(int id, [FromForm] VendorCategoryDtos dto, IFormFile? image)
        {
            try
            {
                Console.WriteLine($"Update Category Called for ID: {id}");

                // 1. Find category
                var data = await _context.VendorCategories.FindAsync(id);

                if (data == null)
                {
                    Console.WriteLine("Category not found");
                    return NotFound(new
                    {
                        success = false,
                        message = "Category not found"
                    });
                }

                // 2. Update text fields
                data.Name = dto.Name;
                data.Description = dto.Description;
                data.Slug = dto.Slug;

                // 3. OPTIONAL IMAGE UPDATE
                if (image != null)
                {
                    var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
                    var ext = Path.GetExtension(image.FileName).ToLower();

                    if (!allowed.Contains(ext))
                    {
                        return BadRequest(new
                        {
                            success = false,
                            message = "Invalid image format"
                        });
                    }

                    // create file name
                    var fileName = Guid.NewGuid() + ext;

                    // path
                    var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
                    var filePath = Path.Combine(folder, fileName);

                    // save file
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    // update DB image path
                    data.Image = "/uploads/" + fileName;
                }

                // 4. Save changes
                await _context.SaveChangesAsync();

                Console.WriteLine("Category updated successfully");

                return Ok(new
                {
                    success = true,
                    message = "Category updated successfully",
                    data
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Update Error: " + ex.Message);

                return StatusCode(500, new
                {
                    success = false,
                    message = "Internal server error",
                    error = ex.Message
                });
            }
        }

       


        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> SoftDelete(int id)
        {
            try
            {
                Console.WriteLine($"Soft delete called for ID: {id}");

                // Find category
                var data = await _context.VendorCategories.FindAsync(id);

                if (data == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Category not found"
                    });
                }

                // Soft delete 
                data.IsActive = false;

                // Save to DB
                await _context.SaveChangesAsync();

                Console.WriteLine("Soft delete success");

                return Ok(new
                {
                    success = true,
                    message = "Category deleted successfully (soft delete)"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    error = ex.Message
                });
            }
        }
    }
}
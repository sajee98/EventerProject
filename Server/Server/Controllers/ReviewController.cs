using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.DTOs;
using System.Security.Claims;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReviewController(AppDbContext context)
        {
            _context = context;
        }

        // CREATE REVIEW 
        [HttpPost]
        public async Task<IActionResult> CreateReview([FromBody] ReviewDto dto)
        {
            // Get user from JWT token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized("User not authenticated");

            var userId = int.Parse(userIdClaim);

            // Check vendor exists
            var vendorExists = await _context.Vendors
                .AnyAsync(v => v.Id == dto.VendorId);

            if (!vendorExists)
                return BadRequest("Vendor not found");

            // Create review
            var review = new Review
            {
                UserId = userId,
                VendorId = dto.VendorId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            // return with user info
            var createdReview = await _context.Reviews
                .Include(r => r.User)
                .Include(r => r.Vendor)
                .FirstOrDefaultAsync(r => r.Id == review.Id);

            return Ok(new
            {
                id = review.Id,
                userId = review.UserId,
                vendorId = review.VendorId,
                rating = review.Rating,
                comment = review.Comment,
                createdAt = review.CreatedAt,
                userName = createdReview.User?.Name,
                vendorName = createdReview.Vendor?.VendorName
            });
        }

        // GET REVIEWS BY VENDOR
        [HttpGet("vendor/{vendorId}")]
        public async Task<IActionResult> GetVendorReviews(int vendorId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.VendorId == vendorId)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new
                {
                    r.Id,
                    r.Rating,
                    r.Comment,
                    r.CreatedAt,

                    User = new
                    {
                        r.User.Id,
                        r.User.Name,
                        r.User.Email
                    },

                    Vendor = new
                    {
                        r.Vendor.Id,
                        r.Vendor.VendorName,
                        r.Vendor.Slug
                    }
                })
                .ToListAsync();

            return Ok(reviews);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
                return NotFound("Review not found");

            // Only owner can delete
            if (review.UserId != userId)
                return Forbid("You cannot delete this review");

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return Ok("Review deleted successfully");
        }
    }
}
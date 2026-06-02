using System.Text.RegularExpressions;

namespace Server.Helpers
{
    public static class SlugHelper
    {
        public static string GenerateSlug(string name)
        {
            string slug = name.ToLower().Trim();

            slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
            slug = Regex.Replace(slug, @"\s+", "-");

            return slug;
        }
    }
}
using Microsoft.AspNetCore.Http;

namespace Server.Helpers
{
    public class FileUploadHelper
    {

        public static async Task<string?> UploadFile(
            IFormFile file,
            string folder
        )
        {

            if(file == null || file.Length == 0)
                return null;


            var extension =
                Path.GetExtension(file.FileName);


            var fileName =
                Guid.NewGuid().ToString()
                + extension;



            var uploadPath =
                Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "uploads",
                    folder
                );


            if(!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }



            var filePath =
                Path.Combine(
                    uploadPath,
                    fileName
                );



            using(var stream = new FileStream(
                filePath,
                FileMode.Create))
            {

                await file.CopyToAsync(stream);

            }



            return 
            $"/uploads/{folder}/{fileName}";

        }

    }
}
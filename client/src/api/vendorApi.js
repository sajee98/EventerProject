import api from "./axios";

// logged user's vendors
export async function getMyVendors() {
  const res = await api.get("/vendor/my");
  return res.data.vendors ?? res.data; 
}

export async function createVendor(formData) {
    const res = await api.post(
        "/vendor",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return res.data;
}


export async function updateVendor(id, data) {
    const res = await api.put(
        `/vendor/${id}`,
        data
    );

    return res.data;
}




export async function deleteVendor(id) {
    const res = await api.delete(
        `/vendor/${id}`
    );
    return res.data;
}



// Get all gallery images for a vendor
export async function getVendorGallery(vendorId) {
  const res = await api.get(`/vendor/${vendorId}/gallery`);
  return res.data;
}

// Upload one or more images to a vendor's gallery
export async function uploadVendorGallery(vendorId, files) {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("images", file);
  });

  const res = await api.post(`/vendor/${vendorId}/gallery`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

// Delete a single gallery image by its gallery row id
export async function deleteVendorGalleryImage(id) {
  const res = await api.delete(`/vendor/gallery/${id}`);
  return res.data;
}
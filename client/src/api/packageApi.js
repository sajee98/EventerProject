import api from "./axios";

export async function createPackage(payload) {
  // payload: { vendorId, name, price, description, maxPeople, isPerPerson, features? }
  const res = await api.post("/package", {
    VendorId: payload.vendorId,
    Name: payload.name,
    Price: payload.price,
    Description: payload.description ?? "",
    MaxPeople: payload.maxPeople,
    IsPerPerson: payload.isPerPerson,
    Features: payload.features ?? undefined,
  });
  return res.data;
}

export async function deletePackage(packageId) {
  const res = await api.delete(`/package/${packageId}`);
  return res.data;
}

export async function addPackageFeature(packageId, featureText) {
  const res = await api.post(`/package/${packageId}/features`, {
    FeatureText: featureText,
  });
  return res.data;
}

export async function deletePackageFeature(featureId) {
  const res = await api.delete(`/package/features/${featureId}`);
  return res.data;
}
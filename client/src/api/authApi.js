import api from "./axios";

export async function loginUser(payload) {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function registerUser(payload) {
  const res = await api.post("/user", payload);
  return res.data;
}

export async function logoutUser() {
  const res = await api.post("/auth/logout");
  return res.data;
}

// Called on app load / refresh to check if the httpOnly cookie is still valid
export async function getCurrentUser() {
  const res = await api.get("/auth/me");
  return res.data;
}
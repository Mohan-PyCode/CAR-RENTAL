import { apiClient } from "./client.js";

export async function loginUser(username, password) {
  return await apiClient("/auth/login/", {
    method: "POST",
    body: { username, password },
  });
}

export async function registerUser(userData) {
  return await apiClient("/auth/register/", {
    method: "POST",
    body: userData,
  });
}

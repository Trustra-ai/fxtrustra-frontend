// src/api.js

// Backend base URL
const API_BASE = "https://fxtrustra-backend.onrender.com/api";

// Request timeout (ms)
const REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Fetch helper with timeout + credentials support
 */
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: "include", // future-proof for httpOnly cookies
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  }
}

/**
 * Register user
 */
export async function registerUser(email, password) {
  const response = await fetchWithTimeout(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  return data; // { message: "User registered successfully" }
}

/**
 * Login user
 */
export async function loginUser(email, password) {
  const response = await fetchWithTimeout(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }

  return data; // { token }
}

/**
 * Get stored JWT token
 */
export function getAuthToken() {
  return localStorage.getItem("authToken");
}

/**
 * Logout user
 */
export function logoutUser() {
  localStorage.removeItem("authToken");
}

/**
 * Fetch with Authorization header
 */
export async function authenticatedFetch(endpoint, options = {}) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetchWithTimeout(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    logoutUser();
    throw new Error("Session expired. Please login again.");
  }

  return response;
}

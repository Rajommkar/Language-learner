/**
 * Shared Frontend Utility Helpers
 */

// Centralized API Base URL
const API_BASE_URL = typeof BASE_URL !== 'undefined' ? BASE_URL : "http://localhost:5000";

// Route Guard: Checks token and instantly redirects unauthenticated users
function initRouteGuard() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}

// Safely Retrieve the Token
function getToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return null;
  }
  return token;
}

// Log Out User gracefully
function logoutUser() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// Export functions to global window object
window.TranslifyUtils = {
  API_BASE_URL,
  initRouteGuard,
  getToken,
  logoutUser
};

// Backward compatibility for old name
window.OdysseyUtils = window.TranslifyUtils;

// auth.js

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return null; // ❌ no redirect here
  }

  try {
    const response = await fetch("https://aviro-production.up.railway.app/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      })
    });

    if (!response.ok) {
      throw new Error("Refresh failed");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);

    return data.accessToken;

  } catch (error) {
    console.error("Refresh Error:", error);
    return null; // ❌ no redirect
  }
}



// GLOBAL FETCH WRAPPER
async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem("accessToken");

  options.headers = {
    ...options.headers,
    Authorization: "Bearer " + token
  };

  let response = await fetch(url, options);

  // 🔥 If unauthorized → try refresh
  if (response.status === 403) {
    const newToken = await refreshAccessToken();

    // ❌ If refresh failed → NOW redirect safely
    if (!newToken) {
      alert("Session expired. Please login again.");
      localStorage.clear();
      window.location.href = "login.html";
      return;
    }

    // retry request
    options.headers.Authorization = "Bearer " + newToken;
    response = await fetch(url, options);
  }

  return response;
}
// AUTO REFRESH EVERY 14 MIN
setInterval(() => {
  refreshAccessToken();
}, 14 * 60 * 1000);
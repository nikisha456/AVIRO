/**async function callAPI() {
    const url = "https://aviro-production.up.railway.app/api/auth/register";

    const requestBody = {
        name: "Priyesh",
        collegeEmail: "test@example.com",
        password: "123456",
        phone: "9876543210",
        role: "STUDENT",
        collegeId: 1
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        let data;

        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (response.ok) {
            console.log("Success:", data);
        } else {
            console.log("Error:", data);
        }

        return data;

    } catch (error) {
        console.error("Fetch Error:", error);
    }
}**/

// ================================
// TOGGLE PASSWORD (Signup)
// ================================
function togglePassword() {
  const passwordField = document.getElementById("password");
  if (!passwordField) return;

  passwordField.type =
    passwordField.type === "password" ? "text" : "password";
}


// ================================
// REGISTER USER (Signup)
// ================================
async function registerUser() {

  console.log("Signup clicked");

  const payload = {
    name: document.getElementById("name")?.value,
    collegeEmail: document.getElementById("email")?.value,
    password: document.getElementById("password")?.value,
    phone: document.getElementById("phone")?.value,
    role: document.getElementById("role")?.value,
    collegeId: 1
  };

  console.log("Payload:", payload);

  // Basic validation
  if (!payload.name || !payload.collegeEmail || !payload.password) {
    alert("Please fill all required fields");
    return;
  }

  try {
    const response = await fetch("https://aviro-production.up.railway.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("Signup Response:", data);

    if (response.ok) {
      alert("Registration Successful!");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Registration Failed");
    }

  } catch (error) {
    console.error("Signup Error:", error);
    alert("Network / Server error");
  }
}


// ================================
// LOGIN USER
// ================================
async function loginUser() {

  console.log("Login clicked");

  const payload = {
    collegeEmail: document.getElementById("loginEmail")?.value,
    password: document.getElementById("loginPassword")?.value
  };

  console.log("Login Payload:", payload);

  if (!payload.collegeEmail || !payload.password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const response = await fetch("https://aviro-production.up.railway.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("Login Response:", result);

    if (response.ok) {
      alert("Login Successful!");

      localStorage.setItem("userData", JSON.stringify(result));
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      window.location.href = "dashboard.html";
    } else {
      alert(result.message || "Invalid credentials");
    }

  } catch (error) {
    console.error("Login Error:", error);
    alert("Network / Server error");
  }
}


// ================================
// TOGGLE PASSWORD (Login)
// ================================
function toggleLoginPassword() {
  const passwordField = document.getElementById("loginPassword");
  if (!passwordField) return;

  passwordField.type =
    passwordField.type === "password" ? "text" : "password";
}
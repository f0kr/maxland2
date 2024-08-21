export async function signup({ name, email, password }) {
  try {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}
export async function googleSignup({ id_token }) {
  const response = await fetch("/auth/google-signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_token }),
  });

  if (!response.ok) {
    throw new Error("Signing with google failed");
  }

  return response.json();
}
export async function setPassword({ password, googleId }) {
  const response = await fetch("/auth/signup/set-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, googleId }),
  });

  if (!response.ok) {
    throw new Error("Failed to set password");
  }

  return response.json();
}
export async function login({ email, password }) {
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
}

export async function googleLogin({ id_token }) {
  const response = await fetch("/auth/google-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_token }),
  });

  if (!response.ok) {
    throw new Error("Google login failed");
  }

  return await response.json();
}

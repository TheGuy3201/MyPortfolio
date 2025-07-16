export const signin = async (user) => {
  try {
    let response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    // If response is empty, return error
    const text = await response.text();
    if (!text) return { error: "No response from server" };
    try {
      return JSON.parse(text);
    } catch {
      return { error: "Invalid JSON from server" };
    }
  } catch {
    return { error: "Network error" };
  }
};

const signout = async () => {
  try {
    let response = await fetch("/api/auth/signout/", { method: "GET" });
    return await response.json();
  } catch (_err) {
    console.log(_err);
  }
};

export { signout };

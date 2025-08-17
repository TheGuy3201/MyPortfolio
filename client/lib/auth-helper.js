import { signout } from "./api-auth.js";
const auth = {
  isAuthenticated() {
    if (typeof window === "undefined") return false;
    
    try {
      const jwt = sessionStorage.getItem("jwt");
      if (!jwt) return false;
      
      const parsed = JSON.parse(jwt);
      if (!parsed || !parsed.token || !parsed.user) return false;
      
      return parsed;
    } catch (e) {
      console.error('Auth parse error:', e);
      return false;
    }
  },
  
  authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
      // Validate JWT data before storing
      if (jwt && jwt.token && jwt.user) {
        sessionStorage.setItem("jwt", JSON.stringify(jwt));
        console.log('Auth stored:', jwt.user.role); // Debug log
      } else {
        console.error('Invalid JWT data:', jwt);
      }
    }
    if (cb) cb();
  },
  
  clearJWT(cb) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("jwt");
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    signout().then(() => {
      if (cb) cb();
    });
  },
  
  isAdmin() {
    const auth = this.isAuthenticated();
    return auth && auth.user && auth.user.role === 'admin';
  }
};
export default auth;

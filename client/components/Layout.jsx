import React from 'react';
import auth from "../lib/auth-helper";
import { useNavigate } from "react-router-dom";

const Layout = React.forwardRef(() => {
    const navigate = useNavigate();
    const authenticatedUser = auth.isAuthenticated();
    const isAdmin = auth.isAdmin();
    
    React.useEffect(() => {
        // Debug log
        if (authenticatedUser && authenticatedUser.user) {
            console.log('Current user role:', authenticatedUser.user.role);
            console.log('Is admin?', isAdmin);
        }
    }, [authenticatedUser, isAdmin]);

    function navigateTo(path) {
        navigate(path);
    }

    function handleSignOut() {
        auth.clearJWT(() => navigate('/'));
    }

    return (
        <>
            {/* Header row: logo/title left, auth buttons far right */}
            <div className="header">
            <div
                className="header-row"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 2rem",
                }}
            >
                <div className="logo-title" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img src="/res/JoshuaD Logo.png" className="Logo" alt="JD Logo" style={{ height: "48px" }} />
                    <h1 style={{ margin: 0 }}>Joshua Desroches</h1>
                </div>
                {/* Auth buttons far right */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    {!authenticatedUser && (
                        <>
                            <button
                                onClick={() => navigateTo("/signin")}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                                title="Admin Sign In"
                            >
                                <img src="https://cdn-icons-png.flaticon.com/512/152/152533.png" className="Logo" alt="JD Logo" style={{ height: "48px" }} />
                            </button>
                        </>
                    )}
                    {authenticatedUser && (
                        <>
                            
                            <button
                                onClick={handleSignOut}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                                title="Sign Out"
                            >
                                <img src="https://cdn-icons-png.flaticon.com/512/7046/7046204.png" className="Logo" alt="JD Logo" style={{ height: "48px" }} />
                            </button>
                        </>
                    )}
                </div>
            </div>
            {/* Keep your original nav bar below */}
            
                <nav className="nav-bar">
                    <button onClick={() => navigateTo("/")}>Home</button>
                    <button onClick={() => navigateTo("/education")}>Education</button>
                    <button onClick={() => navigateTo("/project")}>Projects</button>
                    <button onClick={() => navigateTo("/services")}>Services</button>
                    <button onClick={() => navigateTo("/contact")}>Contact</button>
                    <button onClick={() => navigateTo("/about")}>About</button>
                    
                    {/* Admin-only navigation */}
                    {isAdmin && (
                        <>
                            <button onClick={() => navigateTo("/admin")}>Admin Dashboard</button>
                            <button onClick={() => navigateTo("/admin/education")}>Manage Education</button>
                            <button onClick={() => navigateTo("/admin/education/new")}>Add Education</button>
                            <button onClick={() => navigateTo("/admin/projects/new")}>Add Project</button>
                            <button onClick={() => navigateTo("/admin/services")}>Manage Services</button>
                            <button onClick={() => navigateTo("/admin/contacts")}>View Contacts</button>
                            <button onClick={() => navigateTo("/users")}>Manage Users</button>
                        </>
                    )}
                </nav>
            </div>
            <hr />
        </>
    );
});

Layout.displayName = 'Layout';
export default Layout;

import React from 'react';
import auth from "../lib/auth-helper";
import { useNavigate } from "react-router-dom";

export default function Layout() {
    const navigate = useNavigate();

    function navigateTo(path) {
        navigate(path);
    }

    function handleSignOut() {
        auth.clearJWT(() => navigateTo("/"));
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
                    {!auth.isAuthenticated() && (
                        <>
                            <button
                                onClick={() => navigateTo("/signup")}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                                title="Sign Up"
                            >
                            <img src="https://static.thenounproject.com/png/6478-200.png" className="Logo" alt="JD Logo" style={{ height: "48px" }} />

                            </button>
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
                                title="Sign In"
                            >
                                <img src="https://cdn-icons-png.flaticon.com/512/152/152533.png" className="Logo" alt="JD Logo" style={{ height: "48px" }} />
                            </button>
                        </>
                    )}
                    {auth.isAuthenticated() && (
                        
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
                    
                </nav>
            </div>
            <hr />
        </>
    );
}

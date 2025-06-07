import React from 'react';

export default function Layout() {
    return (
        <>
            {/* Header component that contains the logo and title, as well as the navigation bar */}
            {/* This is the header with my name and logo */}
            <div className="header">
                <div className="logo-title">
                    <img src="/res/JoshuaD Logo.png" className="Logo" alt="JD Logo" />
                    <h1>Joshua Desroches</h1>
                </div>

                {/* Navigation bar with buttons to redirect to different pages */}
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

    function navigateTo(path) {
        window.history.pushState({}, "", path);
        const navEvent = new PopStateEvent("popstate");
        window.dispatchEvent(navEvent);
    }
}

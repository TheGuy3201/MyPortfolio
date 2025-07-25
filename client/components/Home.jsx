import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Home = memo(() => {
    const navigate = useNavigate();

    const navigateTo = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    const handleImageClick = useCallback(() => {
        navigate("/about");
    }, [navigate]);

    return ( 
<>
    {/* Home page relatively simple again, with a little welcome message, picture of me, and mission statement*/}
    <h1 style={{ fontFamily: "sans-serif Roboto" }}>Welcome to Joshua Desroches page</h1> 
    <img 
        src="/res/Pic of me.jpg" 
        alt="Picture of Joshua D" 
        className="HomeSelfImg" 
        onClick={handleImageClick}
        loading="eager"
        style={{ cursor: "pointer" }}
    />
    <h1 className="missionStatement">I strive to bring innovative ideas to life through a blend of technology, creativity, and forward-thinking — driven by a passion for building meaningful solutions that make a difference.</h1>
        
    <h2 className="RedirectText">To learn more about me, click either buttons below.</h2>
    {/* Two buttons to redirect to the about me and projects page to kind of guide the user through my website*/}
    <nav>
        <button className="RedirectButton" onClick={() => navigateTo("/about")}>
            About Me 
            <img 
                className="RedirectIcon" 
                src="/res/person-icon.svg"
                alt="About icon"
                onLoad={(e) => e.target.classList.add('loaded')}
            /> 
        </button>
        <button className="RedirectButton" onClick={() => navigateTo("/project")}>
            My Projects 
            <img 
                className="RedirectIcon" 
                src="/res/projects-icon.svg"
                alt="Projects icon"
                onLoad={(e) => e.target.classList.add('loaded')}
            /> 
        </button>
    </nav>
</>
);
});

Home.displayName = 'Home';
export default Home;
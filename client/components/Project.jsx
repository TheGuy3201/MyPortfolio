import { useState } from "react";

export default function Project() {
    // Here is the array of images for each project
    //Backrooms: Into The Subrooms
    const backroomsImages = [
        { src: "/res/BackroomsGame/Backrooms1.png", alt: "Into The Subrooms 1" },
        { src: "/res/BackroomsGame/Backrooms2.png", alt: "Into The Subrooms 2" },
        { src: "/res/BackroomsGame/Backrooms3.png", alt: "Into The Subrooms 3" },
        { src: "/res/BackroomsGame/Backrooms4.png", alt: "Into The Subrooms 4" },
        { src: "/res/BackroomsGame/Backrooms5.png", alt: "Into The Subrooms 5" },
    ];

    //Terminus
    const terminusImages = [
        { src: "/res/Terminus/Terminus1.jpg", alt: "Terminus Screenshot 1" },
        { src: "/res/Terminus/Terminus2.jpg", alt: "Terminus Screenshot 2" },
        { src: "/res/Terminus/Terminus3.jpg", alt: "Terminus Screenshot 3" },
        { src: "/res/Terminus/Terminus4.jpg", alt: "Terminus Screenshot 4" },
        { src: "/res/Terminus/Terminus5.jpg", alt: "Terminus Screenshot 5" },
        { src: "/res/Terminus/Terminus6.jpg", alt: "Terminus Screenshot 6" },
    ];

    //MemeDex
    const memeDexImages = [
        { src: "/res/MemeDexApp/MemeDex1.png", alt: "MemeDex Screenshot 1" },
        { src: "/res/MemeDexApp/MemeDex2.png", alt: "MemeDex Screenshot 2" },
        { src: "/res/MemeDexApp/MemeDex3.png", alt: "MemeDex Screenshot 3" },
    ];

    // State variables to keep track of the current image index for each project
    const [currentBackrooms, setCurrentBackrooms] = useState(0);
    const [currentTerminus, setCurrentTerminus] = useState(0);
    const [currentMemeDex, setCurrentMemeDex] = useState(0);

    // Functions to handle the previous and next image for each project
    const prevBackroomsImage = () =>
        setCurrentBackrooms((currentBackrooms - 1 + backroomsImages.length) % backroomsImages.length);
    const nextBackroomsImage = () =>
        setCurrentBackrooms((currentBackrooms + 1) % backroomsImages.length);

    const prevTerminusImage = () =>
        setCurrentTerminus((currentTerminus - 1 + terminusImages.length) % terminusImages.length);
    const nextTerminusImage = () =>
        setCurrentTerminus((currentTerminus + 1) % terminusImages.length);

    const prevMemeDexImage = () =>
        setCurrentMemeDex((currentMemeDex - 1 + memeDexImages.length) % memeDexImages.length);
    const nextMemeDexImage = () =>
        setCurrentMemeDex((currentMemeDex + 1) % memeDexImages.length);

    return (
        <>
            {/* Projects page, contains a select few of my projects */}
            <h1 className="page-title">My Projects</h1>
            <div className="project-list">

                {/* Project 1 Backrooms: Into The Subrooms */}
                <div className="project-item">
                    {/* Project title */}
                    <h2 className="project-title">Backrooms: Into The Subrooms</h2>
                    <div className="project-main">

                        {/* Image gallery for the project */}
                        {/* The images are displayed in a gallery format, with left and right arrows to navigate through the images */}
                        <div className="image-gallery">
                            <button className="gallery-arrow left" onClick={prevBackroomsImage} aria-label="Previous image">⟨</button>
                            <img src={backroomsImages[currentBackrooms].src} alt={backroomsImages[currentBackrooms].alt}/>
                            <button className="gallery-arrow right" onClick={nextBackroomsImage} aria-label="Next image">⟩</button>
                        </div>

                        {/* Project description */}
                        <div className="project-description">
                            <div>
                                <h4 className="section-title">Project Overview</h4>
                                <p>
                                    Backrooms: Into The Subrooms, is a horror game I created using solely Java. It is a 2D dialog choice game, that gives the player complete freedom to explore a forgotten world, The Subrooms. The player will have the opportunity to discover new areas, items/weapons, and various endings. The question that remains is, will you survive the hostile subrooms?
                                </p>
                                <a
                                    href="https://github.com/TheGuy3201/Backrooms-into-the-Subrooms.git"
                                    className="github-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="github-btn">View on GitHub</button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* My role in the project */}
                    <div className="roleDescription">
                        <h4 className="section-title">My Role</h4>
                        <p>
                            In this solo project, I had been provided skeleton code for a simple dialog choice adventure game. With many hours of development, brainstorming, and problem-solving, I transformed it into a fully functional game with multiple branching paths and endings. While lots of ideas were cut due to time-constraints, I hope to return to this project in the future to expand on it significantly.
                        </p>
                    </div>
                </div>

                {/* Project 2 */}
                <div className="project-item">
                    {/* Project title */}
                    <h2 className="project-title">Terminus</h2>
                    <div className="project-main">
                        {/* Image gallery for the project */}
                        <div className="image-gallery">
                            <button
                                className="gallery-arrow left"
                                onClick={prevTerminusImage}
                                aria-label="Previous image"
                            >⟨</button>
                            <img src={terminusImages[currentTerminus].src} alt={terminusImages[currentTerminus].alt}/>
                            <button
                                className="gallery-arrow right"
                                onClick={nextTerminusImage}
                                aria-label="Next image"
                            >
                                ⟩
                            </button>
                        </div>
                        {/* Project description */}
                        <div className="project-description">
                            <div>
                                <h4 className="section-title">Project Overview</h4>
                                <p>
                                    Terminus is a 3D game developed with Unity and C#. It is a first-person 3D platformer game. Players must navigate a futuristic world by completing various platforming challenges, solving puzzles and more. Players have the ability to interact with the world by picking up anything and being able to place it wherever they see fit. Players ask the one question, "where am I, really?" and they will be surprised by the answer.
                                </p>
                                <a
                                    href="https://github.com/TheGuy3201/WebGame-Group-Project.git"
                                    className="github-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="github-btn">View on GitHub</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* My role in the project */}
                    <div className="roleDescription">
                        <h4 className="section-title">My Role</h4>
                        <p>
                            In a team of 5, I was considered as the team lead. I was responsible for the overall design and development of the game, including the gameplay mechanics, level design, and enemy navigation. I also worked on the programming side of things, implementing various features and fixing bugs. My role involved coordinating with team members to ensure that everyone was on the same page, that the project was progressing smoothly and meeting each deadline.
                        </p>
                    </div>
                </div>

                {/* Project 3 */}
                <div className="project-item">

                    {/* Project title */}
                    <h2 className="project-title">MemeDex</h2>
                    <div className="project-main">

                        {/* Image gallery for the project */}
                        <div className="image-gallery">
                            <button
                                className="gallery-arrow left"
                                onClick={prevMemeDexImage}
                                aria-label="Previous image" >
                                ⟨</button>
                            <img src={memeDexImages[currentMemeDex].src} alt={memeDexImages[currentMemeDex].alt} />
                            <button
                                className="gallery-arrow right"
                                onClick={nextMemeDexImage}
                                aria-label="Next image">
                                ⟩</button>
                        </div>

                        {/* Project description */}
                        <div className="project-description">
                            <div>
                                <h4 className="section-title">Project Overview</h4>
                                <p>
                                    The MemeDex is a simple computer application that allows users to search for memes using keywords. Users can also view, create Meme indices. The application is built using Java and JavaFX, and it utilizes a locally stored txt document to serve as a database to store the memes.
                                </p>
                                <a
                                    href="https://github.com/TheGuy3201/MemeDex.git"
                                    className="github-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="github-btn">View on GitHub</button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* My role in the project */}
                    <div className="roleDescription">
                        <h4 className="section-title">My Role</h4>
                        <p>
                            In a small of team of 2, I was responsible for the functionality of the application, and backend development. I made various classes to handle the data and the logic of the application. I made the GUI functional by connecting our backend to the front-end.
                        </p>
                    </div>
                </div>
                <div >
                    <a
                        href="https://github.com/TheGuy3201"
                        className="github-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="github-btn">View All Projects on GitHub</button>
                    </a>
                </div>
            </div>
        </>
    );
}
import { useState, useEffect } from "react";
import { list } from "../project/api-project.js";

export default function Project() {
    const [projects, setProjects] = useState([]);
    const [currentIndexes, setCurrentIndexes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await list({});
                setProjects(data || []);
                
                // Initialize current indexes for each project
                const initialIndexes = {};
                if (data && Array.isArray(data)) {
                    data.forEach(project => {
                        initialIndexes[project._id] = 0;
                    });
                }
                setCurrentIndexes(initialIndexes);
            } catch (err) {
                setError(err.message || 'Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Function to navigate to the next image
    const nextImage = (projectId, imagesLength) => {
        setCurrentIndexes(prev => ({
            ...prev,
            [projectId]: (prev[projectId] + 1) % imagesLength
        }));
    };

    // Function to navigate to the previous image
    const prevImage = (projectId, imagesLength) => {
        setCurrentIndexes(prev => ({
            ...prev,
            [projectId]: (prev[projectId] - 1 + imagesLength) % imagesLength
        }));
    };

    if (loading) return <div>Loading projects...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {/* Projects page, contains a select few of my projects */}
            <h1 className="page-title">My Projects</h1>
            <div className="project-list">
                {projects.map((project) => (
                    <div key={project._id} className="project-item">
                        {/* Project title */}
                        <h2 className="project-title">{project.title}</h2>
                        <div className="project-main">
                            {/* Image gallery for the project */}
                            {project.imgurl && project.imgurl.length > 0 && (
                                <div className="image-gallery">
                                    <button
                                        className="gallery-arrow left"
                                        onClick={() => prevImage(project._id, project.imgurl.length)}
                                        aria-label="Previous image"
                                    >
                                        ⟨
                                    </button>
                                    <img
                                        src={project.imgurl[currentIndexes[project._id] || 0]}
                                        alt={`${project.title} screenshot ${(currentIndexes[project._id] || 0) + 1}`}
                                    />
                                    <button
                                        className="gallery-arrow right"
                                        onClick={() => nextImage(project._id, project.imgurl.length)}
                                        aria-label="Next image"
                                    >
                                        ⟩
                                    </button>
                                </div>
                            )}

                            {/* Project description */}
                            <div className="project-description">
                                <div>
                                    <h4 className="section-title">Project Overview</h4>
                                    <p>{project.description}</p>
                                    {project.repolink && (
                                        <a
                                            href={project.repolink}
                                            className="github-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <button className="github-btn">View on GitHub</button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* My role in the project */}
                        {project.roledescription && (
                            <div className="roleDescription">
                                <h4 className="section-title">My Role</h4>
                                <p>{project.roledescription}</p>
                            </div>
                        )}
                    </div>
                ))}
                
                {/* View all projects link */}
                <div>
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
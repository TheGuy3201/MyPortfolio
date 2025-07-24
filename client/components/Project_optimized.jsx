import { useState, useEffect, memo, useCallback, useMemo } from "react";
import { list } from "../project/api-project.js";

const ImageGallery = memo(({ project, currentIndex, onNext, onPrev }) => {
    if (!project.imgurl || project.imgurl.length === 0) return null;

    return (
        <div className="image-gallery">
            <button
                className="gallery-arrow left"
                onClick={() => onPrev(project._id, project.imgurl.length)}
                aria-label="Previous image"
            >
                ⟨
            </button>
            <img
                src={project.imgurl[currentIndex || 0]}
                alt={`${project.title} screenshot ${(currentIndex || 0) + 1}`}
                loading="lazy"
            />
            <button
                className="gallery-arrow right"
                onClick={() => onNext(project._id, project.imgurl.length)}
                aria-label="Next image"
            >
                ⟩
            </button>
        </div>
    );
});

ImageGallery.displayName = 'ImageGallery';

const ProjectCard = memo(({ project, currentIndex, onNext, onPrev }) => (
    <div key={project._id} className="project-item">
        {/* Project title */}
        <h2 className="project-title">{project.title}</h2>
        <div className="project-main">
            {/* Image gallery for the project */}
            <ImageGallery 
                project={project}
                currentIndex={currentIndex}
                onNext={onNext}
                onPrev={onPrev}
            />

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

                    {/* Technologies used */}
                    {project.technologies && (
                        <div className="project-technologies">
                            <h4 className="section-title">Technologies Used</h4>
                            <p>{project.technologies}</p>
                        </div>
                    )}

                    {/* Project dates */}
                    {(project.startDate || project.endDate) && (
                        <div className="project-dates">
                            <h4 className="section-title">Project Timeline</h4>
                            <p>
                                {project.startDate && `Started: ${new Date(project.startDate).toLocaleDateString()}`}
                                {project.startDate && project.endDate && ' - '}
                                {project.endDate && `Completed: ${new Date(project.endDate).toLocaleDateString()}`}
                            </p>
                        </div>
                    )}

                    {/* Live demo link */}
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            className="live-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="live-demo-btn">View Live Demo</button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    </div>
));

ProjectCard.displayName = 'ProjectCard';

const Project = memo(() => {
    const [projects, setProjects] = useState([]);
    const [currentIndexes, setCurrentIndexes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProjects = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Function to navigate to the next image
    const nextImage = useCallback((projectId, imagesLength) => {
        setCurrentIndexes(prev => ({
            ...prev,
            [projectId]: (prev[projectId] + 1) % imagesLength
        }));
    }, []);

    // Function to navigate to the previous image
    const prevImage = useCallback((projectId, imagesLength) => {
        setCurrentIndexes(prev => ({
            ...prev,
            [projectId]: (prev[projectId] - 1 + imagesLength) % imagesLength
        }));
    }, []);

    const memoizedProjects = useMemo(() => projects.map((project) => (
        <ProjectCard 
            key={project._id} 
            project={project}
            currentIndex={currentIndexes[project._id]}
            onNext={nextImage}
            onPrev={prevImage}
        />
    )), [projects, currentIndexes, nextImage, prevImage]);

    if (loading) return <div>Loading projects...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {/* Projects page, contains a select few of my projects */}
            <h1 className="page-title">My Projects</h1>
            <div className="project-list">
                {memoizedProjects}
            </div>
        </>
    );
});

Project.displayName = 'Project';
export default Project;

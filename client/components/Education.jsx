import { useState, useEffect, memo, useCallback } from "react";
import { list } from "../lib/api-education.js";

const EducationCard = memo(({ education }) => (
    <div key={education._id} className="EducationCard">
        <h2>{education.institution}</h2>
        <p>{education.degree}</p>
        <p>{education.graddate ? `Graduation Date: ${new Date(education.graddate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : ''}</p>
        {education.accomplishments && <p>{education.accomplishments}</p>}
        {education.imgurl && (
            <img 
                className="SelfImg" 
                src={education.imgurl} 
                alt={education.institution}
                onLoad={(e) => e.target.classList.add('loaded')}
            />
        )}

        {/* A list of important courses I took in said program */}
        {education.courses && education.courses.length > 0 && (
            <ul className="CourseList">
                <p>Relevant Courses:</p>
                {education.courses.map((course, index) => (
                    <li key={index}>{course}</li>
                ))}
            </ul>
        )}
    </div>
));

EducationCard.displayName = 'EducationCard';

const Education = memo(() => {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchEducations = useCallback(async () => {
        try {
            const data = await list();
            if (data.error) {
                setError(data.error);
            } else {
                setEducations(data);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch education data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEducations();
    }, [fetchEducations]);

    if (loading) return <div>Loading education data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {/* Education page, its relatively simple at the moment due to my lack of extensive education*/}
            <h1>Education</h1>
            {/* Contains information about my educational background */}
            <div className="EducationPanel">
                {educations.map((education) => (
                    <EducationCard key={education._id} education={education} />
                ))}
            </div>
        </>
    );
});

Education.displayName = 'Education';
export default Education;
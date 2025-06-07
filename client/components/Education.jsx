export default function Education() {
    return (
    <>
        {/* Education page, its relatively simple at the moment due to my lack of extensive education*/}
        <h1>Education</h1>
        {/* Contains information about my educational background */}
        <div className="EducationPanel">
            
            {/* Each education entry is split into cards to better organize the information */}
            <div className="EducationCard">
                <h2>Centennial College</h2>
                <p>Game - Programming Advanced Diploma</p>
                <p>Exp. Graduation Date: August 2026</p>
                <p>GPA: 4.0/4.5</p>
                <img className = "SelfImg" src="https://oaa.on.ca/Assets/Common/Shared_Images/Awards/2024/1200x675%20DE-03.png" alt="Centennial College" />

                {/* A list of important courses I took in said program */}
                <ul className="CourseList">
                    <p>Relevant Courses:</p>
                    <li>Java Programming</li>
                    <li>Game Programming</li>
                    <li>Web Application Development</li>
                    <li>Software Requirements Engineering & Systems Design</li>
                    <li>C++ for Game Development</li>
                    <li>Software Testing & Quality</li>
                </ul>
            </div>

            {/* A relatively simple high school education card */}
            <div className="EducationCard">
                <h2>High School</h2>
                <p>Sir Oliver Mowat Collegiate</p>
                <p>Graduated: June 2023</p>
                <p>Honour Roll Grades: 9, 10, 11, 12</p>
            </div>
        </div>
    </>
    );
}
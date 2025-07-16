import mongoose from 'mongoose';
import config from '../config/config.js';

// Import models
import Education from '../server/models/educations.model.js';
import Project from '../server/models/projects.model.js';
import Service from '../server/models/services.model.js';

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Education data
const educations = [
    {
        institution: "Centennial College",
        degree: "Game - Programming Advanced Diploma",
        graddate: new Date("2026-08-31"),
        accomplishments: "GPA: 4.0/4.5",
        imgurl: "https://oaa.on.ca/Assets/Common/Shared_Images/Awards/2024/1200x675%20DE-03.png",
        courses: [
            "Java Programming",
            "Game Programming",
            "Web Application Development",
            "Software Requirements Engineering & Systems Design",
            "C++ for Game Development",
            "Software Testing & Quality"
        ]
    },
    {
        institution: "Sir Oliver Mowat Collegiate",
        degree: "High School Diploma",
        graddate: new Date("2023-06-30"),
        accomplishments: "Honour Roll Grades: 9, 10, 11, 12",
        imgurl: "https://schoolweb.tdsb.on.ca/Portals/mowatci/SWLogo.jpg",
        courses: []
    }
];

// Project data
const projects = [
    {
        title: "Backrooms: Into The Subrooms",
        description: "Backrooms: Into The Subrooms, is a horror game I created using solely Java. It is a 2D dialog choice game, that gives the player complete freedom to explore a forgotten world, The Subrooms. The player will have the opportunity to discover new areas, items/weapons, and various endings. The question that remains is, will you survive the hostile subrooms?",
        roledescription: "In this solo project, I had been provided skeleton code for a simple dialog choice adventure game. With many hours of development, brainstorming, and problem-solving, I transformed it into a fully functional game with multiple branching paths and endings. While lots of ideas were cut due to time-constraints, I hope to return to this project in the future to expand on it significantly.",
        repolink: "https://github.com/TheGuy3201/Backrooms-into-the-Subrooms.git",
        imgurl: [
            "http://localhost:3000/res/BackroomsGame/Backrooms1.png",
            "http://localhost:3000/res/BackroomsGame/Backrooms2.png",
            "http://localhost:3000/res/BackroomsGame/Backrooms3.png",
            "http://localhost:3000/res/BackroomsGame/Backrooms4.png",
            "http://localhost:3000/res/BackroomsGame/Backrooms5.png"
        ]
    },
    {
        title: "Terminus",
        description: "Terminus is a 3D game developed with Unity and C#. It is a first-person 3D platformer game. Players must navigate a futuristic world by completing various platforming challenges, solving puzzles and more. Players have the ability to interact with the world by picking up anything and being able to place it wherever they see fit. Players ask the one question, \"where am I, really?\" and they will be surprised by the answer.",
        roledescription: "In a team of 5, I was considered as the team lead. I was responsible for the overall design and development of the game, including the gameplay mechanics, level design, and enemy navigation. I also worked on the programming side of things, implementing various features and fixing bugs. My role involved coordinating with team members to ensure that everyone was on the same page, that the project was progressing smoothly and meeting each deadline.",
        repolink: "https://github.com/TheGuy3201/WebGame-Group-Project.git",
        imgurl: [
            "http://localhost:3000/res/Terminus/Terminus1.jpg",
            "http://localhost:3000/res/Terminus/Terminus2.jpg",
            "http://localhost:3000/res/Terminus/Terminus3.jpg",
            "http://localhost:3000/res/Terminus/Terminus4.jpg",
            "http://localhost:3000/res/Terminus/Terminus5.jpg",
            "http://localhost:3000/res/Terminus/Terminus6.jpg"
        ]
    },
    {
        title: "MemeDex",
        description: "The MemeDex is a simple computer application that allows users to search for memes using keywords. Users can also view, create Meme indices. The application is built using Java and JavaFX, and it utilizes a locally stored txt document to serve as a database to store the memes.",
        roledescription: "In a small of team of 2, I was responsible for the functionality of the application, and backend development. I made various classes to handle the data and the logic of the application. I made the GUI functional by connecting our backend to the front-end.",
        repolink: "https://github.com/TheGuy3201/MemeDex.git",
        imgurl: [
            "http://localhost:3000/res/MemeDexApp/MemeDex1.png",
            "http://localhost:3000/res/MemeDexApp/MemeDex2.png",
            "http://localhost:3000/res/MemeDexApp/MemeDex3.png"
        ]
    }
];

// Service data
const services = [
    {
        title: "Front-End Web Development",
        description: "I create modern, responsive web applications using React, HTML, CSS, and JavaScript. I focus on creating user-friendly interfaces with clean, semantic code.",
        icon: "https://img.freepik.com/free-vector/frontend-development-concept-website-interface-design-improvement-web-page-programming-coding-testing-it-profession-isolated-flat-vector-illustration_613284-2357.jpg",
        features: [
            "Responsive Design",
            "React Applications",
            "Modern HTML/CSS"
        ],
        order: 1,
        isActive: true
    },
    {
        title: "General Programming",
        description: "Skilled in multiple programming languages including Java, Python, and C++. I can help with algorithm design, data structures, and software architecture.",
        icon: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg",
        features: [
            "Java Development",
            "Python Programming",
            "C++ Applications"
        ],
        order: 2,
        isActive: true
    },
    {
        title: "UI/UX Design",
        description: "I design intuitive user interfaces with focus on user experience. Creating wireframes, prototypes, and implementing design systems.",
        icon: "https://img.freepik.com/free-vector/user-interface-concept-illustration_114360-676.jpg",
        features: [
            "User Interface Design",
            "Wireframing",
            "Prototyping"
        ],
        order: 3,
        isActive: true
    },
    {
        title: "Back-End Development",
        description: "I build robust server-side applications using Node.js, Express, and database technologies. API development and server architecture design.",
        icon: "https://img.freepik.com/premium-vector/backend-development-icon-vector-image-can-be-used-computer-programming_120816-101610.jpg",
        features: [
            "Node.js & Express",
            "RESTful APIs",
            "Database Design"
        ],
        order: 4,
        isActive: true
    },
    {
        title: "Agile Development",
        description: "Experienced in agile methodologies including Scrum and Kanban. I can help with project management, team coordination, and iterative development.",
        icon: "https://www.shutterstock.com/image-vector/agile-management-develop-process-infographic-600nw-2241782409.jpg",
        features: [
            "Scrum Framework",
            "Sprint Planning",
            "Team Collaboration"
        ],
        order: 5,
        isActive: true
    }
];

async function populateAllData() {
    try {
        console.log('Starting database population...');

        // Clear existing data
        await Education.deleteMany({});
        await Project.deleteMany({});
        await Service.deleteMany({});
        console.log('✓ Cleared existing data');

        // Insert education data
        const educationResult = await Education.insertMany(educations);
        console.log(`✓ Inserted ${educationResult.length} education records`);

        // Insert project data
        const projectResult = await Project.insertMany(projects);
        console.log(`✓ Inserted ${projectResult.length} project records`);

        // Insert service data
        const serviceResult = await Service.insertMany(services);
        console.log(`✓ Inserted ${serviceResult.length} service records`);

        console.log('\n🎉 Database population completed successfully!');
        console.log('\nSummary:');
        console.log(`  - Education: ${educationResult.length} records`);
        console.log(`  - Projects: ${projectResult.length} records`);
        console.log(`  - Services: ${serviceResult.length} records`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error populating database:', error);
        process.exit(1);
    }
}

populateAllData();

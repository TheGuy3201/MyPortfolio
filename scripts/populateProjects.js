import mongoose from 'mongoose';
import config from '../config/config.js';
import Project from '../server/models/projects.model.js';

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const projects = [
    {
        title: "Backrooms: Into The Subrooms",
        description: "Backrooms: Into The Subrooms, is a horror game I created using solely Java. It is a 2D dialog choice game, that gives the player complete freedom to explore a forgotten world, The Subrooms. The player will have the opportunity to discover new areas, items/weapons, and various endings. The question that remains is, will you survive the hostile subrooms?",
        roledescription: "In this solo project, I had been provided skeleton code for a simple dialog choice adventure game. With many hours of development, brainstorming, and problem-solving, I transformed it into a fully functional game with multiple branching paths and endings. While lots of ideas were cut due to time-constraints, I hope to return to this project in the future to expand on it significantly.",
        repolink: "https://github.com/TheGuy3201/Backrooms-into-the-Subrooms.git",
        imgurl: [
            "/res/BackroomsGame/Backrooms1.jpg",
            "/res/BackroomsGame/Backrooms2.jpg",
            "/res/BackroomsGame/Backrooms3.jpg",
            "/res/BackroomsGame/Backrooms4.jpg",
            "/res/BackroomsGame/Backrooms5.jpg"
        ]
    },
    {
        title: "Terminus",
        description: "Terminus is a 3D game developed with Unity and C#. It is a first-person 3D platformer game. Players must navigate a futuristic world by completing various platforming challenges, solving puzzles and more. Players have the ability to interact with the world by picking up anything and being able to place it wherever they see fit. Players ask the one question, \"where am I, really?\" and they will be surprised by the answer.",
        roledescription: "In a team of 5, I was considered as the team lead. I was responsible for the overall design and development of the game, including the gameplay mechanics, level design, and enemy navigation. I also worked on the programming side of things, implementing various features and fixing bugs. My role involved coordinating with team members to ensure that everyone was on the same page, that the project was progressing smoothly and meeting each deadline.",
        repolink: "https://github.com/TheGuy3201/WebGame-Group-Project.git",
        imgurl: [
            "/res/Terminus/Terminus1.jpg",
            "/res/Terminus/Terminus2.jpg",
            "/res/Terminus/Terminus3.jpg",
            "/res/Terminus/Terminus4.jpg",
            "/res/Terminus/Terminus5.jpg",
            "/res/Terminus/Terminus6.jpg"
        ]
    },
    {
        title: "MemeDex",
        description: "The MemeDex is a simple computer application that allows users to search for memes using keywords. Users can also view, create Meme indices. The application is built using Java and JavaFX, and it utilizes a locally stored txt document to serve as a database to store the memes.",
        roledescription: "In a small of team of 2, I was responsible for the functionality of the application, and backend development. I made various classes to handle the data and the logic of the application. I made the GUI functional by connecting our backend to the front-end.",
        repolink: "https://github.com/TheGuy3201/MemeDex.git",
        imgurl: [
            "/res/MemeDexApp/MemeDex1.jpg",
            "/res/MemeDexApp/MemeDex2.jpg",
            "/res/MemeDexApp/MemeDex3.jpg"
        ]
    }
];

async function populateProjects() {
    try {
        // Clear existing projects
        await Project.deleteMany({});
        console.log('Cleared existing projects');

        // Insert new projects
        const result = await Project.insertMany(projects);
        console.log(`Successfully inserted ${result.length} projects:`);
        result.forEach(project => {
            console.log(`- ${project.title}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error populating projects:', error);
        process.exit(1);
    }
}

populateProjects();

import mongoose from 'mongoose';
import config from '../config/config.js';
import Education from '../server/models/educations.model.js';

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const educations = [
    {
        institution: "Centennial College",
        degree: "Game - Programming Advanced Diploma",
        graddate: new Date("2026-08-31"), // Expected graduation date
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
        graddate: new Date("2023-06-30"), // Graduated June 2023
        accomplishments: "Honour Roll Grades: 9, 10, 11, 12",
        imgurl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Comingsoon.png",
        courses: []
    }
];

async function populateEducations() {
    try {
        // Clear existing educations
        await Education.deleteMany({});
        console.log('Cleared existing educations');

        // Insert new educations
        const result = await Education.insertMany(educations);
        console.log(`Successfully inserted ${result.length} education records:`);
        result.forEach(education => {
            console.log(`- ${education.institution}: ${education.degree}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error populating educations:', error);
        process.exit(1);
    }
}

populateEducations();

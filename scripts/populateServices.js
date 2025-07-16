import mongoose from 'mongoose';
import Service from '../server/models/services.model.js';
import config from '../config/config.js';

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const servicesData = [
  {
    title: "Front-End Web Development",
    description: "Using React, HTML, CSS, and JavaScript. I create highly interactive, accessible, and responsive web applications!",
    icon: "https://img.freepik.com/free-vector/frontend-development-concept-website-interface-design-improvement-web-page-programming-coding-testing-it-profession-isolated-flat-vector-illustration_613284-2357.jpg",
    features: ["React.js", "HTML5 & CSS3", "JavaScript ES6+", "Responsive Design", "Accessibility"],
    order: 1,
    isActive: true
  },
  {
    title: "General Programming",
    description: "Having lots of experience in C#, Java, and C++. I can create a variety of applications!",
    icon: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg",
    features: ["C# Development", "Java Applications", "C++ Programming", "Desktop Applications", "Problem Solving"],
    order: 2,
    isActive: true
  },
  {
    title: "UI/UX Design",
    description: "While using various design tools, I use my creativity to design user-friendly interfaces that are both engaging and easy to use.",
    icon: "https://img.freepik.com/free-vector/user-interface-concept-illustration_114360-676.jpg",
    features: ["User Interface Design", "User Experience Design", "Wireframing", "Prototyping", "Design Systems"],
    order: 3,
    isActive: true
  },
  {
    title: "Back-End Development",
    description: "With the use of Node.js, Express, and MongoDB. I build robust server-side applications and APIs such as this one!",
    icon: "https://img.freepik.com/premium-vector/backend-development-icon-vector-image-can-be-used-computer-programming_120816-101610.jpg",
    features: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "Database Design"],
    order: 4,
    isActive: true
  },
  {
    title: "Agile Development",
    description: "I have experience working in Agile environments, using Scrum methodologies to deliver high-quality software while using Unified Modeling Language (UML) to design applications.",
    icon: "https://www.shutterstock.com/image-vector/agile-management-develop-process-infographic-600nw-2241782409.jpg",
    features: ["Scrum Methodology", "Sprint Planning", "UML Modeling", "Team Collaboration", "Project Management"],
    order: 5,
    isActive: true
  }
];

const populateServices = async () => {
  try {
    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Insert new services
    const services = await Service.insertMany(servicesData);
    console.log(`Successfully created ${services.length} services:`);
    
    services.forEach(service => {
      console.log(`- ${service.title}`);
    });

    console.log('\nServices database populated successfully!');
  } catch (error) {
    console.error('Error populating services:', error);
  } finally {
    mongoose.connection.close();
  }
};

populateServices();

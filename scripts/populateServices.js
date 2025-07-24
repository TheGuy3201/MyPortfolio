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
    icon: "/res/services/frontend.svg",
    features: ["React.js", "HTML5 & CSS3", "JavaScript ES6+", "Responsive Design", "Accessibility"],
    order: 1,
    isActive: true
  },
  {
    title: "General Programming",
    description: "Having lots of experience in C#, Java, and C++. I can create a variety of applications!",
    icon: "/res/services/programming.svg",
    features: ["C# Development", "Java Applications", "C++ Programming", "Desktop Applications", "Problem Solving"],
    order: 2,
    isActive: true
  },
  {
    title: "UI/UX Design",
    description: "While using various design tools, I use my creativity to design user-friendly interfaces that are both engaging and easy to use.",
    icon: "/res/services/design.svg",
    features: ["User Interface Design", "User Experience Design", "Wireframing", "Prototyping", "Design Systems"],
    order: 3,
    isActive: true
  },
  {
    title: "Back-End Development",
    description: "With the use of Node.js, Express, and MongoDB. I build robust server-side applications and APIs such as this one!",
    icon: "/res/services/backend.svg",
    features: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "Database Design"],
    order: 4,
    isActive: true
  },
  {
    title: "Agile Development",
    description: "I have experience working in Agile environments, using Scrum methodologies to deliver high-quality software while using Unified Modeling Language (UML) to design applications.",
    icon: "/res/services/agile.svg",
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

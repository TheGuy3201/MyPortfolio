import { useState } from "react";

// Services component that displays a list of services offered
const services = [
  {
    title: "Front-End Web Development",
    description: "Using React, HTML, CSS, and JavaScript. I create highly interactive, accessible, and responsive web applications!",
    image: "https://img.freepik.com/free-vector/frontend-development-concept-website-interface-design-improvement-web-page-programming-coding-testing-it-profession-isolated-flat-vector-illustration_613284-2357.jpg"
  },
  {
    title: "General Programming",
    description: "Having lots of experience in C#, Java, and C++. I can create a variety of applications!",
    image: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg"
  },
  {
    title: "UI/UX Design",
    description: "While using various design tools, I use my creativity to design user-friendly interfaces that are both engaging and easy to use.",
    image: "https://img.freepik.com/free-vector/user-interface-concept-illustration_114360-676.jpg"
  },
  {
    title: "Back-End Development",
    description: "With the use of Node.js, Express, and MongoDB. I build robust server-side applications and APIs such as this one!",
    image: "https://img.freepik.com/premium-vector/backend-development-icon-vector-image-can-be-used-computer-programming_120816-101610.jpg"
  },
  {
    title: "Agile Development",
    description: "I have experience working in Agile environments, using Scrum methodologies to deliver high-quality software while using Unified Modeling Language (UML) to design applications.",
    image: "https://www.shutterstock.com/image-vector/agile-management-develop-process-infographic-600nw-2241782409.jpg"
  }
];

export default function Services() {
  const [flipped, setFlipped] = useState(Array(services.length).fill(false));

  // Function to toggle the flipped state of a service card
  const toggleFlip = (index) => {
    setFlipped((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <>
      {/* Services page */}
      <h1>Services</h1>

      {/* Services Panel */}
      <div className="ServicesPanel">
        {services.map((service, index) => (
          <div
            className={`ServiceCard ${flipped[index] ? "flipped" : ""}`}
            key={index}
          >
            {/* Front of service card*/}
            <div className="ServiceCardInner">
              <div
                className="ServiceCardFront"
                onClick={() => toggleFlip(index)}
              >
                <img src={service.image} alt={service.title} />
                <h2>{service.title}</h2>
              </div>
              
              {/* Back of service card */}
              <div className="ServiceCardBack">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <button onClick={() => toggleFlip(index)}>Flip Back</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

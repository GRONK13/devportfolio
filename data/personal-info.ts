export const personalInfo = {
  // Basic Information
  name: "Gregg Marayan",
  title: "Full Stack Developer",
  subtitle: "A 4th Year Information Technology Student at University of San Carlos",
  bio: "Hi, I'm Gregg Marayan, a developer currently exploring full-stack projects and building real-world experience.",
  
  // Contact Information
  email: "gregg.marayan@gmail.com",
  phone: "+63 (992) 531-5378",
  location: {
    city: "Mandaue City",
    province: "Cebu",
    country: "Philippines",
    availability: "Available for remote work"
  },
  
  // Social Media Links
  social: {
    github: "https://github.com/GRONK13",
    linkedin: "https://linkedin.com/in/gregg-marayan",
    email: "mailto:gregg.marayan@gmail.com", // for email links
  },
  
  // Website Information
  website: {
    url: "https://greggmarayan.vercel.app",
    domain: "greggmarayan.vercel.app"
  },
  
  // Resume
  resume: {
    filename: "Marayan_Resume.pdf",
    path: "/Marayan_Resume.pdf"
  },
  
  // Professional Description (for different contexts)
  descriptions: {
    short: "A 4th Year Information Technology Student at University of San Carlos",
    medium: "Gregg Marayan is a 4th Year Information Technology Student at University of San Carlos specializing in full-stack web development with React, Next.js, Node.js, and TypeScript.",
    long: "I'm a 4th year BS Information Technology student at the University of San Carlos. I'm eager to explore different areas in tech, from development and system administration to cybersecurity and cloud tools. I enjoy learning through hands-on experience and I'm open to new challenges that help me grow."
  },
  
  // SEO Keywords
  keywords: [
    "Gregg Marayan",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer", 
    "TypeScript Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "University of San Carlos",
    "Information Technology Student",
    "JavaScript",
    "Node.js",
    "PostgreSQL",
    "Portfolio",
    "Software Engineer"
  ],
  
  // About Me Story (for about page)
  story: {
    beginning: "My journey began during my Senior High School Robotics class, where we tinkered around with microcontrollers and basic programming. This hands-on experience sparked my curiosity and passion for technology, leading me to pursue a degree in Information Technology.",
    current: "As a BS IT student at the University of San Carlos, I've been steadily growing my skills through hands-on projects, coursework, and attending workshops and seminars. I enjoy helping teams turn ideas into working solutions, whether it's troubleshooting backend issues, refining UI components, or setting up collaborative workflows. I'm committed to continuous learning and always looking for ways to improve through real-world experience and emerging tech.",
    personal: "When I'm not coding, you can find me playing games such as Tekken 8, and Surroundead, watching movies and series such as Dexter, or exploring new frameworks and tools that can improve development workflows."
  }
};

// Helper functions for common use cases
export const getFullName = () => personalInfo.name;
export const getEmail = () => personalInfo.email;
export const getPhone = () => personalInfo.phone;
export const getGithubUrl = () => personalInfo.social.github;
export const getLinkedInUrl = () => personalInfo.social.linkedin;
export const getWebsiteUrl = () => personalInfo.website.url;
export const getResumeUrl = () => personalInfo.resume.path;
export const getFullLocation = () => 
  `${personalInfo.location.city}, ${personalInfo.location.province}, ${personalInfo.location.country}`;

export default personalInfo;

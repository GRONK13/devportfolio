export const personalInfo = {
  "name": "Gregg Marayan",
  "title": "Software Developer | IT Support | CyberSecurity Analyst",
  "subtitle": "Information Technology Graduate at University of San Carlos",
  "bio": "Hi, I'm Gregg Marayan, a developer currently exploring Networking and full-stack projects and building real-world experience.",
  "email": "gregg.marayan@gmail.com",
  "phone": "+63 (956) 155-1297",
  "location": {
    "city": "Taguig City",
    "province": "",
    "country": "Philippines",
    "availability": "Available for remote work"
  },
  "social": {
    "github": "https://github.com/GRONK13",
    "linkedin": "https://linkedin.com/in/gregg-marayan",
    "email": "mailto:gregg.marayan@gmail.com"
  },
  "website": {
    "url": "https://greggmarayan.me",
    "domain": "greggmarayan.me"
  },
  "resume": {
    "filename": "Marayan_Resume.pdf",
    "path": "/Marayan_Resume.pdf"
  },
  "descriptions": {
    "short": "Full Stack Developer at University of San Carlos",
    "medium": "Gregg Marayan is a Full Stack Developer. University of San Carlos graduate specializing in full-stack web development with React, Next.js, Node.js, and TypeScript.",
    "long": "Gregg Marayan is a BS Information Technology graduate from the University of San Carlos specializing in full stack web development, cloud computing, networking, IT support, and cybersecurity. He builds scalable web applications using React, Next.js, TypeScript, Node.js, PostgreSQL, Supabase, and Docker while maintaining strong foundations in system administration, network security, technical support, and cloud infrastructure."
  },
  "keywords": [
    "Gregg Marayan",
    "Gregg Alexander Marayan",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "PostgreSQL Developer",
    "Supabase Developer",
    "Docker Developer",
    "Network Administrator",
    "Network Engineer",
    "Computer Networking",
    "Network Security",
    "IT Support Specialist",
    "Technical Support Engineer",
    "Help Desk Support",
    "Systems Administrator",
    "Cloud Computing",
    "Cloud Engineer",
    "Cloud Infrastructure",
    "AWS",
    "Microsoft Azure",
    "Google Cloud Platform",
    "Cybersecurity",
    "Cybersecurity Analyst",
    "Information Security",
    "Security Operations",
    "Vulnerability Assessment",
    "Risk Management",
    "Linux Administration",
    "System Administration",
    "Database Management",
    "REST API Development",
    "Responsive Web Design",
    "University of San Carlos",
    "BS Information Technology",
    "IT Graduate Philippines",
    "Taguig Philippines",
    "Portfolio Website",
    "Software Development"
  ],
  "story": {
    "beginning": "My journey began during my Senior High School Robotics class, where we tinkered around with microcontrollers and basic programming. This hands-on experience sparked my curiosity and passion for technology, leading me to pursue a degree in Information Technology.",
    "current": "As a BS IT graduate at the University of San Carlos, I've been steadily growing my skills through hands-on projects, coursework, and attending workshops and seminars. I enjoy helping teams turn ideas into working solutions, whether it's troubleshooting backend issues, refining UI components, or setting up collaborative workflows. I'm committed to continuous learning and always looking for ways to improve through real-world experience and emerging tech.",
    "personal": "When I'm not coding, you can find me playing games such as Tekken 8, and Surroundead, watching movies and series such as Dexter, or exploring new frameworks and tools that can improve development workflows."
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

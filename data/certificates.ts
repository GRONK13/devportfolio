export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  description: string;
  isFeatured: boolean;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "CyberOps Associate",
    issuer: "Cisco",
    date: "Oct 22, 2024",
    credentialId: "716ca1da-5f9a-451a-876b-ac68e5f8e7a4",
    verificationUrl: "https://www.credly.com/badges/716ca1da-5f9a-451a-876b-ac68e5f8e7a4/public_url",
    skills: ["Attack Methods", "Computer Forensics", "Cryptography", "Cybersecurity", "Data And Event Analysis", "Endpoint Threat Analysis", "Host-based Analysis", "Incident Response", "Malware Analysis", "Network Attacks", "Network Intrusion Analysis SecOps", "Security Concepts", "Security Monitoring", "Security Policy", "Security Procedures", "SOC Metrics", "Threat Detection"],
    description: "Validates expertise in intrusion analysis, network monitoring, and security operations.",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "Aug 30, 2024",
    credentialId: "47bc0d42-b5bd-42b3-b1e5-a198b3993aa5",
    verificationUrl: "https://www.credly.com/badges/47bc0d42-b5bd-42b3-b1e5-a198b3993aa5/public_url",
    skills: ["Cybersecurity", "Threat Detection", "Cyber Best Practices", "Network Vulnerabilities", "Privacy & Data Confidentiality"],
    description: "Validates training in threat detection, data privacy, and global cyber risks.",
    isFeatured: true,
  },
  {
    id: 3,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-SAA-2024-001",
    verificationUrl: "https://aws.amazon.com/verification",
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"],
    description: "Validates expertise in designing distributed systems on AWS platform.",
    isFeatured: false,
  },
  {
    id: 4,
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2023",
    credentialId: "META-REACT-2023-001",
    verificationUrl: "https://coursera.org/verify",
    skills: ["React", "JavaScript", "JSX", "Redux", "Testing"],
    description: "Professional certification in React development and best practices.",
    isFeatured: false,
  },
  {
    id: 5,
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2024",
    credentialId: "GCP-PRO-2024-001",
    verificationUrl: "https://cloud.google.com/certification",
    skills: ["GCP", "Kubernetes", "DevOps", "CI/CD"],
    description: "Professional cloud developer certification from Google Cloud Platform.",
    isFeatured: false,
  },
  {
    id: 6,
    title: "Docker Certified Associate",
    issuer: "Docker",
    date: "2024",
    credentialId: "DOCKER-DCA-2024",
    verificationUrl: "https://docker.com/certification",
    skills: ["Docker", "Containers", "Orchestration", "DevOps"],
    description: "Containerization and orchestration expertise certification.",
    isFeatured: false,
  },
];
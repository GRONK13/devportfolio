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
];
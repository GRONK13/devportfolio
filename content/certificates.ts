export interface Certificate {
  title: string;
  issuer: string;
  issued: string;
  summary: string;
  verifyUrl: string;
  skills: string[];
}

export const certificates: Certificate[] = [
  {
    title: "CyberOps Associate",
    issuer: "Cisco",
    issued: "Oct 2024",
    summary: "Intrusion analysis, network monitoring, and security operations.",
    verifyUrl: "https://www.credly.com/badges/716ca1da-5f9a-451a-876b-ac68e5f8e7a4/public_url",
    skills: ["Incident response", "Threat detection", "Malware analysis", "SOC metrics"],
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    issued: "Aug 2024",
    summary: "Threat detection, data privacy, and global cyber risk.",
    verifyUrl: "https://www.credly.com/badges/47bc0d42-b5bd-42b3-b1e5-a198b3993aa5/public_url",
    skills: ["Network vulnerabilities", "Privacy", "Cyber best practices"],
  },
];

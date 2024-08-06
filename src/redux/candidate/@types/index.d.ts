interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  major: string;
  university?: string;
  school?: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Certification {
  name: string;
  date: string;
}

interface Skill {
  name: string;
  score: number;
}

interface Candidate {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  address: string;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  description: string;
  references: any[]; // assuming references can be any type, can be more specific if needed
  linkedin: string;
  skills: Skill[];
}

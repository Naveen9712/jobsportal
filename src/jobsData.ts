export type JobType = "C2C" | "CDH" | "1099" | "W2" | "Full-time";
export type VisaType = "CPT" | "OPT" | "H1B" | "F1A" | "OC" | "US Citizen";
export type WorkLocation = "Remote" | "Hybrid" | "Onsite";
export type StateCode =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "TX"
  | "NY"
  | "WA"
  | "VA"
  | "WV";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: JobType;
  visaType: VisaType;
  workLocation: WorkLocation;
  state: StateCode;
  experienceYears: string;
  salaryRange: string;
  description: string;
  keyResponsibilities: string[];
  benefits: string[];
};

export const jobsData: Job[] = [
  {
    id: 1,
    title: "FileMaker Pro Developer",
    company: "ADVANTAGE",
    location: "Harpers Ferry, WV (Remote)",
    jobType: "C2C",
    visaType: "H1B",
    workLocation: "Remote",
    state: "WV",
    experienceYears: "5+ Years",
    salaryRange: "$80/hr",
    description:
      "We are seeking an experienced FileMaker Pro Developer to design, develop, and maintain custom database solutions that support business operations and improve productivity. The ideal candidate will have deep expertise in FileMaker Pro, strong database design skills, and the ability to translate business requirements into effective data management solutions.",
    keyResponsibilities: [
      "Database Development & Maintenance",
      "Custom Script Development",
      "Design, build, and enhance FileMaker Pro database",
    ],
    benefits: ["Remote", "Contract", "Remove", "$$$/hour"],
  },
  {
    id: 2,
    title: "Salesforce Solution Architect",
    company: "Granite",
    location: "San Jose, CA",
    jobType: "Full-time",
    visaType: "US Citizen",
    workLocation: "Hybrid",
    state: "CA",
    experienceYears: "7+ Years",
    salaryRange: "$140k-160k",
    description:
      "Design and implement complex Salesforce solutions that meet business requirements, ensuring scalability, security, and maintainability. Collaborate with business stakeholders to understand their requirements and translate them into technical solutions. Provide technical guidance to the development team, ensuring adherence to best practices and coding standards. Perform code reviews, testing, and quality assurance to ensure the delivery of high-quality solutions and deployment.",
    keyResponsibilities: [
      "Solution Architecture Design",
      "Technical Leadership",
      "Stakeholder Collaboration",
    ],
    benefits: ["San Jose", "Contract", "Hybrid", "$$$/hour"],
  },
  {
    id: 3,
    title: "Manufacturing Program Manager",
    company: "ATR Inc",
    location: "Santa Clara, CA",
    jobType: "W2",
    visaType: "OPT",
    workLocation: "Onsite",
    state: "CA",
    experienceYears: "8+ Years",
    salaryRange: "$120k-140k",
    description:
      "Strong knowledge of GMP, FDA, CDC Standards, and regulatory requirements. Demonstrated project management expertise, preferably PMP or equivalent certification. Excellent leadership, communication, and interpersonal skills. Ability to manage multiple projects in a fast-paced, dynamic environment. Experience with SAP, ERP systems, and project management software. Experience in the Medical Industry. Cardiovascular device manufacturing experience preferred. Six Sigma, Lean Manufacturing, and continuous improvement methodologies. Proficiency in Microsoft Office Suite and project management software. Experience in leading manufacturing Automation etc.",
    keyResponsibilities: ["Project Management", "Manufacturing Excellence", "Team Leadership"],
    benefits: ["Santa Clara", "Contract", "Onsite", "$$$/hour"],
  },
  {
    id: 4,
    title: "Senior Android Developer",
    company: "Streamlet",
    location: "Sunnyvale, CA or Bentonville, AR",
    jobType: "1099",
    visaType: "H1B",
    workLocation: "Hybrid",
    state: "CA",
    experienceYears: "10+ Years",
    salaryRange: "$95/hr",
    description:
      "We are seeking a highly experienced Android Developer to join Walmart's Marketplace team. In this role, you'll help design, build, and optimize scalable, high-performance Android applications using Kotlin, Java, and modern development practices. You'll collaborate with a world-class team of Android MVVM architects, delivering top-notch user experiences. The ideal candidate is a strong communicator and collaborator, passionate about technology.",
    keyResponsibilities: ["Android Development", "Performance Optimization", "Team Collaboration"],
    benefits: ["Sunnyvale, CA", "Contract", "Hybrid", "$$$/hour"],
  },
  {
    id: 5,
    title: "React.js Frontend Developer",
    company: "TechFlow",
    location: "Austin, TX (Remote)",
    jobType: "CDH",
    visaType: "CPT",
    workLocation: "Remote",
    state: "TX",
    experienceYears: "4+ Years",
    salaryRange: "$70/hr",
    description:
      "Looking for an experienced React.js developer to build modern, responsive web applications. You'll work with cutting-edge technologies including React 18, TypeScript, and modern CSS frameworks to create exceptional user experiences.",
    keyResponsibilities: ["Frontend Development", "UI/UX Implementation", "Code Review"],
    benefits: ["Remote", "Contract", "Remove", "$$$/hour"],
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    jobType: "Full-time",
    visaType: "F1A",
    workLocation: "Onsite",
    state: "WA",
    experienceYears: "6+ Years",
    salaryRange: "$130k-150k",
    description:
      "Join our DevOps team to design and maintain CI/CD pipelines, manage cloud infrastructure, and ensure high availability of our production systems. Experience with AWS, Docker, and Kubernetes required.",
    keyResponsibilities: [
      "Infrastructure Management",
      "Pipeline Development",
      "System Monitoring",
    ],
    benefits: ["Seattle", "Contract", "Onsite", "$$$/hour"],
  },
  {
    id: 7,
    title: "Data Scientist",
    company: "DataCore",
    location: "New York, NY (Hybrid)",
    jobType: "W2",
    visaType: "OC",
    workLocation: "Hybrid",
    state: "NY",
    experienceYears: "5+ Years",
    salaryRange: "$115k-135k",
    description:
      "Seeking a Data Scientist to analyze complex datasets, build machine learning models, and provide actionable insights to drive business decisions. Strong background in Python, SQL, and statistical analysis required.",
    keyResponsibilities: ["Data Analysis", "Machine Learning", "Business Intelligence"],
    benefits: ["New York", "Contract", "Hybrid", "$$$/hour"],
  },
  {
    id: 8,
    title: "Product Manager",
    company: "InnovateCorp",
    location: "San Francisco, CA",
    jobType: "Full-time",
    visaType: "US Citizen",
    workLocation: "Hybrid",
    state: "CA",
    experienceYears: "7+ Years",
    salaryRange: "$140k-170k",
    description:
      "Lead product strategy and roadmap development for our flagship SaaS platform. Work closely with engineering, design, and sales teams to deliver features that delight customers and drive business growth.",
    keyResponsibilities: [
      "Product Strategy",
      "Roadmap Planning",
      "Cross-functional Leadership",
    ],
    benefits: ["San Francisco", "Contract", "Hybrid", "$$$/hour"],
  },
  {
    id: 9,
    title: "Cybersecurity Analyst",
    company: "SecureNet",
    location: "Arlington, VA",
    jobType: "C2C",
    visaType: "US Citizen",
    workLocation: "Onsite",
    state: "VA",
    experienceYears: "4+ Years",
    salaryRange: "$85/hr",
    description:
      "Monitor and analyze security threats, implement security protocols, and respond to incidents. Experience with SIEM tools, threat hunting, and incident response required.",
    keyResponsibilities: ["Threat Analysis", "Incident Response", "Security Monitoring"],
    benefits: ["Arlington", "Contract", "Onsite", "$$$/hour"],
  },
  {
    id: 10,
    title: "UX/UI Designer",
    company: "DesignLab",
    location: "Los Angeles, CA (Remote)",
    jobType: "1099",
    visaType: "OPT",
    workLocation: "Remote",
    state: "CA",
    experienceYears: "3+ Years",
    salaryRange: "$65/hr",
    description:
      "Create intuitive and visually appealing user interfaces for web and mobile applications. Collaborate with product teams to translate user needs into compelling design solutions.",
    keyResponsibilities: ["User Interface Design", "Prototyping", "User Research"],
    benefits: ["Remote", "Contract", "Remove", "$$$/hour"],
  },
];

export const filterOptions = {
  jobTypes: ["C2C", "CDH", "1099", "W2", "Full-time"] as JobType[],
  visaTypes: ["CPT", "OPT", "H1B", "F1A", "OC", "US Citizen"] as VisaType[],
  workLocations: ["Remote", "Hybrid", "Onsite"] as WorkLocation[],
  states: [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "TX", name: "Texas" },
    { code: "NY", name: "New York" },
    { code: "WA", name: "Washington" },
    { code: "VA", name: "Virginia" },
    { code: "WV", name: "West Virginia" },
  ] as { code: StateCode; name: string }[],
} as const;



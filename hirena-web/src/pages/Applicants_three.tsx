import { useState } from "react";
import { Brain, GraduationCap, Users, Download, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const candidatesData = [
  {
  id: 1,
 name: "Vivek Verma",
  email: "vivek569verma@gmail.com",
  phone: null,
  location: "Pune, India",
  jobTitle: "Flutter Developer",
  overallScore: 82,
  scoringData: [
   {
    title: "Skill Match",
    score: 85,
    description: "Strong Flutter and backend stack with experience in CI/CD, Riverpod, and 3rd-party integrations",
    icon: Target,
    skills: ["Flutter & Dart Development", "Cross-Platform & Deployment", "Third-Party Integrations"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Robust mobile dev stack with production-grade Flutter work and backend integration",
      matchedSkills: [
        "Flutter", "Riverpod", "Firebase", "Git", "Docker", "AWS", "Minio", "MediaMtx", "Ory Kratos SDK"
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 78,
    description: "Resume reflects real-world mobile development and collaboration with product teams",
    icon: Brain,
    skills: ["Flutter Projects", "Map SDKs", "CI/CD Pipelines"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Resume reflects real-world mobile development and collaboration with product teams",
      keywordAlignment: "Frequent use of Flutter tools, state management, and SDK integrations. Slightly less clarity on testing, iOS deployment, or App Store publishing.",
      highMatchKeywords: ["Flutter", "Riverpod", "admin dashboard", "SDK integration", "CI/CD"],
      partialMatchKeywords: ["state management", "responsive design", "deployment"]
    }
  },
  {
    title: "Project Relevancy",
    score: 84,
    description: "Projects reflect initiative, technical range, and domain innovation",
    icon: FileText,
    skills: ["Map SDKs", "Hackathon-grade Products", "Decentralized Applications"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Projects reflect initiative, technical range, and domain innovation",
      mostRelevantProjects: [
        {
          name: "Smoothest Route – Map App",
          match: 85,
          description: "Built routing logic with Flutter and TomTom SDK, awarded in hackathon"
        },
        {
          name: "Mental Health Apps – DeepKlarity",
          match: 82,
          description: "Built real-world B2C apps with data filtering and backend logic"
        }
      ]
    }
  },
  {
    title: "Educational Background",
    score: 75,
    description: "Strong GPA in relevant B.Tech. program with AI/DS specialization",
    icon: GraduationCap,
    skills: ["AI & Data Science", "VIT Pune", "8.95 GPA"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Bachelor’s degree aligns well, supported by applied internships",
      degrees: [
        {
          degree: "B.Tech in AI & Data Science",
          institution: "VIT Pune",
          period: "Graduated 2024",
          match: "Relevant"
        }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 76,
    description: "Evidence of collaboration, multi-company exposure, and shipping real apps",
    icon: Users,
    skills: ["Collaboration", "Initiative", "Delivery Focus"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Shows initiative through internships, hackathons, and award-winning projects",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Initiative",
            score: 80,
            description: "Led award-winning projects and drove app innovation"
          },
          {
            skill: "Cross-Team Work",
            score: 75,
            description: "Worked with distributed teams and across multiple startups"
          }
        ],
        moderateEvidence: [
          {
            skill: "Delivery Consistency",
            score: 70,
            description: "Completed several short-term internships with production deliverables"
          }
        ]
      }
    }
  }
  ]
},

  {
    id: 2,
    name: "Vishnu Sahani",
  email: "vishnu83550@gmail.com",
  phone: null,
  location: "Uttar Pradesh, India",
  jobTitle: "Flutter Developer",
    overallScore: 60,
    scoringData: [
      {
    title: "Skill Match",
    score: 62,
    description: "Broad web stack, but limited hands-on Flutter exposure",
    icon: Target,
    skills: ["Cross-Platform & Deployment", "UI & Frontend Expertise"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Web-first developer with minor Flutter overlap",
      matchedSkills: [
        "Flutter (listed but not emphasized in projects)", "JavaScript", "TypeScript", "Angular", "HTML/CSS", "MySQL"
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 58,
    description: "Resume is focused on web development and trading systems, not mobile app development",
    icon: Brain,
    skills: ["Angular", "Web UI Development", "Backend Integration"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Resume is focused on web development and trading systems, not mobile app development",
      keywordAlignment: "No clear mention of Flutter projects or mobile deployment. Extensive Angular and web UI work. Flutter is present but not utilized in major roles.",
      highMatchKeywords: ["UI", "TypeScript", "Full-Stack", "Backend"],
      partialMatchKeywords: ["Flutter", "MySQL"]
    }
  },
  {
    title: "Project Relevancy",
    score: 54,
    description: "Projects are backend and web-first; none focused on Flutter/mobile apps",
    icon: FileText,
    skills: ["Angular UI", "Trading System Development"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Projects are backend and web-first; none focused on Flutter/mobile apps",
      mostRelevantProjects: [
        {
          name: "Algo Trading App",
          match: 58,
          description: "Full-stack Angular + Flask-based tool for backtesting and deployment"
        },
        {
          name: "Option Chain",
          match: 55,
          description: "Developed UI for options & futures with Angular"
        }
      ]
    }
  },
  {
    title: "Educational Background",
    score: 65,
    description: "Diploma in CSE with good academic performance",
    icon: GraduationCap,
    skills: ["Computer Science Diploma", "81.43%"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Diploma-level technical education with web development experience",
      degrees: [
        {
          degree: "Diploma in Computer Science & Engineering",
          institution: "Maharana Pratap Polytechnic",
          period: "Completed 2020",
          match: "Moderately Relevant"
        }
      ],
      certifications: []
    }
  },
  {
    title: "Interpersonal Skills",
    score: 68,
    description: "Multi-company exposure and full-stack responsibilities show maturity and teamwork",
    icon: Users,
    skills: ["Responsibility", "Execution", "Frontend Collaboration"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Hands-on project execution with consistent delivery in team environments",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Delivery Ownership",
            score: 72,
            description: "Handled complete UI modules in multiple live trading platforms"
          }
        ],
        moderateEvidence: [
          {
            skill: "Team Collaboration",
            score: 65,
            description: "Worked in agile settings across finance and education sectors"
          }
        ]
      }
    }
  }
    ]
  },
 {
  id: 3,
   name: "Sushmita Bhor",
  email: "sushmitabhor3@gmail.com",
  phone: null,
  location: "Mumbai, Maharashtra",
  jobTitle: "Flutter Developer",
  overallScore: 88,
  scoringData: [
    {
    title: "Skill Match",
    score: 90,
    description: "Well-rounded Flutter developer with solid experience in state management and production deployment",
    icon: Target,
    skills: ["Flutter & Dart Development", "Cross-Platform & Deployment", "UI & Integrations"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Fluent in Flutter architecture, state management, and API integrations",
      matchedSkills: [
        "Flutter", "Dart", "Provider", "Google Maps SDK", "Firebase", "Git", "Android Studio", "MVVM", "CLEAN architecture"
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 85,
    description: "Projects and roles show direct contribution to live apps, API integration, and architecture setup",
    icon: Brain,
    skills: ["State Management", "API Integration", "Reusable UI Components"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Projects and roles show direct contribution to live apps, API integration, and architecture setup",
      keywordAlignment: "Consistently mentions Provider, REST APIs, animations, deep linking, custom UI, and deployment logic.",
      highMatchKeywords: ["Flutter", "Provider", "MVVM", "Google Maps", "State Management", "API"],
      partialMatchKeywords: ["CI/CD", "publishing", "testing"]
    }
  },
  {
    title: "Project Relevancy",
    score: 87,
    description: "Well-structured Flutter projects with clear impact on UI, state, and feature development",
    icon: FileText,
    skills: ["Reusable Components", "Animations", "Deep Linking"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Well-structured Flutter projects with clear impact on UI, state, and feature development",
      mostRelevantProjects: [
        {
          name: "Mahindra Personal Loan",
          match: 88,
          description: "Built reusable components, deep linking, and managed state with Provider"
        },
        {
          name: "Nomad",
          match: 85,
          description: "Implemented graphs, pagination, animations, and map integrations"
        },
        {
          name: "Workcertain",
          match: 84,
          description: "Handled scalable UI and Git versioning; deep linking across routes"
        }
      ]
    }
  },
  {
    title: "Educational Background",
    score: 72,
    description: "MCA degree provides relevant foundational knowledge",
    icon: GraduationCap,
    skills: ["MCA in Computer Applications"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Technical background suitable for mid-level development roles",
      degrees: [
        {
          degree: "MCA",
          institution: "Bharati Vidyapeeth",
          period: "2018 – 2021",
          match: "Relevant"
        }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 80,
    description: "Demonstrated collaboration with dev and business analyst teams; regular production delivery",
    icon: Users,
    skills: ["Cross-functional Collaboration", "Execution", "Ownership"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Hands-on contributor to team-based delivery pipelines",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Cross-team Collaboration",
            score: 82,
            description: "Worked with business analysts and devs on redesign projects"
          },
          {
            skill: "Ownership",
            score: 78,
            description: "Handled state management, API integration, and custom UI logic"
          }
        ],
        moderateEvidence: [
          {
            skill: "Communication",
            score: 75,
            description: "Participated in app redesign and cross-functional team planning"
          }
        ]
      }
    }
  }
  ]
},
{
  id: 4,
 name: "Shreyash Gupta",
  email: "shreyashgupta401@gmail.com",
  phone: null,
  location: "Mumbai, India",
  jobTitle: "Flutter Developer",
  overallScore: 66,
  scoringData: [
    {
    title: "Skill Match",
    score: 68,
    description: "Good foundational Flutter skills with Firebase and API integration, but limited production experience",
    icon: Target,
    skills: ["Flutter & Dart Development", "UI & Integrations"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Basic Flutter + Firebase understanding with API integration exposure",
      matchedSkills: [
        "Flutter", "Dart", "Firebase", "REST APIs", "MySQL", "Flutter UI", "Google Colab"
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 64,
    description: "Mostly academic and early-stage projects, but demonstrates solid initiative and learning",
    icon: Brain,
    skills: ["API Integration", "Firebase", "Mobile UI Development"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Mostly academic and early-stage projects, but demonstrates solid initiative and learning",
      keywordAlignment: "Mentions Flutter, Firebase, REST APIs. Lacks professional deployment, app store publishing, or CI/CD setup.",
      highMatchKeywords: ["Flutter", "Firebase", "REST APIs"],
      partialMatchKeywords: ["UI design", "real-time data"]
    }
  },
  {
    title: "Project Relevancy",
    score: 70,
    description: "Creative and socially impactful apps with functional implementation using Flutter and ML",
    icon: FileText,
    skills: ["Map Routing", "Dashboarding", "Mobile App Concepts"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Creative and socially impactful apps with functional implementation using Flutter and ML",
      mostRelevantProjects: [
        {
          name: "SheSafe",
          match: 72,
          description: "Paired users, visualized routes, and implemented legal help modules"
        },
        {
          name: "SmartKrishi",
          match: 68,
          description: "Used ML for crop disease detection and multilingual UI support"
        }
      ]
    }
  },
  {
    title: "Educational Background",
    score: 62,
    description: "Pursuing a relevant degree; still early in academic journey",
    icon: GraduationCap,
    skills: ["AI & Data Science", "KJSIT"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Pursuing a relevant degree; early-stage profile",
      degrees: [
        {
          degree: "B.Tech in AI & Data Science",
          institution: "K J Somaiya Institute of Technology",
          period: "Expected 2026",
          match: "In Progress"
        }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 72,
    description: "Strong initiative and team spirit through hackathons and community engagement",
    icon: Users,
    skills: ["Initiative", "Collaboration", "Social Impact"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Active participant in hackathons and team-based coding environments",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Initiative",
            score: 75,
            description: "Led creative apps addressing real-world problems"
          }
        ],
        moderateEvidence: [
          {
            skill: "Collaboration",
            score: 70,
            description: "Hackathon finalist and volunteer with NSS"
          }
        ]
      }
    }
  }
  ]
},

{
  id: 5,
 name: "Shivam Raj",
  email: "shivamraj2187@gmail.com",
  phone: "+91 6377052571",
  location: "Allahabad, Uttar Pradesh",
  jobTitle: "Flutter Developer",
  overallScore: 85,
  scoringData: [
    {
    title: "Skill Match",
    score: 88,
    description: "Strong Flutter dev experience with production deployment and cross-platform setup",
    icon: Target,
    skills: ["Flutter & Dart Development", "Cross-Platform & Deployment", "UI & Integrations"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Hands-on Flutter production feature development with PWA and backend sync",
      matchedSkills: [
        "Flutter", "Dart", "Git", "Android Studio", "REST APIs", "Sanity CMS", "PWA", "Spring Framework"
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 82,
    description: "Projects and current role reflect deployment-ready product work and scalable architecture",
    icon: Brain,
    skills: ["PWA", "Cross-Platform Performance", "Production Features"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Projects and current role reflect deployment-ready product work and scalable architecture",
      keywordAlignment: "Good coverage of performance optimization, cross-platform setup, Git-based versioning, and frontend/backend sync. Missing formal mention of App Store/Play Store deployment process.",
      highMatchKeywords: ["Flutter", "PWA", "Gift Card", "performance", "integration"],
      partialMatchKeywords: ["deployment", "version control", "engagement"]
    }
  },
  {
    title: "Project Relevancy",
    score: 84,
    description: "Open-source and live-feature apps show technical control and project delivery",
    icon: FileText,
    skills: ["Expense Tracker", "Real-time API Integration", "UI Filtering"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Open-source and live-feature apps show technical control and project delivery",
      mostRelevantProjects: [
        {
          name: "Prime Shoe App",
          match: 85,
          description: "Real-time product display and third-party API integration"
        },
        {
          name: "Meal App",
          match: 83,
          description: "Filtering logic and dynamic Flutter UI for recipe navigation"
        },
        {
          name: "Expense Tracker",
          match: 82,
          description: "Weekly charts and UI animations for finance tracking"
        }
      ]
    }
  },
  {
    title: "Educational Background",
    score: 78,
    description: "Strong engineering foundation from a top-tier institute (NIT)",
    icon: GraduationCap,
    skills: ["B.Tech ECE", "NIT Allahabad", "8.11 GPA"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Well-aligned technical education with high academic performance",
      degrees: [
        {
          degree: "B.Tech in Electronics & Communication Engineering",
          institution: "MNNIT Allahabad",
          period: "2018 – 2022",
          match: "Strong"
        }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 80,
    description: "Collaborative product development, solo project delivery, and high academic recognition",
    icon: Users,
    skills: ["Ownership", "Execution", "Problem Solving"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Owns project delivery and actively contributes to production environments",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Execution Ownership",
            score: 82,
            description: "Delivered live Gift Card feature at Tata Digital using Flutter"
          },
          {
            skill: "Problem Solving",
            score: 78,
            description: "Improved app performance, engagement, and revenue with optimized code"
          }
        ],
        moderateEvidence: [
          {
            skill: "Collaboration",
            score: 75,
            description: "Managed integration and Git version control with backend teams"
          }
        ]
      }
    }
  }
  ]
},
{
  id: 6,
 name: "Prashant R Dalai",
  email: "dalaiprashant726@gmail.com",
  phone: "8655552963",
  location: "Thane, India",
  jobTitle: "Flutter Developer",
  overallScore: 78,
  scoringData: [
    {
    title: "Skill Match",
    score: 80,
    description: "Solid practical experience in Flutter development with focus on CI and architecture",
    icon: Target,
    skills: ["Flutter & Dart Development", "Agile + CI/CD"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Production-level experience across companies, focused on scalable Flutter architecture and delivery pipelines",
      matchedSkills: [
        "Flutter", "Cross-Platform Development", "Bug Fixing", "CI/CD", "Agile Methodologies", "Architecture Design"
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 75,
    description: "Well-aligned to mobile delivery roles, but lacks mention of API integrations or UI/UX specifics",
    icon: Brain,
    skills: ["Bug Fixing", "Scalable Systems", "Agile Process"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Contributions focus on reliability and process over front-end polish or user experience",
      keywordAlignment: "Mentions scalability, CI, agile, and testing. Missing REST APIs, state management, UI libraries, or app store deployment.",
      highMatchKeywords: ["Flutter", "CI/CD", "Bug Fixing", "Agile"],
      partialMatchKeywords: ["Testing", "Architecture"]
    }
  },
  {
    title: "Project Relevancy",
    score: 72,
    description: "No named projects or open-source work; project impact inferred from job roles only",
    icon: FileText,
    skills: ["Scalable App Builds", "Pre-deployment Testing"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Lack of named personal/public projects limits direct evaluation",
      mostRelevantProjects: [
        {
          name: "Scalable Data Processing App",
          match: 70,
          description: "Production-scale app at We3.Tech with CI and bug resolution"
        },
        {
          name: "Customer-Facing Feature Delivery",
          match: 68,
          description: "Techfriar and Kadamba roles indicate user-impacting feature development"
        }
      ]
    }
  },
  {
    title: "Educational Background",
    score: 68,
    description: "Relevant computer science postgraduate degree, though from a tier-2 institute",
    icon: GraduationCap,
    skills: ["MSc in Computer Science"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Formal technical training but no notable academic accolades or research exposure",
      degrees: [
        {
          degree: "MSc in Computer & Information Sciences",
          institution: "IMCOST PG College",
          match: "Relevant"
        }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 78,
    description: "Evidence of ownership, delivery under pressure, and team-based integration",
    icon: Users,
    skills: ["Process Ownership", "Team Collaboration", "Adaptability"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Multiple roles across companies reflect adaptability and contribution to fast-paced teams",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Execution Consistency",
            score: 80,
            description: "Handled delivery pipelines and reduced production downtime"
          },
          {
            skill: "Team Collaboration",
            score: 76,
            description: "Worked cross-functionally at Techfriar and We3.Tech"
          }
        ]
      }
    }
  }
  ]
},

{
  id: 7,
   name: "Mohd Sameer Gauri",
  email: "gaurimohdsameer@gmail.com",
  phone: "+91 8446062685",
  location: "Bhiwandi, Maharashtra",
  jobTitle: "Flutter Developer",
  overallScore: 82,
  scoringData: [
    {
    title: "Skill Match",
    score: 85,
    description: "Strong match for core Flutter/Dart stack with multiple live apps and Firebase/AWS integration",
    icon: Target,
    skills: ["Flutter & Dart Development", "UI & API Integration"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Experienced in Dart, Flutter, Firebase, API handling, and SQL backends",
      matchedSkills: [
        "Flutter", "Dart", "Firebase", "AWS", "SQL", "API Integration", "UI Development"
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 78,
    description: "Consistent focus on frontend and backend coordination, but lacks structured devops or testing practices",
    icon: Brain,
    skills: ["Production Deployment", "API Integration", "User-Facing UI"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Well-articulated experience with Firebase, AWS, UI workflows, and multiple project deliveries",
      keywordAlignment: "Good use of technical terms like SQL, OTP Auth, API, UI, Firebase, Dart. Slight lack of emphasis on automated testing or CI/CD.",
      highMatchKeywords: ["Firebase", "Flutter", "Dart", "OTP Auth", "UI"],
      partialMatchKeywords: ["SQL", "AWS", "API Integration"]
    }
  },
  {
    title: "Project Relevancy",
    score: 88,
    description: "Portfolio includes live apps on Play Store with real-world feature sets and structured deployment",
    icon: FileText,
    skills: ["Live Project Delivery", "App Store Publishing", "User Features"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Live apps show readiness for production Flutter roles",
      mostRelevantProjects: [
        {
          name: "Job Circle",
          match: 90,
          description: "End-to-end Flutter app with OTP auth, AWS/SQL backend, published on Play Store"
        },
        {
          name: "Fasheo",
          match: 88,
          description: "E-commerce delivery app with Firebase integration"
        },
        {
          name: "Scholar’s Technolearn",
          match: 85,
          description: "Student-focused UI-heavy app with Firebase auth and content delivery"
        }
      ]
    }
  },
  {
    title: "Educational Background",
    score: 70,
    description: "Relevant IT degree with strong GPA but lacks institutional branding or advanced coursework",
    icon: GraduationCap,
    skills: ["BSc IT", "Mumbai University"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Practical experience outweighs academic depth, but foundation is solid",
      degrees: [
        {
          degree: "BSc in Information Technology",
          institution: "Mumbai University",
          gpa: "9.33 SGPI",
          match: "Moderate"
        }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 75,
    description: "Freelance and startup experience indicates ownership and delivery autonomy",
    icon: Users,
    skills: ["Independent Execution", "Client Delivery", "Consistency"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Repeated delivery across companies and freelance projects reflects discipline",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Delivery Ownership",
            score: 78,
            description: "Shipped multiple production apps with direct control over UI and integration"
          }
        ],
        moderateEvidence: [
          {
            skill: "Client Collaboration",
            score: 72,
            description: "Freelance app work and multi-stakeholder projects reflect client-facing interaction"
          }
        ]
      }
    }
  }
  ]
},

{
  id: 8,
  name: "Huzaifa Ansari",
  email: "ansarihuzaifa1310@gmail.com",
  phone: "+91 96195 66787",
  location: "Mumbai Central, Maharashtra",
  jobTitle: "Flutter Developer",
  overallScore: 85,
  scoringData: [
    {
    title: "Skill Match",
    score: 87,
    description: "Comprehensive Flutter stack with production-level deployment, backend, and state management",
    icon: Target,
    skills: ["Flutter & Dart", "State Management (Bloc/Provider)"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Strong Flutter ecosystem knowledge with backend integration, real-time databases, and production readiness",
      matchedSkills: [
        "Flutter", "Dart", "Provider", "Bloc", "Firebase", "SQL", "PHP", "Firestore", "Node.js", "Express.js", "API Integration"
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 83,
    description: "Content is well-aligned with mobile product delivery and showcases depth across app features and tooling",
    icon: Brain,
    skills: ["Multi-domain App Development", "End-to-End Delivery"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Experience spans cross-domain app development, QA, version control, and streaming/real-time features",
      keywordAlignment: "Strong presence of production keywords like state management, offline support, third-party auth, video streaming, QA workflows.",
      highMatchKeywords: ["Flutter", "Bloc", "Firebase", "Streaming", "FlutterFlow", "Jira"],
      partialMatchKeywords: ["API Integration", "Node.js", "PHP", "UI/UX"]
    }
  },
  {
    title: "Project Relevancy",
    score: 89,
    description: "Multiple live apps published across diverse domains (fitness, e-commerce, ticketing)",
    icon: FileText,
    skills: ["Play Store Deployment", "Complex App Features"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Clear project ownership with measurable delivery output and live app links",
      mostRelevantProjects: [
        {
          name: "Ticketmart (Alphaneon Studioz)",
          match: 92,
          description: "Full-featured app with third-party login, real-time updates, and video streaming"
        },
        {
          name: "Dashfit",
          match: 88,
          description: "Fitness tracking app with Firebase backend and published Play Store deployment"
        },
        {
          name: "ABS",
          match: 85,
          description: "E-commerce app with backend integration and offline support"
        }
      ]
    }
  },
  {
    title: "Educational Background",
    score: 65,
    description: "Degree in computer engineering, though lacks tier-1 pedigree or academic distinction",
    icon: GraduationCap,
    skills: ["B.E. Computer Engineering"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Education aligns with technical role expectations but no notable academic awards or coursework mentioned",
      degrees: [
        {
          degree: "Bachelor's in Computer Engineering",
          institution: "University of Mumbai",
          match: "Satisfactory"
        }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 80,
    description: "Worked in agile environments, cross-team collaboration, and QA cycles; shows delivery consistency",
    icon: Users,
    skills: ["Team Collaboration", "Agile Processes", "Ownership"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Experience across development and QA roles reflects accountability and full-cycle delivery maturity",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Cross-Functional Execution",
            score: 82,
            description: "Handled both frontend and backend integration along with QA responsibilities"
          },
          {
            skill: "Process Familiarity",
            score: 78,
            description: "Well-versed in Jira, Agile, and version control tools"
          }
        ]
      }
    }
  }
  ]
},

{
  id: 9,
  name: "Ayush Vaishnav",
  email: "ayushvshnv1@gmail.com",
  phone: "+91 89755 05692",
  location: "Mumbai",
  jobTitle: "Flutter Developer",
  overallScore: 72,
  scoringData: [
   {
    title: "Skill Match",
    score: 75,
    description: "Broad backend and DevOps skills with some Flutter experience but not fully mobile-focused",
    icon: Target,
    skills: ["Flutter & Dart", "Cross-Platform Development"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Flutter present but not core; candidate brings additional strengths in backend, DevOps, and CI/CD",
      matchedSkills: [
        "Flutter", "Java", "JavaScript", "Spring", "React", "AWS", "Oracle SQL", "CI/CD", "Git", "Kubernetes"
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 70,
    description: "Some alignment with mobile and web systems but most content skews backend or enterprise support",
    icon: Brain,
    skills: ["Backend Infrastructure", "Support Systems"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Built Android/iOS components but focus appears enterprise backend; Flutter is mentioned but not dominant",
      keywordAlignment: "Mentions Android/iOS app maintenance, but no detail on Flutter implementation, UI structure, or state management",
      highMatchKeywords: ["CI/CD", "Android", "iOS", "Spring"],
      partialMatchKeywords: ["Flutter", "JavaScript", "React"]
    }
  },
  {
    title: "Project Relevancy",
    score: 65,
    description: "Indirect experience with mobile but few detailed Flutter-based apps or project links",
    icon: FileText,
    skills: ["Financial Systems", "Platform Integration"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Worked on mobile-related products but no clear Flutter-based project ownership or deep UI/UX delivery",
      mostRelevantProjects: [
        {
          name: "Mirae Asset App Support",
          match: 72,
          description: "Handled Android/iOS app updates, assumed cross-platform integration exposure"
        },
        {
          name: "Cab Booking Apps (Innovatiive Creators)",
          match: 68,
          description: "Developed cross-platform apps, but stack details unclear (Flutter not explicitly mentioned)"
        }
      ]
    }
  },
  {
    title: "Educational Background",
    score: 60,
    description: "Non-engineering IT degree; no standout academic indicators or certifications",
    icon: GraduationCap,
    skills: ["B.Sc. IT"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Relevant stream but lacks depth typically seen in core development profiles",
      degrees: [
        {
          degree: "B.Sc. in Information Technology",
          institution: "Mumbai University",
          match: "Moderate"
        }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 70,
    description: "Worked across multiple organizations and domains; likely team exposure, but soft skills are implicit",
    icon: Users,
    skills: ["Client Collaboration", "Adaptability"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Handled deployment, customization, and support in fintech and IT firms",
      identifiedSkills: {
        moderateEvidence: [
          {
            skill: "Client Collaboration",
            score: 72,
            description: "Worked with cross-functional teams across multiple clients"
          },
          {
            skill: "Adaptability",
            score: 68,
            description: "Switched across domains including finance, security, and transportation"
          }
        ]
      }
    }
  }
  ]
},

{
  id: 10,
   name: "Atharva Kelkar",
  email: "kelkaratharva05@gmail.com",
  phone: null,
  location: "Bhopal, Madhya Pradesh",
  jobTitle: "Flutter Developer",
  overallScore: 66,
  scoringData: [
   {
    title: "Skill Match",
    score: 68,
    description: "Basic Flutter experience with added strengths in product thinking and soft skills",
    icon: Target,
    skills: ["Flutter", "Dart"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Flutter and Dart experience exists, but limited depth in mobile architecture, deployment, or advanced integrations",
      matchedSkills: ["Flutter", "Dart", "Java"],
      notes: "Lacks demonstrated experience in managing Flutter state, animations, or UI optimization"
    }
  },
  {
    title: "Semantic Scoring",
    score: 63,
    description: "Some contextual relevance, but resume leans heavily into product/PM over core Flutter engineering",
    icon: Brain,
    skills: ["Full-Stack Flutter", "Agile Workflows"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Describes a single internship involving Flutter with vague technical details",
      keywordAlignment: "Mentions Flutter across platforms, GPT integration, and cross-functional communication. No deep references to architecture or debugging",
      partialMatchKeywords: ["Flutter", "AI", "Agile", "Cross-Platform"]
    }
  },
  {
    title: "Project Relevancy",
    score: 60,
    description: "One app development project mentioned; lacks specific user-facing features, performance, or deployment scope",
    icon: FileText,
    skills: ["Teachafy App"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Worked on a single cross-platform project with GPT integration, but no Play Store deployments or UI/UX detail",
      mostRelevantProjects: [
        {
          name: "Teachafy App",
          match: 65,
          description: "Cross-platform Flutter app with AI features, built in a remote internship setting"
        }
      ]
    }
  },
  {
    title: "Educational Background",
    score: 70,
    description: "Relevant B.Tech degree in CS with AI/ML focus, moderate GPA",
    icon: GraduationCap,
    skills: ["Computer Science", "AI & ML"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Tech background aligns with Flutter role; no specific coursework in mobile dev or UI design noted",
      degrees: [
        {
          degree: "B.Tech in Computer Science (AI & ML)",
          institution: "Vellore Institute of Technology",
          match: "Moderate"
        }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 76,
    description: "Strong team collaboration and communication across internships and club work",
    icon: Users,
    skills: ["Team Collaboration", "Product Thinking"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Well-rounded in communication, stakeholder management, and technical coordination",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Communication",
            score: 78,
            description: "Handled client communication and product coordination at internship level"
          },
          {
            skill: "Agile Collaboration",
            score: 74,
            description: "Executed agile delivery with feedback cycles at Teachafy"
          }
        ]
      }
    }
  }
  ]
}
];

const users = candidatesData.map(({ id, name }) => ({
  id,
  name,
  
}));

  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-warmBrown-700 to-warmBrown-800";
    if (score >= 70) return "from-warmBrown-600 to-warmBrown-700";
    if (score >= 50) return "from-brownBeige-500 to-brownBeige-600";
    return "from-gray-400 to-gray-500";
  };

  const getStatusText = (score: number) => {
    if (score >= 85) return "Excellent Candidate";
    if (score >= 70) return "Strong Match";
    if (score >= 50) return "Good Potential";
    return "Needs Review";
  };

  const getLevelIndicatorColor = (color: string) => {
    switch(color) {
      case "green": return "bg-green-500";
      case "yellow": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

const EmployerMessages_Three = () => {

  const [selectedUser, setSelectedUser] = useState(users[0]);


  // 3. Find the candidate data for the selected user
  const candidate = candidatesData.find(c => c.id === selectedUser.id);

  return (
    <div className="flex h-screen text-[#5F4B3B] bg-[#F9F6F1]">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-[#DDD3C0] bg-[#FFFDF8]">
        <div className="p-4 text-xl font-bold">Candidates</div>
        <div className="overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`cursor-pointer px-4 py-3 hover:bg-[#E7E0D6] ${
                selectedUser.id === user.id ? "bg-[#E7E0D6]" : ""
              }`}
            >
              <div className="font-medium">{user.name}</div>
              
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {candidate ? (
            <div className="min-h-screen bg-gradient-to-br from-brownBeige-50 to-cream-100 p-6">
                <div className="grid gap-6">
              {/* --- Candidate Info Card --- */}
              <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brownBeige-200 to-brownBeige-300 flex items-center justify-center text-2xl font-bold text-warmBrown-800">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h2 className="text-3xl font-bold text-gray-900">{candidate.name}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                        <p>{candidate.email}</p>
                        {candidate.phone && <p>{candidate.phone}</p>}
                        <p>{candidate.location}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-warmBrown-600 text-warmBrown-700 hover:bg-brownBeige-50 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* --- Overall Score Section --- */}
              <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-brownBeige-100"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - candidate.overallScore / 100)}`}
                          className="text-warmBrown-700 transition-all duration-1000 ease-out"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-warmBrown-700">{candidate.overallScore}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">Overall Match Score</h3>
                      <p className="text-lg font-medium text-warmBrown-700">{getStatusText(candidate.overallScore)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* --- Detailed Scoring Breakdown --- */}
              
                {candidate.scoringData.map((item, index) => (
            <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-brownBeige-100">
                    <item.icon className="w-6 h-6 text-warmBrown-700" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-semibold text-gray-900">{item.title}</h4>
                      <span className="text-2xl font-bold text-warmBrown-700">{item.score}%</span>
                    </div>
                    
                    {/* Enhanced sections for all categories */}
                    {item.detailedAnalysis && (
                      <div className="space-y-4 border-l-4 border-warmBrown-300 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-warmBrown-600 flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{item.detailedAnalysis.title}</h5>
                            <p className="text-sm text-gray-600">{item.detailedAnalysis.subtitle}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h6 className="font-medium text-gray-900 mb-2">Match Score</h6>
                          <div className="w-full bg-brownBeige-50 rounded-full h-3 overflow-hidden mb-2">
                            <div 
                              className={`h-full bg-gradient-to-r ${getScoreColor(item.score)} transition-all duration-1000 ease-out rounded-full`}
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                        </div>

                        {/* Skill Match Details */}
                        {item.title === "Skill Match" && (
                          <>
                            <div>
                              <h6 className="font-medium text-gray-900 mb-3">Matched Skills</h6>
                              {Array.isArray(item.detailedAnalysis.matchedSkills) && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {item.detailedAnalysis.matchedSkills.map((skill, skillIndex) => (
                                    <Badge 
                                      key={skillIndex} 
                                      className="bg-brownBeige-200 text-warmBrown-800 hover:bg-brownBeige-300 transition-colors"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* <div className="grid md:grid-cols-2 gap-6">
                              <div className="bg-brownBeige-25 p-4 rounded-lg">
                                <h6 className="font-medium text-gray-900 mb-3">Frontend Technologies</h6>
                                <div className="space-y-2">
                                  {Array.isArray(item.detailedAnalysis.frontendTechnologies) && (
                                    item.detailedAnalysis.frontendTechnologies.map((tech, techIndex) => (
                                      <div key={techIndex} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <div className={`w-2 h-2 rounded-full ${getLevelIndicatorColor(tech.color)}`}></div>
                                          <span className="text-sm text-gray-700">{tech.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">({tech.level})</span>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>

                              <div className="bg-brownBeige-25 p-4 rounded-lg">
                                <h6 className="font-medium text-gray-900 mb-3">Backend & Infrastructure</h6>
                                <div className="space-y-2">
                                  {Array.isArray(item.detailedAnalysis.backendInfrastructure) && (
                                    item.detailedAnalysis.backendInfrastructure.map((tech, techIndex) => (
                                      <div key={techIndex} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <div className={`w-2 h-2 rounded-full ${getLevelIndicatorColor(tech.color)}`}></div>
                                          <span className="text-sm text-gray-700">{tech.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">({tech.level})</span>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>
                            </div> */}
                          </>
                        )}

                        {/* Semantic Scoring Details */}
                        {item.title === "Semantic Scoring" && (
                          <div className="space-y-4">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between mb-2">
                                <h6 className="font-medium text-gray-900">Keyword Alignment Analysis</h6>
                                <Badge className="bg-blue-100 text-blue-800">Analysis</Badge>
                              </div>
                              <p className="text-sm text-gray-700 mb-4">{item.detailedAnalysis.keywordAlignment}</p>
                              
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h6 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    High Match Keywords
                                  </h6>
                                  <div className="flex flex-wrap gap-1">
                                    {Array.isArray(item.detailedAnalysis.highMatchKeywords) && 
                                      item.detailedAnalysis.highMatchKeywords.map((keyword, idx) => (
                                        <Badge key={idx} className="bg-green-100 text-green-800 text-xs">
                                          {keyword}
                                        </Badge>
                                      ))
                                    }
                                  </div>
                                </div>
                                
                                <div>
                                  <h6 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    Partial Match Keywords
                                  </h6>
                                  <div className="flex flex-wrap gap-1">
                                    {Array.isArray(item.detailedAnalysis.partialMatchKeywords) && 
                                      item.detailedAnalysis.partialMatchKeywords.map((keyword, idx) => (
                                        <Badge key={idx} className="bg-yellow-100 text-yellow-800 text-xs">
                                          {keyword}
                                        </Badge>
                                      ))
                                    }
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 p-3 bg-warmBrown-50 rounded-lg">
                                <h6 className="font-medium text-warmBrown-800 mb-1">Context Relevance</h6>
                                <p className="text-sm text-warmBrown-700">{item.detailedAnalysis.contextRelevance}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Project Relevancy Details */}
                        {item.title === "Project Relevancy" && (
                          <div className="space-y-4">
                            <div>
                              <h6 className="font-medium text-gray-900 mb-3">Most Relevant Projects</h6>
                              <div className="space-y-4">
                                {Array.isArray(item.detailedAnalysis.mostRelevantProjects) &&
                                  item.detailedAnalysis.mostRelevantProjects.map((project, projIndex) => (
                                    <div key={projIndex} className="border-l-4 border-warmBrown-200 pl-4 py-2">
                                      <div className="flex items-center justify-between mb-2">
                                        <h6 className="font-semibold text-gray-900">{project.name}</h6>
                                        <Badge className={`${project.match >= 90 ? 'bg-green-100 text-green-800' : project.match >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'}`}>
                                          {project.match}% Match
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                                      <div className="flex flex-wrap gap-1">
                                        {Array.isArray(project.technologies) &&
                                          project.technologies.map((tech, techIdx) => (
                                            <Badge key={techIdx} className="bg-brownBeige-100 text-warmBrown-800 text-xs">
                                              {tech}
                                            </Badge>
                                          ))}
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                            
                            <div className="bg-brownBeige-50 p-4 rounded-lg">
                              <h6 className="font-medium text-warmBrown-800 mb-2">Project Impact Analysis</h6>
                              <p className="text-sm text-warmBrown-700">{item.detailedAnalysis.impactAnalysis}</p>
                            </div>
                          </div>
                        )}

                        {/* Educational Background Details */}
                        {item.title === "Educational Background" && (
                          <div className="space-y-4">
                            <div className="space-y-4">
                              {Array.isArray(item.detailedAnalysis.degrees) &&
                                  item.detailedAnalysis.degrees.map((degree, degIndex) => (
                                    <div key={degIndex} className="border-l-4 border-warmBrown-200 pl-4 py-3">
                                      <div className="flex items-center justify-between mb-2">
                                        <h6 className="font-semibold text-gray-900">{degree.degree}</h6>
                                        <Badge className={`${degree.match === 'Excellent Match' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                          {degree.match}
                                        </Badge>
                                      </div>
                                      <div className="text-sm text-warmBrown-700 font-medium mb-1">{degree.institution}</div>
                                      <div className="text-sm text-gray-600 mb-2">{degree.period}</div>
                                      
                                      {degree.coursework && (
                                        <div className="mb-2">
                                          <div className="text-sm font-medium text-gray-700 mb-1">Relevant Coursework</div>
                                          <div className="flex flex-wrap gap-1">
                                            {degree.coursework.map((course, courseIdx) => (
                                              <Badge key={courseIdx} className="bg-brownBeige-100 text-warmBrown-800 text-xs">
                                                {course}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {degree.achievements && (
                                        <div>
                                          <div className="text-sm font-medium text-gray-700 mb-1">Key Achievements</div>
                                          <ul className="text-xs text-gray-600 space-y-1">
                                            {degree.achievements.map((achievement, achIdx) => (
                                              <li key={achIdx} className="flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-warmBrown-500"></div>
                                                {achievement}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  ))
                                }
                            </div>
                            
                            {/* <div className="bg-brownBeige-50 p-4 rounded-lg">
                              <h6 className="font-medium text-warmBrown-800 mb-3">Professional Certifications</h6>
                              <div className="grid md:grid-cols-2 gap-3">
                               {Array.isArray(item.detailedAnalysis.certifications) &&
                                  item.detailedAnalysis.certifications.map((cert, certIdx) => (
                                    <div key={certIdx} className="flex items-center gap-3 p-2 bg-white rounded border">
                                      <div className="w-6 h-6 rounded-full bg-warmBrown-600 flex items-center justify-center">
                                        <span className="text-white text-xs">✓</span>
                                      </div>
                                      <div>
                                        <div className="text-sm font-semibold text-gray-900">{cert.name}</div>
                                        <div className="text-xs text-gray-600">{cert.level} • {cert.year}</div>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </div> */}
                          </div>
                        )}

                        {/* Interpersonal Skills Details */}
                        {item.title === "Interpersonal Skills" && (
                          <div className="space-y-4">
                            <div>
                              <h6 className="font-medium text-gray-900 mb-3">Identified Soft Skills</h6>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    Strong Evidence
                                  </h6>
                                  <div className="space-y-2">
                                    {item.detailedAnalysis.identifiedSkills &&
                                      Array.isArray(item.detailedAnalysis.identifiedSkills.strongEvidence) &&
                                      item.detailedAnalysis.identifiedSkills.strongEvidence.map((skill, skillIdx) => (
                                        <div key={skillIdx} className="flex items-center justify-between p-2 bg-green-50 rounded">
                                          <div>
                                            <div className="text-sm font-medium text-gray-900">{skill.skill}</div>
                                            <div className="text-xs text-gray-600">{skill.description}</div>
                                          </div>
                                          <div className="text-sm font-bold text-green-700">{skill.score}%</div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    Moderate Evidence
                                  </h6>
                                  <div className="space-y-2">
                                    {item.detailedAnalysis.identifiedSkills &&
                                      Array.isArray(item.detailedAnalysis.identifiedSkills.moderateEvidence) &&
                                      item.detailedAnalysis.identifiedSkills.moderateEvidence.map((skill, skillIdx) => (
                                        <div key={skillIdx} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                                          <div>
                                            <div className="text-sm font-medium text-gray-900">{skill.skill}</div>
                                            <div className="text-xs text-gray-600">{skill.description}</div>
                                          </div>
                                          <div className="text-sm font-bold text-yellow-700">{skill.score}%</div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-brownBeige-50 p-4 rounded-lg">
                              <h6 className="font-medium text-warmBrown-800 mb-3">Evidence Sources</h6>
                              <div className="space-y-2">
                                {Array.isArray(item.detailedAnalysis.evidenceSources) &&
                                  item.detailedAnalysis.evidenceSources.map((source, sourceIdx) => (
                                    <div key={sourceIdx} className="p-2 bg-cream-50 rounded border-l-3 border-warmBrown-400">
                                      <div className="text-sm font-medium text-warmBrown-800">{source.skill}</div>
                                      <div className="text-xs text-warmBrown-600">{source.evidence}</div>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                            
                            <div>
                              <h6 className="font-medium text-gray-900 mb-3">Soft Skills Portfolio</h6>
                              <div className="flex flex-wrap gap-2">
                                {Array.isArray(item.detailedAnalysis.softSkillsPortfolio) &&
                                item.detailedAnalysis.softSkillsPortfolio.map((skill, skillIdx) => (
                                  <Badge key={skillIdx} className="bg-brownBeige-200 text-warmBrown-800">
                                    {skill}
                                  </Badge>
                                ))
                              }
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {!item.detailedAnalysis && (
                      <>
                        <div className="w-full bg-brownBeige-50 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${getScoreColor(item.score)} transition-all duration-1000 ease-out rounded-full`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        
                        <p className="text-gray-600">{item.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex} 
                              variant="secondary" 
                              className="bg-brownBeige-100 text-warmBrown-800 hover:bg-brownBeige-200 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">No data available for this candidate.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerMessages_Three;

import { useState } from "react";
import { Brain, GraduationCap, Users, Download, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const candidatesData = [
  {
  id: 1,
  name: "Max Berlin Varghese",
  email: "maxvarghese29@gmail.com",
  phone: null,
  location: "Mumbai, India",
  jobTitle: "HR Intern",
  overallScore: 48,
  scoringData: [
    {
      title: "Skill Match",
      score: 38,
      description: "Limited to no HR-related skills or tools",
      icon: Target,
      skills: ["Communication", "PR Strategy", "Power BI (some analytics overlap)"],
      detailedAnalysis: {
        title: "Technical Skills Analysis",
        subtitle: "Limited to no HR-related skills or tools",
        matchedSkills: ["PR Strategy", "Data Analytics"]
      }
    },
    {
      title: "Semantic Scoring",
      score: 42,
      description: "Resume lacks HR context; limited overlap with job responsibilities",
      icon: Brain,
      skills: ["Public Relations", "Marketing", "Data Presentation"],
      detailedAnalysis: {
        title: "Content Analysis",
        subtitle: "Resume lacks HR context; limited overlap with job responsibilities",
        keywordAlignment: "No references to sourcing, onboarding, documentation, L&D, or HRMS. Fundraising and PR experience suggest communication ability but not HR readiness.",
        highMatchKeywords: [],
        partialMatchKeywords: ["engagement", "PR", "campaigns"],
        contextRelevance: "Background is more aligned with tech, analytics, and product development. HR intern role expectations are unmet."
      }
    },
    {
      title: "Project Relevancy",
      score: 45,
      description: "Strong project work, but not relevant to HR",
      icon: FileText,
      skills: ["Machine Learning", "Web Development"],
      detailedAnalysis: {
        title: "Experience Analysis",
        subtitle: "Strong project work, but not relevant to HR",
        mostRelevantProjects: [
          {
            name: "Credit Pilot",
            match: 50,
            description: "Built ML solution for credit scoring – impactful, but outside HR domain",
            technologies: ["Python", "ML", "Flask"]
          },
          {
            name: "Myriad",
            match: 40,
            description: "PHP-based hotel booking platform – demonstrates coding skill but irrelevant to HR",
            technologies: ["PHP", "SQL", "Web"]
          }
        ],
        impactAnalysis: "Impressive technical work, especially under Smart India Hackathon. However, lacks any HR-facing projects or people-centric system design."
      }
    },
    {
      title: "Educational Background",
      score: 50,
      description: "Strong engineering background, but unrelated to HR",
      icon: GraduationCap,
      skills: ["AI & Data Science"],
      detailedAnalysis: {
        title: "Academic Qualifications",
        subtitle: "Strong engineering background, but unrelated to HR",
        degrees: [
          {
            degree: "Bachelor of Engineering",
            institution: "Fr. CRCE",
            period: "2022–Present",
            match: "Low Relevance",
            coursework: ["AI", "ML", "Data Science", "Python"],
            achievements: ["SIH Round 2 Qualifier", "Council Rep"]
          }
        ],
        certifications: []
      }
    },
    {
      title: "Interpersonal Skills",
      score: 66,
      description: "Shows leadership and communication through student council and PR work",
      icon: Users,
      skills: ["Public Speaking", "PR", "Student Leadership"],
      detailedAnalysis: {
        title: "Soft Skills Assessment",
        subtitle: "Shows leadership and communication through student council and PR work",
        identifiedSkills: {
          strongEvidence: [
            {
              skill: "Communication",
              score: 75,
              description: "Led PR for campaigns; engaged external stakeholders"
            },
            {
              skill: "Leadership",
              score: 70,
              description: "Elected student council rep; led hackathon projects"
            }
          ],
          moderateEvidence: [
            {
              skill: "Collaboration",
              score: 60,
              description: "Participated in hackathons and team-led tech projects"
            },
            {
              skill: "Strategic Thinking",
              score: 58,
              description: "Framed fundraising strategy and executed with measurable outcomes"
            }
          ]
        },
        evidenceSources: [
          {
            skill: "PR/Communication",
            evidence: "Handled external-facing messaging and campaign execution"
          },
          {
            skill: "Leadership",
            evidence: "Served as Student Council Representative (2023–2024)"
          }
        ],
        softSkillsPortfolio: [
          "Communication", "Leadership", "Strategic Thinking", "Collaboration"
        ]
      }
    }
  ]
},

  {
    id: 2,
    name: "Nidhi Satam",
    email: "nidhisatam02@gmail.com",
    phone: null,
    location: "Mumbai, Maharashtra",
    jobTitle: "HR Intern",
    overallScore: 74,
    scoringData: [
      {
        title: "Skill Match",
    score: 70,
    description: "Covers core HR operations, but lacks tools diversity and strategic exposure",
    icon: Target,
    skills: ["Sourcing", "Screening", "Onboarding", "HRMS", "Excel"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Covers core HR operations, but lacks tools diversity and strategic exposure",
      matchedSkills: [
        "Sourcing", "Screening", "Interview Coordination", "Candidate Communication",
        "Onboarding", "TAHRMS", "Exit Interviews"
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 62,
    description: "Basic alignment with responsibilities; lacks depth in branding or engagement",
    icon: Brain,
    skills: ["Recruitment", "Onboarding"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Basic alignment with responsibilities; lacks depth in branding or engagement",
      keywordAlignment: "Covers recruitment, screening, and onboarding. No evidence of social media, branding, or L&D experience.",
      highMatchKeywords: ["recruitment", "onboarding", "screening", "coordination"],
      partialMatchKeywords: ["exit interviews", "HRMS"],
      contextRelevance: "Internship tasks match a portion of JD, but resume lacks broader HR functional exposure like engagement or training initiatives."
    }
  },
  {
    title: "Project Relevancy",
    score: 54,
    description: "No standout projects apart from routine HR internship",
    icon: FileText,
    skills: ["Basic HR Operations", "Training Research (Academic)"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "No standout projects apart from routine HR internship",
      mostRelevantProjects: [
        {
          name: "HR Internship – Thomas Cook",
          match: 68,
          description: "Performed administrative HR functions with limited initiative or innovation",
          technologies: ["TAHRMS", "Excel"]
        },
        {
          name: "Blackbook Project – Indian Railways",
          match: 50,
          description: "Theoretical research on training & development without hands-on application",
          technologies: []
        }
      ],
      impactAnalysis: "While relevant, work lacks innovation, ownership, or cross-functional exposure. Mostly supportive HR activities."
    }
  },
  {
    title: "Educational Background",
    score: 78,
    description: "Relevant HR degree but lacks notable achievements or certifications",
    icon: GraduationCap,
    skills: ["BMS-HR", "Patkar-Varde College"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Relevant HR degree but lacks notable achievements or certifications",
      degrees: [
        {
          degree: "BMS-HR",
          institution: "Patkar-Varde College",
          period: "Graduated 2023",
          match: "Relevant",
          coursework: ["Human Resources", "Training & Development", "Business Administration"],
          achievements: []
        }
      ],
      certifications: []
    }
  },
  {
    title: "Interpersonal Skills",
    score: 60,
    description: "Some evidence of communication and mentoring, but limited leadership exposure",
    icon: Users,
    skills: ["Communication", "Mentoring", "Coordination"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Some evidence of communication and mentoring, but limited leadership exposure",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Coordination",
            score: 70,
            description: "Managed interview and onboarding communication processes"
          },
          {
            skill: "Communication",
            score: 65,
            description: "Handled candidate interactions and documentation"
          }
        ],
        moderateEvidence: [
          {
            skill: "Mentoring",
            score: 60,
            description: "Volunteered in NGO — commendable but not HR-specific"
          },
          {
            skill: "Team Collaboration",
            score: 55,
            description: "Implied collaboration during HR processes"
          },
          {
            skill: "Attention to Detail",
            score: 52,
            description: "Maintained documentation and tracked joining formalities"
          }
        ]
      },
      evidenceSources: [
        {
          skill: "NGO Mentorship",
          evidence: "Tutored underprivileged child in Math & English"
        },
        {
          skill: "HR Coordination",
          evidence: "Scheduled interviews and onboarding activities"
        }
      ],
      softSkillsPortfolio: [
        "Communication", "Coordination", "Mentorship", "Documentation", "Teamwork"
      ]
    }
  }
    ]
  },
 {
  id: 3,
  name: "Mansi Advilkar",
  email: "mansiadvilkar123@gmail.com",
  phone: null,
  location: null,
  jobTitle: "HR Intern",
  overallScore: 81,
  scoringData: [
    {
      title: "Skill Match",
      score: 88,
      description:
        "Well-rounded HR operations skill set with hands-on recruitment and onboarding experience",
      icon: Target,
      skills: [
        "Recruitment",
        "Resume Screening",
        "Onboarding",
        "Employee Engagement",
        "HR Documentation",
        "HR Software"
      ],
      detailedAnalysis: {
        title: "Technical Skills Analysis",
        subtitle:
          "Well-rounded HR operations skill set with hands-on recruitment and onboarding experience",
        matchedSkills: [
          "Talent Acquisition",
          "Screening",
          "Interviewing",
          "Onboarding",
          "Documentation",
          "HR Admin",
          "Employee Engagement",
          "HR Metrics"
        ]
      }
    },
    {
      title: "Semantic Scoring",
      score: 84,
      description:
        "Resume aligns closely with core internship responsibilities at Ketto",
      icon: Brain,
      skills: ["Recruitment Cycle", "Onboarding", "Engagement Activities"],
      detailedAnalysis: {
        title: "Content Analysis",
        subtitle:
          "Resume aligns closely with core internship responsibilities at Ketto",
        keywordAlignment:
          "Strong keyword match for full-cycle recruitment, onboarding support, induction, and HR admin. Also mentions employee engagement and HR metrics tracking.",
        highMatchKeywords: [
          "recruitment",
          "screening",
          "onboarding",
          "engagement",
          "HR admin",
          "induction"
        ],
        partialMatchKeywords: ["HR systems", "communication"],
        contextRelevance:
          "Tasks and tools mentioned are directly relevant to what Ketto expects from its HR interns."
      }
    },
    {
      title: "Project Relevancy",
      score: 77,
      description:
        "Practical internship experience but lacks distinct projects or ownership beyond HR scope",
      icon: "FileText",
      skills: ["HR Admin", "Employee Engagement", "HR Metrics"],
      detailedAnalysis: {
        title: "Experience Analysis",
        subtitle:
          "Practical internship experience but lacks distinct projects or ownership beyond HR scope",
        mostRelevantProjects: [
          {
            name: "HR Internship – SystemXs.ai",
            match: 80,
            description:
              "Handled recruitment, onboarding, induction, engagement, and HR admin support",
            technologies: ["HR Systems", "Excel"]
          }
        ],
        impactAnalysis:
          "Strong on practical tasks but would benefit from one standout HR innovation or independent initiative."
      }
    },
    {
      title: "Educational Background",
      score: 80,
      description:
        "Relevant HR degree completed recently with solid foundational coverage",
      icon: GraduationCap,
      skills: ["BMS-HR"],
      detailedAnalysis: {
        title: "Academic Qualifications",
        subtitle:
          "Relevant HR degree completed recently with solid foundational coverage",
        degrees: [
          {
            degree: "Bachelor of Management Studies – HR",
            institution: "Sheth NKTT College",
            period: "Graduated 2024",
            match: "Strong Match",
            coursework: [
              "HRM",
              "Recruitment & Selection",
              "Organizational Behaviour"
            ],
            achievements: []
          }
        ],
        certifications: []
      }
    },
    {
      title: "Interpersonal Skills",
      score: 74,
      description:
        "Evidence of team involvement, communication, and process ownership",
      icon: Users,
      skills: ["Communication", "Team Coordination", "Initiative"],
      detailedAnalysis: {
        title: "Soft Skills Assessment",
        subtitle:
          "Evidence of team involvement, communication, and process ownership",
        identifiedSkills: {
          strongEvidence: [
            {
              skill: "Initiative",
              score: 75,
              description:
                "Independently handled onboarding and engagement activities"
            },
            {
              skill: "Communication",
              score: 72,
              description:
                "Managed correspondence and HR formalities with clarity"
            }
          ],
          moderateEvidence: [
            {
              skill: "Team Collaboration",
              score: 70,
              description:
                "Supported induction and recruitment alongside HR team"
            },
            {
              skill: "Attention to Detail",
              score: 65,
              description:
                "Maintained compliance files and documentation"
            }
          ]
        },
        evidenceSources: [
          {
            skill: "Engagement",
            evidence: "Planned and executed employee activities"
          },
          {
            skill: "Onboarding Ownership",
            evidence: "Managed joining formalities and induction"
          }
        ],
        softSkillsPortfolio: [
          "Communication",
          "Initiative",
          "Engagement Planning",
          "HR Coordination"
        ]
      }
    }
  ]
},
{
  id: 4,
  name: "Kasturika Pattanayak",
  email: "kasturikapattanayak@gmail.com",
  phone: null,
  location: "Bhubaneswar",
  jobTitle: "HR Intern",
  overallScore: 85,
  scoringData: [
    {
      title: "Skill Match",
      score: 88,
      description: "Strong command over recruitment, onboarding, and HR analytics tools",
      icon: Target,
      skills: ["Recruitment", "Payroll", "Onboarding", "SPSS", "Power BI", "R-Studio"],
      detailedAnalysis: {
        title: "Technical Skills Analysis",
        subtitle: "Strong command over recruitment, onboarding, and HR analytics tools",
        matchedSkills: [
          "Recruitment",
          "Onboarding",
          "Payroll",
          "Candidate Evaluation",
          "HR Documentation",
          "SPSS",
          "Power BI",
          "R-Studio",
          "Python (Basics)",
          "Tableau (Basics)"
        ]
      }
    },
    {
      title: "Semantic Scoring",
      score: 82,
      description: "Clear alignment with internship tasks; adds value through analytics background",
      icon: Brain,
      skills: ["Recruitment", "Onboarding", "Retention Initiatives", "Candidate Evaluation"],
      detailedAnalysis: {
        title: "Content Analysis",
        subtitle: "Clear alignment with internship tasks; adds value through analytics background",
        keywordAlignment:
          "Covers core expectations like recruitment, onboarding, and document handling. Bonus: experience in payroll and retention.",
        highMatchKeywords: [
          "recruitment",
          "onboarding",
          "evaluation",
          "document management",
          "retention",
          "payroll"
        ],
        partialMatchKeywords: ["employee engagement", "HR systems"],
        contextRelevance:
          "Resume shows proactive results-driven experience in HR across consulting and corporate contexts."
      }
    },
    {
      title: "Project Relevancy",
      score: 75,
      description: "Strong analytical projects, though not HR-specific",
      icon: FileText,
      skills: ["Data Analytics", "Budget Research", "SPSS", "Excel"],
      detailedAnalysis: {
        title: "Experience Analysis",
        subtitle: "Strong analytical projects, though not HR-specific",
        mostRelevantProjects: [
          {
            name: "EV Sales Trend Analysis",
            match: 70,
            description:
              "Used SPSS & regression to evaluate market shifts; highlights analytical rigor",
            technologies: ["SPSS", "Excel"]
          },
          {
            name: "Budget Allocation Study",
            match: 65,
            description:
              "Statistical budget trend research using Excel; relevant to decision-making and reporting",
            technologies: ["Excel"]
          }
        ],
        impactAnalysis:
          "Projects reflect strong analytical skills applicable to HR reporting and insights, though not directly HR-themed."
      }
    },
    {
      title: "Educational Background",
      score: 84,
      description: "MBA with HR specialization and strong analytics component",
      icon: GraduationCap,
      skills: ["MBA-HR", "Business Analytics", "KIIT School of Management"],
      detailedAnalysis: {
        title: "Academic Qualifications",
        subtitle: "MBA with HR specialization and strong analytics component",
        degrees: [
          {
            degree: "MBA – HR & Business Analytics",
            institution: "KIIT School of Management",
            period: "Jul 2022 – May 2024",
            match: "High",
            coursework: [
              "Talent Acquisition",
              "SPSS",
              "Power BI",
              "HRM",
              "Analytics"
            ],
            achievements: []
          }
        ],
        certifications: []
      }
    },
    {
      title: "Interpersonal Skills",
      score: 77,
      description:
        "Demonstrates teamwork, leadership, and ownership through real-world impact",
      icon: Users,
      skills: ["Teamwork", "Leadership", "Efficiency", "Initiative"],
      detailedAnalysis: {
        title: "Soft Skills Assessment",
        subtitle:
          "Demonstrates teamwork, leadership, and ownership through real-world impact",
        identifiedSkills: {
          strongEvidence: [
            {
              skill: "Initiative",
              score: 80,
              description:
                "Exceeded recruitment and retention targets in internship roles"
            },
            {
              skill: "Efficiency",
              score: 78,
              description:
                "Handled payroll processing and document generation for large teams"
            }
          ],
          moderateEvidence: [
            {
              skill: "Team Collaboration",
              score: 72,
              description:
                "Worked across functions in internships and projects"
            },
            {
              skill: "Adaptability",
              score: 70,
              description:
                "Worked across blue/white collar roles and tools (SPSS to SAS)"
            }
          ]
        },
        evidenceSources: [
          {
            skill: "Initiative",
            evidence: "Surpassed hiring goals and executed retention strategies"
          },
          {
            skill: "Ownership",
            evidence: "Independently managed payroll for 2700 employees"
          }
        ],
        softSkillsPortfolio: [
          "Initiative",
          "Efficiency",
          "Teamwork",
          "Problem Solving",
          "Adaptability"
        ]
      }
    }
  ]
},

{
  id: 5,
  name: "Harsh Arora",
  email: "harsh.22087@sscbs.du.ac.in",
  phone: null,
  location: "Delhi, India",
  jobTitle: "HR Intern",
  overallScore: 63,
  scoringData: [
    {
      title: "Skill Match",
      score: 58,
      description:
        "Good analytical and office tool proficiency, but lacks core HR operations experience",
      icon: Target,
      skills: ["Excel", "Power BI", "SPSS", "Python", "Documentation"],
      detailedAnalysis: {
        title: "Technical Skills Analysis",
        subtitle:
          "Good analytical and office tool proficiency, but lacks core HR operations experience",
        matchedSkills: [
          "Excel (Advanced)",
          "Power BI",
          "SPSS",
          "Python (Basic)",
          "Documentation",
          "Presentation Skills"
        ]
      }
    },
    {
      title: "Semantic Scoring",
      score: 60,
      description:
        "Resume shows adjacent strengths (strategy, planning, coordination), but minimal HR role alignment",
      icon: Brain,
      skills: ["Planning", "Research", "Coordination"],
      detailedAnalysis: {
        title: "Content Analysis",
        subtitle:
          "Resume shows adjacent strengths (strategy, planning, coordination), but minimal HR role alignment",
        keywordAlignment:
          "No direct experience in recruitment, onboarding, or HR documentation. However, strategic planning, coordination, and people-facing roles overlap slightly with HR functions.",
        highMatchKeywords: [],
        partialMatchKeywords: [
          "event coordination",
          "documentation",
          "volunteer management",
          "strategic planning"
        ],
        contextRelevance:
          "Candidate shows strong work ethic and cross-functional exposure but has not operated within core HR workflows."
      }
    },
    {
      title: "Project Relevancy",
      score: 65,
      description:
        "Projects demonstrate leadership, planning, and impact—though not HR-focused",
      icon: FileText,
      skills: ["Predictive Modeling", "Business Planning", "Sustainability"],
      detailedAnalysis: {
        title: "Experience Analysis",
        subtitle:
          "Projects demonstrate leadership, planning, and impact—though not HR-focused",
        mostRelevantProjects: [
          {
            name: "Sarvgun Sampann",
            match: 70,
            description:
              "Designed an educational and vocational access platform – people-oriented and socially impactful",
            technologies: []
          },
          {
            name: "Green Tech Feasibility",
            match: 60,
            description:
              "Analyzed feasibility and planning – reflects structured problem-solving"
          }
        ],
        impactAnalysis:
          "Though not in HR, the projects demonstrate leadership, coordination, and empathy—qualities valuable for people-centric roles."
      }
    },
    {
      title: "Educational Background",
      score: 72,
      description:
        "Top-tier business school background with strong academic performance",
      icon: GraduationCap,
      skills: ["BMS", "University of Delhi", "Excel", "Analytics"],
      detailedAnalysis: {
        title: "Academic Qualifications",
        subtitle:
          "Top-tier business school background with strong academic performance",
        degrees: [
          {
            degree: "Bachelor of Management Studies",
            institution: "SSCBS, University of Delhi",
            period: "Ongoing",
            match: "Moderate",
            coursework: ["Finance", "Strategy", "Analytics", "Communication"],
            achievements: ["CGPA: 8.86 (2nd Semester)"]
          }
        ],
        certifications: []
      }
    },
    {
      title: "Interpersonal Skills",
      score: 78,
      description:
        "Strong evidence of leadership, initiative, and collaboration through extra-curricular roles",
      icon: Users,
      skills: ["Leadership", "Team Management", "Initiative", "Communication"],
      detailedAnalysis: {
        title: "Soft Skills Assessment",
        subtitle:
          "Strong evidence of leadership, initiative, and collaboration through extra-curricular roles",
        identifiedSkills: {
          strongEvidence: [
            {
              skill: "Leadership",
              score: 82,
              description:
                "Led multiple national competitions and headed major college bodies"
            },
            {
              skill: "Initiative",
              score: 80,
              description:
                "Co-founded a project that impacted 700+ individuals"
            }
          ],
          moderateEvidence: [
            {
              skill: "Event Coordination",
              score: 75,
              description:
                "Organized 35+ social and corporate outreach events"
            },
            {
              skill: "Collaboration",
              score: 70,
              description:
                "Worked across teams and functions in internships and competitions"
            }
          ]
        },
        evidenceSources: [
          {
            skill: "Event Leadership",
            evidence:
              "Managed NSS and Prodigy events with large participation"
          },
          {
            skill: "Foundership",
            evidence:
              "Built a business proposal, co-founded social impact platform"
          }
        ],
        softSkillsPortfolio: [
          "Leadership",
          "Collaboration",
          "Initiative",
          "Strategic Thinking",
          "Communication"
        ]
      }
    }
  ]
},
{
  id: 6,
  name: "Garima Misra",
  email: "garimamisra14@gmail.com",
  phone: null,
  location: "Mumbai",
  jobTitle: "HR Intern",
  overallScore: 83,
  scoringData: [
    {
      title: "Skill Match",
      score: 85,
      description: "Strong HR fundamentals across recruitment, onboarding, and engagement",
      icon: Target,
      skills: [
        "Recruitment",
        "Onboarding",
        "Employee Engagement",
        "HR Documentation"
      ],
      detailedAnalysis: {
        title: "Technical Skills Analysis",
        subtitle: "Strong HR fundamentals across recruitment, onboarding, and engagement",
        matchedSkills: [
          "Resume Screening",
          "Recruitment & Selection",
          "Onboarding",
          "HR Documentation",
          "HR Administration",
          "Training",
          "Event Planning"
        ]
      }
    },
    {
      title: "Semantic Scoring",
      score: 80,
      description: "Good contextual alignment with Ketto’s HR intern expectations",
      icon: Brain,
      skills: ["HR Operations", "Engagement", "Recruitment"],
      detailedAnalysis: {
        title: "Content Analysis",
        subtitle: "Good contextual alignment with Ketto’s HR intern expectations",
        keywordAlignment:
          "Covers all expected HR intern responsibilities including sourcing, onboarding, training, documentation, and engagement.",
        highMatchKeywords: [
          "recruitment",
          "onboarding",
          "training",
          "employee engagement",
          "HR events"
        ],
        partialMatchKeywords: ["conflict resolution", "reporting"],
        contextRelevance:
          "Both internships reflect real-world involvement in full HR cycles, especially people-oriented processes relevant to the role."
      }
    },
    {
      title: "Project Relevancy",
      score: 76,
      description: "Internships serve as direct practical HR exposure; no additional academic projects listed",
      icon: FileText,
      skills: ["Retail HR", "Team Engagement", "Onboarding Programs"],
      detailedAnalysis: {
        title: "Experience Analysis",
        subtitle: "Internships serve as direct practical HR exposure; no additional academic projects listed",
        mostRelevantProjects: [
          {
            name: "Retail HR Intern – The Souled Store",
            match: 82,
            description: "Led end-to-end recruitment and employee engagement for a store launch",
            technologies: []
          },
          {
            name: "HR Intern – Locobuzz",
            match: 78,
            description: "Handled resume screening, training delivery, and wellness programs",
            technologies: []
          }
        ],
        impactAnalysis:
          "Demonstrates practical HR ownership across diverse contexts. Strong application but could benefit from academic HR research or system work."
      }
    },
    {
      title: "Educational Background",
      score: 78,
      description: "Relevant management education with HR exposure",
      icon: GraduationCap,
      skills: ["BMS", "Thakur College", "Management Studies"],
      detailedAnalysis: {
        title: "Academic Qualifications",
        subtitle: "Relevant management education with HR exposure",
        degrees: [
          {
            degree: "Bachelor's in Management Studies",
            institution: "Thakur College of Science and Commerce",
            period: "2021 – 2024",
            match: "Good Fit",
            coursework: [
              "HRM",
              "Organizational Behavior",
              "Training & Development"
            ],
            achievements: []
          }
        ],
        certifications: []
      }
    },
    {
      title: "Interpersonal Skills",
      score: 84,
      description: "Shows strong people skills, empathy, and collaboration in HR settings",
      icon: Users,
      skills: [
        "Empathy",
        "Teamwork",
        "Emotional Intelligence",
        "Communication"
      ],
      detailedAnalysis: {
        title: "Soft Skills Assessment",
        subtitle: "Shows strong people skills, empathy, and collaboration in HR settings",
        identifiedSkills: {
          strongEvidence: [
            {
              skill: "Empathy",
              score: 85,
              description: "Worked closely with employee concerns and wellness programs"
            },
            {
              skill: "Communication",
              score: 82,
              description: "Handled initial interviews and onboarding sessions"
            }
          ],
          moderateEvidence: [
            {
              skill: "Team Collaboration",
              score: 78,
              description: "Collaborated across HR and retail teams for store staffing"
            },
            {
              skill: "Conflict Resolution",
              score: 70,
              description: "Addressed staff concerns during retail onboarding"
            }
          ]
        },
        evidenceSources: [
          {
            skill: "Onboarding Leadership",
            evidence: "Conducted training and onboarding across two organizations"
          },
          {
            skill: "Engagement Execution",
            evidence: "Planned and executed wellness and HR engagement events"
          }
        ],
        softSkillsPortfolio: [
          "Empathy",
          "Communication",
          "Team Collaboration",
          "Adaptability",
          "Conflict Resolution"
        ]
      }
    }
  ]
},

{
  id: 7,
  name: "Esha Dhuri",
  email: "eshadhuri23@gmail.com",
  phone: null,
  location: "Dadar, Mumbai",
  jobTitle: "HR Intern",
  overallScore: 69,
  scoringData: [
    {
      title: "Skill Match",
      score: 66,
      description:
        "Has basic HR exposure with supporting experience in marketing and coordination",
      icon: Target,
      skills: ["Recruitment", "HRM", "Excel", "Telephonic Interviewing"],
      detailedAnalysis: {
        title: "Technical Skills Analysis",
        subtitle:
          "Has basic HR exposure with supporting experience in marketing and coordination",
        matchedSkills: [
          "Recruitment",
          "Telephonic Interviews",
          "Candidate Screening",
          "Certificate Handling",
          "Employer Coordination",
          "MS Office"
        ]
      }
    },
    {
      title: "Semantic Scoring",
      score: 62,
      description:
        "Partial relevance to HR intern role; better suited for coordination or outreach tasks",
      icon: Brain,
      skills: ["Recruitment Support", "Outreach", "Marketing Coordination"],
      detailedAnalysis: {
        title: "Content Analysis",
        subtitle:
          "Partial relevance to HR intern role; better suited for coordination or outreach tasks",
        keywordAlignment:
          "Some overlap with HR intern expectations: recruitment, selection, and communication. Lacks depth in HR operations, branding, or policy compliance.",
        highMatchKeywords: ["recruitment", "selection", "coordination"],
        partialMatchKeywords: [
          "certificate management",
          "interview scheduling"
        ],
        contextRelevance:
          "Work touches on recruitment and internship management but misses broader HR responsibilities like onboarding, documentation, or employee engagement."
      }
    },
    {
      title: "Project Relevancy",
      score: 60,
      description:
        "One project shows initiative but lacks direct HR alignment",
      icon: FileText,
      skills: ["Content Marketing", "Email Campaigns", "Competitive Research"],
      detailedAnalysis: {
        title: "Experience Analysis",
        subtitle:
          "One project shows initiative but lacks direct HR alignment",
        mostRelevantProjects: [
          {
            name: "Freelance Content Marketing",
            match: 58,
            description:
              "Showcases self-driven execution and campaign skills using tools like Mailchimp",
            technologies: ["Canva", "Mailchimp", "Google Trends"]
          }
        ],
        impactAnalysis:
          "Entrepreneurial initiative is strong, but the project leans more toward marketing than HR development."
      }
    },
    {
      title: "Educational Background",
      score: 75,
      description:
        "Relevant management degree with exposure to HRM and strategic HR concepts",
      icon: GraduationCap,
      skills: ["BMS", "HRM", "Strategic HR"],
      detailedAnalysis: {
        title: "Academic Qualifications",
        subtitle:
          "Relevant management degree with exposure to HRM and strategic HR concepts",
        degrees: [
          {
            degree: "Bachelor in Management Studies",
            institution: "Kirti M. Doongursee College",
            period: "2021 – 2024",
            match: "Good",
            coursework: [
              "HRM",
              "Performance Management",
              "Strategic HRM"
            ],
            achievements: ["GPA: 7.90/10"]
          }
        ],
        certifications: []
      }
    },
    {
      title: "Interpersonal Skills",
      score: 80,
      description:
        "Shows strong communication, coordination, and adaptability across roles",
      icon: Users,
      skills: [
        "Teamwork",
        "Communication",
        "Adaptability",
        "Coordination"
      ],
      detailedAnalysis: {
        title: "Soft Skills Assessment",
        subtitle:
          "Shows strong communication, coordination, and adaptability across roles",
        identifiedSkills: {
          strongEvidence: [
            {
              skill: "Communication",
              score: 80,
              description:
                "Pitched roles, conducted interviews, and negotiated placements"
            },
            {
              skill: "Coordination",
              score: 78,
              description:
                "Matched students to opportunities and managed follow-ups"
            }
          ],
          moderateEvidence: [
            {
              skill: "Adaptability",
              score: 75,
              description:
                "Worked across HR and marketing roles, switching domains as needed"
            },
            {
              skill: "Teamwork",
              score: 70,
              description:
                "Collaborated with internal and external stakeholders"
            }
          ]
        },
        evidenceSources: [
          {
            skill: "Communication",
            evidence:
              "Managed candidate outreach and interviews at Anar App"
          },
          {
            skill: "Coordination",
            evidence:
              "Handled placement logistics at I.T. Vedant"
          }
        ],
        softSkillsPortfolio: [
          "Communication",
          "Teamwork",
          "Adaptability",
          "Coordination",
          "Initiative"
        ]
      }
    }
  ]
},

{
  id: 8,
  name: "Atharva Nandkishor Shende",
  email: "atharvashende77@gmail.com",
  phone: null,
  location: "Nagpur, Maharashtra",
  jobTitle: "HR Intern",
  overallScore: 52,
  scoringData: [
    {
      title: "Skill Match",
      score: 48,
      description:
        "Strong marketing and product skills, but lacks direct HR tools or experience",
      icon: Target,
      skills: [
        "Communication",
        "Content Writing",
        "ClickUp",
        "Jira",
        "Data Analysis"
      ],
      detailedAnalysis: {
        title: "Technical Skills Analysis",
        subtitle:
          "Strong marketing and product skills, but lacks direct HR tools or experience",
        matchedSkills: [
          "Communication",
          "Coordination Tools (ClickUp, Jira)",
          "Email Marketing",
          "Documentation",
          "Content Creation"
        ]
      }
    },
    {
      title: "Semantic Scoring",
      score: 50,
      description:
        "No direct alignment with HR responsibilities; related soft skills evident",
      icon: Brain,
      skills: [
        "Product Management",
        "Digital Communication",
        "Coordination"
      ],
      detailedAnalysis: {
        title: "Content Analysis",
        subtitle:
          "No direct alignment with HR responsibilities; related soft skills evident",
        keywordAlignment:
          "Does not include HR processes like recruitment, onboarding, or engagement. Indirect overlap with coordination and internal communication practices.",
        highMatchKeywords: [],
        partialMatchKeywords: [
          "communication",
          "content",
          "organization tools"
        ],
        contextRelevance:
          "Profile is suited to product/digital marketing roles, not HR. No internship or project with people ops exposure."
      }
    },
    {
      title: "Project Relevancy",
      score: 40,
      description: "No HR-related project work or internship initiatives",
      icon: FileText,
      skills: ["Digital Marketing", "SEO", "Analytics"],
      detailedAnalysis: {
        title: "Experience Analysis",
        subtitle: "No HR-related project work or internship initiatives",
        mostRelevantProjects: [],
        impactAnalysis:
          "Experience and simulations are domain-specific to product/digital growth. Lacks transferable HR exposure."
      }
    },
    {
      title: "Educational Background",
      score: 55,
      description: "Engineering background with no relevance to HR",
      icon: GraduationCap,
      skills: ["B.Tech – ENTC"],
      detailedAnalysis: {
        title: "Academic Qualifications",
        subtitle: "Engineering background with no relevance to HR",
        degrees: [
          {
            degree: "B.Tech. in Electronics and Telecommunication",
            institution:
              "St. Vincent Pallotti College of Engineering and Technology",
            period: "2019 – 2023",
            match: "Low",
            coursework: [],
            achievements: ["VITMEE AIR 1539", "68.38% Aggregate"]
          }
        ],
        certifications: []
      }
    },
    {
      title: "Interpersonal Skills",
      score: 70,
      description:
        "Shows initiative, communication, and creative engagement strengths",
      icon: Users,
      skills: [
        "Communication",
        "Initiative",
        "Creativity",
        "Marketing Execution"
      ],
      detailedAnalysis: {
        title: "Soft Skills Assessment",
        subtitle:
          "Shows initiative, communication, and creative engagement strengths",
        identifiedSkills: {
          strongEvidence: [
            {
              skill: "Initiative",
              score: 75,
              description:
                "Built personal brand, ran collaborations, completed simulations"
            },
            {
              skill: "Communication",
              score: 72,
              description:
                "Demonstrated through content writing, marketing, and outreach"
            }
          ],
          moderateEvidence: [
            {
              skill: "Adaptability",
              score: 65,
              description:
                "Shifted from technical to business/product learning and work"
            },
            {
              skill: "Collaboration",
              score: 62,
              description:
                "Worked with platforms like IIDE and completed team-based simulations"
            }
          ]
        },
        evidenceSources: [
          {
            skill: "Branding and Communication",
            evidence:
              "Handled content and marketing campaigns; collaborated with US brand"
          },
          {
            skill: "Initiative",
            evidence:
              "Completed multiple virtual job simulations in PM and marketing"
          }
        ],
        softSkillsPortfolio: [
          "Communication",
          "Initiative",
          "Creativity",
          "Adaptability",
          "Self-Learning"
        ]
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

const EmployerMessages_One = () => {

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

export default EmployerMessages_One;

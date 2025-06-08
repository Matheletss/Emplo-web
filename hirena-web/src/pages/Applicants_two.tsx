import { useState } from "react";
import { Brain, GraduationCap, Users, Download, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { title } from "process";

const candidatesData = [
  {
  id: 1,
  name: "Yusuf Khan",
  email: "yusufkhanyk08@gmail.com",
  phone: "+91 7738389915",
  location: "Navi Mumbai, India",
  jobTitle: "Data Analyst",
  overallScore: 89,
  scoringData: [
    {
      title: "Skill Match",
      score: 92,
      description:
        "Extensive proficiency in analytics tools, visualization platforms, and data querying",
      icon: Target,
      skills: [
        "Python",
        "SQL",
        "Tableau",
        "Excel",
        "GCP",
        "EDA",
        "Statistical Modeling"
      ],
      detailedAnalysis: {
        title: "Technical Skills Analysis",
        subtitle:
          "Covers full stack of data analyst tooling from ETL to modeling and storytelling",
        matchedSkills: [
          "Python (Pandas, NumPy, Scikit-learn, Matplotlib)",
          "SQL",
          "MySQL",
          "Apache Hive",
          "Tableau",
          "Excel",
          "GCP",
          "EDA",
          "Predictive Analytics",
          "Statistical Modeling"
        ],
        visualizationTools: [
          { name: "Tableau", level: "Advanced" },
          { name: "Matplotlib", level: "Intermediate" },
          { name: "Excel", level: "Advanced" }
        ],
        dataProcessingAndQuerying: [
          { name: "SQL", level: "Advanced" },
          { name: "Apache Hive", level: "Intermediate" },
          { name: "Python (Pandas)", level: "Advanced" }
        ],
        statisticalAndAnalyticalTools: [
          { name: "Scikit-learn", level: "Advanced" },
          { name: "GCP", level: "Intermediate" },
          { name: "EDA", level: "Advanced" },
          { name: "Regression/Clustering", level: "Advanced" }
        ]
      }
    },
    {
      title: "Semantic Scoring",
      score: 85,
      description:
        "Resume content aligns tightly with the responsibilities of a data analyst",
      icon: Brain,
      skills: ["Data Analysis", "Forecasting", "Data Storytelling"],
      detailedAnalysis: {
        title: "Content Analysis",
        subtitle:
          "Resume content aligns tightly with the responsibilities of a data analyst",
        keywordAlignment:
          "Mentions end-to-end data workflows including cleaning, modeling, visualization, and insight generation. Covers stakeholder alignment and business impact.",
        highMatchKeywords: [
          "data analysis",
          "EDA",
          "predictive analytics",
          "Tableau",
          "SQL",
          "statistical modeling"
        ],
        partialMatchKeywords: [
          "dashboarding",
          "collaboration",
          "automation",
          "data consistency"
        ],
        contextRelevance:
          "Work and project experience is directly aligned with data analyst requirements at Ketto."
      }
    },
    {
      title: "Project Relevancy",
      score: 88,
      description:
        "Projects demonstrate real-world data analytics, modeling, and visualization",
      icon: FileText,
      skills: [
        "Time-Series Forecasting",
        "Customer Segmentation",
        "Business Reporting"
      ],
      detailedAnalysis: {
        title: "Experience Analysis",
        subtitle:
          "Projects demonstrate real-world data analytics, modeling, and visualization",
        mostRelevantProjects: [
          {
            name: "Customer Churn Prediction",
            match: 88,
            description:
              "Built a model using ML pipeline and EDA; achieved 74% accuracy",
            technologies: ["Python", "Scikit-learn"]
          },
          {
            name: "Stock Market Prediction",
            match: 85,
            description:
              "Built an LSTM-based time-series forecasting model",
            technologies: ["Python", "TensorFlow", "LSTM"]
          },
          {
            name: "Retail Orders SQL Analysis",
            match: 86,
            description:
              "Used SQL to extract insights from retail data for operational improvements",
            technologies: ["SQL", "ETL"]
          },
          {
            name: "Insurance Claims Dashboard",
            match: 90,
            description:
              "Created actionable Tableau dashboards to support insurance decision-making",
            technologies: ["Tableau"]
          }
        ],
        impactAnalysis:
          "Project work is industry-grade and demonstrates hands-on ability across all pillars of analytics: extraction, modeling, visualization, and communication."
      }
    },
    {
      title: "Educational Background",
      score: 84,
      description:
        "Strong academic base with advanced specialization in Data Science and Analytics",
      icon: GraduationCap,
      skills: ["MSc Data Science", "PGPBA", "BSc Computer Science"],
      detailedAnalysis: {
        title: "Academic Qualifications",
        subtitle:
          "Strong academic base with advanced specialization in Data Science and Analytics",
        degrees: [
          {
            degree: "MSc in Data Science",
            institution: "Symbiosis International University",
            period: "2024 – Present",
            match: "High"
          },
          {
            degree: "PGP in Data Science & Business Analytics",
            institution: "Great Lakes Institute",
            period: "2021 – 2022",
            match: "Strong"
          },
          {
            degree: "BSc in Computer Science",
            institution: "University of Mumbai",
            period: "2017 – 2020",
            match: "Relevant"
          }
        ],
        certifications: []
      }
    },
    {
      title: "Interpersonal Skills",
      score: 75,
      description:
        "Shows stakeholder collaboration and communication in business impact roles",
      icon: Users,
      skills: [
        "Team Communication",
        "Problem Solving",
        "Business Alignment"
      ],
      detailedAnalysis: {
        title: "Soft Skills Assessment",
        subtitle:
          "Shows stakeholder collaboration and communication in business impact roles",
        identifiedSkills: {
          strongEvidence: [
            {
              skill: "Communication",
              score: 78,
              description:
                "Interfaced with stakeholders and presented insights leading to revenue impact"
            },
            {
              skill: "Problem Solving",
              score: 76,
              description:
                "Optimized processes and implemented models in real-world settings"
            }
          ],
          moderateEvidence: [
            {
              skill: "Cross-functional Collaboration",
              score: 72,
              description:
                "Worked with teams in fintech and economic research settings"
            },
            {
              skill: "Adaptability",
              score: 70,
              description:
                "Transitioned across data science, finance, and healthcare domains"
            }
          ]
        },
        evidenceSources: [
          {
            skill: "Stakeholder Impact",
            evidence:
              "Analytics initiatives led to measurable business improvements"
          }
        ],
        softSkillsPortfolio: [
          "Communication",
          "Problem Solving",
          "Business Impact",
          "Team Collaboration"
        ]
      }
    }
  ]
},
{
  id: 2,
  name: "Uche Michael Unegbu",
  email: "uchemichaelu16@gmail.com",
  phone: "+234 8142165128",
  location: "Lagos, Nigeria",
  jobTitle: "Data Analyst",
  overallScore: 71,
  scoringData: [
    {
        title: "Skill Match",
        score: 70,
        description: "Working knowledge of data analysis tools with strong domain understanding in CX and BI",
        icon: Target,
        skills: ["Excel", "Power BI", "SQL", "Business Intelligence", "CRM Tools"],
        detailedAnalysis: {
          title: "Technical Skills Analysis",
          subtitle: "Working knowledge of data analysis tools with strong domain understanding in CX and BI",
          matchedSkills: [
            "Power BI", "SQL", "Excel", "Business Intelligence", "CRM Systems", "Data Insight Reporting"
          ],
          visualizationTools: [
            { name: "Power BI", level: "Intermediate" },
            { name: "Excel", level: "Intermediate" }
          ],
          dataProcessingAndQuerying: [
            { name: "SQL", level: "Basic" }
          ],
          statisticalAndAnalyticalTools: [
            { name: "Business Intelligence", level: "Intermediate" },
            { name: "Microsoft Excel", level: "Intermediate" }
          ]
        }
      },
      {
        title: "Semantic Scoring",
        score: 68,
        description: "Good contextual overlap through QA reporting, customer insights, and CRM optimization",
        icon: Brain,
        skills: ["Service Quality", "Data-Driven Decision Making", "Operational Metrics"],
        detailedAnalysis: {
          title: "Content Analysis",
          subtitle: "Good contextual overlap through QA reporting, customer insights, and CRM optimization",
          keywordAlignment: "While not a traditional analyst, role consistently used reporting, CRM data, and decision-support dashboards. Lacks formal data modeling or forecasting content.",
          highMatchKeywords: ["Power BI", "Excel", "data insights", "CRM reports"],
          partialMatchKeywords: ["SQL", "dashboards", "SOP-based reporting"],
          contextRelevance: "Strong alignment to business-facing data operations, but lacks statistical modeling, automation, or advanced querying depth."
        }
      },
      {
        title: "Project Relevancy",
        score: 60,
        description: "No standalone analytics projects, but strong process improvement and CX data reporting",
        icon: FileText,
        skills: ["CX Optimization", "KPI Monitoring", "Operational Efficiency"],
        detailedAnalysis: {
          title: "Experience Analysis",
          subtitle: "No standalone analytics projects, but strong process improvement and CX data reporting",
          mostRelevantProjects: [
            {
              name: "CRM Workflow Optimization (Marasoftpay)",
              match: 68,
              description: "Built structured feedback and CRM templates based on customer journey data",
              technologies: ["CRM Tools", "Excel", "Power BI"]
            },
            {
              name: "Customer Retention Strategy (UBA)",
              match: 60,
              description: "Led customer satisfaction improvement strategy via quality monitoring",
              technologies: []
            }
          ],
          impactAnalysis: "Demonstrates applied problem-solving with data as support; lacks depth in analytics methodology or structured reporting platforms like Tableau or ETL tools."
        }
      },
      {
        title: "Educational Background",
        score: 60,
        description: "Business administration degree with data certification add-ons",
        icon: GraduationCap,
        skills: ["Business Administration", "Dataluem Certification", "Cybersecurity (Related)"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Business administration degree with data certification add-ons",
      degrees: [
        {
          degree: "BSc in Business Administration",
          institution: "ESFAM-BENIN University",
          period: "Graduated 2022",
          match: "Moderate"
        }
      ],
      certifications: [
        { name: "Data Analysis – Power BI, SQL, Excel (Dataluem)", year: "2022" },
        { name: "Business Intelligence – Dataluem", year: "2022" }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 78,
    description: "Demonstrates strong leadership, cross-functional coordination, and stakeholder communication",
    icon: Users,
    skills: ["Team Leadership", "Problem Solving", "CX Strategy", "Communication"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Demonstrates strong leadership, cross-functional coordination, and stakeholder communication",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Leadership",
            score: 82,
            description: "Led 15-member team at UBA with KPI performance outcomes"
          },
          {
            skill: "Communication",
            score: 78,
            description: "Trained teams, led CX reporting, and cross-function alignment"
          }
        ],
        moderateEvidence: [
          {
            skill: "Strategic Planning",
            score: 74,
            description: "Built SOPs and training calendars across teams"
          },
          {
            skill: "Problem Solving",
            score: 70,
            description: "Improved first contact resolution and reduced churn through process redesign"
          }
        ]
      },
      evidenceSources: [
        {
          skill: "CX & CRM Coordination",
          evidence: "Implemented tools and feedback systems to track agent performance"
        },
        {
          skill: "Mentorship",
          evidence: "Led team-wide customer success coaching sessions"
        }
      ],
      softSkillsPortfolio: [
        "Leadership", "Communication", "Strategic Planning", "Mentorship", "Customer Focus"
      ]
    }
  }
]
},
 {
  id: 3,
  name: "Shruti Gawas",
  email: "shrutiswg45@gmail.com",
  phone: "+91 8452061341",
  location: "Mumbai, Maharashtra",
  jobTitle: "Data Analyst",
  overallScore: 87,
  scoringData: [
    {
    title: "Skill Match",
    score: 90,
    description: "Excellent command over data tools including Python, SQL, Excel, and visualizations",
    icon: Target,
    skills: ["Python", "SQL", "Tableau", "Power BI", "Excel", "PySpark", "EDA"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Strong across core data stack, visualization platforms, and distributed systems",
      matchedSkills: [
        "Python", "SQL", "Excel", "Tableau", "Power BI", "EDA", "HDFS", "PySpark", "Spark SQL"
      ],
      visualizationTools: [
        { name: "Power BI", level: "Intermediate" },
        { name: "Tableau", level: "Intermediate" },
        { name: "Excel", level: "Advanced" }
      ],
      dataProcessingAndQuerying: [
        { name: "SQL", level: "Advanced" },
        { name: "PySpark", level: "Intermediate" },
        { name: "Pandas/NumPy", level: "Advanced" }
      ],
      statisticalAndAnalyticalTools: [
        { name: "Regression", level: "Intermediate" },
        { name: "Clustering", level: "Intermediate" },
        { name: "Decision Trees", level: "Intermediate" }
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 82,
    description: "Resume closely reflects the analyst role's objectives and outcomes",
    icon: Brain,
    skills: ["EDA", "Data Preprocessing", "Visual Analytics"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Resume closely reflects the analyst role's objectives and outcomes",
      keywordAlignment:
        "Strong alignment with core JD terms like EDA, dashboards, SQL, visualization, and problem-solving with data. Slight gap in stakeholder collaboration or reporting narratives.",
      highMatchKeywords: ["EDA", "Python", "SQL", "dashboard", "data preprocessing"],
      partialMatchKeywords: ["business insights", "stakeholder communication"],
      contextRelevance:
        "Very close fit; internship experience clearly covers real-world analytics implementation."
    }
  },
  {
    title: "Project Relevancy",
    score: 80,
    description: "Hands-on internship and academic projects match analyst goals",
    icon: FileText,
    skills: ["Recommendation Systems", "Visualization", "Dashboards"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Hands-on internship and academic projects match analyst goals",
      mostRelevantProjects: [
        {
          name: "Afame Technologies Internship",
          match: 88,
          description: "Built dashboards and performed EDA for HR data insights",
          technologies: ["Python", "Seaborn", "Matplotlib", "Excel", "Tableau"]
        },
        {
          name: "Movie Recommendation System",
          match: 72,
          description: "Built collaborative filtering-based recommendation engine using Streamlit UI",
          technologies: ["Python", "Machine Learning", "Streamlit"]
        }
      ],
      impactAnalysis:
        "Projects show a solid foundation in analysis, data storytelling, and real-world usability. Some potential to elevate project scale and domain breadth."
    }
  },
  {
    title: "Educational Background",
    score: 85,
    description: "Strong academic track with specialization in Data Science and applied research",
    icon: GraduationCap,
    skills: ["MSc Data Science", "Mathematics"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Strong academic track with specialization in Data Science and applied research",
      degrees: [
        {
          degree: "Masters in CS – Data Science",
          institution: "University of Mumbai",
          period: "2022 – 2024",
          match: "High"
        },
        {
          degree: "Bachelors in Mathematics",
          institution: "Kirti M Dongursee College",
          period: "2019 – 2022",
          match: "Strong foundation"
        }
      ],
      certifications: [],
      publications: [
        {
          title: "Long Tail Item Recommendations for MovieLens",
          journal: "IJFMR (Vol 5, Issue 5)",
          year: "2023"
        }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 78,
    description: "Evidence of self-driven initiative and problem-solving; collaboration potential inferred",
    icon: Users,
    skills: ["Communication", "Independent Execution", "Analytical Thinking"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Evidence of self-driven initiative and problem-solving; collaboration potential inferred",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Analytical Thinking",
            score: 80,
            description: "Demonstrated through research publication and applied ML system"
          },
          {
            skill: "Initiative",
            score: 78,
            description: "Proactively developed Streamlit web app and academic research"
          }
        ],
        moderateEvidence: [
          {
            skill: "Communication",
            score: 72,
            description: "Communicated insights via dashboards and visualizations"
          },
          {
            skill: "Independent Execution",
            score: 70,
            description: "Handled multiple aspects of analysis independently"
          }
        ]
      },
      evidenceSources: [
        {
          skill: "Research & Publication",
          evidence: "Published original paper on recommendation systems"
        },
        {
          skill: "Internship Execution",
          evidence: "Completed multi-faceted HR analytics internship project"
        }
      ],
      softSkillsPortfolio: [
        "Analytical Thinking", "Initiative", "Communication", "Problem Solving"
      ]
    }
  }
  ]
},
{
  id: 4,
  name: "Pumpy Sarkar",
  email: "ppumpy96@gmail.com",
  phone: "+91 9129088251",
  location: null,
  jobTitle: "Data Analyst",
  overallScore: 91,
  scoringData: [
    {
    title: "Skill Match",
    score: 94,
    description:
      "Extensive technical toolkit and strong analytical coverage across BI, SQL, and statistical modeling",
    icon: Target,
    skills: [
      "SQL", "Excel", "Power BI", "Google Analytics", "R", "Python", "AB Testing", "Cohort Analysis"
    ],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle:
        "Extensive technical toolkit and strong analytical coverage across BI, SQL, and statistical modeling",
      matchedSkills: [
        "SQL", "Excel", "Power BI", "Mixpanel", "Google Analytics", "R", "Python", "SAS",
        "Data Studio", "Funnel Analysis", "Cohort Analysis", "AB Testing", "Machine Learning"
      ],
      visualizationTools: [
        { name: "Power BI", level: "Advanced" },
        { name: "Data Studio", level: "Intermediate" },
        { name: "Excel", level: "Advanced" }
      ],
      dataProcessingAndQuerying: [
        { name: "SQL", level: "Advanced" },
        { name: "Python", level: "Intermediate" },
        { name: "R", level: "Advanced" }
      ],
      statisticalAndAnalyticalTools: [
        { name: "ARIMA", level: "Advanced" },
        { name: "AB Testing", level: "Advanced" },
        { name: "Regression", level: "Intermediate" },
        { name: "SAS", level: "Intermediate" }
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 88,
    description:
      "Strong alignment with analyst tasks; experience reflects end-to-end data pipeline and actionable insights",
    icon: Brain,
    skills: ["Forecasting", "Pricing Strategy", "Business Insights"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle:
        "Strong alignment with analyst tasks; experience reflects end-to-end data pipeline and actionable insights",
      keywordAlignment:
        "Excellent contextual fit – from forecasting to stakeholder impact, automation, dashboarding, and reporting outcomes. Includes market trend analysis and pricing strategy.",
      highMatchKeywords: ["SQL", "forecasting", "dashboards", "RGM tools", "Power BI"],
      partialMatchKeywords: ["automation", "conversion prediction", "data pipeline"],
      contextRelevance:
        "Projects and work experience are directly aligned with the expectations for a data analyst, particularly in consumer and business analytics."
    }
  },
  {
    title: "Project Relevancy",
    score: 84,
    description:
      "No standalone academic projects listed, but professional work has clear project-level impact",
    icon: FileText,
    skills: ["Pricing Models", "Marketing Analytics", "User Behavior Dashboards"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle:
        "No standalone academic projects listed, but professional work has clear project-level impact",
      mostRelevantProjects: [
        {
          name: "RGM Tool & Forecasting for Coca-Cola",
          match: 92,
          description: "Built and automated pricing models and 12-month ARIMA forecasts",
          technologies: ["R", "SQL", "Excel"]
        },
        {
          name: "Dashboarding at Clicflyer",
          match: 85,
          description: "Tracked MAU, WAU, DAU for over 1.5M users using Power BI",
          technologies: ["Power BI", "Event Data"]
        },
        {
          name: "Conversion Modeling at Yes2Growth",
          match: 82,
          description: "Created regression model with 76% accuracy to predict ad conversions",
          technologies: ["Regression", "Excel", "Marketing Data"]
        }
      ],
      impactAnalysis:
        "While not explicitly academic, these are clearly structured, high-impact analytics projects with business outcomes and tool diversity."
    }
  },
  {
    title: "Educational Background",
    score: 80,
    description:
      "Strong foundation from IIT Kanpur; degree supports technical and analytical roles",
    icon: GraduationCap,
    skills: ["B.Tech – IIT Kanpur"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle:
        "Strong foundation from IIT Kanpur; degree supports technical and analytical roles",
      degrees: [
        {
          degree: "Bachelor of Technology",
          institution: "IIT Kanpur",
          period: "2015 – 2020",
          match: "High Relevance"
        }
      ],
      certifications: [
        { name: "Meta Marketing Analytics", year: null },
        { name: "Certified Scrum Master", year: null }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 81,
    description:
      "Demonstrated leadership, initiative, and business impact communication across teams",
    icon: Users,
    skills: ["Leadership", "Collaboration", "Initiative", "Communication"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle:
        "Demonstrated leadership, initiative, and business impact communication across teams",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Initiative",
            score: 82,
            description: "Led cross-functional initiatives for dashboard and regression delivery"
          },
          {
            skill: "Business Communication",
            score: 80,
            description:
              "Delivered stakeholder-facing insights with measurable impact (e.g. NSR growth)"
          }
        ],
        moderateEvidence: [
          {
            skill: "Team Leadership",
            score: 78,
            description: "Led cross-team coordination for investor onboarding"
          },
          {
            skill: "Strategic Thinking",
            score: 75,
            description: "Managed end-to-end projects from data prep to outcome delivery"
          }
        ]
      },
      evidenceSources: [
        {
          skill: "Cross-functional Communication",
          evidence: "Coordinated teams across analytics, content, and marketing"
        }
      ],
      softSkillsPortfolio: [
        "Initiative", "Communication", "Team Leadership", "Cross-functional Strategy"
      ]
    }
  }
  ]
},

{
  id: 5,
 name: "Mayuri Ahire",
  email: "mayuripradipahire@gmail.com",
  phone: "+91 8482943683",
  location: "Pune, India",
  jobTitle: "Data Analyst",
  overallScore: 86,
  scoringData: [
    {
    title: "Skill Match",
    score: 88,
    description: "Well-rounded technical toolkit including Python, SQL, visualization tools, and analytics foundations",
    icon: Target,
    skills: ["SQL", "Python", "Power BI", "Tableau", "Data Analysis", "Statistical Analysis"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Well-rounded technical toolkit including Python, SQL, visualization tools, and analytics foundations",
      matchedSkills: [
        "SQL", "Python", "Power BI", "Tableau", "Statistical Analysis", "Data Visualization",
        "BI Tools", "Database Management", "Machine Learning", "Data Quality"
      ],
      visualizationTools: [
        { name: "Power BI", level: "Intermediate" },
        { name: "Tableau", level: "Intermediate" },
      ],
      dataProcessingAndQuerying: [
        { name: "SQL", level: "Advanced" },
        { name: "Python", level: "Intermediate" },
      ],
      statisticalAndAnalyticalTools: [
        { name: "Statistical Analysis", level: "Intermediate" },
        { name: "Machine Learning", level: "Intermediate" }
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 84,
    description: "Experience reflects data analytics pipeline, team collaboration, and real-world implementation",
    icon: Brain,
    skills: ["Data Triage", "Automation", "Self-Driving Analytics"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Experience reflects data analytics pipeline, team collaboration, and real-world implementation",
      keywordAlignment: "Strong coverage of analysis, QA, visualization, insights, and analytics automation. Less focus on dashboards in business reporting context.",
      highMatchKeywords: ["data analysis", "Python", "Power BI", "statistical analysis", "data visualization"],
      partialMatchKeywords: ["dashboards", "business metrics", "SQL-driven reporting"],
      contextRelevance: "Strongly aligned with analytics functions, particularly in data-driven QA and performance optimization environments."
    }
  },
  {
    title: "Project Relevancy",
    score: 80,
    description: "Professional and internship projects reflect meaningful analytical contributions",
    icon: FileText,
    skills: ["QA Analytics", "Debugging", "Python Automation"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Professional and internship projects reflect meaningful analytical contributions",
      mostRelevantProjects: [
        {
          name: "ADAS Triage and Debugging",
          match: 85,
          description: "Analyzed AV data to improve performance of AI-based systems; used internal debug tools",
          technologies: ["Drive Scrubber", "Drive Debugger"]
        },
        {
          name: "Power BI Internship",
          match: 78,
          description: "Built interactive dashboards and DAX-based models for reporting",
          technologies: ["Power BI", "DAX"]
        },
        {
          name: "Python Developer Internship",
          match: 75,
          description: "Automated data workflows and created custom visualizations with Python",
          technologies: ["Python", "Web Scraping", "Visualization"]
        }
      ],
      impactAnalysis: "Projects reflect depth in handling technical debugging data and visualization, with moderate business reporting focus."
    }
  },
  {
    title: "Educational Background",
    score: 65,
    description: "Engineering background with relevant certifications but not data-specialized",
    icon: GraduationCap,
    skills: ["Electronics & Telecommunication Engineering"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Engineering background with relevant certifications but not data-specialized",
      degrees: [
        {
          degree: "B.E. in Electronics & Telecommunication",
          institution: "Deogiri Institute of Engineering",
          period: "Graduated 2020",
          match: "Moderately Relevant"
        }
      ],
      certifications: [
        { name: "Data Analyst & Data Scientist – Intern Career" },
        { name: "Power BI Intern Developer" },
        { name: "Programming for Everybody – Coursera" },
        { name: "Excel for Business – Coursera" },
        { name: "Software Engineering Virtual Experience – JPMorgan Chase" }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 76,
    description: "Demonstrates strong cross-team collaboration and initiative in technical problem-solving",
    icon: Users,
    skills: ["Cross-team Communication", "Technical Collaboration", "Independent Execution"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Demonstrates strong cross-team collaboration and initiative in technical problem-solving",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Cross-team Collaboration",
            score: 78,
            description: "Worked across US and China teams for mapping and debugging"
          },
          {
            skill: "Problem Solving",
            score: 75,
            description: "Identified and resolved system issues via AV data triage"
          }
        ],
        moderateEvidence: [
          {
            skill: "Initiative",
            score: 72,
            description: "Completed multiple internships to extend skills outside core job"
          },
          {
            skill: "Communication",
            score: 70,
            description: "Interfaced with multi-region teams for analytics delivery"
          }
        ]
      },
      evidenceSources: [
        {
          skill: "Debugging Ownership",
          evidence: "Delivered 15% performance improvements through analytics"
        }
      ],
      softSkillsPortfolio: [
        "Collaboration", "Problem Solving", "Initiative", "Communication"
      ]
    }
  }
  ]
},
{
  id: 6,
 name: "Karthik Menon",
  email: "karthikmenon0205@gmail.com",
  phone: "+91-9637749778",
  location: "Mumbai, India",
  jobTitle: "Data Analyst",
  overallScore: 78,
  scoringData: [
   {
    title: "Skill Match",
    score: 74,
    description: "Strong in Excel and Tableau; basic knowledge of SQL and R adds value",
    icon: Target,
    skills: ["Excel", "Tableau", "SQL", "R", "Data Cleaning", "Dashboard Development"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Good grasp of common BI tools and data cleaning fundamentals",
      matchedSkills: [
        "Excel", "SQL", "Tableau", "Data Cleaning", "Dashboarding", "R"
      ],
      visualizationTools: [
        { name: "Tableau", level: "Intermediate" },
        { name: "Excel", level: "Advanced" }
      ],
      dataProcessingAndQuerying: [
        { name: "SQL", level: "Basic" },
        { name: "R", level: "Basic" }
      ],
      statisticalAndAnalyticalTools: [
        { name: "Data Cleaning", level: "Intermediate" }
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 72,
    description: "Resume demonstrates understanding of data-driven decision-making in a strategic context",
    icon: Brain,
    skills: ["Policy Research", "Business Analysis", "Presentation"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Resume demonstrates understanding of data-driven decision-making in a strategic context",
      keywordAlignment: "Mentions analysis, dashboarding, data cleaning, and decision support. No evidence of SQL/ETL-based reporting or deep analytics modeling.",
      highMatchKeywords: ["data analysis", "decision making", "dashboard development"],
      partialMatchKeywords: ["SQL", "reporting", "strategy"],
      contextRelevance: "Solid academic and internship base, with growing alignment to analyst expectations."
    }
  },
  {
    title: "Project Relevancy",
    score: 65,
    description: "No technical projects listed, but internship and certifications imply analytical involvement",
    icon: FileText,
    skills: ["Policy Analysis", "Google Analytics Projects"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "No technical projects listed, but internship and certifications imply analytical involvement",
      mostRelevantProjects: [
        {
          name: "Public Policy Research Internship",
          match: 65,
          description: "Data-driven policy recommendations and strategy work",
          technologies: ["Literature Review", "Data-Driven Reporting"]
        }
      ],
      impactAnalysis: "Would benefit from explicit technical project descriptions with tools like SQL, Python, or BI platforms."
    }
  },
  {
    title: "Educational Background",
    score: 80,
    description: "Analytics major and solid performance show direct relevance",
    icon: GraduationCap,
    skills: ["BBA in Analytics", "8.47 GPA"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Analytics major and solid performance show direct relevance",
      degrees: [
        {
          degree: "BBA (Analytics)",
          institution: "Jagdish Seth School of Management",
          period: "2021 – 2024",
          match: "Strong"
        }
      ],
      certifications: [
        { name: "Google Data Analytics Certificate" }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 89,
    description: "Strong leadership roles and team engagement across multiple domains",
    icon: Users,
    skills: ["Leadership", "Communication", "Team Management", "Event Planning"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Strong leadership roles and team engagement across multiple domains",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Leadership",
            score: 92,
            description: "President of Student Council and Football Team Captain"
          },
          {
            skill: "Communication",
            score: 88,
            description: "Managed sponsorships, student affairs, and strategic outreach"
          }
        ],
        moderateEvidence: [
          {
            skill: "Project Execution",
            score: 82,
            description: "Delivered multiple event and student management projects"
          }
        ]
      },
      evidenceSources: [
        {
          skill: "Leadership & Event Management",
          evidence: "Kanyathon 2023 and Student Council experience"
        }
      ],
      softSkillsPortfolio: [
        "Leadership", "Teamwork", "Communication", "Initiative", "Event Coordination"
      ]
    }
  }
  ]
},

{
  id: 7,
  name: "Akshay N. Tatipamul",
  email: "akshaytatipamul@gmail.com",
  phone: "8652462124",
  location: "Mumbai, India",
  jobTitle: "Data Analyst",
  overallScore: 84,
  scoringData: [
    {
    title: "Skill Match",
    score: 88,
    description: "Excellent stack for reporting, reconciliation, and BI dashboarding across tools",
    icon: Target,
    skills: ["Power BI", "Tableau", "SQL", "Advanced Excel", "Python", "Data Cleaning"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Strong practical stack with cross-platform experience across Excel, BI tools, and Python",
      matchedSkills: [
        "Power BI", "Tableau", "SQL", "Excel", "Google Sheets", "Python", "Pandas", "NumPy",
        "Matplotlib", "Seaborn", "Data Reconciliation", "Macros", "Reporting", "Data Cleaning"
      ],
      visualizationTools: [
        { name: "Power BI", level: "Advanced" },
        { name: "Tableau", level: "Intermediate" },
        { name: "Excel", level: "Advanced" }
      ],
      dataProcessingAndQuerying: [
        { name: "SQL", level: "Advanced" },
        { name: "Python", level: "Intermediate" },
        { name: "Google Sheets", level: "Intermediate" }
      ],
      statisticalAndAnalyticalTools: [
        { name: "Data Reconciliation", level: "Advanced" },
        { name: "Data Validation", level: "Intermediate" }
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 82,
    description: "Experience aligned with operational analytics, reporting, and insurance data workflows",
    icon: Brain,
    skills: ["MIS Reporting", "Data Workflow Automation", "Client-Facing Analytics"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Experience aligned with operational analytics, reporting, and insurance data workflows",
      keywordAlignment: "Strong match with keywords such as dashboards, reconciliation, BI tools, macros, and data automation. Limited on modeling or anomaly detection.",
      highMatchKeywords: ["reporting", "dashboard", "data analysis", "data validation", "BI tools"],
      partialMatchKeywords: ["automation", "workflow", "performance analysis"],
      contextRelevance: "Most roles directly involved end-to-end reporting cycles, with stakeholder deliverables in data-sensitive domains."
    }
  },
  {
    title: "Project Relevancy",
    score: 76,
    description: "No standalone projects listed, but professional roles involved repeated BI/reporting applications",
    icon: FileText,
    skills: ["Data Automation", "BI Integration", "Reconciliation"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "No standalone projects listed, but professional roles involved repeated BI/reporting applications",
      mostRelevantProjects: [
        {
          name: "Prudent Insurance – Assistant Manager",
          match: 82,
          description: "Built BI tools, macros, and reconciliation flows for premium tracking",
          technologies: ["Excel", "Power BI", "Macros"]
        },
        {
          name: "IMPACT Guru – MIS Dashboards",
          match: 75,
          description: "Generated zone-wise reports and created dashboards using Tableau",
          technologies: ["Tableau", "Google Sheets"]
        }
      ],
      impactAnalysis: "Strong real-world project execution under pressure. Projects are embedded in job experience rather than standalone showcases."
    }
  },
  {
    title: "Educational Background",
    score: 68,
    description: "Commerce and finance background supplemented with analytics certification",
    icon: GraduationCap,
    skills: ["MBA Finance", "B.Com", "Master in Data Science & Analytics"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Commerce and finance background supplemented with analytics certification",
      degrees: [
        {
          degree: "MBA in Finance",
          institution: null,
          period: null,
          match: "Moderate"
        },
        {
          degree: "B.Com",
          institution: "YCMOU",
          match: "Low Relevance"
        },
        {
          degree: "Master in Data Science & Analytics",
          institution: "It Vedant",
          period: "2023–2024",
          match: "Strong Add-on"
        }
      ],
      certifications: [
        { name: "Google Analytics" },
        { name: "Data Science Projects – Great Learning" }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 77,
    description: "Effective stakeholder engagement and client coordination with data-first mindset",
    icon: Users,
    skills: ["Client Communication", "Coordination", "Process Ownership"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Effective stakeholder engagement and client coordination with data-first mindset",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Stakeholder Coordination",
            score: 78,
            description: "Handled client-insurer coordination and escalations"
          },
          {
            skill: "Documentation",
            score: 76,
            description: "Maintained CD/client statements and premium workflows"
          }
        ],
        moderateEvidence: [
          {
            skill: "Initiative",
            score: 72,
            description: "Created macros and performance dashboards independently"
          },
          {
            skill: "Team Collaboration",
            score: 70,
            description: "Worked with TPAs, sales teams, and insurance vendors"
          }
        ]
      },
      evidenceSources: [
        {
          skill: "Client-Facing Analytics",
          evidence: "Coordinated with insurers and clients while maintaining accurate data records"
        }
      ],
      softSkillsPortfolio: [
        "Stakeholder Communication", "Initiative", "Process Ownership", "Documentation"
      ]
    }
  }
  ]
},

{
  id: 8,
  name: "Ajeenkiya D. Joshi",
  email: "ajeenkiyajoshi731@gmail.com",
  phone: "+91 – 9867954741",
  location: "Pune, India",
  jobTitle: "Data Analyst",
  overallScore: 92,
  scoringData: [
    {
    title: "Skill Match",
    score: 95,
    description: "Extensive experience with analytics, ETL, visualization, and real-time modeling",
    icon: Target,
    skills: ["Python", "SQL", "PL/SQL", "Power BI", "Tableau", "ETL", "Advanced Excel"],
    detailedAnalysis: {
      title: "Technical Skills Analysis",
      subtitle: "Strong alignment with full-stack data analyst expectations",
      matchedSkills: [
        "Python", "SQL", "PL/SQL", "Tableau", "Power BI", "Advanced Excel", "ETL",
        "Data Cleansing", "Data Modelling", "Data Mining", "Data Visualization",
        "ML Algorithms", "Debugging", "Process Improvement"
      ],
      visualizationTools: [
        { name: "Power BI", level: "Advanced" },
        { name: "Tableau", level: "Advanced" },
        { name: "Excel", level: "Advanced" }
      ],
      dataProcessingAndQuerying: [
        { name: "SQL", level: "Advanced" },
        { name: "Python (Pandas, PySpark)", level: "Advanced" }
      ],
      statisticalAndAnalyticalTools: [
        { name: "ML Algorithms", level: "Advanced" },
        { name: "Quantitative Analysis", level: "Advanced" }
      ]
    }
  },
  {
    title: "Semantic Scoring",
    score: 89,
    description: "Resume reflects deep real-world analytics use cases in fintech and product",
    icon: Brain,
    skills: ["Real-time Recommendations", "ETL Engineering", "Fraud Detection", "Scoring Models"],
    detailedAnalysis: {
      title: "Content Analysis",
      subtitle: "Resume reflects deep real-world analytics use cases in fintech and product",
      keywordAlignment: "Strong alignment across dashboarding, modeling, fraud detection, and stakeholder delivery. Keywords span BI tools, SQL pipelines, Python scripting, and ML deployment.",
      highMatchKeywords: ["ETL", "real-time modeling", "data visualization", "ML", "fraud analytics"],
      partialMatchKeywords: ["data-driven decisions", "reporting"],
      contextRelevance: "Projects, responsibilities, and output formats are closely tied to the analyst role at Ketto."
    }
  },
  {
    title: "Project Relevancy",
    score: 90,
    description: "Projects reflect scale, automation, and analytical depth for business insights",
    icon: FileText,
    skills: ["Portfolio Analytics", "KPI Engines", "Behavioral Modeling"],
    detailedAnalysis: {
      title: "Experience Analysis",
      subtitle: "Projects reflect scale, automation, and analytical depth for business insights",
      mostRelevantProjects: [
        {
          name: "Phrazor Formula Engine",
          match: 92,
          description: "Built data-agnostic KPI calculation tool with drill-down logic",
          technologies: ["Python", "Data Modeling"]
        },
        {
          name: "ETL Pipeline for Product Usage",
          match: 90,
          description: "Transformed 80 GB/week using PySpark and Redshift",
          technologies: ["PySpark", "AWS EMR", "SQL"]
        },
        {
          name: "Portfolio Recommendation System",
          match: 85,
          description: "Built big data pipeline for financial stocks and funds",
          technologies: ["ML", "Data Mining"]
        }
      ],
      impactAnalysis: "Project work exceeds typical data analyst scope and touches on data engineering, modeling, and KPI delivery at scale."
    }
  },
  {
    title: "Educational Background",
    score: 75,
    description: "Bachelor’s degree in IT, enhanced with elite certifications (Coursera, Google, Kaggle)",
    icon: GraduationCap,
    skills: ["BSc IT", "Coursera ML", "Google Data Analytics"],
    detailedAnalysis: {
      title: "Academic Qualifications",
      subtitle: "Bachelor’s degree in IT, enhanced with elite certifications",
      degrees: [
        {
          degree: "BSc in Information Technology",
          institution: "Mumbai University",
          period: "2018 – 2021",
          match: "Moderate"
        }
      ],
      certifications: [
        { name: "Machine Learning – Coursera" },
        { name: "Data Analytics – Google Professional Certificate" },
        { name: "Python – Kaggle" }
      ]
    }
  },
  {
    title: "Interpersonal Skills",
    score: 81,
    description: "Experience in product teams and consulting support indicates strong communication and execution",
    icon: Users,
    skills: ["Stakeholder Management", "Collaboration", "Debugging", "Problem Solving"],
    detailedAnalysis: {
      title: "Soft Skills Assessment",
      subtitle: "Experience in product teams and consulting support indicates strong communication and execution",
      identifiedSkills: {
        strongEvidence: [
          {
            skill: "Execution Under Pressure",
            score: 80,
            description: "Delivered ML, PD models, and scoring engines under high-impact consulting environments"
          },
          {
            skill: "Collaboration",
            score: 78,
            description: "Worked with global clients and internal teams across projects"
          }
        ],
        moderateEvidence: [
          {
            skill: "Initiative",
            score: 75,
            description: "Built in-house scoring models and custom KPIs"
          },
          {
            skill: "Debugging",
            score: 72,
            description: "Owned delivery and QA of analytics pipelines"
          }
        ]
      },
      evidenceSources: [
        {
          skill: "Project Delivery",
          evidence: "Led and delivered high-scale modeling and BI solutions to financial clients"
        }
      ],
      softSkillsPortfolio: [
        "Collaboration", "Execution", "Initiative", "Debugging", "Stakeholder Delivery"
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

const EmployerMessages_Two = () => {

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
                                      
                                      {/* {degree.coursework && (
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
                                      )} */}
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

export default EmployerMessages_Two;

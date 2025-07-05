import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import OverallMatchScore from "@/components/theCircle"; 
import {
  Download,
  Mail,
  Users,
  User,
  TrendingUp,
  Star,
  Award,
  BookOpen,
  Target,
  Briefcase,
  Brain,
  GraduationCap,
  FileText
} from "lucide-react";

interface Applicant {
  application_id: string;
  user_email: string;
  user_id: string;
  score_id: string;
  job_id: string;
  job_title: string;
  job_company: string;
  status: string;
  user_name: string;
}

interface CandidateData {
  name: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
}

interface EvaluationItem {
  title: string;
  score: number;
  description: string;
  icon: string;
  skills: string[];
  detailedAnalysis: Record<string, any>;
}

interface ScoreData {
  overallScore: number;
  candidateData: CandidateData;
  evaluation: EvaluationItem[];
}

interface ResumeEvaluation {
  _id: string;
  user_id: string;
  name: string;
  last_scored_at: string;
  score_data: ScoreData;
}

const iconMap: Record<string, JSX.Element> = {
  User: <User className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
};

const ApplicantsPage: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const { id } = useParams();
  const { toast } = useToast();

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [evaluation, setEvaluation] = useState<ResumeEvaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingEvaluation, setLoadingEvaluation] = useState(false);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-emerald-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-500";
  };

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return "bg-emerald-50 border-emerald-200";
    if (percentage >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const extractKeywordTiers = (item: EvaluationItem) => {
    const highMatch = item.detailedAnalysis?.highMatchKeywords || item.detailedAnalysis?.matchedSkills || [];
    const partialMatch = item.detailedAnalysis?.partialMatchKeywords || [];
    return { highMatch, partialMatch };
  };

  const getBadgeClass = (skill: string, highMatch: string[], partialMatch: string[]) => {
    let badgeClass = "border text-sm px-2 py-0.5 rounded-full";
    if (highMatch.includes(skill)) {
      badgeClass += " bg-green-100 text-green-800 border-green-300";
    } else if (partialMatch.includes(skill)) {
      badgeClass += " bg-yellow-100 text-yellow-800 border-yellow-300";
    } else {
      badgeClass += " bg-gray-100 text-gray-700 border-gray-300";
    }
    return badgeClass;
  };

  const getSkillLevel = (skill: string, detailedAnalysis: any) => {
    // Check if skill appears in different categories with level indicators
    const highMatch = detailedAnalysis?.highMatchKeywords || detailedAnalysis?.matchedSkills || [];
    const partialMatch = detailedAnalysis?.partialMatchKeywords || [];
    
    if (highMatch.includes(skill)) return "Advanced";
    if (partialMatch.includes(skill)) return "Intermediate";
    return "Basic";
  };

  const categorizeSkills = (skills: string[]) => {
    const frontend = [];
    const backend = [];
    const database = [];
    const other = [];

    const frontendKeywords = ['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'bootstrap', 'tailwind', 'sass', 'jquery', 'webpack', 'babel'];
    const backendKeywords = ['node', 'express', 'django', 'flask', 'spring', 'laravel', 'php', 'python', 'java', 'c#', 'ruby', 'go', 'rust'];
    const databaseKeywords = ['mongodb', 'mysql', 'postgresql', 'redis', 'sqlite', 'firebase', 'dynamodb', 'cassandra'];

    for (const skill of skills) {
      const skillLower = skill.toLowerCase();
      
      if (frontendKeywords.some(keyword => skillLower.includes(keyword))) {
        frontend.push(skill);
      } else if (backendKeywords.some(keyword => skillLower.includes(keyword))) {
        backend.push(skill);
      } else if (databaseKeywords.some(keyword => skillLower.includes(keyword))) {
        database.push(skill);
      } else {
        other.push(skill);
      }
    }

    return { frontend, backend, database, other };
  };

  const renderDetailedAnalysis = (item: EvaluationItem) => {
    const { detailedAnalysis } = item;
    
    if (item.title === "Skill Match" && detailedAnalysis?.matchedSkills) {
      const { frontend, backend, database, other } = categorizeSkills(detailedAnalysis.matchedSkills);

      return (
        <div className="mt-4 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-amber-600" />
              <h4 className="font-medium text-amber-800">{detailedAnalysis.title || "Technical Skills Analysis"}</h4>
            </div>
            <p className="text-sm text-amber-700 mb-4">{detailedAnalysis.subtitle || item.description}</p>
            
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Match Score</div>
              <Progress value={item.score} className="h-3" />
            </div>

            <div className="text-sm font-medium text-gray-700 mb-2">All Matched Skills</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {detailedAnalysis.matchedSkills?.map((skill: string) => (
                <Badge key={skill} className="bg-amber-100 text-amber-800 border-amber-300">
                  {skill}
                </Badge>
              ))}
            </div>

            {frontend.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium text-gray-800 mb-2">Frontend Technologies</h5>
                <div className="space-y-2">
                  {frontend.map((skill: string) => (
                    <div key={skill} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{skill}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {getSkillLevel(skill, detailedAnalysis)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {backend.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium text-gray-800 mb-2">Backend Technologies</h5>
                <div className="space-y-2">
                  {backend.map((skill: string) => (
                    <div key={skill} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{skill}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {getSkillLevel(skill, detailedAnalysis)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {database.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium text-gray-800 mb-2">Database & Storage</h5>
                <div className="space-y-2">
                  {database.map((skill: string) => (
                    <div key={skill} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">{skill}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {getSkillLevel(skill, detailedAnalysis)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {other.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Other Skills</h5>
                <div className="space-y-2">
                  {other.map((skill: string) => (
                    <div key={skill} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span className="text-sm">{skill}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {getSkillLevel(skill, detailedAnalysis)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (item.title === "Project Relevancy" && detailedAnalysis?.mostRelevantProjects) {
      return (
        <div className="mt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-3">{detailedAnalysis.title}</h4>
            <p className="text-sm text-blue-700 mb-4">{detailedAnalysis.subtitle}</p>
            
            <div className="space-y-3">
              {detailedAnalysis.mostRelevantProjects?.map((project: any, idx: number) => (
                <div key={idx} className="bg-white border border-blue-100 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-800">{project.name}</h5>
                    <Badge className="bg-blue-100 text-blue-800">{project.match}% match</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies?.map((tech: string) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (item.title === "Educational Background" && detailedAnalysis?.degrees) {
      return (
        <div className="mt-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-800 mb-3">{detailedAnalysis.title}</h4>
            <p className="text-sm text-purple-700 mb-4">{detailedAnalysis.subtitle}</p>
            
            <div className="space-y-3">
              {detailedAnalysis.degrees?.map((degree: any, idx: number) => (
                <div key={idx} className="bg-white border border-purple-100 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-800">{degree.degree}</h5>
                      <p className="text-sm text-gray-600">{degree.institution}</p>
                      <p className="text-xs text-gray-500">{degree.period}</p>
                    </div>
                    <Badge className={`${degree.match === 'High' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {degree.match} Match
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const fetchApplicants = async () => {
    try {
      const res = await fetch(`${API_URL}/applicants/${id}`);
      const data = await res.json();
      setApplicants(data.applicants);
      setJobTitle(data.job_title);
    } catch {
      toast({ title: "Error", description: "Failed to load applicants.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fetchEvaluation = async (applicant: Applicant) => {
    console.log("Fetching evaluation for applicant user ID:", applicant.user_id);
    console.log("Fetching evaluation for applicant job ID:", applicant.job_id);
    setSelectedApplicant(applicant);
    setLoadingEvaluation(true);
    try {
      const res = await fetch(`${API_URL}/score/user/${applicant.user_id}/${applicant.job_id}`);
      console.log("Evaluation fetch response:", res);
      const data = await res.json();
      console.log("Fetched evaluation:", data);
      setEvaluation(data && data.score_data ? data : null);
    } catch {
      setEvaluation(null);
    } finally {
      setLoadingEvaluation(false);
    }
  };

  const handleScoreEvaluation = async () => {
    if (!selectedApplicant) return;
    setLoadingEvaluation(true);
    try {
      const res = await fetch(`${API_URL}/score/${selectedApplicant.user_email}/${selectedApplicant.job_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Score evaluation response:", res);
      if (!res.ok) throw new Error("Failed to generate score.");
      await fetchEvaluation(selectedApplicant);
      toast({ title: "Success", description: "Evaluation generated successfully." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoadingEvaluation(false);
    }
  };

  useEffect(() => {
    if (id) fetchApplicants();
  }, [id]);

  return (
    <div className="h-screen flex">
      <div className="w-[300px] border-r overflow-y-auto bg-white shadow-sm">
        <Card className="border-none rounded-none h-full">
          <CardHeader className="bg-[#fcf7f2] border-b border-neutral-200">
            <CardTitle className="flex items-center gap-2 text-neutral-800">
              <Users className="w-5 h-5" /> Applicants ({applicants.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {applicants.map((applicant) => (
              <div
                key={applicant.application_id}
                className={`p-4 cursor-pointer hover:bg-orange-50 transition ${
                  selectedApplicant?.user_id === applicant.user_id
                    ? "bg-orange-100 border-l-4 border-orange-500"
                    : ""
                }`}
                onClick={() => fetchEvaluation(applicant)}
              >
                <div className="text-sm font-medium text-neutral-700">{applicant.user_name}</div>
                <div className="text-xs text-neutral-500 truncate">{applicant.user_email}</div>
                <Badge className="mt-2 bg-neutral-100 border border-neutral-300 text-xs text-neutral-600">
                  {applicant.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right Panel */}
      <div className="flex-1 overflow-y-auto p-6">
        {!selectedApplicant || loadingEvaluation || !evaluation ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500">
            {loadingEvaluation ? "Loading Evaluation..." : "Select a candidate to view evaluation."}
            {selectedApplicant && !loadingEvaluation && (
              <Button
                onClick={handleScoreEvaluation}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Score & Evaluate
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {evaluation.score_data.candidateData.name}
                </h2>
                <p className="text-sm text-neutral-600">{evaluation.score_data.candidateData.email}</p>
                <p className="text-sm text-neutral-500">{evaluation.score_data.candidateData.location}</p>
                <p className="text-sm text-neutral-700 font-medium">
                  Role: {evaluation.score_data.candidateData.jobTitle}
                </p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Download Resume
              </Button>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <div className="flex justify-center">
                <OverallMatchScore percentage={evaluation.score_data.overallScore} />
              </div>
            </div>

            {evaluation.score_data.evaluation.map((item, index) => {
              const percentage = Math.round(item.score);
              const { highMatch, partialMatch } = extractKeywordTiers(item);
              const iconElement = iconMap[item.icon] || <Target className="w-5 h-5" />;

              return (
                <div
                  key={`${item.title}-${index}`}
                  className={`rounded-xl border ${getScoreBg(percentage)} shadow-md p-5`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      {React.cloneElement(iconElement, { className: `w-5 h-5 ${getScoreColor(percentage)}` })}
                      <h3 className="font-semibold text-neutral-800">{item.title}</h3>
                    </div>
                    <div className={`text-lg font-bold ${getScoreColor(percentage)}`}>
                      {percentage}%
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">{item.description}</p>
                  <Progress value={percentage} className="h-2 my-3" />
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <Badge key={skill} className={getBadgeClass(skill, highMatch, partialMatch)}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  {renderDetailedAnalysis(item)}
                </div>
              );
            })}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-warmBrown-700 to-warmBrown-800 hover:from-warmBrown-800 hover:to-warmBrown-900 text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
              >
                Compare Candidates
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-warmBrown-600 text-warmBrown-700 hover:bg-brownBeige-50 px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
              >
                Add Notes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { useToast } from "@/hooks/use-toast";
// import OverallMatchScore from "@/components/theCircle"; 
// import {
//   Download,
//   Mail,
//   Users,
//   User,
//   TrendingUp,
//   Star,
//   Award,
//   BookOpen,
//   Target,
//   Briefcase,
//   Brain,
//   GraduationCap,
//   FileText
// } from "lucide-react";

// interface Applicant {
//   application_id: string;
//   user_email: string;
//   user_id: string;
//   score_id: string;
//   job_id: string;
//   job_title: string;
//   job_company: string;
//   status: string;
//   user_name: string;
// }

// interface CandidateData {
//   name: string;
//   email: string;
//   phone: string;
//   location: string;
//   jobTitle: string;
// }

// interface ProjectData {
//   name: string;
//   match: number;
//   description: string;
//   technologies: string[];
// }

// interface DegreeData {
//   degree: string;
//   institution: string;
//   period: string;
//   match: string;
// }

// interface DetailedAnalysis {
//   title: string;
//   subtitle: string;
//   matchedSkills?: string[];
//   highMatchKeywords?: string[];
//   partialMatchKeywords?: string[];
//   keywordAlignment?: string;
//   contextRelevance?: string;
//   experienceDepth?: string;
//   impactAssessment?: string;
//   mostRelevantProjects?: ProjectData[];
//   impactAnalysis?: string;
//   degrees?: DegreeData[];
//   certifications?: any[];
//   identifiedSkills?: {
//     strongEvidence: string[];
//     moderateEvidence: string[];
//   };
//   evidenceSources?: string[];
//   softSkillsPortfolio?: string[];
//   visualizationTools?: string[];
//   dataProcessingAndQuerying?: string[];
//   statisticalAndAnalyticalTools?: string[];
//   relevantExperiences?: string[];
// }

// interface EvaluationItem {
//   title: string;
//   score: number;
//   description: string;
//   icon: string;
//   skills: string[];
//   detailedAnalysis: DetailedAnalysis;
// }

// interface ScoreData {
//   overallScore: number;
//   candidateData: CandidateData;
//   evaluation: EvaluationItem[];
// }

// interface ResumeEvaluation {
//   _id: string;
//   user_id: string;
//   name: string;
//   last_scored_at: string;
//   score_data: ScoreData;
//   job_id: string;
//   user_email: string;
// }

// const iconMap: Record<string, JSX.Element> = {
//   User: <User className="w-5 h-5" />,
//   Mail: <Mail className="w-5 h-5" />,
//   Award: <Award className="w-5 h-5" />,
//   Briefcase: <Briefcase className="w-5 h-5" />,
//   Target: <Target className="w-5 h-5" />,
//   Brain: <Brain className="w-5 h-5" />,
//   GraduationCap: <GraduationCap className="w-5 h-5" />,
//   FileText: <FileText className="w-5 h-5" />,
//   Users: <Users className="w-5 h-5" />,
// };

// const ApplicantsPage: React.FC = () => {
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
//   const { id } = useParams();
//   const { toast } = useToast();

//   const [applicants, setApplicants] = useState<Applicant[]>([]);
//   const [jobTitle, setJobTitle] = useState("");
//   const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
//   const [evaluation, setEvaluation] = useState<ResumeEvaluation | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [loadingEvaluation, setLoadingEvaluation] = useState(false);

//   const getScoreColor = (percentage: number) => {
//     if (percentage >= 80) return "text-emerald-600";
//     if (percentage >= 60) return "text-yellow-600";
//     return "text-red-500";
//   };

//   const getScoreBg = (percentage: number) => {
//     if (percentage >= 80) return "bg-emerald-50 border-emerald-200";
//     if (percentage >= 60) return "bg-yellow-50 border-yellow-200";
//     return "bg-red-50 border-red-200";
//   };

//   const formatDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   const extractKeywordTiers = (item: EvaluationItem) => {
//     const highMatch = item.detailedAnalysis?.highMatchKeywords || item.detailedAnalysis?.matchedSkills || [];
//     const partialMatch = item.detailedAnalysis?.partialMatchKeywords || [];
//     return { highMatch, partialMatch };
//   };

//   const getBadgeClass = (skill: string, highMatch: string[], partialMatch: string[]) => {
//     let badgeClass = "border text-sm px-2 py-0.5 rounded-full";
//     if (highMatch.includes(skill)) {
//       badgeClass += " bg-green-100 text-green-800 border-green-300";
//     } else if (partialMatch.includes(skill)) {
//       badgeClass += " bg-yellow-100 text-yellow-800 border-yellow-300";
//     } else {
//       badgeClass += " bg-gray-100 text-gray-700 border-gray-300";
//     }
//     return badgeClass;
//   };

//   // Fetch applicants for the job posting
//   const fetchApplicants = async () => {
//     try {
//       const res = await fetch(`${API_URL}/applicants/${id}`);
//       const data = await res.json();
//       setApplicants(data.applicants);
//       setJobTitle(data.job_title);
//     } catch {
//       toast({ title: "Error", description: "Failed to load applicants.", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch evaluation for a specific applicant
//   const fetchEvaluation = async (applicant: Applicant) => {
//     console.log("Fetching evaluation for applicant user ID:", applicant.user_id);
//     console.log("Fetching evaluation for applicant job ID:", applicant.job_id);
//     setSelectedApplicant(applicant);
//     setLoadingEvaluation(true);
//     try {
//       const res = await fetch(`${API_URL}/score/user/${applicant.user_id}/${applicant.job_id}`);
//       console.log("Evaluation fetch response:", res);
//       const data = await res.json();
//       console.log("Fetched evaluation:", data);
//       setEvaluation(data && data.score_data ? data : null);
//     } catch {
//       setEvaluation(null);
//     } finally {
//       setLoadingEvaluation(false);
//     }
//   };

//   // Handle score evaluation for the selected applicant
//   const handleScoreEvaluation = async () => {
//     if (!selectedApplicant) return;
//     setLoadingEvaluation(true);
//     try {
//       const res = await fetch(`${API_URL}/score/${selectedApplicant.user_email}/${selectedApplicant.job_id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       console.log("Score evaluation response:", res);
//       if (!res.ok) throw new Error("Failed to generate score.");
//       await fetchEvaluation(selectedApplicant);
//       toast({ title: "Success", description: "Evaluation generated successfully." });
//     } catch (error: any) {
//       toast({ title: "Error", description: error.message, variant: "destructive" });
//     } finally {
//       setLoadingEvaluation(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchApplicants();
//   }, [id]);

//   const renderDetailedAnalysis = (item: EvaluationItem) => {
//     const analysis = item.detailedAnalysis;
    
//     return (
//       <div className="mt-4 space-y-3">
//         {/* Context and Analysis */}
//         {analysis.keywordAlignment && (
//           <div className="bg-white/50 p-3 rounded-lg">
//             <h5 className="font-medium text-neutral-700 mb-1">Analysis</h5>
//             <p className="text-sm text-neutral-600">{analysis.keywordAlignment}</p>
//           </div>
//         )}
        
//         {analysis.contextRelevance && (
//           <div className="bg-white/50 p-3 rounded-lg">
//             <h5 className="font-medium text-neutral-700 mb-1">Context Relevance</h5>
//             <p className="text-sm text-neutral-600">{analysis.contextRelevance}</p>
//           </div>
//         )}

//         {analysis.experienceDepth && (
//           <div className="bg-white/50 p-3 rounded-lg">
//             <h5 className="font-medium text-neutral-700 mb-1">Experience Assessment</h5>
//             <p className="text-sm text-neutral-600">{analysis.experienceDepth}</p>
//           </div>
//         )}

//         {analysis.impactAssessment && (
//           <div className="bg-white/50 p-3 rounded-lg">
//             <h5 className="font-medium text-neutral-700 mb-1">Impact Assessment</h5>
//             <p className="text-sm text-neutral-600">{analysis.impactAssessment}</p>
//           </div>
//         )}

//         {analysis.impactAnalysis && (
//           <div className="bg-white/50 p-3 rounded-lg">
//             <h5 className="font-medium text-neutral-700 mb-1">Impact Analysis</h5>
//             <p className="text-sm text-neutral-600">{analysis.impactAnalysis}</p>
//           </div>
//         )}

//         {/* Projects */}
//         {analysis.mostRelevantProjects && analysis.mostRelevantProjects.length > 0 && (
//           <div className="bg-white/50 p-3 rounded-lg">
//             <h5 className="font-medium text-neutral-700 mb-2">Most Relevant Projects</h5>
//             <div className="space-y-3">
//               {analysis.mostRelevantProjects.map((project, idx) => (
//                 <div key={idx} className="border border-neutral-200 rounded-lg p-3">
//                   <div className="flex justify-between items-start mb-2">
//                     <h6 className="font-medium text-neutral-800">{project.name}</h6>
//                     <Badge className="bg-blue-100 text-blue-800 border-blue-300">
//                       {project.match}% match
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-neutral-600 mb-2">{project.description}</p>
//                   <div className="flex flex-wrap gap-1">
//                     {project.technologies.map((tech) => (
//                       <Badge key={tech} className="bg-gray-100 text-gray-700 border-gray-300 text-xs">
//                         {tech}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Education */}
//         {analysis.degrees && analysis.degrees.length > 0 && (
//           <div className="bg-white/50 p-3 rounded-lg">
//             <h5 className="font-medium text-neutral-700 mb-2">Education</h5>
//             <div className="space-y-2">
//               {analysis.degrees.map((degree, idx) => (
//                 <div key={idx} className="border border-neutral-200 rounded-lg p-3">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h6 className="font-medium text-neutral-800">{degree.degree}</h6>
//                       <p className="text-sm text-neutral-600">{degree.institution}</p>
//                       <p className="text-xs text-neutral-500">{degree.period}</p>
//                     </div>
//                     <Badge className={`${degree.match === 'High' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300'}`}>
//                       {degree.match}
//                     </Badge>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Soft Skills Portfolio */}
//         {analysis.softSkillsPortfolio && analysis.softSkillsPortfolio.length > 0 && (
//           <div className="bg-white/50 p-3 rounded-lg">
//             <h5 className="font-medium text-neutral-700 mb-2">Soft Skills Portfolio</h5>
//             <div className="flex flex-wrap gap-2">
//               {analysis.softSkillsPortfolio.map((skill) => (
//                 <Badge key={skill} className="bg-purple-100 text-purple-800 border-purple-300">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="h-screen flex">
//       {/* Left Panel */}
//       <div className="w-[300px] border-r overflow-y-auto bg-white shadow-sm">
//         <Card className="border-none rounded-none h-full">
//           <CardHeader className="bg-[#fcf7f2] border-b border-neutral-200">
//             <CardTitle className="flex items-center gap-2 text-neutral-800">
//               <Users className="w-5 h-5" /> Applicants ({applicants.length})
//             </CardTitle>
//             <p className="text-sm text-neutral-600">{jobTitle}</p>
//           </CardHeader>
//           <CardContent className="p-0">
//             {applicants.map((applicant) => (
//               <div
//                 key={applicant.application_id}
//                 className={`p-4 cursor-pointer hover:bg-orange-50 transition ${
//                   selectedApplicant?.user_id === applicant.user_id
//                     ? "bg-orange-100 border-l-4 border-orange-500"
//                     : ""
//                 }`}
//                 onClick={() => fetchEvaluation(applicant)}
//               >
//                 <div className="text-sm font-medium text-neutral-700">{applicant.user_name}</div>
//                 <div className="text-xs text-neutral-500 truncate">{applicant.user_email}</div>
//                 <Badge className="mt-2 bg-neutral-100 border border-neutral-300 text-xs text-neutral-600">
//                   {applicant.status}
//                 </Badge>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Right Panel */}
//       <div className="flex-1 overflow-y-auto p-6">
//         {!selectedApplicant || loadingEvaluation || !evaluation ? (
//           <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500">
//             {loadingEvaluation ? "Loading Evaluation..." : "Select a candidate to view evaluation."}
//             {selectedApplicant && !loadingEvaluation && (
//               <Button
//                 onClick={handleScoreEvaluation}
//                 className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
//               >
//                 Score & Evaluate
//               </Button>
//             )}
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {/* Candidate Header */}
//             <div className="flex justify-between items-start">
//               <div className="space-y-2">
//                 <h2 className="text-2xl font-bold text-neutral-900">
//                   {evaluation.score_data.candidateData.name}
//                 </h2>
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2 text-sm text-neutral-600">
//                     <Mail className="w-4 h-4" />
//                     {evaluation.score_data.candidateData.email}
//                   </div>
//                   {evaluation.score_data.candidateData.phone && (
//                     <p className="text-sm text-neutral-600">📞 {evaluation.score_data.candidateData.phone}</p>
//                   )}
//                   <p className="text-sm text-neutral-500">📍 {evaluation.score_data.candidateData.location}</p>
//                   <p className="text-sm text-neutral-700 font-medium">
//                     🎯 {evaluation.score_data.candidateData.jobTitle}
//                   </p>
//                 </div>
//                 {evaluation.last_scored_at && (
//                   <p className="text-xs text-neutral-400">
//                     Last evaluated: {formatDate(evaluation.last_scored_at)}
//                   </p>
//                 )}
//               </div>
//               <Button variant="outline">
//                 <Download className="w-4 h-4 mr-2" /> Download Resume
//               </Button>
//             </div>

//             {/* Overall Score */}
//             <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
//               <div className="flex justify-center">
//                 <OverallMatchScore percentage={evaluation.score_data.overallScore} />
//               </div>
//             </div>

//             {/* Evaluation Sections */}
//             {evaluation.score_data.evaluation.map((item, index) => {
//               const percentage = Math.round(item.score);
//               const { highMatch, partialMatch } = extractKeywordTiers(item);
//               const iconElement = iconMap[item.icon] || <Target className="w-5 h-5" />;

//               return (
//                 <div
//                   key={`${item.title}-${index}`}
//                   className={`rounded-xl border ${getScoreBg(percentage)} shadow-md p-5`}
//                 >
//                   <div className="flex justify-between items-center mb-3">
//                     <div className="flex gap-3 items-center">
//                       {React.cloneElement(iconElement, { className: `w-5 h-5 ${getScoreColor(percentage)}` })}
//                       <h3 className="font-semibold text-neutral-800">{item.title}</h3>
//                     </div>
//                     <div className={`text-lg font-bold ${getScoreColor(percentage)}`}>
//                       {percentage}%
//                     </div>
//                   </div>
                  
//                   <p className="text-sm text-neutral-600 mb-3">{item.description}</p>
//                   <Progress value={percentage} className="h-2 mb-4" />
                  
//                   {/* Skills */}
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     {item.skills.map((skill) => (
//                       <Badge key={skill} className={getBadgeClass(skill, highMatch, partialMatch)}>
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>

//                   {/* Detailed Analysis */}
//                   {renderDetailedAnalysis(item)}
//                 </div>
//               );
//             })}

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button 
//                 size="lg" 
//                 className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
//               >
//                 Compare Candidates
//               </Button>
//               <Button 
//                 variant="outline" 
//                 size="lg"
//                 className="border-orange-600 text-orange-700 hover:bg-orange-50 px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
//               >
//                 Add Notes
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplicantsPage;


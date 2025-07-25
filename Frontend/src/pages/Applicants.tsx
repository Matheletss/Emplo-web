

import React, { useEffect, useState, useMemo } from "react";
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
  total_evaluation_score?: number | null; // added
}

interface CandidateData {
  name: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
}

interface ProjectData {
  name: string;
  match: number;
  description: string;
  technologies: string[];
}

interface DegreeData {
  degree: string;
  institution: string;
  period: string;
  match: string;
}

interface DetailedAnalysis {
  title: string;
  subtitle: string;
  matchedSkills?: string[];
  highMatchKeywords?: string[];
  partialMatchKeywords?: string[];
  keywordAlignment?: string;
  contextRelevance?: string;
  experienceDepth?: string;
  impactAssessment?: string;
  mostRelevantProjects?: ProjectData[];
  impactAnalysis?: string;
  degrees?: DegreeData[];
  certifications?: any[];
  identifiedSkills?: {
    strongEvidence: string[];
    moderateEvidence: string[];
  };
  evidenceSources?: string[];
  softSkillsPortfolio?: string[];
  visualizationTools?: string[];
  dataProcessingAndQuerying?: string[];
  statisticalAndAnalyticalTools?: string[];
  relevantExperiences?: string[];
}

interface EvaluationItem {
  title: string;
  score: number;
  description: string;
  icon: string;
  skills: string[];
  detailedAnalysis: DetailedAnalysis;
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
  job_id: string;
  user_email: string;
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
  Users: <Users className="w-5 h-5" />,
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

  // 🔍 Filter: top N candidates
  const [filterCount, setFilterCount] = useState<number | 'all'>('all');

  const displayedApplicants = useMemo(() => {
    const sorted = [...applicants].sort(
      (a, b) => (b.total_evaluation_score ?? -1) - (a.total_evaluation_score ?? -1)
    );
    if (filterCount === 'all') return sorted;
    return sorted.slice(0, filterCount);
  }, [applicants, filterCount]);

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

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
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

  // Fetch applicants for the job posting
  const fetchApplicants = async () => {
    try {
      const res = await fetch(`${API_URL}/applicants/${id}`);
      const data = await res.json();
      // After fetching applicants, also fetch their evaluation scores
      const fetchScoresForApplicants = async (appList: Applicant[]) => {
        const scored = await Promise.all(
          appList.map(async (app) => {
            try {
              const resScore = await fetch(`${API_URL}/score/user/${app.user_id}/${app.job_id}`);
              if (resScore.ok) {
                const scoreData = await resScore.json();
                const overall = scoreData?.score_data?.overallScore ?? null;
                return { ...app, total_evaluation_score: overall } as Applicant;
              }
            } catch {
              /* ignore */
            }
            return { ...app, total_evaluation_score: null } as Applicant;
          })
        );
        setApplicants(scored);
      };

      await fetchScoresForApplicants(data.applicants);
      setJobTitle(data.job_title);
    } catch {
      toast({ title: "Error", description: "Failed to load applicants.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch evaluation for a specific applicant
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

  // Handle score evaluation for the selected applicant
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

  const renderDetailedAnalysis = (item: EvaluationItem) => {
    const analysis = item.detailedAnalysis;
    
    return (
      <div className="mt-4 space-y-3">
        {/* Context and Analysis */}
        {analysis.keywordAlignment && (
          <div className="bg-white/50 p-3 rounded-lg">
            <h5 className="font-medium text-neutral-700 mb-1">Analysis</h5>
            <p className="text-sm text-neutral-600">{analysis.keywordAlignment}</p>
          </div>
        )}
        
        {analysis.contextRelevance && (
          <div className="bg-white/50 p-3 rounded-lg">
            <h5 className="font-medium text-neutral-700 mb-1">Context Relevance</h5>
            <p className="text-sm text-neutral-600">{analysis.contextRelevance}</p>
          </div>
        )}

        {analysis.experienceDepth && (
          <div className="bg-white/50 p-3 rounded-lg">
            <h5 className="font-medium text-neutral-700 mb-1">Experience Assessment</h5>
            <p className="text-sm text-neutral-600">{analysis.experienceDepth}</p>
          </div>
        )}

        {analysis.impactAssessment && (
          <div className="bg-white/50 p-3 rounded-lg">
            <h5 className="font-medium text-neutral-700 mb-1">Impact Assessment</h5>
            <p className="text-sm text-neutral-600">{analysis.impactAssessment}</p>
          </div>
        )}

        {analysis.impactAnalysis && (
          <div className="bg-white/50 p-3 rounded-lg">
            <h5 className="font-medium text-neutral-700 mb-1">Impact Analysis</h5>
            <p className="text-sm text-neutral-600">{analysis.impactAnalysis}</p>
          </div>
        )}

        {/* Projects */}
        {analysis.mostRelevantProjects && analysis.mostRelevantProjects.length > 0 && (
          <div className="bg-white/50 p-3 rounded-lg">
            <h5 className="font-medium text-neutral-700 mb-2">Most Relevant Projects</h5>
            <div className="space-y-3">
              {analysis.mostRelevantProjects.map((project, idx) => (
                <div key={idx} className="border border-neutral-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-medium text-neutral-800">{project.name}</h6>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                      {project.match}% match
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-600 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} className="bg-gray-100 text-gray-700 border-gray-300 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {analysis.degrees && analysis.degrees.length > 0 && (
          <div className="bg-white/50 p-3 rounded-lg">
            <h5 className="font-medium text-neutral-700 mb-2">Education</h5>
            <div className="space-y-2">
              {analysis.degrees.map((degree, idx) => (
                <div key={idx} className="border border-neutral-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h6 className="font-medium text-neutral-800">{degree.degree}</h6>
                      <p className="text-sm text-neutral-600">{degree.institution}</p>
                      <p className="text-xs text-neutral-500">{degree.period}</p>
                    </div>
                    <Badge className={`${degree.match === 'High' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300'}`}>
                      {degree.match}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills Portfolio */}
        {analysis.softSkillsPortfolio && analysis.softSkillsPortfolio.length > 0 && (
          <div className="bg-white/50 p-3 rounded-lg">
            <h5 className="font-medium text-neutral-700 mb-2">Soft Skills Portfolio</h5>
            <div className="flex flex-wrap gap-2">
              {analysis.softSkillsPortfolio.map((skill) => (
                <Badge key={skill} className="bg-purple-100 text-purple-800 border-purple-300">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex">
      {/* Left Panel */}
      <div className="w-[300px] border-r overflow-y-auto bg-white shadow-sm">
        <Card className="border-none rounded-none h-full">
          <CardHeader className="bg-[#fcf7f2] border-b border-neutral-200">
            <CardTitle className="flex items-center gap-2 text-neutral-800">
              <Users className="w-5 h-5" /> Applicants ({displayedApplicants.length})
            </CardTitle>
            <p className="text-sm text-neutral-600">{jobTitle}</p>
            {/* Filter Controls */}
            <div className="mt-2 flex items-center gap-2">
              <select
                className="border border-neutral-300 rounded text-xs px-2 py-1"
                value={filterCount}
                onChange={(e) => {
                  const val = e.target.value;
                  setFilterCount(val === 'all' ? 'all' : Number(val));
                }}
              >
                <option value="all">All</option>
                <option value={10}>Top 10</option>
                <option value={25}>Top 25</option>
                <option value={50}>Top 50</option>
                <option value={100}>Top 100</option>
              </select>
              <input
                type="number"
                min={1}
                placeholder="Custom"
                className="w-16 border border-neutral-300 rounded text-xs px-2 py-1"
                value={typeof filterCount === 'number' ? filterCount : ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    setFilterCount(val);
                  } else if (e.target.value === '') {
                    setFilterCount('all');
                  }
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {displayedApplicants.map((applicant) => (
              <div
                key={applicant.application_id}
                className={`p-4 cursor-pointer hover:bg-orange-50 transition ${
                  selectedApplicant?.user_id === applicant.user_id
                    ? "bg-orange-100 border-l-4 border-orange-500"
                    : ""
                }`}
                onClick={() => fetchEvaluation(applicant)}
              >
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-neutral-700">{applicant.user_name}</div>
                    {typeof applicant.total_evaluation_score === 'number' && (
                      <span
                        className={`text-xs font-semibold rounded-full border px-2 py-0.5 ${
                          applicant.total_evaluation_score >= 80
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                            : applicant.total_evaluation_score >= 60
                            ? 'bg-yellow-50 border-yellow-200 text-yellow-600'
                            : 'bg-red-50 border-red-200 text-red-500'
                        }`}
                      >
                        {applicant.total_evaluation_score}
                      </span>
                    )}
                  </div>
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
            {/* Candidate Header */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-neutral-900">
                  {evaluation.score_data.candidateData.name}
                </h2>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Mail className="w-4 h-4" />
                    {evaluation.score_data.candidateData.email}
                  </div>
                  {evaluation.score_data.candidateData.phone && (
                    <p className="text-sm text-neutral-600">📞 {evaluation.score_data.candidateData.phone}</p>
                  )}
                  <p className="text-sm text-neutral-500">📍 {evaluation.score_data.candidateData.location}</p>
                  <p className="text-sm text-neutral-700 font-medium">
                    🎯 {evaluation.score_data.candidateData.jobTitle}
                  </p>
                </div>
                {evaluation.last_scored_at && (
                  <p className="text-xs text-neutral-400">
                    Last evaluated: {formatDate(evaluation.last_scored_at)}
                  </p>
                )}
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Download Resume
              </Button>
            </div>

            {/* Overall Score */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <div className="flex justify-center">
                <OverallMatchScore percentage={evaluation.score_data.overallScore} />
              </div>
            </div>

            {/* Evaluation Sections */}
            {evaluation.score_data.evaluation.map((item, index) => {
              const percentage = Math.round(item.score);
              const { highMatch, partialMatch } = extractKeywordTiers(item);
              const iconElement = iconMap[item.icon] || <Target className="w-5 h-5" />;

              return (
                <div
                  key={`${item.title}-${index}`}
                  className={`rounded-xl border ${getScoreBg(percentage)} shadow-md p-5`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-3 items-center">
                      {React.cloneElement(iconElement, { className: `w-5 h-5 ${getScoreColor(percentage)}` })}
                      <h3 className="font-semibold text-neutral-800">{item.title}</h3>
                    </div>
                    <div className={`text-lg font-bold ${getScoreColor(percentage)}`}>
                      {percentage}%
                    </div>
                  </div>
                  
                  <p className="text-sm text-neutral-600 mb-3">{item.description}</p>
                  <Progress value={percentage} className="h-2 mb-4" />
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.skills.map((skill) => (
                      <Badge key={skill} className={getBadgeClass(skill, highMatch, partialMatch)}>
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Detailed Analysis */}
                  {renderDetailedAnalysis(item)}
                </div>
              );
            })}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
              >
                Compare Candidates
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-orange-600 text-orange-700 hover:bg-orange-50 px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
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


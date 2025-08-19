import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Share2, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import ResultsRadarChart from "@/components/assessment/ResultsRadarChart";
import { AssessmentResults } from "@/types/assessment";
import { toast } from "@/hooks/use-toast";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results);
    } else {
      // If no results in state, redirect to home
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!results) {
    return <div>Loading...</div>;
  }

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'Yes':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'Maybe':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      case 'No':
        return <XCircle className="w-8 h-8 text-red-500" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'Yes':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Maybe':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'No':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Assessment results link copied to clipboard.",
    });
  };

  const skillMappings = [
    { skill: "Python/JavaScript", required: "High", current: results.technical_readiness > 70 ? "High" : results.technical_readiness > 40 ? "Medium" : "Low" },
    { skill: "AI Concepts (ML, NLP)", required: "Medium", current: results.wiscar.skill > 70 ? "High" : results.wiscar.skill > 40 ? "Medium" : "Low" },
    { skill: "RPA Tools", required: "Medium", current: results.technical_readiness > 60 ? "Medium" : "Low" },
    { skill: "Process Analysis", required: "High", current: results.wiscar.cognitive > 70 ? "High" : results.wiscar.cognitive > 40 ? "Medium" : "Low" },
    { skill: "Communication", required: "Medium", current: results.wiscar.real_world > 60 ? "High" : "Medium" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <Card className="p-6 mb-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Overall Recommendation */}
          <Card className="p-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
            <div className="text-center space-y-6">
              <div>
                {getRecommendationIcon()}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {results.recommendation === 'Yes' && "You Should Pursue This Career!"}
                  {results.recommendation === 'Maybe' && "You Have Potential With Some Development"}
                  {results.recommendation === 'No' && "Consider Alternative Paths"}
                </h1>
                <p className="text-muted-foreground">
                  AI Automation Specialist Assessment Results
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Confidence Score</span>
                    <span>{results.overall_confidence}%</span>
                  </div>
                  <Progress value={results.overall_confidence} className="h-3" />
                </div>
                <Badge className={`text-lg px-4 py-2 ${getRecommendationColor()}`}>
                  {results.recommendation}
                </Badge>
              </div>
            </div>
          </Card>

          {/* WISCAR Radar Chart */}
          <Card className="p-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-6 text-center">WISCAR Framework Analysis</h2>
            <ResultsRadarChart data={results.wiscar} />
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Your readiness across six key dimensions</p>
            </div>
          </Card>
        </div>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 card-shadow border-border bg-card/80 backdrop-blur-sm">
            <h3 className="font-semibold mb-4">Psychometric Fit</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Interest & Personality Alignment</span>
                <span>{results.psychometric_fit}%</span>
              </div>
              <Progress value={results.psychometric_fit} className="h-2" />
            </div>
          </Card>

          <Card className="p-6 card-shadow border-border bg-card/80 backdrop-blur-sm">
            <h3 className="font-semibold mb-4">Technical Readiness</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current Technical Knowledge</span>
                <span>{results.technical_readiness}%</span>
              </div>
              <Progress value={results.technical_readiness} className="h-2" />
            </div>
          </Card>

          <Card className="p-6 card-shadow border-border bg-card/80 backdrop-blur-sm">
            <h3 className="font-semibold mb-4">Learning Ability</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Adaptability & Growth Mindset</span>
                <span>{results.wiscar.ability_to_learn}%</span>
              </div>
              <Progress value={results.wiscar.ability_to_learn} className="h-2" />
            </div>
          </Card>
        </div>

        {/* WISCAR Breakdown */}
        <Card className="p-8 mb-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-6">WISCAR Dimension Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(results.wiscar).map(([dimension, score]) => (
              <div key={dimension} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize font-medium">
                    {dimension.replace('_', ' ')}
                  </span>
                  <span>{score}%</span>
                </div>
                <Progress value={score} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {dimension === 'will' && 'Motivation and persistence for AI automation work'}
                  {dimension === 'interest' && 'Genuine curiosity about automation and AI technologies'}
                  {dimension === 'skill' && 'Current technical and analytical capabilities'}
                  {dimension === 'cognitive' && 'Problem-solving and process-oriented thinking'}
                  {dimension === 'ability_to_learn' && 'Openness to feedback and continuous learning'}
                  {dimension === 'real_world' && 'Understanding of practical business applications'}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Skill Mapping */}
        <Card className="p-8 mb-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-6">Skill Gap Analysis</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4">Skill Area</th>
                  <th className="text-left py-3 px-4">Required Level</th>
                  <th className="text-left py-3 px-4">Your Level</th>
                  <th className="text-left py-3 px-4">Gap</th>
                </tr>
              </thead>
              <tbody>
                {skillMappings.map((skill, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{skill.skill}</td>
                    <td className="py-3 px-4">{skill.required}</td>
                    <td className="py-3 px-4">{skill.current}</td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        skill.required === skill.current ? "default" : 
                        (skill.required === "High" && skill.current === "Medium") ? "secondary" : 
                        "destructive"
                      }>
                        {skill.required === skill.current ? "None" : 
                         (skill.required === "High" && skill.current === "Medium") ? "Small" : 
                         "Significant"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-6">Recommended Next Steps</h2>
          <div className="space-y-4">
            {results.next_steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg border border-border/50">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Career Paths */}
        <Card className="p-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-6">Related Career Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "AI Automation Specialist", match: results.overall_confidence },
              { title: "RPA Developer", match: Math.min(results.technical_readiness + 10, 100) },
              { title: "Business Process Analyst", match: results.wiscar.real_world },
              { title: "AI Integration Engineer", match: results.technical_readiness },
              { title: "Workflow Automation Consultant", match: (results.wiscar.cognitive + results.wiscar.real_world) / 2 },
              { title: "Intelligent Process Designer", match: (results.psychometric_fit + results.wiscar.skill) / 2 }
            ].map((career, index) => (
              <div key={index} className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                <h3 className="font-medium mb-2">{career.title}</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span>Match</span>
                  <span>{Math.round(career.match)}%</span>
                </div>
                <Progress value={career.match} className="h-1" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
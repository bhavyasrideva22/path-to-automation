import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, Users, ArrowRight, CheckCircle, Clock, Award } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Psychometric Analysis",
      description: "Assess personality traits, interests, and cognitive style alignment"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Technical Aptitude",
      description: "Evaluate current skills and learning readiness for AI automation"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Comprehensive analysis across 6 key career readiness dimensions"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Personalized Guidance",
      description: "Tailored recommendations and learning paths based on your profile"
    }
  ];

  const careerPaths = [
    "AI Automation Specialist",
    "RPA Developer", 
    "Intelligent Process Automation Engineer",
    "Business Automation Analyst",
    "AI Workflow Architect"
  ];

  const keySkills = [
    "Analytical thinking & problem solving",
    "AI tools & API integration",
    "Process-oriented mindset",
    "Adaptability for evolving tech",
    "Collaborative communication"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              Career Assessment
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Should I Become an
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Automation Specialist?
            </h2>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover if your interests, personality, cognitive abilities, and technical foundation align 
            with a career designing and implementing AI-driven automation workflows.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/assessment')}
              className="text-lg px-8 py-6 glow-effect transition-smooth bg-gradient-to-r from-primary to-primary-glow hover:scale-105"
            >
              Start Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>20-30 minutes</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 card-shadow border-border bg-card/80 backdrop-blur-sm hover:scale-105 transition-smooth">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* About the Role */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="p-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-accent" />
              About AI Automation Specialist
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                AI Automation Specialists design, implement, and manage AI-driven automation 
                workflows that transform business processes. This role combines software engineering, 
                process analysis, and AI integration expertise.
              </p>
              <p>
                You'll work with cutting-edge technologies like robotic process automation (RPA), 
                machine learning pipelines, NLP-powered chatbots, and intelligent decision systems 
                to create scalable automation solutions.
              </p>
            </div>
            
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-foreground">Typical Career Paths:</h3>
              <div className="space-y-2">
                {careerPaths.map((path, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>{path}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-primary" />
              Key Skills & Traits
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Success in AI automation requires a unique blend of technical expertise, 
                analytical thinking, and business acumen. Our assessment evaluates your 
                natural alignment with these critical competencies.
              </p>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Essential Competencies:</h3>
                <div className="space-y-2">
                  {keySkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-accent-foreground">
                <strong>Perfect for:</strong> Analytical problem-solvers who love optimizing 
                processes and working with emerging AI technologies to create practical business solutions.
              </p>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="p-8 text-center card-shadow border-border bg-card/80 backdrop-blur-sm">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Ready to Discover Your Potential?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take our comprehensive assessment to receive personalized insights, skill gap analysis, 
              and tailored learning recommendations for your AI automation career journey.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/assessment')}
              className="text-lg px-8 py-6 glow-effect transition-bounce bg-gradient-to-r from-primary to-primary-glow hover:scale-105"
            >
              Begin Your Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import QuestionCard from "@/components/assessment/QuestionCard";
import { assessmentQuestions } from "@/data/questions";
import { Answer, AssessmentState } from "@/types/assessment";
import { calculateResults } from "@/utils/scoring";

export default function Assessment() {
  const navigate = useNavigate();
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentQuestion: 0,
    answers: [],
    isComplete: false
  });

  const currentQuestion = assessmentQuestions[assessmentState.currentQuestion];
  const progress = ((assessmentState.currentQuestion + 1) / assessmentQuestions.length) * 100;
  const currentAnswer = assessmentState.answers.find(a => a.questionId === currentQuestion?.id);

  const handleAnswer = (value: number) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value,
      selectedOption: currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'scenario' 
        ? currentQuestion.options?.[value] 
        : undefined
    };

    setAssessmentState(prev => ({
      ...prev,
      answers: [
        ...prev.answers.filter(a => a.questionId !== currentQuestion.id),
        newAnswer
      ]
    }));
  };

  const handleNext = () => {
    if (assessmentState.currentQuestion < assessmentQuestions.length - 1) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      // Complete assessment and calculate results
      const results = calculateResults(assessmentState.answers);
      
      setAssessmentState(prev => ({
        ...prev,
        isComplete: true,
        results
      }));

      // Navigate to results page with data
      navigate('/results', { state: { results } });
    }
  };

  const handlePrevious = () => {
    if (assessmentState.currentQuestion > 0) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  const canProceed = currentAnswer !== undefined;
  const isLastQuestion = assessmentState.currentQuestion === assessmentQuestions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <Card className="p-6 mb-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit Assessment
            </Button>
            <div className="text-sm text-muted-foreground">
              Question {assessmentState.currentQuestion + 1} of {assessmentQuestions.length}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </Card>

        {/* Question */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentValue={currentAnswer?.value}
          />
        </div>

        {/* Navigation */}
        <Card className="p-6 card-shadow border-border bg-card/80 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={assessmentState.currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                {currentQuestion.category === 'psychometric' && 'Psychometric Assessment'}
                {currentQuestion.category === 'technical' && 'Technical Assessment'}
                {currentQuestion.category === 'wiscar' && 'WISCAR Framework'}
              </p>
              {currentQuestion.dimension && (
                <p className="text-xs text-muted-foreground capitalize">
                  {currentQuestion.dimension.replace('_', ' ')} dimension
                </p>
              )}
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2 glow-effect transition-smooth"
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/assessment";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: number) => void;
  currentValue?: number;
}

export default function QuestionCard({ question, onAnswer, currentValue }: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<number>(currentValue || 0);

  const handleAnswer = (value: number) => {
    setSelectedValue(value);
    onAnswer(value);
  };

  if (question.type === 'likert') {
    return (
      <Card className="p-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              {question.question}
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
            <RadioGroup 
              value={selectedValue.toString()} 
              onValueChange={(value) => handleAnswer(parseInt(value))}
              className="flex justify-between"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center space-y-2">
                  <RadioGroupItem 
                    value={value.toString()} 
                    id={`option-${value}`}
                    className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label 
                    htmlFor={`option-${value}`} 
                    className="text-sm font-medium cursor-pointer"
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </Card>
    );
  }

  if (question.type === 'multiple-choice' || question.type === 'scenario') {
    return (
      <Card className="p-8 card-shadow border-border bg-card/80 backdrop-blur-sm">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              {question.question}
            </h3>
            {question.scenario && (
              <div className="p-4 bg-secondary/50 rounded-lg border border-border mb-6">
                <p className="text-sm text-muted-foreground italic">
                  Scenario: {question.scenario}
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant={selectedValue === index ? "default" : "outline"}
                className={cn(
                  "w-full text-left justify-start h-auto p-4 transition-smooth",
                  selectedValue === index 
                    ? "bg-primary text-primary-foreground glow-effect" 
                    : "hover:bg-secondary/50"
                )}
                onClick={() => handleAnswer(index)}
              >
                <span className="text-sm leading-relaxed">{option}</span>
              </Button>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return null;
}
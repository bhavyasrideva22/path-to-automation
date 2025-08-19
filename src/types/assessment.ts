export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  dimension?: 'will' | 'interest' | 'skill' | 'cognitive' | 'ability_to_learn' | 'real_world';
  question: string;
  options?: string[];
  scenario?: string;
}

export interface Answer {
  questionId: string;
  value: number;
  selectedOption?: string;
}

export interface AssessmentResults {
  psychometric_fit: number;
  technical_readiness: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability_to_learn: number;
    real_world: number;
  };
  overall_confidence: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  next_steps: string[];
}

export interface AssessmentState {
  currentQuestion: number;
  answers: Answer[];
  isComplete: boolean;
  results?: AssessmentResults;
}
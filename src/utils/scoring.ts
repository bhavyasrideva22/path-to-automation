import { Answer, AssessmentResults } from "@/types/assessment";
import { assessmentQuestions } from "@/data/questions";

export function calculateResults(answers: Answer[]): AssessmentResults {
  // Create answer map for easy lookup
  const answerMap = new Map(answers.map(a => [a.questionId, a]));
  
  // Initialize dimension scores
  const dimensionScores = {
    will: 0,
    interest: 0, 
    skill: 0,
    cognitive: 0,
    ability_to_learn: 0,
    real_world: 0
  };
  
  const dimensionCounts = {
    will: 0,
    interest: 0,
    skill: 0, 
    cognitive: 0,
    ability_to_learn: 0,
    real_world: 0
  };
  
  let psychometricScore = 0;
  let psychometricCount = 0;
  let technicalScore = 0;
  let technicalCount = 0;
  
  // Process each question and its answer
  assessmentQuestions.forEach(question => {
    const answer = answerMap.get(question.id);
    if (!answer) return;
    
    let score = 0;
    
    // Convert answer to score based on question type
    if (question.type === 'likert') {
      score = (answer.value / 5) * 100; // Convert 1-5 scale to 0-100
    } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
      // For MC questions, we'll use predefined scoring
      score = calculateMultipleChoiceScore(question.id, answer.value);
    }
    
    // Add to category totals
    if (question.category === 'psychometric') {
      psychometricScore += score;
      psychometricCount++;
    } else if (question.category === 'technical') {
      technicalScore += score;
      technicalCount++;
    }
    
    // Add to dimension totals (WISCAR framework)
    if (question.dimension) {
      dimensionScores[question.dimension] += score;
      dimensionCounts[question.dimension]++;
    }
  });
  
  // Calculate averages
  const psychometric_fit = psychometricCount > 0 ? psychometricScore / psychometricCount : 0;
  const technical_readiness = technicalCount > 0 ? technicalScore / technicalCount : 0;
  
  // Calculate WISCAR dimension averages
  const wiscar = {
    will: dimensionCounts.will > 0 ? dimensionScores.will / dimensionCounts.will : 0,
    interest: dimensionCounts.interest > 0 ? dimensionScores.interest / dimensionCounts.interest : 0,
    skill: dimensionCounts.skill > 0 ? dimensionScores.skill / dimensionCounts.skill : 0,
    cognitive: dimensionCounts.cognitive > 0 ? dimensionScores.cognitive / dimensionCounts.cognitive : 0,
    ability_to_learn: dimensionCounts.ability_to_learn > 0 ? dimensionScores.ability_to_learn / dimensionCounts.ability_to_learn : 0,
    real_world: dimensionCounts.real_world > 0 ? dimensionScores.real_world / dimensionCounts.real_world : 0
  };
  
  // Calculate overall confidence score
  const wiscarAverage = Object.values(wiscar).reduce((sum, score) => sum + score, 0) / 6;
  const overall_confidence = Math.round((psychometric_fit + technical_readiness + wiscarAverage) / 3);
  
  // Determine recommendation
  let recommendation: 'Yes' | 'Maybe' | 'No';
  if (overall_confidence >= 75) {
    recommendation = 'Yes';
  } else if (overall_confidence >= 55) {
    recommendation = 'Maybe';
  } else {
    recommendation = 'No';
  }
  
  // Generate next steps based on results
  const next_steps = generateNextSteps(recommendation, wiscar, technical_readiness);
  
  return {
    psychometric_fit: Math.round(psychometric_fit),
    technical_readiness: Math.round(technical_readiness),
    wiscar: {
      will: Math.round(wiscar.will),
      interest: Math.round(wiscar.interest), 
      skill: Math.round(wiscar.skill),
      cognitive: Math.round(wiscar.cognitive),
      ability_to_learn: Math.round(wiscar.ability_to_learn),
      real_world: Math.round(wiscar.real_world)
    },
    overall_confidence,
    recommendation,
    next_steps
  };
}

function calculateMultipleChoiceScore(questionId: string, optionIndex: number): number {
  // Scoring logic for specific multiple choice questions
  const scoring: Record<string, number[]> = {
    'psych_3': [100, 25, 50, 25], // AI chatbot = highest score
    'psych_5': [100, 60, 20, 75], // Immediate research = highest
    'tech_1': [100, 25, 25, 25], // RPA benefits = correct answer
    'tech_2': [100, 25, 25, 25], // NLP classification = correct 
    'tech_3': [100, 40, 60, 30], // Process mapping first = best approach
    'tech_4': [100, 25, 25, 25], // requests library = correct
    'wiscar_1': [100, 75, 25, 80], // Time reduction analysis
    'wiscar_4': [100, 60, 40, 30], // Change management = critical
    'wiscar_5': [100, 60, 25, 40]  // Redesign approach = best
  };
  
  return scoring[questionId]?.[optionIndex] || 50; // Default to middle score
}

function generateNextSteps(recommendation: string, wiscar: any, technical: number): string[] {
  const steps: string[] = [];
  
  if (recommendation === 'Yes') {
    steps.push("Start with foundational courses in Python programming and RPA tools");
    steps.push("Build your first automation project using UiPath or Automation Anywhere");
    steps.push("Explore AI/ML APIs and integration patterns");
    if (wiscar.real_world < 70) {
      steps.push("Focus on change management and business process analysis skills");
    }
  } else if (recommendation === 'Maybe') {
    if (technical < 60) {
      steps.push("Strengthen technical foundations with programming basics");
      steps.push("Complete introductory courses in AI and machine learning concepts");
    }
    if (wiscar.cognitive < 60) {
      steps.push("Practice process mapping and logical thinking exercises");
    }
    if (wiscar.will < 60) {
      steps.push("Start with smaller automation projects to build confidence");
    }
    steps.push("Consider related roles like Business Process Analyst while building skills");
  } else {
    steps.push("Explore related fields like Data Analysis or Business Analysis");
    steps.push("Build foundational technical skills before revisiting AI automation");
    steps.push("Consider roles that leverage your existing strengths");
  }
  
  return steps;
}
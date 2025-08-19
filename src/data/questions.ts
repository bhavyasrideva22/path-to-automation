import { Question } from "@/types/assessment";

export const assessmentQuestions: Question[] = [
  // Psychometric Questions (Interest & Personality)
  {
    id: "psych_1",
    type: "likert",
    category: "psychometric",
    dimension: "interest",
    question: "I enjoy designing repeatable automated workflows that solve complex business problems."
  },
  {
    id: "psych_2", 
    type: "likert",
    category: "psychometric",
    dimension: "will",
    question: "I am willing to spend hours debugging and perfecting an automation process until it works flawlessly."
  },
  {
    id: "psych_3",
    type: "multiple-choice",
    category: "psychometric", 
    dimension: "interest",
    question: "Which task would you find most engaging?",
    options: [
      "Building an AI chatbot that handles customer inquiries automatically",
      "Creating detailed project documentation and user manuals", 
      "Leading team meetings and strategic planning sessions",
      "Designing user interfaces and visual experiences"
    ]
  },
  {
    id: "psych_4",
    type: "likert",
    category: "psychometric",
    dimension: "will",
    question: "I persist through technical challenges even when initial solutions don't work as expected."
  },
  {
    id: "psych_5",
    type: "scenario",
    category: "psychometric",
    dimension: "ability_to_learn",
    question: "A new AI automation tool is released that could significantly improve your workflow efficiency. What's your typical response?",
    scenario: "You're currently comfortable with your existing tools and processes.",
    options: [
      "Immediately research and experiment with the new tool",
      "Wait for training or guidance from your organization", 
      "Stick with current tools unless forced to change",
      "Ask colleagues about their experiences first"
    ]
  },

  // Technical & Aptitude Questions
  {
    id: "tech_1",
    type: "multiple-choice",
    category: "technical",
    question: "What is the primary benefit of using RPA (Robotic Process Automation) in business?",
    options: [
      "Reducing human error and increasing processing speed for repetitive tasks",
      "Creating more engaging user interfaces",
      "Improving team communication and collaboration",
      "Generating creative content and marketing materials"
    ]
  },
  {
    id: "tech_2",
    type: "multiple-choice", 
    category: "technical",
    question: "Which AI technique would be most appropriate for automatically classifying incoming customer emails?",
    options: [
      "Natural Language Processing (NLP) with text classification",
      "Computer vision and image recognition",
      "Genetic algorithms and optimization",
      "Reinforcement learning and game theory"
    ]
  },
  {
    id: "tech_3",
    type: "scenario",
    category: "technical",
    dimension: "cognitive",
    question: "You need to automate a process where data flows between 5 different software systems. What's your first step?",
    scenario: "Each system has different data formats and API limitations.",
    options: [
      "Map out the entire data flow and identify integration points",
      "Start coding connections between the first two systems",
      "Research the most popular automation tools",
      "Ask stakeholders to simplify the process requirements"
    ]
  },
  {
    id: "tech_4",
    type: "multiple-choice",
    category: "technical", 
    question: "In Python, which library would you primarily use for API integrations in automation workflows?",
    options: [
      "requests",
      "matplotlib", 
      "numpy",
      "tkinter"
    ]
  },
  {
    id: "tech_5",
    type: "likert",
    category: "technical",
    dimension: "skill",
    question: "I understand how to design and implement machine learning pipelines for business automation."
  },

  // WISCAR Framework Questions
  {
    id: "wiscar_1",
    type: "scenario",
    category: "wiscar",
    dimension: "real_world", 
    question: "A company wants to automate their invoice processing that currently takes 40 hours per week. How would you evaluate success?",
    scenario: "The automation reduces processing time to 5 hours per week but requires 2 hours of weekly maintenance.",
    options: [
      "Excellent: 87.5% time reduction with minimal ongoing effort",
      "Good: Significant time savings but maintenance is concerning", 
      "Poor: Any maintenance time makes automation ineffective",
      "Need more data: Customer satisfaction and error rates matter more"
    ]
  },
  {
    id: "wiscar_2",
    type: "likert",
    category: "wiscar",
    dimension: "cognitive",
    question: "I can break down complex business processes into logical, sequential steps for automation."
  },
  {
    id: "wiscar_3",
    type: "likert",
    category: "wiscar", 
    dimension: "ability_to_learn",
    question: "I actively seek feedback on my automation solutions and enjoy iterating based on user input."
  },
  {
    id: "wiscar_4",
    type: "multiple-choice",
    category: "wiscar",
    dimension: "real_world",
    question: "When implementing AI automation, what's the most critical factor for long-term success?",
    options: [
      "Change management and user adoption strategy",
      "Choosing the most advanced AI technology available",
      "Minimizing implementation costs",
      "Completing the project as quickly as possible"
    ]
  },
  {
    id: "wiscar_5",
    type: "scenario",
    category: "wiscar",
    dimension: "will",
    question: "An automation project you built is failing after 6 months due to changing business requirements. What's your approach?",
    scenario: "The original solution worked perfectly but new compliance rules have emerged.",
    options: [
      "Redesign the automation to accommodate new requirements",
      "Recommend returning to manual processes temporarily",
      "Suggest the business revert to old requirements", 
      "Hand off the problem to another team member"
    ]
  }
];

export const questionsByCategory = {
  psychometric: assessmentQuestions.filter(q => q.category === 'psychometric'),
  technical: assessmentQuestions.filter(q => q.category === 'technical'), 
  wiscar: assessmentQuestions.filter(q => q.category === 'wiscar')
};
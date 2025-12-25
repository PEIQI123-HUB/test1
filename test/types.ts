
export enum QuestionType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  BOOLEAN = 'BOOLEAN'
}

export enum Category {
  MARKET = '市场趋势',
  PRODUCT = '产品应用',
  OPTIMIZATION = '投放优化',
  DATA = '数据分析',
  GENERAL = '通用技能'
}

export interface Question {
  id: string;
  type: QuestionType;
  category: Category;
  text: string;
  options?: string[];
  answer: string | string[]; // Single letter for SINGLE/BOOLEAN, Array for MULTIPLE
  explanation?: string;
  weight: number; // Importance factor 1-3
}

export interface UserAnswer {
  questionId: string;
  selected: string | string[];
}

export interface ExamResult {
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  timeTaken: number;
}

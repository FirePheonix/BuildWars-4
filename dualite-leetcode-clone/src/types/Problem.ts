export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: TestCase[];
  constraints: string[];
  tags: string[];
  acceptance: number;
  submissions: number;
  starterCode: {
    javascript: string;
    python: string;
    java: string;
  };
  solution?: {
    code: string;
    explanation: string;
  };
}

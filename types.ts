
export interface StoryParams {
  babyName: string;
  age: string;
  theme: string;
  // Personalization fields
  storyStyle?: string;
  babyState?: string;
  readingRhythm?: string;
  favoriteAnimal?: string;
  comfortObject?: string;
  favoriteColor?: string;
  caregiverName?: string;
  // Routine fields
  includeRoutine?: boolean;
  sleepTime?: string;
  routinePreferences?: string; // e.g. "Banho, Música, Colo"
}

export interface RoutineData {
  environment: string;
  steps: string[];
  script: string[];
  transition: string;
}

export interface StoryResponse {
  title: string;
  content: string;
  relaxationEnding: string;
  recommendation: string;
  routine?: RoutineData; // Optional routine data
}

export interface CryInterpretationResponse {
  explanation: string;
  reasons: string[];
  actions: string[];
  comfortForMom: string;
  stabilization: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

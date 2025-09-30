export interface Profile {
  id: string;
  name: string;
  age: number;
  height: string;
  education: string;
  occupation: string;
  location: string;
  religion: string;
  caste?: string;
  motherTongue: string;
  maritalStatus: string;
  income?: string;
  about: string;
  photos: string[];
  interests: string[];
  familyDetails: {
    fatherOccupation: string;
    motherOccupation: string;
    siblings: number;
  };
  preferences: {
    ageRange: { min: number; max: number };
    heightRange: { min: string; max: string };
    education: string[];
    location: string[];
  };
  verified: boolean;
  premium: boolean;
  lastActive: string;
}

export interface SearchFilters {
  ageRange: { min: number; max: number };
  heightRange: { min: string; max: string };
  education: string[];
  occupation: string[];
  location: string[];
  religion: string[];
  maritalStatus: string[];
  income: string[];
}
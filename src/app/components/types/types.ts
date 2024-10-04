// types.ts
export interface VoiceNote {
    title: string;
    description: string;
    fileUrl: string;
    username: string;
    createdAt: string;
    likes?: number;
    comments?: number;
  }
  
  // filter types
  export interface FilterProps {
    selectedCategories: string[];
    selectedLanguages: string[];
    onChangeCategories: (categories: string[]) => void;
    onChangeLanguages: (languages: string[]) => void;
  }
  
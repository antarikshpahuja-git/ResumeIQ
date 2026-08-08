import { create } from 'zustand';
import { User, UploadedFile, AnalysisResult } from '../types';

type Page = 'home' | 'analyzer' | 'dashboard' | 'history' | 'login' | 'signup' | 'pricing';

interface AppState {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  
  user: User | null;
  token: string | null;
  setUser: (user: User | null, token?: string | null) => void;
  logout: () => void;
  
  uploadedFile: UploadedFile | null;
  setUploadedFile: (file: UploadedFile | null) => void;
  
  jobDescription: string;
  setJobDescription: (desc: string) => void;
  
  jobTitle: string;
  setJobTitle: (title: string) => void;
  
  experienceLevel: string;
  setExperienceLevel: (level: string) => void;
  
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  
  analysisProgress: number;
  setAnalysisProgress: (progress: number) => void;
  
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'home',
  navigateTo: (page) => set({ currentPage: page }),
  
  user: null,
  token: localStorage.getItem('token'),
  setUser: (user, token) => {
    if (token !== undefined) {
      if (token) localStorage.setItem('token', token);
      else localStorage.removeItem('token');
      set({ user, token });
    } else {
      set({ user });
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, currentPage: 'home' });
  },
  
  uploadedFile: null,
  setUploadedFile: (file) => set({ uploadedFile: file }),
  
  jobDescription: '',
  setJobDescription: (desc) => set({ jobDescription: desc }),
  
  jobTitle: '',
  setJobTitle: (title) => set({ jobTitle: title }),
  
  experienceLevel: '',
  setExperienceLevel: (level) => set({ experienceLevel: level }),
  
  analysisResult: null,
  setAnalysisResult: (result) => set({ analysisResult: result }),
  
  isAnalyzing: false,
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  
  analysisProgress: 0,
  setAnalysisProgress: (progress) => set({ analysisProgress: progress }),
  
  isDarkMode: false,
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode;
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: newDarkMode };
  }),
  
  activeTab: 0,
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

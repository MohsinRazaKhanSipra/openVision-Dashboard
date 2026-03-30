import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'user' | null;

export interface Camera {
  id: string;
  name: string;
  url: string; // YouTube URL
  status: 'active' | 'inactive' | 'error';
}

export interface Solution {
  id: string;
  name: string;
  description: string;
  active: boolean;
  cameraId?: string;
}

export interface ModelConfig {
  version: 'yolov8n' | 'yolov8s' | 'yolov8m' | 'yolov8l' | 'yolov8x';
  confidenceThreshold: number;
  iouThreshold: number;
  device: 'cpu' | 'cuda' | 'mps';
}

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  cameras: Camera[];
  addCamera: (camera: Omit<Camera, 'id'>) => void;
  removeCamera: (id: string) => void;
  solutions: Solution[];
  updateSolution: (id: string, updates: Partial<Solution>) => void;
  modelConfig: ModelConfig;
  updateModelConfig: (config: Partial<ModelConfig>) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const defaultCameras: Camera[] = [
  { id: 'cam-1', name: 'Main Entrance', url: 'https://www.youtube.com/watch?v=5_XjqhoOnQc', status: 'active' },
  { id: 'cam-2', name: 'Parking Lot', url: 'https://www.youtube.com/watch?v=1EiC9bvVGnk', status: 'active' },
];

const defaultSolutions: Solution[] = [
  { id: 'sol-1', name: 'Object Detection', description: 'General object detection using YOLO', active: true, cameraId: 'cam-1' },
  { id: 'sol-2', name: 'People Counting', description: 'Count people entering/exiting zones', active: false },
  { id: 'sol-3', name: 'Intrusion Detection', description: 'Alert on movement in restricted areas', active: true, cameraId: 'cam-2' },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      userRole: 'admin',
      setUserRole: (role) => set({ userRole: role }),
      cameras: defaultCameras,
      addCamera: (camera) => set((state) => ({ 
        cameras: [...state.cameras, { ...camera, id: `cam-${Date.now()}` }] 
      })),
      removeCamera: (id) => set((state) => ({ 
        cameras: state.cameras.filter(c => c.id !== id) 
      })),
      solutions: defaultSolutions,
      updateSolution: (id, updates) => set((state) => ({
        solutions: state.solutions.map(s => s.id === id ? { ...s, ...updates } : s)
      })),
      modelConfig: {
        version: 'yolov8m',
        confidenceThreshold: 0.5,
        iouThreshold: 0.45,
        device: 'cuda',
      },
      updateModelConfig: (config) => set((state) => ({
        modelConfig: { ...state.modelConfig, ...config }
      })),
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'openvision-storage',
      partialize: (state) => ({ theme: state.theme, userRole: state.userRole }),
    }
  )
);

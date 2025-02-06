import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateDashboardPresetDTO } from '../types/preset.types';
import { BaseWidget } from '../types/widget.types';

interface DashboardPreset {
  id: string;
  name: string;
  description?: string;
  widgets: BaseWidget[];
  createdAt: string;
  updatedAt: string;
}

interface DashboardPresetState {
  presets: DashboardPreset[];
  addPreset: (preset: CreateDashboardPresetDTO) => void;
  removePreset: (presetId: string) => void;
  updatePreset: (presetId: string, updates: Partial<DashboardPreset>) => void;
  loadPreset: (presetId: string) => DashboardPreset | null;
}

export const useDashboardPresetStore = create<DashboardPresetState>(
  persist(
    (set, get) => ({
      presets: [],

      addPreset: (preset) => {
        const newPreset: DashboardPreset = {
          id: crypto.randomUUID(),
          name: preset.name,
          description: preset.description,
          widgets: preset.widgets,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          presets: [...state.presets, newPreset]
        }));
      },

      removePreset: (presetId) => {
        set((state) => ({
          presets: state.presets.filter(p => p.id !== presetId)
        }));
      },

      updatePreset: (presetId, updates) => {
        set((state) => ({
          presets: state.presets.map(preset => 
            preset.id === presetId 
              ? { 
                  ...preset, 
                  ...updates,
                  updatedAt: new Date().toISOString()
                } 
              : preset
          )
        }));
      },

      loadPreset: (presetId) => {
        const state = get();
        return state.presets.find(p => p.id === presetId) || null;
      }
    }),
    {
      name: 'dashboard-preset-storage',
      partialize: (state) => ({ presets: state.presets })
    }
  )
);

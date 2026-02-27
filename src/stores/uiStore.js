import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      theme: 'dark', // 'dark' | 'light'
      
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      
      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        set({ theme: newTheme });
      },
      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },
      
      // Initialize theme on app load
      initTheme: () => {
        const theme = get().theme;
        document.documentElement.setAttribute('data-theme', theme);
      },
    }),
    {
      name: 'dhwani-ui',
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute('data-theme', state.theme || 'dark');
        }
      },
    }
  )
);

// settingsStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      fontSize: 16,
      fontFamily: 'System-ui',
      lineHeight: 1.5,
      // theme: 'light',
      selectedVoice: null,
      isNotificationsEnabled: false,
      speechRate: 1,
      speechPitch: 1,
      setFontSize: (size) => set({ fontSize: size }),
      setFontFamily: (family) => set({ fontFamily: family }),
      setLineHeight: (height) => set({ lineHeight: height }),
      // setTheme: (theme) => set({ theme: theme }),
      setSelectedVoice: (voice) => set({ selectedVoice: voice }),
      setNotificationsEnabled: (enabled) => set({ isNotificationsEnabled: enabled }),
      // setSpeechRate: (rate) => set({ speechRate: rate }),
      // setSpeechPitch: (pitch) => set({ speechPitch: pitch }),
      // // resetSettings: () => set({
      //   fontSize: 16,
      //   fontFamily: 'Inter',
      //   lineHeight: 1.5,
      //   theme: 'light',
      //   selectedVoice: null,
      //   isNotificationsEnabled: false,
      //   speechRate: 1,
      //   speechPitch: 1,
      // })
    }),
    {
      name: 'app-settings',
      getStorage: () => localStorage,
    }
  )
);

export default useSettingsStore;

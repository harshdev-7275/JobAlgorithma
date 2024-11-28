import { create } from "zustand";

type LogoLoadingState = {
  isLogoLoading: boolean;
  setIsLoadingLogo: (loading: boolean) => void;
};

const useLogoLoadingStore = create<LogoLoadingState>((set) => ({
    isLogoLoading: false, // Initial state
    setIsLoadingLogo: (loading) => set({ isLogoLoading: loading }),
}));

export default useLogoLoadingStore;

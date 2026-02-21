import { Media } from "@/lib/types/media";
import { create } from "zustand";

interface MediaState {
  isMediaDialogOpen: boolean;
  openMediaDialog: (options: { root: string }) => Promise<{ item: Media | null; alt?: string }>;
  closeMediaDialog: () => void;
  root: string;
  resolver?: (value: { item: Media | null; alt?: string }) => void;
  onSelectItem: ({ item, alt }: { item: Media | null; alt?: string }) => void;
}

export const useMediaStore = create<MediaState>((set, get) => ({
  isMediaDialogOpen: false,
  root: "",
  resolver: undefined,
  onSelectItem: ({ item, alt }) => {
    const resolver = get().resolver;
    if (resolver) resolver({item, alt});
    set({ 
        isMediaDialogOpen: false
     })
  },
  openMediaDialog: ({ root }) => {
    return new Promise<{ item: Media | null; alt?: string }>((resolve) => {
      set({
        isMediaDialogOpen: true,
        root,
        resolver: resolve,
      });
    });
  },
  closeMediaDialog: () => {
    const resolver = get().resolver;

    if (resolver) resolver({ item: null, alt: undefined });

    set({
      isMediaDialogOpen: false,
      root: "",
      resolver: undefined,
    });
  },
}));

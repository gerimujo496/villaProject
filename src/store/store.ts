// store.ts
import {create} from 'zustand';
import { createFilterSlice, FilterSlice } from './filterSlice';


// Combine the slices into a single store type
interface Store extends FilterSlice {}

// Create the Zustand store
export const useStore = create<Store>((...set) => ({
  ...createFilterSlice(...set),
}));
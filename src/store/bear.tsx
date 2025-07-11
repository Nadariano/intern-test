import { create } from 'zustand'

type BearState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
};

const useStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
}))

function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} bears around here...</h1>
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}

export { useStore, BearCounter, Controls };
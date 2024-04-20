import { create } from "zustand";

const currentUser = create((set) => ({
    setUser : '',
    getUser : '',
    // setMode : (Mode) =>set({Mode}),
    // setStartTime : () => set({ startTime: new Date().toISOString() }),
    // setEndTime : () => set({ endTime: new Date().toISOString() }),
    // clear : () => set({ startTime: 0,endTime:0}),
    
}));

export default currentUser;
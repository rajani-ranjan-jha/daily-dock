import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { syncTabs } from 'zustand-sync-tabs'
import { SendNotification } from '../components/SendNotification'

interface TimerState {
    timeLeft: number;
    isActive: boolean;
    mode: "pomodoro" | "break";
    pomodoroTime: number;
    breakTime: number;
    endTime: number | null; // The exact timestamp when the timer should end
    updateTime: (time: number) => void;
    toggleTimer: () => void;
    resetTimer: () => void;
    setMode: (mode: "pomodoro" | "break") => void;
    setPomodoroTime: (time: number) => void;
    setBreakTime: (time: number) => void;
    setIsActive: (isActive: boolean) => void;
    tick: () => void;
}

export const timerStore = create<TimerState>()(
    persist(
        syncTabs(
            (set, get) => ({
                timeLeft: 25 * 60,
                isActive: false,
                mode: "pomodoro",
                pomodoroTime: 25 * 60,
                breakTime: 5 * 60,
                endTime: null,

                updateTime: (time: number) => set({ timeLeft: time }),

                toggleTimer: () => {
                    const state = get();
                    const now = Date.now();
                    
                    if (!state.isActive) {
                        // Starting the timer
                        const newEndTime = now + state.timeLeft * 1000;
                        set({ isActive: true, endTime: newEndTime });
                    } else {
                        // Pausing the timer
                        // timeLeft is already updated by tick(), but we ensure it's captured
                        const remaining = state.endTime ? Math.max(0, Math.floor((state.endTime - now) / 1000)) : state.timeLeft;
                        set({ isActive: false, endTime: null, timeLeft: remaining });
                    }
                },

                resetTimer: () => {
                    const state = get();
                    const newTime = state.mode === "pomodoro" ? state.pomodoroTime : state.breakTime;
                    set({ timeLeft: newTime, isActive: false, endTime: null });
                },

                setMode: (mode: "pomodoro" | "break") => {
                    const state = get();
                    const newTime = mode === "pomodoro" ? state.pomodoroTime : state.breakTime;
                    set({ mode, timeLeft: newTime, isActive: false, endTime: null });
                },

                setPomodoroTime: (time: number) => set({ pomodoroTime: time }),
                setBreakTime: (time: number) => set({ breakTime: time }),
                setIsActive: (isActive: boolean) => set({ isActive }),

                tick: () => {
                    const state = get();
                    if (state.isActive && state.endTime) {
                        const now = Date.now();
                        const remaining = Math.max(0, Math.floor((state.endTime - now) / 1000));
                        
                        if (remaining <= 0) {
                            const newMode = state.mode === "pomodoro" ? "break" : "pomodoro";
                            const nextTime = newMode === "pomodoro" ? state.pomodoroTime : state.breakTime;
                            
                            // Switch mode and notify
                            SendNotification(
                                `${state.mode.toUpperCase()} completed! Switching to ${newMode}.`, 
                                { type: "success", position: "bottom-right" }
                            );

                            // Calculate new end time for the next mode and auto-start
                            const newEndTime = Date.now() + nextTime * 1000;
                            
                            set({ 
                                mode: newMode, 
                                timeLeft: nextTime, 
                                isActive: true, 
                                endTime: newEndTime 
                            });
                        } else if (remaining !== state.timeLeft) {
                            set({ timeLeft: remaining });
                        }
                    }
                }
            }),
            { name: 'timer-sync' }
        ),
        {
            name: 'timer-storage',
            storage: createJSONStorage(() => sessionStorage),
            // Only persist relevant state
            partialize: (state) => ({
                timeLeft: state.timeLeft,
                isActive: state.isActive,
                mode: state.mode,
                pomodoroTime: state.pomodoroTime,
                breakTime: state.breakTime,
                endTime: state.endTime,
            }),
        }
    )
)
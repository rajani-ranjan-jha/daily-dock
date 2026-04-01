import { create } from 'zustand'
import { syncTabs } from 'zustand-sync-tabs'

interface TimerState {
    timeLeft: number;
    isActive: boolean;
    mode: "pomodoro" | "break";
    pomodoroTime: number;
    breakTime: number;
    updateTime: (time: number) => void;
    toggleTimer: () => void;
    resetTimer: () => void;
    setMode: (mode: "pomodoro" | "break") => void;
    setPomodoroTime: (time: number) => void;
    setBreakTime: (time: number) => void;
    setIsActive: (isActive: boolean) => void;
}

export const timerStore = create<TimerState>(
    // TODO: use timestamps rather than integers
    syncTabs(
        (set, get) => ({
            timeLeft: 25 * 60,
            isActive: false,
            mode: "pomodoro",
            pomodoroTime: 25 * 60,
            breakTime: 5 * 60,
            updateTime: (time: number) => set({ timeLeft: time }),
            toggleTimer: () => set((state) => ({ isActive: !state.isActive })),
            resetTimer: () => {
                const state = get();
                set({ timeLeft: state.mode === "pomodoro" ? state.pomodoroTime : state.breakTime, isActive: false });
            },
            setMode: (mode: "pomodoro" | "break") => set({ mode }),
            setPomodoroTime: (time: number) => set({ pomodoroTime: time }),
            setBreakTime: (time: number) => set({ breakTime: time }),
            setIsActive: (isActive: boolean) => set({ isActive }),
        }),
        { name: 'timer' }
    )

)
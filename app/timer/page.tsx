'use client'
import { Cog, Pause, Play, RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Timer = () => {
  // Config (in seconds)
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);

  // State
  const [timeLeft, setTimeLeft] = useState(pomodoroTime);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"pomodoro" | "break">("pomodoro");
  const [showSettings, setShowSettings] = useState(false);

  // Settings inputs (in minutes)
  const [configPomo, setConfigPomo] = useState(25);
  const [configBreak, setConfigBreak] = useState(5);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Sync time when settings change or mode switches (only if not running to avoid jumps)
    if (!isActive) {
      setTimeLeft(mode === "pomodoro" ? pomodoroTime : breakTime);
    }
  }, [mode, pomodoroTime, breakTime]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Timer Finished
      setIsActive(false);
      handleTimerComplete()
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    window.alert("timer is completed")
    setTimeout(() => {
      if (mode === "pomodoro") {
        setMode("break");
      } else {
        setMode("pomodoro");
      }
    }, 500);
  };
  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "pomodoro" ? pomodoroTime : breakTime);
  };

  const saveSettings = () => {
    setPomodoroTime(configPomo * 60);
    setBreakTime(configBreak * 60);
    setShowSettings(false);
    setIsActive(false);
    setTimeLeft(mode === "pomodoro" ? configPomo * 60 : configBreak * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalTime = mode === "pomodoro" ? pomodoroTime : breakTime;
  // Calculate offset. Circumference = 2 * PI * r. r=140 => ~879.6
  const circumference = 2 * Math.PI * 140;
  // Progress goes from 0 to 100%.
  // We want the stroke to SHRINK as time passes? Or FILL?
  // Usually clean looks like it shrinks.
  const progressRatio = timeLeft / totalTime;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="w-screen flex flex-col items-center justify-center h-screen bg-slate-900 text-white transition-colors duration-500 font-sans select-none">
      <h1 className="text-4xl font-mono font-semibold text-center mb-10">Pomodoro Timer</h1>
      {/* Mode Indicator */}
      <div className="flex space-x-4">
        <button
          onClick={() => {
            setIsActive(false);
            setMode("pomodoro");
          }}
          className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wide transition-all ${mode === "pomodoro" ? "bg-blue-500/20 text-blue-400 border border-blue-500/50" : "text-slate-500 hover:text-slate-300"}`}
        >
          FOCUS
        </button>
        <button
          onClick={() => {
            setIsActive(false);
            setMode("break");
          }}
          className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wide transition-all ${mode === "break" ? "bg-green-500/20 text-green-400 border border-green-500/50" : "text-slate-500 hover:text-slate-300"}`}
        >
          BREAK
        </button>
      </div>

      {/* Timer Display */}
      <div className="relative w-80 h-80 flex items-center justify-center mb-10 group cursor-default">
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-full blur-3xl opacity-20 transition-all duration-1000 ${isActive ? (mode === "pomodoro" ? "bg-blue-600" : "bg-green-600") : "bg-transparent"}`}
        ></div>

        {/* Progress Circle (SVG) */}
        <svg className="w-full h-full transform -rotate-90 relative z-10 drop-shadow-xl">
          {/* Background Circle */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-800"
          />
          {/* Active Progress Circle */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className={`${mode === "pomodoro" ? "text-blue-500" : "text-green-500"} transition-all duration-1000 ease-linear`}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset || 0}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span className="font-mono text-7xl font-bold tracking-tighter tabular-nums text-slate-100 drop-shadow-lg">
            {formatTime(timeLeft)}
          </span>
          <span className="text-sm text-slate-500 mt-2 font-medium racking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            {isActive ? "Running" : "Paused"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-6 mb-8 z-10">
        <button
          className="p-5 rounded-2xl bg-slate-800 hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
          onClick={toggleTimer}
        >
          {isActive ? (
            <Pause size={24} className="text-slate-200" />
          ) : (
            <Play size={24} className="text-blue-400 pl-1" />
          )}
        </button>
        <button
          className="p-5 rounded-2xl bg-slate-800 hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl"
          onClick={resetTimer}
        >
          <RotateCcw size={24} className="text-slate-400" />
        </button>
        <button
          className="p-5 rounded-2xl bg-slate-800 hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl"
          onClick={() => setShowSettings(true)}
        >
          <Cog size={24} className="text-slate-400" />
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-6 text-slate-200">
              Timer Settings
            </h2>
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Focus Duration (min)
              </label>
              <input
                type="number"
                value={configPomo}
                onChange={(e) => setConfigPomo(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-xl text-white font-mono text-lg transition-all"
              />
            </div>
            <div className="mb-8">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Break Duration (min)
              </label>
              <input
                type="number"
                value={configBreak}
                onChange={(e) => setConfigBreak(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none p-3 rounded-xl text-white font-mono text-lg transition-all"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSettings(false)}
                className="px-5 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveSettings}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-900/20 transition-all hover:translate-y-px"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TimerSettings = () => {
  return (
    <div>a separate function for timer settings</div>
  )
}

const TimerHistory = () => {
  return (
    <div>a separate function for timer history</div>
  )
}

export default Timer;

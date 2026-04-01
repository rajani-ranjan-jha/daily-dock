"use client";
import React, { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Menu, Pause, Play, RotateCcw, Timer, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/theme";
import { timerStore } from "../store/timerStore";

type UserType = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

const UserProfile = ({ name, email, image }: UserType) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current?.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut();
    setIsDropdownOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger button */}
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        className=" flex items-center justify-center transition-colors"
      >
        <img
          className="w-10 h-10 rounded-full border"
          src={image || "/globe.svg"}
          alt="User profile"
        />
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-36 rounded-md border border-white/20 bg-neutral-900 shadow-lg z-20 overflow-hidden"
        >
          <Link
            role="menuitem"
            href="/settings"
            onClick={() => setIsDropdownOpen(false)}
            className="block px-4 py-2 text-sm capitalize hover:bg-white/20 transition-colors"
          >
            Settings
          </Link>
          <button
            role="menuitem"
            onClick={() => handleLogout()}
            className="w-full text-left px-4 py-2 text-sm capitalize hover:bg-white/20 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const TimerStatus = () => {
  const {
    timeLeft,
    isActive,
    mode,
    pomodoroTime,
    breakTime,
    updateTime,
    toggleTimer,
    resetTimer,
    setMode,
    setPomodoroTime,
    setBreakTime,
    setIsActive
  } = timerStore();
  const [hovered, setHovered] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
    useEffect(() => {
      // Sync time when settings change or mode switches (only if not running to avoid jumps)
      if (!isActive) {
        updateTime(mode === "pomodoro" ? pomodoroTime : breakTime);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, pomodoroTime, breakTime]);
  
    useEffect(() => {
      if (isActive && timeLeft > 0) {
        timerRef.current = setInterval(() => {
          updateTime(timeLeft - 1);
        }, 1000);
      } else if (timeLeft === 0 && isActive) {
        // Timer Finished
        setIsActive(false);
      }
  
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [isActive, timeLeft, updateTime, setIsActive]);

    useEffect(() => {
      resetTimer();
    }, [mode])
    

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-2 group inset-0 hover:bg-accent/20 rounded-full transition-transform duration-200">
      <button
        onMouseEnter={() => setHovered(true)}
        className="px-5 py-2 text-sm font-medium capitalize transition-all duration-200"
      >
        <Timer size={20} />
      </button>
      {hovered && (
        <div
          onMouseLeave={() => setHovered(false)}
          className="z-100 absolute top-10 w-40 min-h-20 p-2 bg-muted-foreground dark:bg-popover rounded-sm scale-0 transition-transform duration-200 group-hover:scale-100 border flex flex-col justify-center items-center gap-2 mx-auto"
        >
          <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
          <span onClick={() => setMode(mode === "pomodoro" ? "break" : "pomodoro")} className={`text-sm capitalize cursor-pointer ${mode === "pomodoro" ? "text-blue-500" : "text-green-500"}`}>{mode}</span>
          <div className="flex items-center gap-2">
            <button className="hover:bg-white/20 p-1.5 rounded-full" onClick={toggleTimer} title={isActive ? "Pause" : "Start"}>
              {isActive ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="hover:bg-white/20 p-1.5 rounded-full" onClick={resetTimer} title="Reset">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  // console.log(session)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    if (session && session?.user) {
      setUser(session.user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);
  const pages = [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
    { name: "contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border animate-fade-in">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-15">
            {/* Logo */}
            <Link href="/" className="group relative">
              <span className="text-2xl font-light tracking-tight transition-all duration-300 group-hover:tracking-wide">
                Daily Dock
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-muted-foreground transition-all duration-300 group-hover:w-full"></div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {pages.map((page, index) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className="relative px-5 py-2 text-sm font-medium capitalize transition-all duration-200  group"
                >
                  <span className="relative z-10">{page.name}</span>
                  <div className="absolute inset-0 bg-accent/20 rounded-full scale-0 transition-transform duration-200 group-hover:scale-100"></div>
                </Link>
              ))}

              <TimerStatus />

              {/* CTA Button */}
              {isLoggedIn ? (
                <UserProfile
                  name={user?.name}
                  email={user?.email}
                  image={user?.image}
                />
              ) : (
                <Link
                  href="/login"
                  className="ml-4 px-6 py-2.5 bg-secondary dark:bg-primary text-primary-foreground dark:text-white text-sm font-medium rounded-full transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:scale-105"
                >
                  Get Started
                </Link>
              )}
              <ModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pt-2 pb-6 bg-background border-t border-border">
            <div className="flex flex-col gap-2">
              {pages.map((page, index) => (
                <Link
                  key={page.name}
                  href={page.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-muted-foreground capitalize rounded-lg transition-all duration-200 hover:bg-accent/20 hover:text-foreground hover:pl-6"
                >
                  {page.name}
                </Link>
              ))}
              {isLoggedIn ? (
                <UserProfile
                  name={user?.name}
                  email={user?.email}
                  image={user?.image}
                />
              ) : (
                <Link
                  href="/login"
                  className="mt-2 px-4 py-3 bg-primary text-primary-foreground text-base font-medium rounded-lg transition-all duration-200 hover:bg-primary/90"
                >
                  Get Started
                </Link>
              )}
              <div className="flex justify-center mt-4">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-15"></div>
    </>
  );
};

export default Header;
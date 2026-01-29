"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/theme";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     // The user is not authenticated, handle it here.
  //   },
  // })

  const pages = [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
    { name: "contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border animate-fade-in">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="group relative"
            >
              <span className="text-2xl font-light tracking-tight transition-all duration-300 group-hover:tracking-wide" >
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
              
              {/* CTA Button */}
              <button className="ml-4 px-6 py-2.5 bg-primary text-primary-foreground dark:text-muted-foreground text-sm font-medium rounded-full transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:scale-105">
                Get Started
              </button>
            <ModeToggle/>
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
              <button 
                className="mt-2 px-4 py-3 bg-primary text-primary-foreground text-base font-medium rounded-lg transition-all duration-200 hover:bg-primary/90">
                Get Started
              </button>
              <div className="flex justify-center mt-4">
              <ModeToggle/>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;
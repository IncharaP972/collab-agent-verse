
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="container flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-primary animate-pulse-glow"></div>
            <div className="absolute inset-0 h-8 w-8 rounded-full bg-primary blur-sm opacity-50"></div>
          </div>
          <span className="font-bold text-lg">AI Collective</span>
        </Link>
        
        <div className="hidden md:flex space-x-1">
          <Link to="/" className="px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">Home</Link>
          <Link to="/task" className="px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">New Task</Link>
          <Link to="/how-it-works" className="px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">How It Works</Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:flex">
            <Link to="/task">Start Task</Link>
          </Button>
          
          <Button asChild variant="default" size="sm" className="hidden sm:flex">
            <Link to="/task">Get Started</Link>
          </Button>
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

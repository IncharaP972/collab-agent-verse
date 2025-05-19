
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedDiagram from '@/components/ui/animated-diagram';

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen pt-20 pb-20 flex items-center hero-gradient grid-pattern overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium animate-fade-in">
                Next generation AI collaboration
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-in">
                The Power of <span className="text-primary">Multiple AI Agents</span> Working Together
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-in" style={{ animationDelay: '0.1s' }}>
                Orchestrate specialized AI agents that collaborate to solve complex tasks more effectively than any single AI could accomplish alone.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/task">Start a New Task</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link to="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
            
            <AnimatedDiagram />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Specialized AI Agents for Every Need</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each AI agent is trained for specific tasks, combining their strengths to create exceptional results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Strategic Planning",
                  description: "The Planner agent breaks down complex tasks into achievable steps, creating an efficient workflow for other agents."
                },
                {
                  title: "Deep Research",
                  description: "The Researcher agent gathers and analyzes information from various sources, providing context and insights."
                },
                {
                  title: "Creative Design",
                  description: "The Designer agent creates visual concepts, UI elements, and improves user experience."
                },
                {
                  title: "Technical Implementation",
                  description: "The Coder agent implements solutions, writes clean code, and integrates systems."
                },
                {
                  title: "Quality Assurance",
                  description: "The Tester agent verifies solutions, identifies issues, and ensures everything works as expected."
                },
                {
                  title: "Orchestrated Collaboration",
                  description: "All agents work in concert, sharing insights and building upon each other's work for optimal results."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-background rounded-xl p-6 shadow-sm border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary/40"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Experience AI Collaboration?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Start your first task and witness how multiple AI agents work together to deliver superior results.
                </p>
                <Button asChild size="lg">
                  <Link to="/task">Create Your First Task</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;

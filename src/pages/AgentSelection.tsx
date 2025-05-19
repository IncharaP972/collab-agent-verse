
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AgentCard from '@/components/ui/agent-card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AgentSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { taskDescription } = location.state || { taskDescription: "" };
  
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  
  const toggleAgent = (agentId: string) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };
  
  const handleContinue = () => {
    navigate('/collaboration', { state: { taskDescription, selectedAgents } });
  };
  
  const agents = [
    {
      id: "planner",
      name: "Planner",
      role: "Strategic Coordination",
      description: "Breaks down tasks into steps, creates timelines, and coordinates the work of other agents.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      id: "researcher",
      name: "Researcher",
      role: "Information Gathering",
      description: "Collects, analyzes, and summarizes relevant information to provide context and insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      id: "designer",
      name: "Designer",
      role: "Visual Creation",
      description: "Creates visual concepts, UI elements, and improves user experience with aesthetic solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="21.17" y1="8" x2="12" y2="8"></line>
          <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
          <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
        </svg>
      )
    },
    {
      id: "coder",
      name: "Coder",
      role: "Technical Implementation",
      description: "Writes clean code, develops features, and implements technical solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      id: "tester",
      name: "Tester",
      role: "Quality Assurance",
      description: "Tests solutions, identifies issues, and ensures everything works as expected before delivery.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 pb-20">
        <div className="container py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Select Your AI Agents</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose which specialized agents will collaborate on your task. Each brings unique skills to the team.
            </p>
          </div>
          
          <div className="bg-muted/50 border rounded-lg p-4 mb-8">
            <h2 className="font-medium">Your Task</h2>
            <p className="text-muted-foreground">{taskDescription}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                {...agent}
                selected={selectedAgents.includes(agent.id)}
                onClick={() => toggleAgent(agent.id)}
              />
            ))}
          </div>
          
          <div className="mt-12 flex justify-between items-center">
            <Button 
              variant="outline"
              onClick={() => navigate('/task')}
            >
              Back
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {selectedAgents.length} agents selected
            </div>
            
            <Button 
              onClick={handleContinue}
              disabled={selectedAgents.length === 0}
            >
              Start Collaboration
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AgentSelection;

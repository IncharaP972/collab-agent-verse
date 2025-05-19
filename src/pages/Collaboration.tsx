
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AgentMessage from '@/components/ui/agent-message';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Collaboration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { taskDescription, selectedAgents, autoSelected } = location.state || { 
    taskDescription: "Sample task for demonstration",
    selectedAgents: [],
    autoSelected: false
  };
  
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [workflowComplete, setWorkflowComplete] = useState(false);
  
  // Icons for each agent
  const agentIcons: Record<string, React.ReactNode> = {
    planner: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    researcher: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
    designer: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="4"></circle>
        <line x1="21.17" y1="8" x2="12" y2="8"></line>
        <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
        <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
      </svg>
    ),
    coder: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    tester: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"></polyline>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
      </svg>
    )
  };
  
  // Workflow steps
  const workflowSteps = [
    {
      agent: "planner",
      name: "Task Analysis & Planning",
      message: "I've analyzed the task and created a workflow plan. First, we'll need to research best practices for the requested feature set. Then, we'll design a user-friendly interface aligned with current standards. After that, we'll implement the core functionality and finally test everything for issues.",
      duration: 4000
    },
    {
      agent: "researcher",
      name: "Research & Data Collection",
      message: "Based on my research, I've gathered relevant information about similar implementations and user expectations. The most effective approach would be to use a minimalist design with easy navigation and prominent call-to-action elements.",
      duration: 5000
    },
    {
      agent: "designer",
      name: "Design & User Experience",
      message: "I've created a design concept that aligns with modern aesthetics while ensuring optimal user experience. The layout prioritizes content hierarchy and uses visual cues to guide users through the intended flow.",
      duration: 6000
    },
    {
      agent: "coder",
      name: "Implementation",
      message: "I've implemented the core functionality using best practices and efficient code. The solution includes all requested features and is built to be maintainable and scalable.",
      duration: 7000
    },
    {
      agent: "tester",
      name: "Testing & Quality Assurance",
      message: "I've thoroughly tested the implementation and found it meets all requirements. I've verified compatibility across different browsers and devices, and all features work as expected.",
      duration: 4000
    },
    {
      agent: "planner",
      name: "Final Review & Delivery",
      message: "All agents have completed their tasks successfully. The final solution meets all requirements and is ready for delivery. You can now review the complete result.",
      duration: 3000
    }
  ];
  
  // Determine agents to use - either from selection or auto-selected
  useEffect(() => {
    // Simulating workflow progression
    if (currentStep < workflowSteps.length) {
      // First add the agent as "thinking"
      const currentAgent = workflowSteps[currentStep];
      const newMessage = {
        agent: currentAgent.agent,
        name: workflowSteps[currentStep].name,
        message: "",
        timestamp: new Date().toLocaleTimeString(),
        isLoading: true
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Then update progress
      const stepProgress = (currentStep / workflowSteps.length) * 100;
      setProgress(stepProgress);
      
      // After a delay, show the agent's message
      const timer = setTimeout(() => {
        setMessages(prev => 
          prev.map((msg, idx) => 
            idx === prev.length - 1 
              ? { ...msg, message: currentAgent.message, isLoading: false }
              : msg
          )
        );
        
        // Move to next step with delay
        const nextStepTimer = setTimeout(() => {
          if (currentStep < workflowSteps.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            // Workflow complete
            setProgress(100);
            setWorkflowComplete(true);
          }
        }, 1000);
        
        return () => clearTimeout(nextStepTimer);
      }, currentAgent.duration);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);
  
  const handleViewResults = () => {
    navigate('/result', { 
      state: { 
        taskDescription,
        messages
      } 
    });
  };
  
  // Helper to get agent name
  const getAgentInfo = (agentId: string) => {
    const agentMap: Record<string, {name: string, role: string}> = {
      planner: { name: "Planner", role: "Strategic Coordination" },
      researcher: { name: "Researcher", role: "Information Gathering" },
      designer: { name: "Designer", role: "Visual Creation" },
      coder: { name: "Coder", role: "Technical Implementation" },
      tester: { name: "Tester", role: "Quality Assurance" }
    };
    
    return agentMap[agentId] || { name: agentId, role: "Agent" };
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 pb-20">
        <div className="container py-12">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-3">AI Agents Collaboration</h1>
            <p className="text-muted-foreground">
              Watch as our AI agents work together to complete your task
            </p>
          </div>
          
          {/* Progress bar */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                {workflowComplete ? 
                  "Task completed successfully!" : 
                  `Current step: ${workflowSteps[currentStep]?.name || "Processing..."}`
                }
              </div>
            </CardContent>
          </Card>
          
          {/* Task summary */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-2">Task Description</h2>
              <p className="text-muted-foreground">{taskDescription}</p>
            </CardContent>
          </Card>
          
          {/* Messages from agents */}
          <div className="space-y-6 mb-8">
            {messages.map((message, index) => {
              const agentInfo = getAgentInfo(message.agent);
              return (
                <AgentMessage
                  key={index}
                  agentName={agentInfo.name}
                  agentRole={agentInfo.role}
                  icon={agentIcons[message.agent]}
                  message={message.message}
                  isLoading={message.isLoading}
                  timestamp={message.timestamp}
                />
              );
            })}
          </div>
          
          {/* Actions */}
          <div className="flex justify-end">
            {workflowComplete ? (
              <Button onClick={handleViewResults}>
                View Results
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Processing...
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Collaboration;

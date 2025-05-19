
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import AgentMessage from "../ui/agent-message";

interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: React.ReactNode;
}

const TaskInputSection = () => {
  const navigate = useNavigate();
  const [taskDescription, setTaskDescription] = useState("");
  const [autoSelectAgents, setAutoSelectAgents] = useState(true);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState<string | null>(null);

  const agents: Agent[] = [
    {
      id: "planner",
      name: "Planner Agent",
      role: "Strategic Coordination",
      description: "Analyzes your task and creates a structured plan with steps for execution.",
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
      id: "developer",
      name: "Developer Agent",
      role: "Code Implementation",
      description: "Writes clean, efficient code to implement planned features and functionality.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      id: "reviewer",
      name: "Reviewer Agent",
      role: "Quality Assurance",
      description: "Reviews code and output to ensure quality, correctness and best practices.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      )
    },
  ];

  const toggleAgent = (agentId: string) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };

  const handleStartTask = () => {
    if (!taskDescription) return;
    
    setIsLoading(true);
    
    // Simulate agent thinking and working process
    setCurrentStage("planner");
    
    setTimeout(() => {
      setCurrentStage("developer");
      
      setTimeout(() => {
        setCurrentStage("reviewer");
        
        setTimeout(() => {
          // Navigate to results when finished
          setIsLoading(false);
          navigate('/result', { 
            state: { 
              taskDescription, 
              selectedAgents: autoSelectAgents ? ["planner", "developer", "reviewer"] : selectedAgents
            }
          });
        }, 3000);
      }, 3000);
    }, 3000);
  };

  const isAgentActive = (agentId: string) => {
    return selectedAgents.includes(agentId);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="space-y-8">
        {/* Task Input */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Describe Your Task</h2>
          <Textarea
            placeholder="What would you like to achieve? (e.g., Build a website using HTML, Create a marketing strategy...)"
            className="min-h-[150px] resize-y"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>

        {/* Agent Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="auto-select" 
              checked={autoSelectAgents} 
              onCheckedChange={(checked) => setAutoSelectAgents(checked === true)}
            />
            <Label htmlFor="auto-select" className="font-medium cursor-pointer">
              Let AI select agents for me
            </Label>
          </div>
          
          {!autoSelectAgents && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Select AI Agents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {agents.map((agent) => (
                  <Card 
                    key={agent.id}
                    className={`cursor-pointer transition-colors ${
                      isAgentActive(agent.id) ? 'border-primary ring-1 ring-primary' : ''
                    }`}
                    onClick={() => toggleAgent(agent.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className={`w-10 h-10 rounded-lg grid place-items-center ${
                          isAgentActive(agent.id) ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          {agent.icon}
                        </div>
                        <Checkbox 
                          checked={isAgentActive(agent.id)}
                          onCheckedChange={() => toggleAgent(agent.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <CardTitle className="text-base mt-2">{agent.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {agent.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{agent.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Start Task Button */}
        <div className="pt-4">
          <Button 
            className="w-full py-6 text-lg"
            disabled={!taskDescription || isLoading || (!autoSelectAgents && selectedAgents.length === 0)}
            onClick={handleStartTask}
          >
            {isLoading ? (
              <span className="flex items-center">
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : "Start Task"}
          </Button>
        </div>
        
        {/* Loading Section */}
        {isLoading && (
          <div className="space-y-3 mt-6 animate-fade-in">
            {currentStage === "planner" && (
              <AgentMessage
                agentName="Planner Agent"
                agentRole="Strategic Coordination"
                icon={(
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                )}
                isLoading={true}
                message=""
                timestamp={new Date().toLocaleTimeString()}
              />
            )}
            
            {currentStage === "developer" && (
              <AgentMessage
                agentName="Developer Agent"
                agentRole="Code Implementation"
                icon={(
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                )}
                isLoading={true}
                message=""
                timestamp={new Date().toLocaleTimeString()}
              />
            )}
            
            {currentStage === "reviewer" && (
              <AgentMessage
                agentName="Reviewer Agent"
                agentRole="Quality Assurance"
                icon={(
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                )}
                isLoading={true}
                message=""
                timestamp={new Date().toLocaleTimeString()}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskInputSection;


import React, { useEffect, useState } from 'react';

const AnimatedDiagram = () => {
  const [activeAgent, setActiveAgent] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent(prev => (prev + 1) % 5);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const agents = [
    { name: 'Planner', color: 'border-blue-400 bg-blue-400/10' },
    { name: 'Researcher', color: 'border-green-400 bg-green-400/10' },
    { name: 'Designer', color: 'border-purple-400 bg-purple-400/10' },
    { name: 'Coder', color: 'border-amber-400 bg-amber-400/10' },
    { name: 'Tester', color: 'border-red-400 bg-red-400/10' }
  ];

  return (
    <div className="w-full max-w-lg mx-auto my-12">
      {/* Center task hub */}
      <div className="relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary animate-pulse-glow"></div>
            </div>
            <div className="text-sm font-medium mt-1">Task Hub</div>
          </div>
        </div>
        
        {/* Agent nodes */}
        <div className="relative h-80 w-80 mx-auto">
          {agents.map((agent, index) => {
            // Calculate position on the circle
            const angle = (index * (2 * Math.PI / agents.length)) - Math.PI / 2;
            const radius = 120;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            const isActive = index === activeAgent;
            
            return (
              <div 
                key={agent.name}
                className={`absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${agent.color} flex items-center justify-center transition-all duration-300
                  ${isActive ? 'scale-110 shadow-lg z-20' : 'scale-90 opacity-80'}`}
                style={{ 
                  left: `calc(50% + ${x}px)`, 
                  top: `calc(50% + ${y}px)`
                }}
              >
                <div className="text-center">
                  <div className="text-xs font-medium">{agent.name}</div>
                </div>
              </div>
            );
          })}
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="currentColor" className="text-primary/30" strokeWidth="1">
              {agents.map((_, index) => {
                const angle = (index * (2 * Math.PI / agents.length)) - Math.PI / 2;
                const radius = 120;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                
                return (
                  <line 
                    key={`line-${index}`}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${x}px)`}
                    y2={`calc(50% + ${y}px)`}
                    className={`${index === activeAgent ? 'stroke-primary' : 'stroke-primary/30'} transition-all duration-300`}
                    strokeWidth={index === activeAgent ? 2 : 1}
                  />
                );
              })}
              
              {/* Circle connecting all agents */}
              <circle 
                cx="50%" 
                cy="50%" 
                r="120" 
                className="text-primary/20" 
                strokeDasharray="4 4" 
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedDiagram;

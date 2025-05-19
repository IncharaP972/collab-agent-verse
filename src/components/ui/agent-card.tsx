
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface AgentCardProps {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

const AgentCard = ({ 
  name, 
  role, 
  description, 
  icon, 
  selected = false, 
  onClick 
}: AgentCardProps) => {
  return (
    <Card 
      className={`transition-all duration-300 ${selected ? 'border-primary shadow-md shadow-primary/20' : 'border-border hover:border-primary/40'}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={`w-12 h-12 rounded-lg grid place-items-center ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            {icon}
          </div>
          <Button 
            variant={selected ? "default" : "outline"} 
            size="sm" 
            onClick={onClick}
            className={`transition-all duration-300 ${selected ? 'bg-primary' : ''}`}
          >
            {selected ? 'Selected' : 'Add Agent'}
          </Button>
        </div>
        <CardTitle className="text-lg mt-3">{name}</CardTitle>
        <CardDescription className="text-xs uppercase font-semibold text-muted-foreground">
          {role}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AgentCard;

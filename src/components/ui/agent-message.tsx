
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface AgentMessageProps {
  agentName: string;
  agentRole: string;
  icon: React.ReactNode;
  message: string;
  isLoading?: boolean;
  timestamp?: string;
}

const AgentMessage = ({
  agentName,
  agentRole,
  icon,
  message,
  isLoading = false,
  timestamp
}: AgentMessageProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 pt-3 flex flex-row items-center space-x-3">
        <div className="w-8 h-8 rounded-md grid place-items-center bg-muted">
          {icon}
        </div>
        <div>
          <div className="font-semibold leading-none">{agentName}</div>
          <div className="text-xs text-muted-foreground">{agentRole}</div>
        </div>
        {timestamp && (
          <div className="text-xs text-muted-foreground ml-auto">
            {timestamp}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-current animate-pulse"></div>
            <div className="h-2 w-2 rounded-full bg-current animate-pulse delay-150"></div>
            <div className="h-2 w-2 rounded-full bg-current animate-pulse delay-300"></div>
            <span className="ml-1 text-sm">Thinking...</span>
          </div>
        ) : (
          <div className="text-sm whitespace-pre-wrap">{message}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentMessage;

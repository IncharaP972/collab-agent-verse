
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TaskInput = () => {
  const navigate = useNavigate();
  const [taskDescription, setTaskDescription] = useState("");
  const [selectionMethod, setSelectionMethod] = useState("auto");
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (selectionMethod === "manual") {
        navigate('/agent-selection', { state: { taskDescription } });
      } else {
        navigate('/collaboration', { state: { taskDescription, autoSelected: true } });
      }
      setSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 pb-20">
        <div className="container max-w-4xl py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Describe Your Task</h1>
            <p className="text-muted-foreground">
              Provide details about what you'd like our AI agents to accomplish for you
            </p>
          </div>
          
          <Card className="mb-8">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
                <CardDescription>
                  Be specific about what you want to achieve. The more details you provide, the better results our AI agents can deliver.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="task-description">Task Description</Label>
                  <Textarea 
                    id="task-description"
                    placeholder="E.g., Build a landing page for my coffee shop with a minimalist design, online ordering functionality, and menu display..."
                    className="min-h-[200px] resize-y"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Agent Selection Method</Label>
                  <RadioGroup 
                    defaultValue="auto" 
                    value={selectionMethod}
                    onValueChange={setSelectionMethod}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg cursor-pointer border border-transparent hover:border-primary/30 transition-colors">
                      <RadioGroupItem value="auto" id="auto" />
                      <div>
                        <Label htmlFor="auto" className="font-medium cursor-pointer">Automatic Selection</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Let our system analyze your task and choose the optimal combination of AI agents.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg cursor-pointer border border-transparent hover:border-primary/30 transition-colors">
                      <RadioGroupItem value="manual" id="manual" />
                      <div>
                        <Label htmlFor="manual" className="font-medium cursor-pointer">Manual Selection</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Choose which AI agents you want to work on your task.
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-6 flex justify-between">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={!taskDescription || submitting}
                  className="min-w-[120px]"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="bg-muted/50 rounded-lg p-4 border border-muted text-sm text-muted-foreground">
            <h3 className="font-medium text-foreground mb-2">Task Examples:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>"Design a responsive e-commerce website with product catalog, shopping cart, and checkout process."</li>
              <li>"Create a content marketing plan for my startup, including blog post ideas and social media strategy."</li>
              <li>"Build a simple Python script that analyzes CSV data and generates a summary report with charts."</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TaskInput;

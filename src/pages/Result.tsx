
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { taskDescription, messages } = location.state || { 
    taskDescription: "Sample task",
    messages: []
  };
  
  // For a real app, this would come from the actual completed task
  // Here we're just simulating sample content
  const mockResults = {
    code: `
// Sample code result
function createResponsiveLayout() {
  const container = document.createElement('div');
  container.classList.add('container', 'mx-auto', 'px-4');
  
  const header = document.createElement('header');
  header.classList.add('py-4', 'border-b', 'mb-8');
  
  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('flex', 'justify-between', 'items-center');
  
  const logo = document.createElement('div');
  logo.classList.add('font-bold', 'text-xl');
  logo.textContent = 'Brand Name';
  
  // Add more elements and functionality
  // ...
  
  return container;
}
    `,
    design: `
Here's the design concept for the user interface:

1. Color Palette:
   - Primary: #6366f1 (Indigo)
   - Secondary: #0ea5e9 (Sky Blue)
   - Accent: #22d3ee (Cyan)
   - Background: White to light gray gradient
   - Text: Dark slate for readability

2. Typography:
   - Primary Font: Inter (Sans-serif)
   - Headings: Bold weight, 1.5x line height
   - Body: Regular weight, 1.7x line height
   - Call to action: Medium weight, slightly larger

3. Layout Structure:
   - Responsive grid system with 12 columns
   - Consistent spacing using 4px increments
   - Full-width sections alternating with contained content
   - Strategic whitespace to improve readability
    `,
    report: `
# Implementation Report

## Requirements Analysis
The requested task has been implemented according to specifications. The solution addresses all key requirements while maintaining best practices for performance and usability.

## Technical Implementation
The implementation uses modern frameworks and approaches including:
- Responsive design principles
- Semantic HTML structure
- Progressive enhancement
- Accessibility considerations (WCAG 2.1 AA)

## Testing Results
The solution has been tested across multiple environments:
- Desktop browsers: Chrome, Firefox, Safari, Edge
- Mobile devices: iOS (Safari) and Android (Chrome)
- Screen readers and keyboard navigation

No critical issues were found. Minor adjustments were made to improve responsive behavior on ultra-wide screens.

## Recommendations
For future enhancements, consider:
1. Adding internationalization support
2. Implementing dark mode
3. Optimizing image loading with lazy loading
    `
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // In a real app, you would show a toast notification here
    alert("Content copied to clipboard");
  };
  
  const downloadFile = (content: string, fileName: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const startNewTask = () => {
    navigate('/task');
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 pb-20">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Task Results</h1>
              <p className="text-muted-foreground">
                Your collaborative AI agents have completed the task
              </p>
            </div>
            <Button onClick={startNewTask}>
              Start New Task
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Task Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{taskDescription}</p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Final Result</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <Tabs defaultValue="design" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="code">Implementation</TabsTrigger>
                  <TabsTrigger value="report">Report</TabsTrigger>
                </TabsList>
                <TabsContent value="design" className="space-y-4">
                  <div className="bg-muted/30 rounded-md p-4 font-mono text-sm whitespace-pre-wrap">
                    {mockResults.design}
                  </div>
                  <div className="flex justify-end space-x-3 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(mockResults.design)}
                    >
                      Copy to Clipboard
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => downloadFile(mockResults.design, "design-concept.txt")}
                    >
                      Download
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="code" className="space-y-4">
                  <div className="bg-muted/30 rounded-md p-4 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                    {mockResults.code}
                  </div>
                  <div className="flex justify-end space-x-3 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(mockResults.code)}
                    >
                      Copy to Clipboard
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => downloadFile(mockResults.code, "implementation.js")}
                    >
                      Download
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="report" className="space-y-4">
                  <div className="bg-muted/30 rounded-md p-4 font-mono text-sm whitespace-pre-wrap">
                    {mockResults.report}
                  </div>
                  <div className="flex justify-end space-x-3 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(mockResults.report)}
                    >
                      Copy to Clipboard
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => downloadFile(mockResults.report, "implementation-report.md")}
                    >
                      Download
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/30 p-6 rounded-lg border">
            <div>
              <h2 className="text-lg font-semibold">Need Further Refinements?</h2>
              <p className="text-sm text-muted-foreground">
                You can continue refining this result with our AI agents
              </p>
            </div>
            <div className="space-x-3">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Back to Collaboration
              </Button>
              <Button onClick={startNewTask}>
                New Task
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Result;

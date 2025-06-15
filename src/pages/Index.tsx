
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MeetingNotesGenerator } from "@/components/tools/MeetingNotesGenerator";
import { EmailSummarizer } from "@/components/tools/EmailSummarizer";
import { ContractAnalyzer } from "@/components/tools/ContractAnalyzer";
import { CodeExplainer } from "@/components/tools/CodeExplainer";
import { ToolNavigation } from "@/components/ToolNavigation";

const Index = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: "meeting-notes",
      title: "AI Meeting Notes Generator",
      description: "Transform audio recordings and transcripts into structured meeting notes with key decisions and action items",
      icon: "🎤",
      features: ["Audio/Transcript Upload", "Key Decisions Extraction", "Action Items & Ownership", "Speaker Identification"],
      component: MeetingNotesGenerator
    },
    {
      id: "email-summarizer",
      title: "Email Summarizer & Smart Responder",
      description: "Summarize lengthy email threads and generate intelligent, contextually relevant responses",
      icon: "📧",
      features: ["Email Thread Summarization", "Smart Response Generation", "Action Item Identification", "Calendar Event Suggestions"],
      component: EmailSummarizer
    },
    {
      id: "contract-analyzer",
      title: "Contract Analyzer",
      description: "Analyze legal contracts to identify risky clauses, extract key terms, and provide layman summaries",
      icon: "📋",
      features: ["Risk Clause Flagging", "Key Term Extraction", "Layman's Summary", "Compliance Checking"],
      component: ContractAnalyzer
    },
    {
      id: "code-explainer",
      title: "Code Explainer & Debugger",
      description: "Explain code snippets, identify bugs, suggest optimizations, and generate test cases",
      icon: "💻",
      features: ["Code Explanation", "Bug Detection", "Optimization Suggestions", "Test Case Generation"],
      component: CodeExplainer
    }
  ];

  const ActiveToolComponent = activeTool ? tools.find(t => t.id === activeTool)?.component : null;

  if (activeTool && ActiveToolComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <ToolNavigation onBack={() => setActiveTool(null)} />
        <div className="container mx-auto px-4 py-8">
          <ActiveToolComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Gemini AI Productivity Suite
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Leverage the power of Gemini AI to enhance efficiency, streamline workflows, and automate repetitive tasks across various professional domains
            </p>
            <Badge variant="secondary" className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Powered by Gemini AI
            </Badge>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <Card 
              key={tool.id} 
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setActiveTool(tool.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{tool.icon}</div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-600 leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800 mb-2">Key Features:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                  >
                    Try {tool.title.split(' ')[1]} Tool →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Why Choose Our AI Suite?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">30% Time Savings</h3>
              <p className="text-slate-600">Reduce time spent on manual, repetitive tasks significantly</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Decision-Making</h3>
              <p className="text-slate-600">Get quick, accurate insights to support informed decisions</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Better Information Access</h3>
              <p className="text-slate-600">Make complex information digestible and easily searchable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

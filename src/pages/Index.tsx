
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { MeetingNotesGenerator } from "@/components/tools/MeetingNotesGenerator";
import { EmailSummarizer } from "@/components/tools/EmailSummarizer";
import { ContractAnalyzer } from "@/components/tools/ContractAnalyzer";
import { CodeExplainer } from "@/components/tools/CodeExplainer";
import { ToolNavigation } from "@/components/ToolNavigation";
import { ApiConfiguration } from "@/components/ApiConfiguration";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showApiConfig, setShowApiConfig] = useState(false);

  const tools = [{
    id: "meeting-notes",
    title: "AI Meeting Notes Generator",
    description: "Transform audio recordings and transcripts into structured meeting notes with key decisions and action items",
    icon: "🎤",
    features: ["Audio/Transcript Upload", "Key Decisions Extraction", "Action Items & Ownership", "Speaker Identification"],
    component: MeetingNotesGenerator
  }, {
    id: "email-summarizer",
    title: "Email Summarizer & Smart Responder",
    description: "Summarize lengthy email threads and generate intelligent, contextually relevant responses",
    icon: "📧",
    features: ["Email Thread Summarization", "Smart Response Generation", "Action Item Identification", "Calendar Event Suggestions"],
    component: EmailSummarizer
  }, {
    id: "contract-analyzer",
    title: "Contract Analyzer",
    description: "Analyze legal contracts to identify risky clauses, extract key terms, and provide layman summaries",
    icon: "📋",
    features: ["Risk Clause Flagging", "Key Term Extraction", "Layman's Summary", "Compliance Checking"],
    component: ContractAnalyzer
  }, {
    id: "code-explainer",
    title: "Code Explainer & Debugger",
    description: "Explain code snippets, identify bugs, suggest optimizations, and generate test cases",
    icon: "💻",
    features: ["Code Explanation", "Bug Detection", "Optimization Suggestions", "Test Case Generation"],
    component: CodeExplainer
  }];

  const ActiveToolComponent = activeTool ? tools.find(t => t.id === activeTool)?.component : null;

  if (activeTool && ActiveToolComponent) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <ToolNavigation onBack={() => setActiveTool(null)} />
        <div className="container mx-auto px-4 py-8">
          <ActiveToolComponent />
        </div>
      </div>;
  }

  if (showApiConfig) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setShowApiConfig(false)} className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                ← Back to Suite
              </Button>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                API Configuration
              </h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <ApiConfiguration />
        </div>
      </div>;
  }

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                Productivity & Automation Tools
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                Leverage Gemini AI to enhance efficiency and automate tasks
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs hidden sm:inline-flex">
                Powered by Gemini AI
              </Badge>
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={() => setShowApiConfig(true)} className="flex items-center gap-1">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">API</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {tools.map(tool => <Card key={tool.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm cursor-pointer" onClick={() => setActiveTool(tool.id)}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl md:text-3xl">{tool.icon}</div>
                  <CardTitle className="text-lg md:text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-sm md:text-base">Key Features:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {tool.features.map((feature, index) => <div key={index} className="flex items-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                        {feature}
                      </div>)}
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 text-sm">
                    Try {tool.title.split(' ')[1]} Tool →
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Benefits Section */}
        <div className="mt-12 md:mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 md:mb-8">Why Choose Our AI Suite?</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">⚡</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 dark:text-slate-200">30% Time Savings</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Reduce time spent on manual, repetitive tasks significantly</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">🎯</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 dark:text-slate-200">Enhanced Decision-Making</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Get quick, accurate insights to support informed decisions</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">🔍</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 dark:text-slate-200">Better Information Access</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Make complex information digestible and easily searchable</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default Index;

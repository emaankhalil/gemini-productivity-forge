import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";

export const CodeExplainer = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [inputMode, setInputMode] = useState<"text" | "file">("text");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCode(content);
    };
    reader.readAsText(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setCode("");
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide code to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setResults({
        explanation: "This code defines a React functional component called 'UserProfile' that displays user information. It uses React hooks (useState and useEffect) to manage component state and side effects. The component fetches user data from an API when it mounts and displays it in a formatted card layout.",
        lineByLineAnalysis: [
          { line: 1, code: "import React, { useState, useEffect } from 'react';", explanation: "Imports React library and two hooks for state management and side effects" },
          { line: 3, code: "const UserProfile = ({ userId }) => {", explanation: "Defines a functional component that accepts userId as a prop" },
          { line: 4, code: "  const [user, setUser] = useState(null);", explanation: "Creates state variable 'user' initialized to null" },
          { line: 5, code: "  const [loading, setLoading] = useState(true);", explanation: "Creates loading state to track data fetching status" }
        ],
        bugs: [
          {
            type: "Error Handling",
            severity: "Medium",
            description: "No error handling for failed API requests",
            suggestion: "Add try-catch block around fetch operation and handle errors gracefully"
          },
          {
            type: "Memory Leak",
            severity: "Low",
            description: "Component doesn't clean up if unmounted during fetch",
            suggestion: "Use AbortController or cleanup function in useEffect"
          }
        ],
        optimizations: [
          "Add loading spinner component for better UX",
          "Implement error boundary for graceful error handling",
          "Consider using React Query or SWR for data fetching",
          "Add PropTypes or TypeScript for better type safety"
        ],
        testCases: [
          {
            name: "Should render user data when loaded",
            code: `test('renders user data', async () => {
  const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
  render(<UserProfile userId={1} />);
  // Add assertions
});`
          },
          {
            name: "Should show loading state initially",
            code: `test('shows loading state', () => {
  render(<UserProfile userId={1} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});`
          }
        ],
        complexity: "Medium",
        maintainability: "Good"
      });
      setIsLoading(false);
      toast({
        title: "Analysis Complete",
        description: "Code analysis has been completed successfully!",
      });
    }, 2500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800 border-red-300";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">💻 Code Explainer & Debugger</h2>
        <p className="text-slate-600 text-lg">Explain code, identify bugs, suggest optimizations, and generate tests</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔧 Code Input
            </CardTitle>
            <CardDescription>
              Upload a code file or paste your code snippet below for analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <Button
                variant={inputMode === "text" ? "default" : "outline"}
                onClick={() => setInputMode("text")}
                size="sm"
              >
                Text Input
              </Button>
              <Button
                variant={inputMode === "file" ? "default" : "outline"}
                onClick={() => setInputMode("file")}
                size="sm"
              >
                File Upload
              </Button>
            </div>

            <div>
              <Label htmlFor="language" className="text-sm font-medium">
                Programming Language
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {inputMode === "file" ? (
              <div>
                <Label className="text-sm font-medium">Code File</Label>
                <div className="mt-2">
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    onFileRemove={handleFileRemove}
                    selectedFile={selectedFile}
                    acceptedTypes={['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.c', '.cpp', '.h', '.hpp', '.html', '.htm', '.go', '.rs', '.txt']}
                    maxSize={5 * 1024 * 1024} // 5MB
                    placeholder="Drag and drop your code file here"
                    icon={<span className="text-2xl">📄</span>}
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="code-input" className="text-sm font-medium">
                  Code Snippet
                </Label>
                <Textarea
                  id="code-input"
                  placeholder={`// Example JavaScript code:
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};`}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-2 min-h-[400px] resize-none font-mono text-sm"
                />
              </div>
            )}

            <Button 
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isLoading ? "Analyzing Code..." : "Analyze Code"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔍 Analysis Results
            </CardTitle>
            <CardDescription>
              AI-powered code insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!results ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-6xl mb-4">🧠</div>
                <p>Your code analysis will appear here</p>
              </div>
            ) : (
              <Tabs defaultValue="explanation" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                  <TabsTrigger value="bugs">Bugs</TabsTrigger>
                  <TabsTrigger value="optimization">Optimize</TabsTrigger>
                  <TabsTrigger value="tests">Tests</TabsTrigger>
                </TabsList>

                <TabsContent value="explanation" className="space-y-4">
                  {/* Overview */}
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline">Complexity: {results.complexity}</Badge>
                    <Badge variant="outline">Maintainability: {results.maintainability}</Badge>
                  </div>

                  {/* Overall Explanation */}
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      📖 Overall Explanation
                    </h3>
                    <p className="text-slate-600 bg-slate-50 p-4 rounded-lg leading-relaxed">{results.explanation}</p>
                  </div>

                  <Separator />

                  {/* Line by Line */}
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      📝 Line-by-Line Analysis
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {results.lineByLineAnalysis.map((item: any, index: number) => (
                        <div key={index} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">Line {item.line}</Badge>
                          </div>
                          <code className="text-sm bg-slate-100 p-1 rounded block mb-2 font-mono">{item.code}</code>
                          <p className="text-sm text-slate-600">{item.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="bugs" className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      🐛 Identified Issues
                    </h3>
                    {results.bugs.length === 0 ? (
                      <div className="text-center py-8 text-green-600">
                        <div className="text-4xl mb-2">✅</div>
                        <p>No bugs detected! Your code looks clean.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {results.bugs.map((bug: any, index: number) => (
                          <div key={index} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(bug.severity)}`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{bug.type}</h4>
                              <Badge className={getSeverityColor(bug.severity)}>{bug.severity}</Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{bug.description}</p>
                            <div className="bg-white p-2 rounded text-sm">
                              <strong>Suggestion:</strong> {bug.suggestion}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="optimization" className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      ⚡ Optimization Suggestions
                    </h3>
                    <div className="space-y-2">
                      {results.optimizations.map((opt: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-slate-600 bg-green-50 p-3 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tests" className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      🧪 Generated Test Cases
                    </h3>
                    <div className="space-y-4">
                      {results.testCases.map((test: any, index: number) => (
                        <div key={index} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <h4 className="font-medium text-slate-800 mb-2">{test.name}</h4>
                          <pre className="bg-slate-100 p-3 rounded text-sm overflow-x-auto font-mono">
                            <code>{test.code}</code>
                          </pre>
                          <Button size="sm" variant="outline" className="mt-2">Copy Test</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export const ContractAnalyzer = () => {
  const [contractText, setContractText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!contractText.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide contract text or upload a document to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setResults({
        riskLevel: "Medium",
        summary: "This is a standard software service agreement with some concerning clauses around liability and termination. The contract favors the service provider with broad indemnification requirements and limited liability caps. Payment terms are reasonable but automatic renewal clauses should be reviewed carefully.",
        riskClauses: [
          {
            clause: "Limitation of Liability",
            risk: "High",
            description: "Provider's liability is capped at fees paid in the last 12 months, which may be insufficient for potential damages.",
            section: "Section 8.2"
          },
          {
            clause: "Indemnification",
            risk: "Medium",
            description: "Broad indemnification requirements that could expose your company to third-party claims.",
            section: "Section 9.1"
          },
          {
            clause: "Automatic Renewal",
            risk: "Medium",
            description: "Contract automatically renews unless terminated 90 days before expiration.",
            section: "Section 12.3"
          }
        ],
        keyTerms: [
          { term: "Contract Duration", value: "24 months", section: "Section 2.1" },
          { term: "Payment Terms", value: "Net 30 days", section: "Section 4.2" },
          { term: "Governing Law", value: "Delaware", section: "Section 15.1" },
          { term: "Termination Notice", value: "90 days written notice", section: "Section 12.2" },
          { term: "Service Level Agreement", value: "99.5% uptime", section: "Section 6.1" }
        ],
        parties: [
          "ABC Corporation (Customer)",
          "XYZ Software Services Inc. (Provider)"
        ],
        recommendations: [
          "Negotiate higher liability caps or carve-outs for critical damages",
          "Review and potentially limit indemnification scope",
          "Consider reducing automatic renewal notice period to 30-60 days",
          "Add specific data protection and security requirements"
        ]
      });
      setIsLoading(false);
      toast({
        title: "Analysis Complete",
        description: "Contract analysis has been completed successfully!",
      });
    }, 3000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800 border-red-300";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">📋 Contract Analyzer</h2>
        <p className="text-slate-600 text-lg">Identify risky clauses, extract key terms, and get layman summaries</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📄 Contract Upload
            </CardTitle>
            <CardDescription>
              Upload your contract document or paste the text below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="document-upload" className="text-sm font-medium">
                Document Upload (PDF, DOCX)
              </Label>
              <div className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <div className="text-3xl mb-2">📄</div>
                <p className="text-slate-600 mb-2">Drag and drop your contract here</p>
                <Button variant="outline" size="sm">Choose File</Button>
              </div>
            </div>

            <div className="text-center text-slate-500">
              <span>or</span>
            </div>

            <div>
              <Label htmlFor="contract-text" className="text-sm font-medium">
                Contract Text
              </Label>
              <Textarea
                id="contract-text"
                placeholder="Paste your contract text here... Example: 'SOFTWARE SERVICE AGREEMENT - This Agreement is entered into between ABC Corporation and XYZ Software Services Inc...'"
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                className="mt-2 min-h-[300px] resize-none font-mono text-sm"
              />
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isLoading ? "Analyzing Contract..." : "Analyze Contract"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚖️ Analysis Results
            </CardTitle>
            <CardDescription>
              AI-powered contract insights and risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!results ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-6xl mb-4">⚖️</div>
                <p>Your contract analysis will appear here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Risk Overview */}
                <Alert className={`border-2 ${getRiskColor(results.riskLevel)}`}>
                  <AlertDescription className="font-medium">
                    Overall Risk Level: <span className="font-bold">{results.riskLevel}</span>
                  </AlertDescription>
                </Alert>

                {/* Contract Summary */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    📄 Layman's Summary
                  </h3>
                  <p className="text-slate-600 bg-slate-50 p-4 rounded-lg leading-relaxed">{results.summary}</p>
                </div>

                <Separator />

                {/* Risk Clauses */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    ⚠️ Risk Clauses
                  </h3>
                  <div className="space-y-3">
                    {results.riskClauses.map((clause: any, index: number) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${getRiskColor(clause.risk)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{clause.clause}</h4>
                          <Badge className={getRiskColor(clause.risk)}>{clause.risk} Risk</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">{clause.description}</p>
                        <p className="text-xs text-slate-500">{clause.section}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Key Terms */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    🔑 Key Terms
                  </h3>
                  <div className="grid gap-3">
                    {results.keyTerms.map((term: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800">{term.term}</p>
                          <p className="text-xs text-slate-500">{term.section}</p>
                        </div>
                        <Badge variant="outline">{term.value}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Parties */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    👥 Contract Parties
                  </h3>
                  <div className="space-y-2">
                    {results.parties.map((party: string, index: number) => (
                      <Badge key={index} variant="secondary" className="block w-fit">{party}</Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Recommendations */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    💡 Recommendations
                  </h3>
                  <div className="space-y-2">
                    {results.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-slate-600 bg-green-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export const EmailSummarizer = () => {
  const [emailThread, setEmailThread] = useState("");
  const [responseTone, setResponseTone] = useState("professional");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!emailThread.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide an email thread to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setResults({
        summary: "This email thread discusses the upcoming product launch timeline. The marketing team is requesting final assets, while the development team needs two additional weeks for testing. The CEO has approved the deadline extension but emphasized the importance of quality assurance.",
        keyPoints: [
          "Product launch postponed by 2 weeks for additional testing",
          "Marketing assets deadline moved to January 15th",
          "CEO approved timeline extension with quality emphasis",
          "Development team identified critical bugs in the payment system"
        ],
        actionItems: [
          "Marketing team to update campaign timeline",
          "Development to provide daily testing reports",
          "Schedule stakeholder update meeting"
        ],
        suggestedEvents: [
          { title: "Stakeholder Update Meeting", date: "Next Tuesday, 2:00 PM" },
          { title: "Marketing Asset Review", date: "January 15th, 10:00 AM" }
        ],
        participants: ["John Smith (CEO)", "Sarah Johnson (Marketing)", "Mike Chen (Development)", "Lisa Park (QA)"],
        urgency: "Medium",
        sentiment: "Professional but concerned"
      });
      setIsLoading(false);
      toast({
        title: "Analysis Complete",
        description: "Email summary and smart response generated successfully!",
      });
    }, 2000);
  };

  const generateResponse = () => {
    const responses = {
      professional: "Thank you for the detailed update. I acknowledge the timeline extension for additional testing and understand the importance of ensuring product quality. I'll coordinate with my team to adjust our deliverables accordingly and will provide the requested updates by the specified deadlines.",
      informal: "Thanks for keeping me in the loop! Totally understand the need for more testing time - better safe than sorry. I'll update our timeline and make sure we hit those new deadlines. Let me know if you need anything else!",
      urgent: "Acknowledged. Given the critical nature of these timeline changes, I will immediately realign our priorities and ensure all stakeholders are informed. Please confirm receipt of this message and provide any additional requirements that may impact our delivery schedule."
    };
    
    return responses[responseTone as keyof typeof responses];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">📧 Email Summarizer & Smart Responder</h2>
        <p className="text-slate-600 text-lg">Summarize lengthy email threads and generate intelligent responses</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📥 Email Thread Input
            </CardTitle>
            <CardDescription>
              Paste your email conversation below for analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="email-thread" className="text-sm font-medium">
                Email Thread
              </Label>
              <Textarea
                id="email-thread"
                placeholder="From: john@company.com
To: team@company.com
Subject: Product Launch Timeline Update

Hi team,

I wanted to update everyone on our Q1 product launch timeline...

---

From: sarah@company.com
To: john@company.com
Subject: Re: Product Launch Timeline Update

John,

Thanks for the update. The marketing team has a few concerns about the timeline..."
                value={emailThread}
                onChange={(e) => setEmailThread(e.target.value)}
                className="mt-2 min-h-[300px] resize-none font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="response-tone" className="text-sm font-medium">
                Response Tone
              </Label>
              <Select value={responseTone} onValueChange={setResponseTone}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select response tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="informal">Informal</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isLoading ? "Analyzing Email Thread..." : "Analyze & Generate Response"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ✨ Analysis Results
            </CardTitle>
            <CardDescription>
              AI-powered email insights and response
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!results ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-6xl mb-4">📊</div>
                <p>Your email analysis will appear here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Thread Overview */}
                <div className="flex gap-2 mb-6">
                  <Badge variant="outline">Urgency: {results.urgency}</Badge>
                  <Badge variant="outline">{results.participants.length} Participants</Badge>
                  <Badge variant="outline">{results.sentiment}</Badge>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    📄 Thread Summary
                  </h3>
                  <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">{results.summary}</p>
                </div>

                <Separator />

                {/* Key Points */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    🔍 Key Points
                  </h3>
                  <div className="space-y-2">
                    {results.keyPoints.map((point: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-slate-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Action Items */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    ✅ Action Items
                  </h3>
                  <div className="space-y-2">
                    {results.actionItems.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-slate-600 bg-green-50 p-2 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Suggested Events */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    📅 Suggested Calendar Events
                  </h3>
                  <div className="space-y-2">
                    {results.suggestedEvents.map((event: any, index: number) => (
                      <div key={index} className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
                        <p className="font-medium text-slate-800">{event.title}</p>
                        <p className="text-sm text-slate-600">{event.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Smart Response */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    💬 Smart Response ({responseTone})
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-slate-700">{generateResponse()}</p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">Copy Response</Button>
                      <Button size="sm" variant="outline">Edit Response</Button>
                    </div>
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

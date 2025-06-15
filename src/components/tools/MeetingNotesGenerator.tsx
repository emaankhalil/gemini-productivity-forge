import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/ui/file-upload";
import { Mic } from "lucide-react";

export const MeetingNotesGenerator = () => {
  const [transcript, setTranscript] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Clear transcript when file is selected
    setTranscript("");
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const handleAnalyze = async () => {
    if (!transcript.trim() && !selectedFile) {
      toast({
        title: "Input Required",
        description: "Please provide a meeting transcript or upload an audio file.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setResults({
        summary: "The team discussed the Q4 product roadmap, focusing on the new user dashboard redesign and mobile app optimization. Key concerns were raised about timeline feasibility and resource allocation.",
        keyDecisions: [
          "Approved the new dashboard UI mockups with minor revisions",
          "Decided to prioritize mobile optimization over desktop features",
          "Agreed to extend the deadline by two weeks to ensure quality"
        ],
        actionItems: [
          { task: "Update dashboard mockups based on feedback", assignee: "Sarah (Design Team)", deadline: "Friday, Dec 20" },
          { task: "Conduct mobile performance audit", assignee: "Mike (Engineering)", deadline: "Monday, Dec 23" },
          { task: "Schedule follow-up review meeting", assignee: "Alex (PM)", deadline: "This week" }
        ],
        speakers: ["Alex (Product Manager)", "Sarah (Senior Designer)", "Mike (Lead Engineer)", "Lisa (QA Lead)"],
        duration: "45 minutes",
        participants: 4
      });
      setIsLoading(false);
      toast({
        title: "Analysis Complete",
        description: "Meeting notes have been generated successfully!",
      });
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">🎤 AI Meeting Notes Generator</h2>
        <p className="text-slate-600 text-lg">Transform your meeting recordings into structured, actionable notes</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 Input Meeting Content
            </CardTitle>
            <CardDescription>
              Upload audio files or paste your meeting transcript below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Audio Upload (MP3, WAV, M4A)
              </Label>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                selectedFile={selectedFile}
                acceptedTypes={['.mp3', '.wav', '.m4a', '.mp4']}
                placeholder="Drag and drop your audio file here"
                icon={<Mic className="w-8 h-8" />}
              />
            </div>

            <div className="text-center text-slate-500">
              <span>or</span>
            </div>

            <div>
              <Label htmlFor="transcript" className="text-sm font-medium">
                Meeting Transcript
              </Label>
              <Textarea
                id="transcript"
                placeholder="Paste your meeting transcript here... Example: 'Alex: Good morning everyone, let's start with the Q4 roadmap discussion. Sarah: I've prepared the new dashboard mockups...'"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="mt-2 min-h-[200px] resize-none"
                disabled={!!selectedFile}
              />
              {selectedFile && (
                <p className="text-xs text-gray-500 mt-1">
                  Audio file selected. Remove file to use text input.
                </p>
              )}
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isLoading ? "Analyzing Meeting..." : "Generate Meeting Notes"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ✨ Generated Notes
            </CardTitle>
            <CardDescription>
              AI-powered insights from your meeting
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!results ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-6xl mb-4">📋</div>
                <p>Your meeting notes will appear here after analysis</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Meeting Overview */}
                <div className="flex gap-4 mb-6">
                  <Badge variant="outline">Duration: {results.duration}</Badge>
                  <Badge variant="outline">{results.participants} Participants</Badge>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    📄 Meeting Summary
                  </h3>
                  <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">{results.summary}</p>
                </div>

                <Separator />

                {/* Key Decisions */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    ✅ Key Decisions
                  </h3>
                  <div className="space-y-2">
                    {results.keyDecisions.map((decision: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-slate-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{decision}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Action Items */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    🎯 Action Items
                  </h3>
                  <div className="space-y-3">
                    {results.actionItems.map((item: any, index: number) => (
                      <div key={index} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                        <p className="font-medium text-slate-800">{item.task}</p>
                        <div className="flex gap-4 mt-2 text-sm text-slate-600">
                          <span>👤 {item.assignee}</span>
                          <span>📅 {item.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Speakers */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    👥 Participants
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.speakers.map((speaker: string, index: number) => (
                      <Badge key={index} variant="secondary">{speaker}</Badge>
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

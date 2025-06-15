import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/ui/file-upload";
import { AudioRecorder } from "@/components/ui/audio-recorder";
import { Mic, Upload, Smile, Frown, Meh, Gauge, ClipboardCopy } from "lucide-react";

export const MeetingNotesGenerator = () => {
  const [transcript, setTranscript] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [inputMode, setInputMode] = useState<'text' | 'file' | 'record'>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setInputMode('file');
    setTranscript("");
    setRecordedAudio(null);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setInputMode('text');
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    setRecordedAudio(audioBlob);
    setInputMode('record');
    setTranscript("");
    setSelectedFile(null);
  };

  const handleRecordingClear = () => {
    setRecordedAudio(null);
    setInputMode('text');
  };

  const handleAnalyze = async () => {
    if (!transcript.trim() && !selectedFile && !recordedAudio) {
      toast({
        title: "Input Required",
        description: "Please provide a meeting transcript, upload an audio file, or record audio.",
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
          { task: "Update dashboard mockups based on feedback", assignee: "Sarah (Design Team)", deadline: "Friday, Dec 20", status: "In Progress" },
          { task: "Conduct mobile performance audit", assignee: "Mike (Engineering)", deadline: "Monday, Dec 23", status: "To Do" },
          { task: "Schedule follow-up review meeting", assignee: "Alex (PM)", deadline: "This week", status: "To Do" }
        ],
        duration: "45 minutes",
        participants: 4,
        effectivenessScore: 82,
        sentimentAnalysis: [
          { speaker: "Alex (Product Manager)", sentiment: "Neutral" },
          { speaker: "Sarah (Senior Designer)", sentiment: "Positive" },
          { speaker: "Mike (Lead Engineer)", sentiment: "Concerned" },
          { speaker: "Lisa (QA Lead)", sentiment: "Neutral" }
        ],
        followUpEmail: {
            subject: "Follow-up: Q4 Product Roadmap Discussion",
            body: "Hi Team,\n\nThank you for the productive discussion on the Q4 product roadmap. Here's a quick summary:\n\nKey Decisions:\n- The new dashboard UI mockups are approved with minor revisions.\n- We will prioritize mobile optimization over new desktop features for this quarter.\n- The final deadline has been extended by two weeks.\n\nAction Items:\n- Sarah: Update dashboard mockups based on feedback (Due: Friday, Dec 20)\n- Mike: Conduct mobile performance audit (Due: Monday, Dec 23)\n- Alex: Schedule follow-up review meeting (Due: This week)\n\nPlease review and let me know if I missed anything.\n\nBest regards,\nAlex"
        }
      });
      setIsLoading(false);
      toast({
        title: "Analysis Complete",
        description: "Meeting notes have been generated successfully!",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "The email content has been copied.",
      });
    }).catch(err => {
      toast({
        title: "Error",
        description: "Could not copy text to clipboard.",
        variant: "destructive"
      });
      console.error('Failed to copy: ', err);
    });
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return <Smile className="w-5 h-5 text-green-500 flex-shrink-0" />;
      case 'concerned':
      case 'negative':
        return <Frown className="w-5 h-5 text-red-500 flex-shrink-0" />;
      default:
        return <Meh className="w-5 h-5 text-yellow-500 flex-shrink-0" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "To Do":
        return <Badge variant="secondary">{status}</Badge>;
      case "In Progress":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80">{status}</Badge>;
      case "Done":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
              Record live audio, upload audio files, or paste your meeting transcript
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Mode Selector */}
            <div className="flex gap-2 mb-4">
              <Button
                variant={inputMode === 'record' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputMode('record')}
              >
                <Mic className="w-4 h-4 mr-2" />
                Record
              </Button>
              <Button
                variant={inputMode === 'file' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputMode('file')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              <Button
                variant={inputMode === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputMode('text')}
              >
                Text
              </Button>
            </div>

            {/* Live Recording */}
            {inputMode === 'record' && (
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Live Audio Recording
                </Label>
                <AudioRecorder
                  onRecordingComplete={handleRecordingComplete}
                  onRecordingClear={handleRecordingClear}
                />
              </div>
            )}

            {/* File Upload */}
            {inputMode === 'file' && (
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
            )}

            {/* Text Input */}
            {inputMode === 'text' && (
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
                />
              </div>
            )}

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
                <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
                  <Badge variant="outline">Duration: {results.duration}</Badge>
                  <Badge variant="outline">{results.participants} Participants</Badge>
                  <Badge variant="outline" className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5" />
                    Score: {results.effectivenessScore}/100
                  </Badge>
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
                      <div key={index} className="flex items-start gap-3 text-slate-600">
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
                        <div className="flex justify-between items-start gap-2">
                          <p className="font-medium text-slate-800 pr-2">{item.task}</p>
                          {getStatusBadge(item.status)}
                        </div>
                        <div className="flex gap-4 mt-2 text-sm text-slate-600">
                          <span>👤 {item.assignee}</span>
                          <span>📅 {item.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Sentiment Analysis */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    😊 Sentiment Analysis
                  </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {results.sentimentAnalysis.map((sentiment: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 bg-slate-50 p-2 rounded-md">
                        {getSentimentIcon(sentiment.sentiment)}
                        <span className="text-sm text-slate-700 truncate" title={sentiment.speaker}>{sentiment.speaker}:</span>
                        <span className="text-sm font-medium ml-auto">{sentiment.sentiment}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />

                {/* Follow-up Email */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    📧 Follow-up Email Draft
                  </h3>
                  <Card className="bg-slate-50/70 shadow-inner">
                    <CardHeader className="p-3 border-b flex-row items-center justify-between">
                       <p className="text-sm font-medium leading-none">Subject: {results.followUpEmail.subject}</p>
                       <Button variant="ghost" size="sm" className="h-7" onClick={() => copyToClipboard(results.followUpEmail.body)}>
                         <ClipboardCopy className="w-3.5 h-3.5 mr-1.5" />
                         Copy
                       </Button>
                    </CardHeader>
                    <CardContent className="p-4">
                      <pre className="text-sm text-slate-600 whitespace-pre-wrap font-sans">
                        {results.followUpEmail.body}
                      </pre>
                    </CardContent>
                  </Card>
                </div>

                <Separator />
                
                {/* Participants */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    👥 Participants
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.sentimentAnalysis.map((sa: any, index: number) => (
                      <Badge key={index} variant="secondary">{sa.speaker}</Badge>
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

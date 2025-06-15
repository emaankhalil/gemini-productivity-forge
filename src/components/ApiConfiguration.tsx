
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, Key, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ApiConfiguration = () => {
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState("");
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showElevenLabsKey, setShowElevenLabsKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved API keys from localStorage
    const savedGeminiKey = localStorage.getItem("gemini_api_key");
    const savedElevenLabsKey = localStorage.getItem("elevenlabs_api_key");
    
    if (savedGeminiKey) setGeminiApiKey(savedGeminiKey);
    if (savedElevenLabsKey) setElevenLabsApiKey(savedElevenLabsKey);
  }, []);

  const handleSaveKeys = () => {
    if (geminiApiKey.trim()) {
      localStorage.setItem("gemini_api_key", geminiApiKey.trim());
    }
    if (elevenLabsApiKey.trim()) {
      localStorage.setItem("elevenlabs_api_key", elevenLabsApiKey.trim());
    }

    toast({
      title: "API Keys Saved",
      description: "Your API keys have been saved securely in your browser.",
    });
  };

  const handleClearKeys = () => {
    localStorage.removeItem("gemini_api_key");
    localStorage.removeItem("elevenlabs_api_key");
    setGeminiApiKey("");
    setElevenLabsApiKey("");
    
    toast({
      title: "API Keys Cleared",
      description: "All API keys have been removed from your browser.",
    });
  };

  const isGeminiKeySet = localStorage.getItem("gemini_api_key");
  const isElevenLabsKeySet = localStorage.getItem("elevenlabs_api_key");

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          API Configuration
        </CardTitle>
        <CardDescription>
          Configure your API keys for enhanced AI functionality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gemini API Key */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="gemini-key" className="text-sm font-medium">
              Gemini API Key
            </Label>
            {isGeminiKeySet && <Badge variant="secondary" className="text-xs">Configured</Badge>}
          </div>
          <div className="relative">
            <Input
              id="gemini-key"
              type={showGeminiKey ? "text" : "password"}
              placeholder="Enter your Gemini API key"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowGeminiKey(!showGeminiKey)}
            >
              {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-slate-500">
            Get your API key from{" "}
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>

        {/* Eleven Labs API Key */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="elevenlabs-key" className="text-sm font-medium">
              Eleven Labs API Key
            </Label>
            {isElevenLabsKeySet && <Badge variant="secondary" className="text-xs">Configured</Badge>}
          </div>
          <div className="relative">
            <Input
              id="elevenlabs-key"
              type={showElevenLabsKey ? "text" : "password"}
              placeholder="Enter your Eleven Labs API key"
              value={elevenLabsApiKey}
              onChange={(e) => setElevenLabsApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowElevenLabsKey(!showElevenLabsKey)}
            >
              {showElevenLabsKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-slate-500">
            Get your API key from{" "}
            <a 
              href="https://elevenlabs.io/app/speech-synthesis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Eleven Labs Dashboard
            </a>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button 
            onClick={handleSaveKeys}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Key className="w-4 h-4 mr-2" />
            Save API Keys
          </Button>
          <Button 
            variant="outline" 
            onClick={handleClearKeys}
            className="px-4"
          >
            Clear
          </Button>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Security Note:</strong> Your API keys are stored locally in your browser and are not sent to any external servers. 
            For production applications, consider using environment variables or a secure backend.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

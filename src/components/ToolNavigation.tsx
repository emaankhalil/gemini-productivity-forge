
import { Button } from "@/components/ui/button";

interface ToolNavigationProps {
  onBack: () => void;
}

export const ToolNavigation = ({ onBack }: ToolNavigationProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-slate-100"
          >
            ← Back to Suite
          </Button>
          <div className="h-6 w-px bg-slate-300"></div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gemini AI Productivity Suite
          </h1>
        </div>
      </div>
    </div>
  );
};

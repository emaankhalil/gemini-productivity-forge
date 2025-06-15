
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mic, MicOff, Pause, Play, Square, Trash2 } from 'lucide-react';
import { useAudioRecording } from '@/hooks/useAudioRecording';

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  onRecordingClear: () => void;
}

export const AudioRecorder = ({ onRecordingComplete, onRecordingClear }: AudioRecorderProps) => {
  const {
    isRecording,
    isPaused,
    duration,
    audioBlob,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
    error
  } = useAudioRecording();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleClearRecording = () => {
    clearRecording();
    onRecordingClear();
  };

  React.useEffect(() => {
    if (audioBlob) {
      onRecordingComplete(audioBlob);
    }
  }, [audioBlob, onRecordingComplete]);

  if (audioBlob) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Mic className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Recording Complete</p>
              <p className="text-xs text-gray-500">Duration: {formatDuration(duration)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <audio controls className="h-8">
              <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
            </audio>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearRecording}
              className="h-8 w-8 p-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isRecording ? (isPaused ? 'bg-yellow-100' : 'bg-red-100 animate-pulse') : 'bg-gray-100'
            }`}>
              <Mic className={`w-8 h-8 ${
                isRecording ? (isPaused ? 'text-yellow-600' : 'text-red-600') : 'text-gray-500'
              }`} />
            </div>
          </div>

          {isRecording && (
            <div className="text-2xl font-mono text-gray-700">
              {formatDuration(duration)}
            </div>
          )}

          <div className="flex justify-center gap-2">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </Button>
            ) : (
              <>
                {!isPaused ? (
                  <Button
                    variant="outline"
                    onClick={pauseRecording}
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={resumeRecording}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                )}
                <Button
                  onClick={handleStopRecording}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </>
            )}
          </div>

          {!isRecording && (
            <p className="text-sm text-gray-500">
              Click "Start Recording" to begin capturing audio
            </p>
          )}
        </div>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

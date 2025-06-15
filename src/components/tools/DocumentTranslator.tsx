import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Languages, Download, FileText, Image, Video, FileAudio, Text } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DocumentTranslator = () => {
  const [inputMode, setInputMode] = useState<'file' | 'text'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese (Simplified)" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "nl", name: "Dutch" },
  ];

  const getFileTypeCategory = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')) return 'image';
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'].includes(extension || '')) return 'video';
    if (['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a'].includes(extension || '')) return 'audio';
    return 'document';
  };

  const getFileTypeIcon = (file: File) => {
    const category = getFileTypeCategory(file);
    switch (category) {
      case 'image': return <Image className="w-8 h-8" />;
      case 'video': return <Video className="w-8 h-8" />;
      case 'audio': return <FileAudio className="w-8 h-8" />;
      default: return <FileText className="w-8 h-8" />;
    }
  };

  const handleFileSelect = async (file: File) => {
    setInputMode('file');
    setSelectedFile(file);
    setExtractedText("");
    setTranslatedText("");
    
    const fileCategory = getFileTypeCategory(file);
    
    setIsExtracting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let mockExtractedText = "";
      
      switch (fileCategory) {
        case 'image':
          mockExtractedText = `Text extracted from image: ${file.name}

This is a demonstration of OCR (Optical Character Recognition) text extraction from an image file. In a real implementation, this would use services like:

- Google Cloud Vision API
- Amazon Textract
- Azure Computer Vision
- Tesseract.js for client-side OCR

The extracted text would include any readable text found in the image, such as:
- Signs and labels
- Document text in photos
- Handwritten notes (depending on quality)
- Menu items, receipts, business cards

File: ${file.name}
Type: Image (${file.type})
Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`;
          break;

        case 'video':
          mockExtractedText = `Transcript extracted from video: ${file.name}

This is a demonstration of video transcript extraction. In a real implementation, this would use:

- Speech-to-text APIs (Google Speech, AWS Transcribe, Azure Speech)
- Video processing libraries to extract audio
- Subtitle/caption extraction if available

The extracted content would include:
- Spoken dialogue and narration
- On-screen text and captions
- Audio descriptions
- Timestamps for each segment

File: ${file.name}
Type: Video (${file.type})
Duration: Estimated based on file size
Size: ${(file.size / 1024 / 1024).toFixed(2)} MB

Sample transcript content would appear here...`;
          break;

        case 'audio':
          mockExtractedText = `Transcript extracted from audio: ${file.name}

This is a demonstration of audio transcript extraction. In a real implementation, this would use:

- Speech-to-text services (Google Cloud Speech, AWS Transcribe)
- Audio processing libraries
- Speaker identification and diarization

The extracted content would include:
- Spoken words and dialogue
- Speaker identification (if multiple speakers)
- Timestamps and confidence scores
- Background audio descriptions

File: ${file.name}
Type: Audio (${file.type})
Size: ${(file.size / 1024 / 1024).toFixed(2)} MB

[Speaker 1]: Sample transcribed audio content would appear here...
[Speaker 2]: With proper speaker identification and timing...`;
          break;

        default:
          mockExtractedText = `Text extracted from document: ${file.name}

This is a demonstration of document text extraction. In a real implementation, this would use:

- PDF parsing libraries (pdf-parse, pdf2pic)
- DOCX processing (mammoth.js)
- Plain text reading
- Other document format parsers

File: ${file.name}
Type: Document (${file.type})
Size: ${(file.size / 1024 / 1024).toFixed(2)} MB

Sample document content would appear here...`;
      }
      
      setExtractedText(mockExtractedText);
      toast({
        title: "Content Extracted",
        description: `${fileCategory === 'document' ? 'Text' : fileCategory === 'image' ? 'Text from image' : 'Transcript'} has been successfully extracted.`,
      });
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: `Failed to extract content from the ${fileCategory}.`,
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setExtractedText("");
    setTranslatedText("");
  };

  const handleInputModeChange = (mode: string) => {
    if (mode === 'file' || mode === 'text') {
      setInputMode(mode as 'file' | 'text');
      setExtractedText("");
      setSelectedFile(null);
      setTranslatedText("");
    }
  };

  const handleTranslate = async () => {
    if (!extractedText || !targetLanguage) {
      toast({
        title: "Missing Information",
        description: "Please ensure you have extracted text and selected a target language.",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const selectedLang = languages.find(lang => lang.code === targetLanguage);
      const fileCategory = getFileTypeCategory(selectedFile!);
      
      const mockTranslation = `[Translated to ${selectedLang?.name}]

This is a simulated translation of your ${fileCategory} content. In a real implementation, this would be translated using:

- Google Translate API
- Microsoft Translator
- DeepL API
- Amazon Translate
- Or other translation services

The translated content would maintain the original structure and context while providing accurate translation in the target language.

File: ${selectedFile?.name}
Type: ${fileCategory.charAt(0).toUpperCase() + fileCategory.slice(1)}
Target Language: ${selectedLang?.name}
Original Length: ${extractedText.length} characters
Translation completed successfully.

[Translated content would appear here maintaining the original format and structure...]`;

      setTranslatedText(mockTranslation);
      toast({
        title: "Translation Complete",
        description: `${fileCategory.charAt(0).toUpperCase() + fileCategory.slice(1)} content translated to ${selectedLang?.name} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Translation Failed",
        description: "Failed to translate the content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const downloadTranslation = () => {
    if (!translatedText) return;
    
    const blob = new Blob([translatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated_${selectedFile?.name?.replace(/\.[^/.]+$/, "")}_${targetLanguage}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your translated content is being downloaded.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Languages className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Media & Document Translator
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Upload documents, images, videos, or audio files and translate their content to multiple languages with AI-powered services.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Source Content
            </CardTitle>
            <CardDescription>
              Upload a file or paste text to be translated.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={inputMode} onValueChange={handleInputModeChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload File
                </TabsTrigger>
                <TabsTrigger value="text">
                  <Text className="w-4 h-4 mr-2" />
                  Paste Text
                </TabsTrigger>
              </TabsList>
              <TabsContent value="file" className="mt-4">
                <FileUpload
                  onFileSelect={handleFileSelect}
                  onFileRemove={handleFileRemove}
                  selectedFile={selectedFile}
                  acceptedTypes={['.pdf', '.docx', '.doc', '.txt', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv', '.mp3', '.wav', '.aac', '.flac', '.ogg', '.m4a']}
                  placeholder="Upload document, image, video, or audio file"
                  icon={selectedFile ? getFileTypeIcon(selectedFile) : <FileText className="w-8 h-8" />}
                />
                
                {isExtracting && (
                  <div className="text-center py-4">
                    <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Extracting content from {selectedFile ? getFileTypeCategory(selectedFile) : 'file'}...
                    </p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="text" className="mt-4">
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  placeholder={
                    inputMode === 'file'
                      ? "Content extracted from your file will appear here. You can edit it before translating."
                      : "Paste your text here..."
                  }
                  className="min-h-[200px] resize-none"
                  disabled={inputMode === 'file' && isExtracting}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Translation Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Translation Settings
            </CardTitle>
            <CardDescription>
              Select target language and translate your content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Language:</label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleTranslate}
              disabled={!extractedText || !targetLanguage || isTranslating}
              className="w-full"
            >
              {isTranslating ? (
                <>
                  <div className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Translating...
                </>
              ) : (
                <>
                  <Languages className="w-4 h-4 mr-2" />
                  Translate Content
                </>
              )}
            </Button>

            {translatedText && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Translated Content:</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadTranslation}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
                <Textarea
                  value={translatedText}
                  readOnly
                  className="min-h-[200px] resize-none bg-slate-50 dark:bg-slate-800"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• PDF documents</li>
                <li>• Word files (.docx, .doc)</li>
                <li>• Plain text files (.txt)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600 flex items-center gap-2">
                <Image className="w-4 h-4" />
                Images
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• JPEG, PNG, GIF</li>
                <li>• BMP, WebP formats</li>
                <li>• OCR text extraction</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600 flex items-center gap-2">
                <Video className="w-4 h-4" />
                Videos
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• MP4, AVI, MOV</li>
                <li>• WebM, MKV formats</li>
                <li>• Speech-to-text transcription</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600 flex items-center gap-2">
                <FileAudio className="w-4 h-4" />
                Audio
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• MP3, WAV, AAC</li>
                <li>• FLAC, OGG formats</li>
                <li>• Audio transcription</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

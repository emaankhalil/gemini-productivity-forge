
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Languages, Download, FileText } from "lucide-react";

export const DocumentTranslator = () => {
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

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setExtractedText("");
    setTranslatedText("");
    
    // Simulate text extraction from document
    setIsExtracting(true);
    try {
      // In a real implementation, you would use a library like pdf-parse or mammoth for docx
      // For now, we'll simulate with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockExtractedText = `Sample extracted text from ${file.name}:

This is a demonstration of document text extraction. In a real implementation, this would be the actual text content extracted from your uploaded document.

The text would be processed using appropriate libraries:
- PDF files: using pdf-parse or pdf2pic
- DOCX files: using mammoth.js
- TXT files: direct reading
- Other formats: using appropriate parsers

This extracted text can then be translated to your target language using translation services.`;
      
      setExtractedText(mockExtractedText);
      toast({
        title: "Text Extracted",
        description: "Document text has been successfully extracted.",
      });
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: "Failed to extract text from the document.",
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
      // Simulate translation API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const selectedLang = languages.find(lang => lang.code === targetLanguage);
      const mockTranslation = `[Translated to ${selectedLang?.name}]

This is a simulated translation of your document. In a real implementation, this would be translated using:

- Google Translate API
- Microsoft Translator
- DeepL API
- Amazon Translate
- Or other translation services

The translated text would maintain the original structure and formatting as much as possible while providing accurate translation in the target language.

Document: ${selectedFile?.name}
Target Language: ${selectedLang?.name}
Original Length: ${extractedText.length} characters
Translation completed successfully.`;

      setTranslatedText(mockTranslation);
      toast({
        title: "Translation Complete",
        description: `Document translated to ${selectedLang?.name} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Translation Failed",
        description: "Failed to translate the document. Please try again.",
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
      description: "Your translated document is being downloaded.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Languages className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Document Translator
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Upload documents in various formats and translate them to multiple languages with AI-powered translation services.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload and Extract Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Document Upload & Extraction
            </CardTitle>
            <CardDescription>
              Upload your document and extract text content for translation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              selectedFile={selectedFile}
              acceptedTypes={['.pdf', '.docx', '.doc', '.txt']}
              placeholder="Upload document for translation"
              icon={<FileText className="w-8 h-8" />}
            />
            
            {isExtracting && (
              <div className="text-center py-4">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Extracting text from document...</p>
              </div>
            )}

            {extractedText && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Extracted Text:</label>
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  placeholder="Extracted text will appear here..."
                  className="min-h-[200px] resize-none"
                />
              </div>
            )}
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
              Select target language and translate your document
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
                  Translate Document
                </>
              )}
            </Button>

            {translatedText && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Translated Text:</label>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Supported Formats</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• PDF documents</li>
                <li>• Word documents (.docx, .doc)</li>
                <li>• Plain text files (.txt)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Translation Quality</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• AI-powered translation</li>
                <li>• Context-aware processing</li>
                <li>• Maintains document structure</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">Output Options</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Editable translation text</li>
                <li>• Download as text file</li>
                <li>• Copy to clipboard</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

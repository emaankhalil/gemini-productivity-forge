
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Upload, X, File } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  acceptedTypes?: string[];
  maxSize?: number;
  selectedFile?: File | null;
  placeholder?: string;
  icon?: React.ReactNode;
}

export const FileUpload = ({
  onFileSelect,
  onFileRemove,
  acceptedTypes = ['.pdf', '.docx', '.doc', '.txt'],
  maxSize = 10 * 1024 * 1024, // 10MB
  selectedFile,
  placeholder = "Drag and drop your file here",
  icon = <FileText className="w-8 h-8" />
}: FileUploadProps) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors.some((e: any) => e.code === 'file-too-large')) {
        setError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
      } else if (rejection.errors.some((e: any) => e.code === 'file-invalid-type')) {
        setError(`Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`);
      } else {
        setError('Error uploading file. Please try again.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect, acceptedTypes, maxSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: false
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <File className="w-6 h-6 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-6 h-6 text-blue-500" />;
      case 'txt':
        return <FileText className="w-6 h-6 text-gray-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  if (selectedFile) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getFileIcon(selectedFile.name)}
            <div>
              <p className="font-medium text-sm">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onFileRemove}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          {icon}
          <p className="text-gray-600">{placeholder}</p>
          <p className="text-sm text-gray-500">
            Supported formats: {acceptedTypes.join(', ')}
          </p>
          <Button variant="outline" size="sm" type="button">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

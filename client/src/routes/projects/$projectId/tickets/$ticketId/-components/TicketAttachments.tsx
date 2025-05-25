import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Paperclip,
  Upload,
  Download,
  Trash2,
  File,
  Image as ImageIcon,
  FileText,
  Archive,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTicketDetails } from "./useTicketDetails";

export function TicketAttachments() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    attachments,
    addAttachment,
    deleteAttachment,
    isAddingAttachment,
    isDeletingAttachment,
  } = useTicketDetails();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();
    if (!extension) return File;

    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
      return ImageIcon;
    }
    if (["pdf", "doc", "docx", "txt", "md"].includes(extension)) {
      return FileText;
    }
    if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
      return Archive;
    }
    return File;
  };

  const getFileTypeColor = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();
    if (!extension) return "bg-gray-500";

    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
      return "bg-green-500";
    }
    if (["pdf", "doc", "docx"].includes(extension)) {
      return "bg-red-500";
    }
    if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
      return "bg-orange-500";
    }
    if (["txt", "md"].includes(extension)) {
      return "bg-blue-500";
    }
    return "bg-gray-500";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploadProgress(0);

      // Simulate progress for demo
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === null) return 0;
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      await addAttachment(file);

      clearInterval(interval);
      setUploadProgress(100);

      setTimeout(() => {
        setUploadProgress(null);
      }, 1000);
    } catch (error) {
      console.error("Failed to upload file:", error);
      setUploadProgress(null);
    }
  };

  const handleDownload = async (attachment: any) => {
    try {
      const response = await fetch(
        `/api/attachments/${attachment.id}/download`
      );
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = attachment.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  const handleDelete = async (attachmentId: string) => {
    try {
      await deleteAttachment(attachmentId);
    } catch (error) {
      console.error("Failed to delete attachment:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paperclip className="w-5 h-5" />
          Attachments ({attachments?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-muted-foreground">
                Maximum file size: 10MB
              </p>
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAddingAttachment}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {isAddingAttachment ? "Uploading..." : "Choose Files"}
            </Button>

            {uploadProgress !== null && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          multiple={false}
        />

        {/* Attachments List */}
        <div className="space-y-4">
          {!attachments || attachments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Paperclip className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No attachments yet</p>
              <p className="text-sm">Upload files to get started</p>
            </div>
          ) : (
            attachments.map((attachment) => {
              const FileIcon = getFileIcon(attachment.filename);
              const iconColor = getFileTypeColor(attachment.filename);

              return (
                <div
                  key={attachment.id}
                  className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg group hover:bg-muted/70 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${iconColor} flex items-center justify-center text-white`}
                  >
                    <FileIcon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">
                        {attachment.filename}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {formatFileSize(attachment.size)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Added{" "}
                      {formatDistanceToNow(new Date(attachment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(attachment)}
                      className="h-8 w-8 p-0"
                    >
                      <Download className="w-4 h-4" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          disabled={isDeletingAttachment}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Attachment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "
                            {attachment.filename}"? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(attachment.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { parseResume } from "@/utils/resumeParser";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ResumeUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload your resume.",
        variant: "destructive",
      });
      return;
    }

    try {
       setIsUploading(true);

    const parsedData = await parseResume(file);
    if (!parsedData) {
      toast({
        title: "Error parsing resume",
        description: "Could not extract information from your resume. Please try again or update your profile manually.",
        variant: "destructive",
      });
      return;
    }
    // Prepare profile data similar to before
    const profileData = {
      // id: user.id,
      name: parsedData.name || "",
      op_email: parsedData.op_email || "",
      skills: Array.isArray(parsedData.skills) ? parsedData.skills.join(", ") : "",
      experience: Array.isArray(parsedData.experience) ? parsedData.experience.join("\n\n") : "",
      projects: Array.isArray(parsedData.projects) ? parsedData.projects.join("\n\n") : "",
      miscellaneous: Array.isArray(parsedData.miscellaneous) ? parsedData.miscellaneous.join("\n\n") : "",
      education: Array.isArray(parsedData.education) ? parsedData.education.join("\n\n") : "",
      user_type: "candidate",
      updated_at: new Date().toISOString(),
    };

    console.log("Profile Data of the resume:", profileData);

    const token = localStorage.getItem("token");
    // Send to FastAPI backend - upsert profile
    const response = await fetch("http://127.0.0.1:8000/api/profile", {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  
      },
      body: JSON.stringify({
        ...profileData,
        email: user.email
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to update profile");
    }

    toast({
      title: "Success",
      description: "Your resume has been processed and your profile has been updated.",
    });
    window.location.reload();
    } catch (error: any) {
      console.error("Error processing resume:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while processing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [toast, user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDropRejected: (rejections) => {
      const error = rejections[0]?.errors[0];
      if (error?.code === "file-too-large") {
        toast({
          title: "File too large",
          description: "Please upload a PDF file smaller than 5MB.",
          variant: "destructive",
        });
      }
    },
  });

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Upload Your Resume</h3>
      <p className="text-sm text-foreground/70 mb-6">
        Upload your resume to automatically update your profile with your experience, skills, and projects.
      </p>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 cursor-pointer transition-colors ${
          isDragActive
            ? "border-hirena-brown bg-hirena-beige/20"
            : "border-input hover:border-hirena-brown/50"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-10 w-10 text-foreground/50 mb-2" />
        <p className="text-sm text-foreground/70">
          {isDragActive ? (
            "Drop your resume here"
          ) : (
            <>
              Drag & drop your resume here or
              <button className="text-hirena-brown font-medium mx-1">browse</button>
              to upload
            </>
          )}
        </p>
        <p className="text-xs text-foreground/50 mt-2">
          Supported format: PDF (Max 5MB)
        </p>
      </div>
      
      <Button
        className="w-full"
        disabled={isUploading}
        onClick={() => {
          const input = document.querySelector('input[type="file"]') as HTMLInputElement;
          input?.click();
        }}
      >
        {isUploading ? "Processing..." : "Upload Resume"}
      </Button>
    </div>
  );
};

export default ResumeUpload; 
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { parseResume } from "@/utils/resumeParser";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/types/supabase";

type ProfileData = Database["public"]["Tables"]["profiles"]["Insert"];

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
      
      if (parsedData) {
        // First, check if profile exists
        const { data: existingProfile, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 means no rows returned
          console.error("Error fetching profile:", fetchError);
          throw new Error("Failed to check existing profile");
        }

        // Convert arrays to strings and ensure all fields exist
        const profileData: ProfileData = {
          id: user.id,
          name: parsedData.name || existingProfile?.name || "",
          email: parsedData.email || existingProfile?.email || user.email || "",
          skills: Array.isArray(parsedData.skills) ? parsedData.skills.join(", ") : existingProfile?.skills || "",
          experience: Array.isArray(parsedData.experience) ? parsedData.experience.join("\n\n") : existingProfile?.experience || "",
          projects: Array.isArray(parsedData.projects) ? parsedData.projects.join("\n\n") : existingProfile?.projects || "",
          miscellaneous: Array.isArray(parsedData.miscellaneous) ? parsedData.miscellaneous.join("\n\n") : existingProfile?.miscellaneous || "",
          education: Array.isArray(parsedData.education) ? parsedData.education.join("\n\n") : existingProfile?.education || "",
          user_type: "candidate",
          updated_at: new Date().toISOString(),
        };

        // If profile doesn't exist, include created_at
        if (!existingProfile) {
          profileData.created_at = new Date().toISOString();
        }

        // Update or insert the profile
        const { error: upsertError } = await supabase
          .from("profiles")
          .upsert(profileData, {
            onConflict: "id",
            ignoreDuplicates: false
          });

        if (upsertError) {
          console.error("Error updating profile:", upsertError);
          throw new Error(upsertError.message || "Failed to update profile");
        }

        toast({
          title: "Success",
          description: "Your resume has been processed and your profile has been updated.",
        });
      } else {
        toast({
          title: "Error parsing resume",
          description: "Could not extract information from your resume. Please try again or update your profile manually.",
          variant: "destructive",
        });
      }
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
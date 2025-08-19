import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { parseResume, ParsedResume } from "@/utils/resumeParser";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileFormData {
  name: string;
  email: string;
  skills: string;
  experience: string;
  projects: string;
  miscellaneous: string;
  education?: string;
}

export const ResumeUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File size should be less than 5MB");
      return;
    }

    setIsLoading(true);
    try {
      const parsedData = await parseResume(file);
      if (parsedData) {
        // Pre-fill the form
        setValue("name", parsedData.name);
        setValue("email", parsedData.op_email);
        setValue("skills", parsedData.skills.join(", "));
        setValue("experience", JSON.stringify(parsedData.experience, null, 2));
        setValue("projects", JSON.stringify(parsedData.projects, null, 2));
        setValue("miscellaneous", JSON.stringify(parsedData.miscellaneous, null, 2));
        setValue("education", JSON.stringify(parsedData.education, null, 2));
        toast.success("Resume parsed successfully!");
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
      toast.error("Failed to process resume");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) {
      toast.error("Please sign in to save your profile");
      return;
    }

  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Upload Your Resume</h2>
        <p className="text-muted-foreground">
          Upload your resume in PDF format to automatically fill your profile
        </p>
      </div>

      <div className="space-y-4">
        <Input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={isLoading}
          className="cursor-pointer"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              {...register("name", { required: "Name is required", maxLength: 100 })}
              placeholder="Your name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Your email"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <Input
              {...register("skills", { maxLength: 200 })}
              placeholder="Your skills (comma separated)"
            />
            {errors.skills && <p className="text-sm text-red-500">{errors.skills.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Experience</label>
            <Textarea
              {...register("experience", { maxLength: 5000 })}
              placeholder="Your work experience"
              className="min-h-[100px]"
            />
            {errors.experience && <p className="text-sm text-red-500">{errors.experience.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Projects</label>
            <Textarea
              {...register("projects", { maxLength: 5000 })}
              placeholder="Your projects"
              className="min-h-[100px]"
            />
            {errors.projects && <p className="text-sm text-red-500">{errors.projects.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Miscellaneous</label>
            <Textarea
              {...register("miscellaneous", { maxLength: 5000 })}
              placeholder="Additional information"
              className="min-h-[100px]"
            />
            {errors.miscellaneous && <p className="text-sm text-red-500">{errors.miscellaneous.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Education</label>
            <Textarea
              {...register("education", { maxLength: 5000 })}
              placeholder="Your education"
              className="min-h-[100px]"
            />
            {errors.education && <p className="text-sm text-red-500">{errors.education.message}</p>}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}; 
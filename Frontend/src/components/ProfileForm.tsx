import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  op_email: z.string().email("Please enter a valid email"),
  skills: z.string(),
  experience: z.string(),
  projects: z.string(),
  miscellaneous: z.string(),
  education: z.string(),
  user_type: z.string().default("candidate"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      op_email: "",
      skills: "",
      experience: "",
      projects: "",
      miscellaneous: "",
      education: "",
      user_type: "candidate",
    },
  });

  useEffect(() => {
  const fetchProfile = async () => {
     const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage");
    return;
  }

    try {
      const res = await fetch("http://127.0.0.1:8000/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) throw new Error("Failed to fetch profile");

    const data = await res.json();
    form.reset({
      name: data.name || "",
      email: data.email || "",
      op_email: data.op_email || "",
      skills: data.skills || "",
      experience: data.experience || "",
      projects: data.projects || "",
      miscellaneous: data.miscellaneous || "",
      education: data.education || "",
    });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  fetchProfile();
}, [user, form]);

const onSubmit = async (data: ProfileFormValues) => {
  if (!user) return;
  try {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/api/profile", {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        email: data.email,
        // op_email: data.op_email,
        user_type: "candidate",
        // updated_at: new Date().toISOString(),
      }),
    });


    if (!res.ok) throw new Error("Failed to update profile");

    toast({
      title: "Success",
      description: "Your profile has been updated.",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    toast({
      title: "Error",
      description: "An error occurred while updating your profile. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="op_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your skills (comma-separated)"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your work experience (multi-line text)"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Projects</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your projects (multi-line text)"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="miscellaneous"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Miscellaneous</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter miscellaneous information (multi-line text)"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your education details (multi-line text)"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm; 
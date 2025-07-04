import { toast } from "sonner";

export interface ParsedResume {
  name: string;
  op_email: string;
  skills: string[];
  education: any[];
  experience: any[];
  projects: any[];
  awards: any[];
  publications: any[];
  miscellaneous: any[];
}

// Make sure to use the correct host that matches the FastAPI server
const API_URL = 'http://127.0.0.1:8000/parser-resume';

export const parseResume = async (file: File): Promise<ParsedResume | null> => {
  const token = localStorage.getItem("token");
  try {
    console.log("Starting resume parsing process...");
    console.log("File details:", {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
    });

    if (!file.type.includes('pdf')) {
      throw new Error('Please upload a PDF file');
    }

    const formData = new FormData();
    formData.append("file", file);

    console.log("Sending request to resume parser API...");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("Response status:", response.status);
      console.log("Response status text:", response.statusText);

      if (!response.ok) {
        let errorMessage = "Failed to parse resume";
        try {
          const errorData = await response.json();
          console.log("Error response data:", errorData);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        throw new Error(`${errorMessage} (Status: ${response.status})`);
      }

      const data = await response.json();
      console.log("Successfully received parsed resume data:", data);

      let parsedData = data;
      if (parsedData && typeof parsedData.parsed_resume === "string") {
        try {
          parsedData = JSON.parse(parsedData.parsed_resume);
        } catch (e) {
          console.error("Failed to parse parsed_resume JSON string:", e);
          throw new Error("Invalid parsed_resume JSON format from backend");
        }
      } else if (typeof data === "string") {
        // fallback for old logic
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          console.error("Failed to parse JSON string:", e);
          throw new Error("Invalid JSON format from backend");
        }
      }

      console.log("Parsed resume data:", parsedData);
      
      if (!data || typeof data !== 'object') {
        throw new Error("Invalid response from resume parser");
      }

      // Ensure all required fields are present
      const requiredFields = ['name', 'op_email', 'skills', 'experience', 'projects'];
      const missingFields = requiredFields.filter(field => !(field in parsedData));
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Ensure arrays are actually arrays and convert if needed
      const arrayFields = ['skills', 'education', 'experience', 'projects', 'awards', 'publications', 'miscellaneous'];
      for (const field of arrayFields) {
        if (field in parsedData) {
          if (!Array.isArray(parsedData[field])) {
            if (typeof parsedData[field] === 'string') {
              parsedData[field] = [parsedData[field]];
            } else {
              parsedData[field] = [];
            }
          }
        } else {
          parsedData[field] = [];
        }
      }

      return parsedData;
    } catch (networkError: any) {
      console.error("Network error:", networkError);
      throw new Error(`Network error: ${networkError.message}`);
    }
  } catch (error: any) {
    console.error("Error in parseResume:", error);
    toast.error(error.message || "Failed to parse resume. Please try again.");
    return null;
  }
}; 
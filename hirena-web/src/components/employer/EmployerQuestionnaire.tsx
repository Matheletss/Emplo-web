import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckboxGroup } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type FormDataType = {
  work_email: string;
  hiring_size: HiringSizeType;
  worker_types: string[];
  company_type: CompanyType;
  name: string;
  additional_info: string;
};

type HiringSizeType = "1-10" | "10-50" | "50-100" | "100-500" | "500+";
type CompanyType = 
  | "AI company"
  | "Technology company"
  | "Staffing agency/talent acquisition"
  | "Consultancy/managed service provider"
  | "Capital allocator"
  | "Multinational corporation"
  | "Others";

const EmployerQuestionnaire = () => {

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormDataType>({
    work_email: "",
    hiring_size: "" as HiringSizeType,
    worker_types: [] as string[],
    company_type: "" as CompanyType,
    name: "",
    additional_info: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsLoading(true);
      try {
        if (!user?.id) {
          throw new Error('User not authenticated');
        }

        console.log('Submitting data:', {
          id: user.id,
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        const response = await fetch("http://localhost:8000/employer-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`, // optional, if you have JWT auth
        },
        body: JSON.stringify({
          id: user.id,
          ...formData,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Failed to save profile");
      } else {
        setSubmitted(true);
        toast({
          title: "Success!",
          description: "Your profile has been saved successfully.",
        });
      }
    } catch (error) {
      console.error('Error saving employer profile:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem saving your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
}

const handleBack = () => {
  if (currentStep > 1) {
    setCurrentStep((prev) => prev - 1);
  }
};

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.work_email.includes('@');
      case 2:
        return Boolean(formData.hiring_size);
      case 3:
        return formData.worker_types.length > 0;
      case 4:
        return Boolean(formData.company_type);
      case 5:
        return formData.name.length >= 2;
      default:
        return true;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-hirena-beige to-hirena-cream p-4">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-hirena-dark-brown">Thank You!</h2>
          <p className="text-foreground/70 mb-6">
            We appreciate your interest. A member of our team will be in touch with you shortly.
          </p>
        </div>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 w-full">
            <h2 className="text-xl font-semibold mb-6 text-center">What's your work email?</h2>
            <Input
              type="email"
              placeholder="name@example.com"
              value={formData.work_email}
              onChange={(e) => handleInputChange("work_email", e.target.value)}
              className="w-full"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 w-full">
            <h2 className="text-xl font-semibold mb-6 text-center">How many people are you interested in hiring?</h2>
            <RadioGroup
              value={formData.hiring_size}
              onValueChange={(value: HiringSizeType) => handleInputChange("hiring_size", value)}
              className="flex flex-col space-y-2"
            >
              {["1-10", "10-50", "50-100", "100-500", "500+"].map((size, index) => (
                <div key={size} className="flex items-center space-x-2">
                  <Label
                    htmlFor={`size-${index}`}
                    className="flex items-center w-full p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <RadioGroupItem value={size} id={`size-${index}`} className="mr-3" />
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 w-full">
            <h2 className="text-xl font-semibold mb-6 text-center">Types of workers you are looking to hire:</h2>
            <CheckboxGroup
              options={[
                "Contract/contingent workers",
                "Salaried employees remote",
                "Salaried employees in-person"
              ]}
              values={formData.worker_types}
              onChange={(values) => handleInputChange("worker_types", values)}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 w-full">
            <h2 className="text-xl font-semibold mb-6 text-center">Description of your company:</h2>
            <RadioGroup
              value={formData.company_type}
              onValueChange={(value: CompanyType) => handleInputChange("company_type", value)}
              className="flex flex-col space-y-2"
            >
              {[
                "AI company",
                "Technology company",
                "Staffing agency/talent acquisition",
                "Consultancy/managed service provider",
                "Capital allocator",
                "Multinational corporation",
                "Others"
              ].map((type, index) => (
                <div key={type} className="flex items-center space-x-2">
                  <Label
                    htmlFor={`type-${index}`}
                    className="flex items-center w-full p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <RadioGroupItem value={type} id={`type-${index}`} className="mr-3" />
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 w-full">
            <h2 className="text-xl font-semibold mb-6 text-center">Your name:</h2>
            <Input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full"
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4 w-full">
            <h2 className="text-xl font-semibold mb-6 text-center">Additional information:</h2>
            <Textarea
              placeholder="Any additional details you'd like to share..."
              value={formData.additional_info}
              onChange={(e) => handleInputChange("additional_info", e.target.value)}
              className="w-full min-h-[150px]"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-hirena-beige to-hirena-cream p-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-foreground/70">
            Question {currentStep} of 6
          </div>
          <div className="h-2 flex-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-hirena-brown transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[400px]">
          {renderQuestion()}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleBack}
            disabled={currentStep === 1 || isLoading}
            variant="outline"
            className="text-black border-black hover:bg-gray-100"
          >
            Back
          </Button>
          <div className="mx-2" />

          <Button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className="bg-black text-white hover:bg-black/90"
          >
            {isLoading ? "Saving..." : currentStep === 6 ? "Submit" : "OK"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmployerQuestionnaire;
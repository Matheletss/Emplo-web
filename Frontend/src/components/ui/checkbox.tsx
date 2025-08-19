import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

interface CheckboxGroupProps {
  options: string[]
  values: string[]
  onChange: (values: string[]) => void
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, values, onChange }) => {
  const handleCheckboxChange = (option: string) => {
    const newValues = values.includes(option)
      ? values.filter((v) => v !== option)
      : [...values, option]
    onChange(newValues)
  }

  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center w-full p-3 border rounded-md cursor-pointer hover:bg-gray-50"
        >
          <Checkbox
            checked={values.includes(option)}
            onCheckedChange={() => handleCheckboxChange(option)}
            className="mr-3"
          />
          {option}
        </label>
      ))}
    </div>
  )
}

export { Checkbox, CheckboxGroup }

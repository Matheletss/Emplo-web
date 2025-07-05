import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  percentage: number;
}

const getColor = (percentage: number) => {
  if (percentage >= 80) return "#92400E"; // brown
  if (percentage >= 60) return "#D97706"; // amber
  return "#DC2626"; // red
};

const getLabel = (percentage: number) => {
  if (percentage >= 80) return "Strong Match";
  if (percentage >= 60) return "Moderate Match";
  return "Low Match";
};

const OverallMatchScore: React.FC<Props> = ({ percentage }) => {
  const color = getColor(percentage);
  const label = getLabel(percentage);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <CircularProgressbar
          value={percentage}
          text={""}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: color,
            trailColor: "#F3F4F6",
          })}
        />
        <div className="absolute inset-0 flex items-center justify-center text-[1.2rem] font-bold text-[#1F2937]">
          {percentage}%
        </div>
      </div>
      <div className="text-base font-semibold text-gray-800">
        Overall Match Score
      </div>
      <div className="text-sm font-medium" style={{ color }}>
        {label}
      </div>
    </div>
  );
};

export default OverallMatchScore;

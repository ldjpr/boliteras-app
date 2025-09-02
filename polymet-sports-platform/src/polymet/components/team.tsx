import React from "react";
import { cn } from "@/lib/utils";
import { getTeamById } from "@/polymet/data/mock-data";

interface TeamProps {
  teamId: string;
  variant?: "full" | "name" | "city" | "logo";
  size?: "xs" | "sm" | "md" | "lg";
  showColors?: boolean;
  className?: string;
}

export default function Team({
  teamId,
  variant = "name",
  size = "md",
  showColors = false,
  className,
}: TeamProps) {
  const team = getTeamById(teamId);

  if (!team) {
    return <span className="text-gray-400">Team not found</span>;
  }

  const sizeClasses = {
    xs: "text-sm",
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  const colorIndicatorSizes = {
    xs: "w-2 h-2",
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const renderContent = () => {
    switch (variant) {
      case "full":
        return (
          <div className="flex items-center gap-2">
            {showColors && (
              <div className="flex gap-1">
                {team.colors.map((color, index) => (
                  <div
                    key={index}
                    className={cn(colorIndicatorSizes[size], "rounded-full")}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
            <span className="font-semibold">{team.name}</span>
            <span className="text-gray-500">de {team.city}</span>
          </div>
        );

      case "city":
        return <span>{team.city}</span>;

      case "logo":
        return (
          <div className="flex items-center gap-1">
            {team.colors.map((color, index) => (
              <div
                key={index}
                className={cn(colorIndicatorSizes[size], "rounded-full")}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        );

      case "name":
      default:
        return (
          <div className="flex items-center gap-2">
            {showColors && (
              <div className="flex gap-1">
                {team.colors.map((color, index) => (
                  <div
                    key={index}
                    className={cn(colorIndicatorSizes[size], "rounded-full")}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
            <span className="font-semibold">{team.name}</span>
          </div>
        );
    }
  };

  return (
    <div className={cn(sizeClasses[size], className)}>{renderContent()}</div>
  );
}

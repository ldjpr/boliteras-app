import React from "react";

interface WordArtTeamProps {
  teamName: string;
  teamColors?: string[];
  size?: "sm" | "md" | "lg";
  style?: "gradient" | "metallic" | "neon" | "rainbow" | "chrome";
  className?: string;
}

export default function WordArtTeam({
  teamName,
  teamColors = ["#FF6B35", "#004E89"],
  size = "md",
  style = "gradient",
  className = "",
}: WordArtTeamProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-2xl";
      case "md":
        return "text-4xl";
      case "lg":
        return "text-6xl";
      default:
        return "text-4xl";
    }
  };

  const getStyleClasses = () => {
    const [color1, color2] = teamColors;

    switch (style) {
      case "gradient":
        return {
          background: `linear-gradient(45deg, ${color1}, ${color2})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        };

      case "metallic":
        return {
          background: `linear-gradient(135deg, #C0C0C0 0%, #808080 25%, #C0C0C0 50%, #808080 75%, #C0C0C0 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow:
            "3px 3px 6px rgba(0,0,0,0.5), inset 1px 1px 2px rgba(255,255,255,0.3)",
        };

      case "neon":
        return {
          color: color1,
          textShadow: `0 0 5px ${color1}, 0 0 10px ${color1}, 0 0 15px ${color1}, 0 0 20px ${color2}`,
        };

      case "rainbow":
        return {
          background:
            "linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
        };

      case "chrome":
        return {
          background: `linear-gradient(135deg, #eee 0%, #999 25%, #eee 50%, #ddd 75%, #ccc 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow:
            "1px 1px 2px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.5)",
        };

      default:
        return {
          background: `linear-gradient(45deg, ${color1}, ${color2})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        };
    }
  };

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div
        className={`
          font-black 
          ${getSizeClasses()}
          transform 
          hover:scale-105 
          transition-transform 
          duration-300
          select-none
          tracking-wider
          uppercase
          text-center
          leading-tight
          drop-shadow-lg
        `}
        style={{
          ...getStyleClasses(),
          fontFamily: "Impact, 'Arial Black', sans-serif",
          letterSpacing: "0.1em",
          transform: "perspective(500px) rotateX(15deg)",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
        }}
      >
        {teamName}
      </div>
    </div>
  );
}

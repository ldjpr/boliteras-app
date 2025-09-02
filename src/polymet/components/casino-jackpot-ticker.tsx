import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TrophyIcon, DollarSignIcon, FlameIcon } from "lucide-react";

interface JackpotData {
  id: string;
  name: string;
  amount: number;
  type: "mega" | "major" | "minor";
  lastWinner?: string;
  timeAgo?: string;
}

interface CasinoJackpotTickerProps {
  jackpots?: JackpotData[];
  className?: string;
}

export default function CasinoJackpotTicker({
  jackpots = [
    {
      id: "mega",
      name: "MEGA JACKPOT",
      amount: 25000,
      type: "mega",
      lastWinner: "ElBoliteroMayor",
      timeAgo: "2 días",
    },
    {
      id: "major",
      name: "MAJOR PRIZE",
      amount: 5000,
      type: "major",
      lastWinner: "BoricuaBaller",
      timeAgo: "6 horas",
    },
    {
      id: "minor",
      name: "MINOR WIN",
      amount: 500,
      type: "minor",
      lastWinner: "SanturceStrong",
      timeAgo: "23 min",
    },
  ],

  className = "",
}: CasinoJackpotTickerProps) {
  const [currentJackpot, setCurrentJackpot] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Cycle through jackpots every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentJackpot((prev) => (prev + 1) % jackpots.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [jackpots.length]);

  // Simulate jackpot amounts increasing
  useEffect(() => {
    const interval = setInterval(() => {
      jackpots.forEach((jackpot) => {
        const increment =
          jackpot.type === "mega" ? 5 : jackpot.type === "major" ? 2 : 1;
        jackpot.amount += increment;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [jackpots]);

  const activeJackpot = jackpots[currentJackpot];

  const getJackpotColor = (type: string) => {
    switch (type) {
      case "mega":
        return "from-yellow-400 via-orange-500 to-red-600";
      case "major":
        return "from-purple-500 via-pink-500 to-red-500";
      case "minor":
        return "from-blue-500 via-cyan-500 to-teal-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getJackpotIcon = (type: string) => {
    switch (type) {
      case "mega":
        return <FlameIcon className="h-6 w-6 animate-pulse" />;

      case "major":
        return <TrophyIcon className="h-5 w-5" />;

      case "minor":
        return <DollarSignIcon className="h-4 w-4" />;

      default:
        return null;
    }
  };

  return (
    <Card
      className={`relative overflow-hidden bg-black border-yellow-400 border-2 ${className}`}
    >
      {/* Animated border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 opacity-20 animate-pulse" />

      {/* Scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-5 animate-pulse" />

      <div className="relative p-4">
        {/* Header */}
        <div className="text-center mb-3">
          <div className="text-yellow-400 text-xs font-bold tracking-wider mb-1 animate-pulse">
            🎰 JACKPOTS ACTIVOS 🎰
          </div>
          <div className="text-white text-xs opacity-75">
            Próximo sorteo en vivo: 8:00 PM
          </div>
        </div>

        {/* Main Jackpot Display */}
        <div
          className={`text-center transition-all duration-300 ${
            isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
          }`}
        >
          <div
            className={`bg-gradient-to-r ${getJackpotColor(
              activeJackpot.type
            )} bg-clip-text text-transparent`}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              {getJackpotIcon(activeJackpot.type)}
              <span className="text-sm font-bold tracking-wider">
                {activeJackpot.name}
              </span>
            </div>
            <div className="text-2xl font-black tracking-tight font-mono">
              ${activeJackpot.amount.toLocaleString()}
            </div>
          </div>

          {activeJackpot.lastWinner && (
            <div className="text-xs text-gray-400 mt-1">
              Último ganador:{" "}
              <span className="text-yellow-400 font-medium">
                {activeJackpot.lastWinner}
              </span>
              <span className="text-gray-500 ml-1">
                ({activeJackpot.timeAgo})
              </span>
            </div>
          )}
        </div>

        {/* Jackpot Indicators */}
        <div className="flex justify-center gap-2 mt-3">
          {jackpots.map((jackpot, index) => (
            <div
              key={jackpot.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentJackpot
                  ? "bg-yellow-400 scale-125"
                  : "bg-gray-600 scale-100"
              }`}
            />
          ))}
        </div>

        {/* Mini ticker at bottom */}
        <div className="mt-3 text-center">
          <div className="text-xs text-yellow-400 font-mono animate-pulse">
            💰 TOTAL EN JUEGO: $
            {jackpots.reduce((sum, j) => sum + j.amount, 0).toLocaleString()} 💰
          </div>
        </div>
      </div>

      {/* Glowing effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-lg blur opacity-20 animate-pulse" />
    </Card>
  );
}

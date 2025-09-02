import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, UsersIcon, StarIcon, TrophyIcon } from "lucide-react";

interface PrizePoolData {
  id: string;
  name: string;
  amount: number;
  type: "grande" | "mediano" | "chiquito";
  participants: number;
  lastWinner?: string;
  timeAgo?: string;
  nextDraw?: string;
}

interface CommunityPrizePoolProps {
  prizePools?: PrizePoolData[];
  className?: string;
}

export default function CommunityPrizePool({
  prizePools = [
    {
      id: "grande",
      name: "La Bolita Grande",
      amount: 2500,
      type: "grande",
      participants: 247,
      lastWinner: "Doña Carmen",
      timeAgo: "ayer",
      nextDraw: "Viernes 8:00 PM",
    },
    {
      id: "mediano",
      name: "El Pote del Barrio",
      amount: 850,
      type: "mediano",
      participants: 89,
      lastWinner: "Papi Chulo",
      timeAgo: "3 días",
      nextDraw: "Miércoles 7:30 PM",
    },
    {
      id: "chiquito",
      name: "La Chavitica",
      amount: 125,
      type: "chiquito",
      participants: 34,
      lastWinner: "La Vecina",
      timeAgo: "1 hora",
      nextDraw: "Hoy 6:00 PM",
    },
  ],

  className = "",
}: CommunityPrizePoolProps) {
  const [currentPool, setCurrentPool] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Gentle cycling through prize pools every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPool((prev) => (prev + 1) % prizePools.length);
        setIsTransitioning(false);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, [prizePools.length]);

  // Simulate community contributions (slower, more organic growth)
  useEffect(() => {
    const interval = setInterval(() => {
      prizePools.forEach((pool) => {
        const increment =
          pool.type === "grande" ? 2 : pool.type === "mediano" ? 1 : 0.5;
        pool.amount += increment;
        // Occasionally add a participant
        if (Math.random() > 0.8) {
          pool.participants += 1;
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [prizePools]);

  const activePool = prizePools[currentPool];

  const getPoolColors = (type: string) => {
    switch (type) {
      case "grande":
        return {
          gradient: "from-amber-400 via-orange-500 to-red-500",
          bg: "bg-gradient-to-br from-amber-50 via-orange-50 to-red-50",
          border: "border-amber-300",
          text: "text-amber-900",
          accent: "text-orange-600",
        };
      case "mediano":
        return {
          gradient: "from-sky-400 via-blue-500 to-indigo-600",
          bg: "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50",
          border: "border-sky-300",
          text: "text-sky-900",
          accent: "text-blue-700",
        };
      case "chiquito":
        return {
          gradient: "from-yellow-400 via-amber-500 to-orange-500",
          bg: "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50",
          border: "border-yellow-300",
          text: "text-yellow-900",
          accent: "text-amber-600",
        };
      default:
        return {
          gradient: "from-gray-400 to-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-300",
          text: "text-gray-800",
          accent: "text-gray-600",
        };
    }
  };

  const getPoolIcon = (type: string) => {
    switch (type) {
      case "grande":
        return <TrophyIcon className="h-5 w-5 text-amber-600" />;

      case "mediano":
        return <StarIcon className="h-4 w-4 text-sky-600" />;

      case "chiquito":
        return <HeartIcon className="h-4 w-4 text-yellow-600" />;

      default:
        return null;
    }
  };

  const colors = getPoolColors(activePool.type);

  return (
    <Card
      className={`${colors.bg} ${colors.border} border-2 shadow-lg ${className}`}
    >
      {/* Warm decorative header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-400 to-sky-600 p-1 rounded-t-lg">
        <div className="bg-gradient-to-r from-amber-50 to-sky-50 px-3 py-2 rounded-t-sm">
          <div className="text-center">
            <div className="text-xs font-semibold text-amber-800 mb-1 flex items-center justify-center gap-1">
              🇵🇷 <span>PREMIOS DE LA COMUNIDAD</span> 🇵🇷
            </div>
            <div className="text-xs text-amber-600">
              "Donde todos ganamos juntos"
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Main Prize Display */}
        <div
          className={`text-center transition-all duration-400 ${
            isTransitioning ? "scale-95 opacity-60" : "scale-100 opacity-100"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {getPoolIcon(activePool.type)}
            <h3 className={`text-lg font-bold ${colors.text}`}>
              {activePool.name}
            </h3>
          </div>

          <div
            className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
          >
            <div className="text-3xl font-black font-mono tracking-tight">
              ${activePool.amount.toFixed(2)}
            </div>
          </div>

          {/* Community participation */}
          <div className="flex items-center justify-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1">
              <UsersIcon className={`h-4 w-4 ${colors.accent}`} />

              <span className={colors.text}>
                {activePool.participants} vecinos
              </span>
            </div>
            <div className={`text-xs ${colors.accent} font-medium`}>
              Próximo: {activePool.nextDraw}
            </div>
          </div>

          {/* Last winner celebration */}
          {activePool.lastWinner && (
            <div className="mt-3 p-2 bg-white/50 rounded-lg">
              <div className="text-xs text-gray-600">
                🎉 Último ganador:{" "}
                <span className={`font-semibold ${colors.accent}`}>
                  {activePool.lastWinner}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                hace {activePool.timeAgo} • "¡Que viva Puerto Rico!"
              </div>
            </div>
          )}
        </div>

        {/* Pool indicators with warm styling */}
        <div className="flex justify-center gap-3 mt-4">
          {prizePools.map((pool, index) => {
            const poolColors = getPoolColors(pool.type);
            return (
              <div
                key={pool.id}
                className={`flex flex-col items-center transition-all duration-300 ${
                  index === currentPool ? "scale-110" : "scale-100 opacity-70"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    index === currentPool
                      ? `bg-gradient-to-r ${poolColors.gradient}`
                      : "bg-gray-300"
                  }`}
                />

                <div className="text-xs mt-1 font-medium text-gray-600">
                  ${pool.amount.toFixed(0)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Community spirit footer */}
        <div className="mt-4 text-center">
          <Badge
            variant="secondary"
            className="bg-white/70 text-gray-700 text-xs"
          >
            💝 Construido por la comunidad, para la comunidad
          </Badge>
        </div>

        {/* Total community pot */}
        <div className="mt-3 text-center">
          <div className="text-sm font-semibold text-gray-700">
            🏆 Total en juego: $
            {prizePools.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {prizePools.reduce((sum, p) => sum + p.participants, 0)} boliteros
            participando
          </div>
        </div>
      </div>
    </Card>
  );
}

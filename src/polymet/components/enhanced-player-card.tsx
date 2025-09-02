import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  FlameIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getTeamById } from "@/polymet/data/mock-data";
import Team from "@/polymet/components/team";

interface EnhancedPlayerCardProps {
  player: {
    id: string;
    name: string;
    team: string;
    position: string;
    jersey: number;
    stats: {
      points: number;
      assists: number;
      rebounds: number;
      steals?: number;
      blocks?: number;
      fieldGoalPercentage?: number;
      threePointPercentage?: number;
      freeThrowPercentage?: number;
      gamesPlayed?: number;
      minutes?: number;
    };
    trend: "up" | "down" | "stable";
    hotStreak: boolean;
    prediction: string;
    avatar: string;
  };
  isSelected?: boolean;
  onSelect?: (player: any) => void;
  onViewProfile?: (playerId: string) => void;
  showPrediction?: boolean;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function EnhancedPlayerCard({
  player,
  isSelected = false,
  onSelect,
  onViewProfile,
  showPrediction = true,
  animated = true,
  size = "md",
}: EnhancedPlayerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);
  const team = getTeamById(player.team);

  // Add custom CSS for 3D flip animation
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .perspective-1000 {
        perspective: 1000px;
      }
      .transform-style-preserve-3d {
        transform-style: preserve-3d;
      }
      .backface-hidden {
        backface-visibility: hidden;
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Simulate live updates and animations
  useEffect(() => {
    if (animated && player.hotStreak) {
      const interval = setInterval(() => {
        setGlowEffect((prev) => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [animated, player.hotStreak]);

  const getTrendIcon = () => {
    switch (player.trend) {
      case "up":
        return <TrendingUpIcon className="w-4 h-4 text-green-500" />;

      case "down":
        return <TrendingDownIcon className="w-4 h-4 text-red-500" />;

      default:
        return <MinusIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const cardSizes = {
    sm: "w-48 h-64",
    md: "w-56 h-72",
    lg: "w-64 h-80",
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(player);
    }
    setIsFlipped((prev) => !prev);
  };

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewProfile) {
      onViewProfile(player.id);
    }
  };

  // Create gradient background based on team colors
  const getGradientStyle = () => {
    if (team) {
      return {
        background: `linear-gradient(135deg, ${team.colors[0]}, ${team.colors[1]})`,
      };
    }
    return {
      background: "linear-gradient(135deg, #1e40af, #dc2626)",
    };
  };

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-300 perspective-1000",
        cardSizes[size],
        animated && "hover:scale-105",
        glowEffect && player.hotStreak && "animate-pulse"
      )}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 transform-style-preserve-3d",
          isFlipped && "rotate-y-180"
        )}
        onClick={handleCardClick}
      >
        {/* Front of card */}
        <Card
          className={cn(
            "absolute inset-0 backface-hidden overflow-hidden",
            isSelected && "ring-2 ring-blue-500 ring-offset-2",
            player.hotStreak && "border-orange-400 shadow-lg shadow-orange-100",
            glowEffect && player.hotStreak && "shadow-xl shadow-orange-200"
          )}
        >
          <CardContent className="p-0 h-full relative">
            {/* Background with team colors */}
            <div
              className="absolute inset-0 opacity-90"
              style={getGradientStyle()}
            />

            {/* Overlay pattern */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Hot streak flame effect */}
            {player.hotStreak && (
              <div className="absolute top-3 right-3 z-10">
                <FlameIcon className="w-6 h-6 text-orange-400 animate-bounce drop-shadow-lg" />
              </div>
            )}

            {/* Status indicator */}
            <div className="absolute top-3 right-12 z-10">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg" />
            </div>

            {/* Jersey number and position */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
              <Badge className="bg-black/70 text-white font-bold text-lg px-2 py-1">
                #{player.jersey}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white/90 text-gray-900 font-semibold"
              >
                {player.position}
              </Badge>
            </div>

            {/* Player name - positioned at top */}
            <div className="absolute inset-x-0 top-16 left-3 right-3 z-10 text-center">
              <h2 className="text-xl font-bold text-white drop-shadow-lg mb-2">
                {player.name.toUpperCase()}
              </h2>

              {/* Hot streak indicator */}
              {player.hotStreak && (
                <div className="flex items-center justify-center mb-2">
                  <StarIcon className="w-5 h-5 text-yellow-400 fill-current drop-shadow-lg animate-pulse" />

                  <span className="text-yellow-400 font-bold ml-1 drop-shadow-lg text-sm">
                    HOT STREAK!
                  </span>
                </div>
              )}
            </div>

            {/* Current season stats at bottom - expanded */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-4">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-800 mb-3">
                  <span>POSITION: {player.position} • CURRENT TEAM: </span>
                  <Team
                    teamId={player.team}
                    variant="name"
                    size="xs"
                    className="inline font-semibold text-gray-800 uppercase"
                  />
                </div>

                {/* Key stats in a clean row */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {player.stats.points}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">POINTS</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {player.stats.rebounds}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      REBOUNDS
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">
                      {player.stats.assists}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">ASSISTS</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back of card - Detailed stats */}
        <Card
          className={cn(
            "absolute inset-0 backface-hidden rotate-y-180 overflow-hidden",
            isSelected && "ring-2 ring-blue-500 ring-offset-2"
          )}
        >
          <CardContent className="p-0 h-full relative">
            {/* Background with team colors */}
            <div
              className="absolute inset-0 opacity-20"
              style={getGradientStyle()}
            />

            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {player.name}
                </h2>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <span>
                    #{player.jersey} • {player.position} •{" "}
                  </span>
                  <Team
                    teamId={player.team}
                    variant="name"
                    size="xs"
                    className="text-gray-600"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {getTrendIcon()}
                  <span className="text-sm font-medium text-gray-700">
                    {player.trend === "up"
                      ? "Trending Up"
                      : player.trend === "down"
                        ? "Trending Down"
                        : "Stable"}
                  </span>
                </div>
              </div>

              {/* Detailed Stats Grid */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  Season Statistics
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {player.stats.points}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      POINTS PER GAME
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {player.stats.rebounds}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      REBOUNDS PER GAME
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {player.stats.assists}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      ASSISTS PER GAME
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">
                      {player.stats.steals || 1.2}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      STEALS PER GAME
                    </p>
                  </div>
                </div>

                {/* Shooting Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-lg font-bold text-blue-600">
                      {player.stats.fieldGoalPercentage || 45.2}%
                    </p>
                    <p className="text-xs text-gray-600">FG%</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="text-lg font-bold text-green-600">
                      {player.stats.threePointPercentage || 38.1}%
                    </p>
                    <p className="text-xs text-gray-600">3P%</p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <p className="text-lg font-bold text-purple-600">
                      {player.stats.freeThrowPercentage || 82.4}%
                    </p>
                    <p className="text-xs text-gray-600">FT%</p>
                  </div>
                </div>

                {/* AI Prediction */}
                {showPrediction && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold text-blue-800 mb-1">
                      AI PREDICTION
                    </p>
                    <p className="text-sm text-blue-700">{player.prediction}</p>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  onClick={handleViewProfile}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <UserIcon className="w-4 h-4 mr-2" />
                  View Full Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selection overlay */}
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-lg pointer-events-none" />
      )}
    </div>
  );
}

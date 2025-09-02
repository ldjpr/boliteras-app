import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  FlameIcon,
  StarIcon,
  ZapIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getTeamById } from "@/polymet/data/mock-data";
import Team from "@/polymet/components/team";

interface PlayerCardProps {
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
    };
    trend: "up" | "down" | "stable";
    hotStreak: boolean;
    prediction: string;
    avatar: string;
  };
  isSelected?: boolean;
  onSelect?: (player: any) => void;
  showPrediction?: boolean;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function PlayerCard({
  player,
  isSelected = false,
  onSelect,
  showPrediction = true,
  animated = true,
  size = "md",
}: PlayerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);
  const team = getTeamById(player.team);

  // Simulate live updates and animations
  useEffect(() => {
    if (animated && player.hotStreak) {
      const interval = setInterval(() => {
        setGlowEffect((prev) => !prev);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [animated, player.hotStreak]);

  // Generate AI insight based on player data
  const getAIInsight = () => {
    const insights = [
      `🎯 ${player.stats.points > 20 ? "Elite scorer" : "Solid contributor"} with ${player.stats.points} PPG`,
      `🏀 ${player.stats.assists > 5 ? "Playmaker" : "Team player"} averaging ${player.stats.assists} assists`,
      `💪 Strong on boards with ${player.stats.rebounds} rebounds per game`,
      `⚡ ${player.hotStreak ? "On fire!" : "Consistent performer"} - ${player.trend === "up" ? "trending up" : player.trend === "down" ? "slight dip" : "steady"}`,
    ];

    return insights[Math.floor(Math.random() * insights.length)];
  };

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
    sm: "w-52 h-72",
    md: "w-60 h-80",
    lg: "w-72 h-96",
  };

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
    if (onSelect && !isFlipped) {
      onSelect(player);
    }
  };

  const handleCardDoubleClick = () => {
    setIsFlipped(false);
  };

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        cardSizes[size],
        animated && "hover:scale-105",
        glowEffect && player.hotStreak && "drop-shadow-lg"
      )}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={handleCardClick}
        onDoubleClick={handleCardDoubleClick}
      >
        {/* Front of card */}
        <Card
          className={cn(
            "absolute inset-0 w-full h-full border-0 shadow-xl",
            isSelected && "ring-2 ring-blue-500 ring-offset-2",
            player.hotStreak && "shadow-orange-200/50 shadow-2xl"
          )}
          style={{
            background: team
              ? `linear-gradient(135deg, ${team.colors[0]}08, ${team.colors[1]}08, #ffffff)`
              : "linear-gradient(135deg, #f8fafc, #ffffff)",
            backfaceVisibility: "hidden",
          }}
        >
          <CardContent className="p-0 h-full relative overflow-hidden">
            {/* Team color accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: team
                  ? `linear-gradient(90deg, ${team.colors[0]}, ${team.colors[1]})`
                  : "linear-gradient(90deg, #1e40af, #dc2626)",
              }}
            />

            {/* Hot streak indicator */}
            {player.hotStreak && (
              <div className="absolute top-3 right-3 z-10">
                <div className="relative">
                  <FlameIcon className="w-5 h-5 text-orange-500 animate-pulse" />

                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-ping" />
                </div>
              </div>
            )}

            <div className="h-full p-5 flex flex-col">
              {/* Header with jersey number and position */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                    style={{
                      background: team
                        ? `linear-gradient(135deg, ${team.colors[0]}, ${team.colors[1]})`
                        : "linear-gradient(135deg, #1e40af, #dc2626)",
                    }}
                  >
                    {player.jersey}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs font-semibold px-2 py-1"
                  >
                    {player.position}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon()}
                  {player.hotStreak && (
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
              </div>

              {/* Player Image */}
              <div className="flex-1 flex items-center justify-center mb-4">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full blur-md opacity-30"
                    style={{
                      background: team
                        ? `linear-gradient(135deg, ${team.colors[0]}, ${team.colors[1]})`
                        : "linear-gradient(135deg, #1e40af, #dc2626)",
                    }}
                  />

                  <img
                    src={player.avatar}
                    alt={player.name}
                    className={cn(
                      "relative rounded-full border-3 border-white shadow-lg transition-all duration-300",
                      size === "sm"
                        ? "w-20 h-20"
                        : size === "md"
                          ? "w-24 h-24"
                          : "w-28 h-28",
                      player.hotStreak && "ring-2 ring-orange-400 ring-offset-2"
                    )}
                  />
                </div>
              </div>

              {/* Player Info */}
              <div className="text-center mb-4">
                <h3
                  className={cn(
                    "font-bold text-gray-900 leading-tight mb-1",
                    size === "sm"
                      ? "text-sm"
                      : size === "md"
                        ? "text-base"
                        : "text-lg"
                  )}
                >
                  {player.name.toUpperCase()}
                </h3>
                <Team
                  teamId={player.team}
                  variant="name"
                  size="xs"
                  className="text-xs text-gray-700 font-semibold"
                />
              </div>

              {/* Primary Stats */}
              <div className="bg-white/90 border border-gray-200 rounded-lg p-3 mb-3 shadow-sm">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p
                      className={cn(
                        "font-bold text-gray-900",
                        size === "sm" ? "text-lg" : "text-xl"
                      )}
                    >
                      {player.stats.points}
                    </p>
                    <p className="text-xs text-gray-700 font-semibold">PTS</p>
                  </div>
                  <div>
                    <p
                      className={cn(
                        "font-bold text-gray-900",
                        size === "sm" ? "text-lg" : "text-xl"
                      )}
                    >
                      {player.stats.assists}
                    </p>
                    <p className="text-xs text-gray-700 font-semibold">AST</p>
                  </div>
                  <div>
                    <p
                      className={cn(
                        "font-bold text-gray-900",
                        size === "sm" ? "text-lg" : "text-xl"
                      )}
                    >
                      {player.stats.rebounds}
                    </p>
                    <p className="text-xs text-gray-700 font-semibold">REB</p>
                  </div>
                </div>
              </div>

              {/* AI Insight */}
              {showPrediction && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 border border-blue-300 shadow-sm">
                  <div className="flex items-center gap-1 mb-1">
                    <ZapIcon className="w-3 h-3 text-white" />

                    <span className="text-xs font-semibold text-white">
                      AI INSIGHT
                    </span>
                  </div>
                  <p className="text-xs text-white leading-tight font-medium">
                    {getAIInsight()}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back of card - Detailed stats */}
        <Card
          className="absolute inset-0 w-full h-full border-0 shadow-xl bg-white"
          style={{
            background: team
              ? `linear-gradient(135deg, ${team.colors[0]}08, ${team.colors[1]}08, #ffffff)`
              : "linear-gradient(135deg, #f8fafc, #ffffff)",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardContent className="p-0 h-full relative overflow-hidden">
            {/* Team color accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: team
                  ? `linear-gradient(90deg, ${team.colors[0]}, ${team.colors[1]})`
                  : "linear-gradient(90deg, #1e40af, #dc2626)",
              }}
            />

            <div className="h-full p-5 flex flex-col text-gray-900">
              {/* Header */}
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {player.name.toUpperCase()}
                </h3>
                <p className="text-sm text-gray-600">DETAILED ANALYTICS</p>
              </div>

              {/* AI Analysis - Now First */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-200 mb-4">
                <div className="flex items-center gap-1 mb-2">
                  <ZapIcon className="w-3 h-3 text-blue-600" />

                  <span className="text-xs font-semibold text-blue-600">
                    AI ANALYSIS
                  </span>
                </div>
                <p className="text-xs text-gray-700 leading-tight font-medium">
                  {player.prediction}
                </p>
              </div>

              {/* Advanced Stats Grid */}
              <div className="space-y-3 flex-1">
                {/* Shooting Stats */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 text-center">
                    SHOOTING
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {player.stats.fieldGoalPercentage || 45}%
                      </p>
                      <p className="text-xs text-gray-600 font-medium">FG%</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {player.stats.threePointPercentage || 38}%
                      </p>
                      <p className="text-xs text-gray-600 font-medium">3P%</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {player.stats.freeThrowPercentage || 82}%
                      </p>
                      <p className="text-xs text-gray-600 font-medium">FT%</p>
                    </div>
                  </div>
                </div>

                {/* Defense Stats */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 text-center">
                    DEFENSE
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {player.stats.steals || 1.2}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">STL</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {player.stats.blocks || 0.8}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">BLK</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tap to flip back hint */}
              <div className="text-center mt-3">
                <p className="text-xs text-gray-500 font-medium">
                  Tap to flip back
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

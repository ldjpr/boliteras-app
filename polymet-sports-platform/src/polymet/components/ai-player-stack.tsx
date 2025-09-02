import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FlameIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BarChart3Icon,
  ZapIcon,
  TargetIcon,
} from "lucide-react";
import Team from "@/polymet/components/team";

interface PlayerPrediction {
  type: "hot" | "warning" | "opportunity";
  message: string;
  confidence: number;
}

interface PlayerStats {
  points: number;
  rebounds: number;
  assists: number;
  steals?: number;
  blocks?: number;
  fieldGoalPercentage?: number;
}

interface AIPlayer {
  id: string;
  name: string;
  team: string;
  position: string;
  jersey: string;
  avatar: string;
  salary: number;
  liveStats: PlayerStats;
  projectedStats: PlayerStats;
  aiPrediction: PlayerPrediction;
  hotStreak: boolean;
  recentHighlights: string[];
  matchupRating: "easy" | "medium" | "hard";
  ownership: number; // percentage of lineups
  value: number; // points per dollar
}

interface AIPlayerStackProps {
  players: AIPlayer[];
  onPlayerSelect: (player: AIPlayer) => void;
  onViewProfile: (playerId: string) => void;
}

export default function AIPlayerStack({
  players,
  onPlayerSelect,
  onViewProfile,
}: AIPlayerStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scoringPlayers, setScoringPlayers] = useState<Set<string>>(new Set());

  // Simulate live scoring updates
  useEffect(() => {
    const interval = setInterval(() => {
      players.forEach((player) => {
        if (Math.random() < 0.15) {
          // 15% chance to score
          setScoringPlayers((prev) => new Set([...prev, player.id]));
          setTimeout(() => {
            setScoringPlayers((prev) => {
              const newSet = new Set(prev);
              newSet.delete(player.id);
              return newSet;
            });
          }, 3000);
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [players]);

  const nextPlayer = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % players.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevPlayer = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + players.length) % players.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getPredictionIcon = (type: string) => {
    switch (type) {
      case "hot":
        return <FlameIcon className="h-4 w-4 text-red-500" />;

      case "warning":
        return <AlertTriangleIcon className="h-4 w-4 text-yellow-500" />;

      case "opportunity":
        return <TrendingUpIcon className="h-4 w-4 text-green-500" />;

      default:
        return <TargetIcon className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPredictionColor = (type: string) => {
    switch (type) {
      case "hot":
        return "from-red-500 to-orange-500";
      case "warning":
        return "from-yellow-500 to-orange-500";
      case "opportunity":
        return "from-green-500 to-blue-500";
      default:
        return "from-blue-500 to-purple-500";
    }
  };

  const getMatchupColor = (rating: string) => {
    switch (rating) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (players.length === 0) return null;

  const currentPlayer = players[currentIndex];
  const isScoring = scoringPlayers.has(currentPlayer.id);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ZapIcon className="h-5 w-5 text-blue-500" />
          Mis Jugadores AI
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevPlayer}
            disabled={isAnimating}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500 min-w-[60px] text-center">
            {currentIndex + 1} / {players.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextPlayer}
            disabled={isAnimating}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Player Card Stack */}
      <div className="relative h-[400px]">
        {/* Background cards for stack effect */}
        {players.slice(currentIndex + 1, currentIndex + 3).map((_, index) => (
          <Card
            key={`bg-${index}`}
            className={`absolute inset-0 transition-all duration-300 ${
              index === 0
                ? "translate-y-2 scale-95 opacity-60"
                : "translate-y-4 scale-90 opacity-30"
            }`}
            style={{ zIndex: 10 - index }}
          >
            <CardContent className="p-6 h-full bg-gray-100" />
          </Card>
        ))}

        {/* Main Player Card */}
        <Card
          className={`relative z-20 h-full transition-all duration-300 transform ${
            isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
          } ${isScoring ? "ring-4 ring-yellow-400 shadow-2xl" : ""}`}
          onClick={() => onViewProfile(currentPlayer.id)}
        >
          {/* Scoring Glow Effect */}
          {isScoring && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 rounded-lg animate-pulse" />
          )}

          {/* Hot Streak Indicator */}
          {currentPlayer.hotStreak && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse">
                <FlameIcon className="h-3 w-3 mr-1" />
                HOT
              </Badge>
            </div>
          )}

          {/* Matchup Rating */}
          <div className="absolute top-4 right-4 z-10">
            <Badge className={getMatchupColor(currentPlayer.matchupRating)}>
              {currentPlayer.matchupRating.toUpperCase()}
            </Badge>
          </div>

          <CardContent className="p-6 h-full flex flex-col">
            {/* Player Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src={currentPlayer.avatar}
                  alt={currentPlayer.name}
                  className={`w-16 h-16 rounded-full transition-all duration-300 ${
                    isScoring ? "ring-4 ring-yellow-400 scale-110" : ""
                  }`}
                />

                {isScoring && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-xs font-bold text-yellow-900">
                      🔥
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {currentPlayer.name}
                </h3>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Team
                    teamId={currentPlayer.team}
                    variant="name"
                    size="xs"
                    className="text-gray-600"
                  />

                  <span>
                    {" "}
                    • #{currentPlayer.jersey} • {currentPlayer.position}
                  </span>
                </div>
                <p className="text-sm font-medium text-green-600">
                  ${currentPlayer.salary.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Live Stats */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Stats en Vivo
                </span>
                {isScoring && (
                  <Badge className="bg-yellow-500 text-yellow-900 animate-pulse">
                    ¡Anotando!
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div
                    className={`text-xl font-bold transition-all duration-500 ${
                      isScoring ? "text-yellow-600 scale-110" : "text-gray-900"
                    }`}
                  >
                    {currentPlayer.liveStats.points}
                  </div>
                  <div className="text-xs text-gray-600">PTS</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {currentPlayer.liveStats.rebounds}
                  </div>
                  <div className="text-xs text-gray-600">REB</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {currentPlayer.liveStats.assists}
                  </div>
                  <div className="text-xs text-gray-600">AST</div>
                </div>
              </div>
            </div>

            {/* AI Prediction */}
            <div
              className={`bg-gradient-to-r ${getPredictionColor(currentPlayer.aiPrediction.type)} p-4 rounded-lg mb-4`}
            >
              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  {getPredictionIcon(currentPlayer.aiPrediction.type)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm mb-1">
                    AI Prediction ({currentPlayer.aiPrediction.confidence}%
                    confianza)
                  </p>
                  <p className="text-white/90 text-sm">
                    {currentPlayer.aiPrediction.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Highlights */}
            {currentPlayer.recentHighlights.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Highlights Recientes
                </p>
                <div className="space-y-1">
                  {currentPlayer.recentHighlights
                    .slice(0, 2)
                    .map((highlight, index) => (
                      <p
                        key={index}
                        className="text-xs text-gray-600 flex items-center gap-1"
                      >
                        <span className="text-yellow-500">⭐</span>
                        {highlight}
                      </p>
                    ))}
                </div>
              </div>
            )}

            {/* Value Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-700">
                  {currentPlayer.ownership}%
                </div>
                <div className="text-xs text-blue-600">Ownership</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-700">
                  {currentPlayer.value.toFixed(1)}
                </div>
                <div className="text-xs text-green-600">Pts/$1K</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProfile(currentPlayer.id);
                }}
              >
                <BarChart3Icon className="h-4 w-4 mr-1" />
                Ver Perfil
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayerSelect(currentPlayer);
                }}
              >
                Seleccionar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Player Dots Indicator */}
      <div className="flex justify-center gap-2">
        {players.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon, ClockIcon, UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTeamById, getLeagueById } from "@/polymet/data/mock-data";
import Team from "@/polymet/components/team";

interface LiveScoreboardProps {
  game: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    quarter?: number;
    timeLeft?: string;
    status: "live" | "upcoming" | "finished";
    league: string;
    venue?: string;
    date?: string;
    time?: string;
  };
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
  interactive?: boolean;
}

export default function LiveScoreboard({
  game,
  size = "md",
  showDetails = true,
  interactive = false,
}: LiveScoreboardProps) {
  const [isLive, setIsLive] = useState(game.status === "live");
  const [currentTime, setCurrentTime] = useState(game.timeLeft || "0:00");
  const [blinkScore, setBlinkScore] = useState(false);

  const homeTeam = getTeamById(game.homeTeam);
  const awayTeam = getTeamById(game.awayTeam);
  const league = getLeagueById(game.league);

  // Simulate live updates
  useEffect(() => {
    if (isLive && game.status === "live") {
      const interval = setInterval(() => {
        // Simulate score blink effect when points are scored
        if (Math.random() > 0.95) {
          setBlinkScore(true);
          setTimeout(() => setBlinkScore(false), 500);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLive, game.status]);

  const getStatusBadge = () => {
    switch (game.status) {
      case "live":
        return (
          <Badge className="bg-red-500 text-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-ping" />
            EN VIVO
          </Badge>
        );

      case "upcoming":
        return <Badge variant="outline">PRÓXIMO</Badge>;

      case "finished":
        return <Badge variant="secondary">FINAL</Badge>;

      default:
        return null;
    }
  };

  const sizeClasses = {
    sm: {
      container: "p-3",
      score: "text-2xl",
      team: "text-sm",
      details: "text-xs",
    },
    md: {
      container: "p-4",
      score: "text-4xl",
      team: "text-base",
      details: "text-sm",
    },
    lg: {
      container: "p-6",
      score: "text-6xl",
      team: "text-lg",
      details: "text-base",
    },
  };

  const classes = sizeClasses[size];

  return (
    <Card
      className={cn(
        "bg-gradient-to-br from-white to-gray-50 text-gray-900 border-gray-200 overflow-hidden relative shadow-sm",
        interactive &&
          "hover:scale-105 transition-transform duration-200 cursor-pointer"
      )}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="h-full w-full bg-gradient-to-b from-transparent via-gray-300 to-transparent bg-repeat-y"
          style={{ backgroundSize: "100% 4px" }}
        />
      </div>

      <CardContent className={classes.container}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {league && (
              <Badge
                variant="outline"
                className="border-gray-300 text-gray-700"
                style={{ borderColor: league.color }}
              >
                {league.name}
              </Badge>
            )}
            {getStatusBadge()}
          </div>

          {game.status === "live" && (
            <div className="flex items-center gap-2 text-green-600">
              <PlayIcon className="w-4 h-4" />

              <span className={classes.details}>Q{game.quarter}</span>
            </div>
          )}
        </div>

        {/* Main Scoreboard */}
        <div className="text-center space-y-4">
          {/* Team Names Row */}
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Away Team */}
            <div className="text-right flex flex-col items-end justify-center min-h-[60px]">
              <div className="mb-1">
                <Team
                  teamId={game.awayTeam}
                  variant="name"
                  size={size === "sm" ? "sm" : size === "md" ? "md" : "lg"}
                  className="text-gray-800 font-bold"
                />
              </div>
              <div className="text-sm text-gray-600">
                <Team
                  teamId={game.awayTeam}
                  variant="city"
                  size={size === "sm" ? "sm" : "md"}
                  className="text-gray-600"
                />
              </div>
            </div>

            {/* VS Separator */}
            <div className="text-gray-500 font-bold flex items-center justify-center min-h-[60px]">
              VS
            </div>

            {/* Home Team */}
            <div className="text-left flex flex-col items-start justify-center min-h-[60px]">
              <div className="mb-1">
                <Team
                  teamId={game.homeTeam}
                  variant="name"
                  size={size === "sm" ? "sm" : size === "md" ? "md" : "lg"}
                  className="text-gray-800 font-bold"
                />
              </div>
              <div className="text-sm text-gray-600">
                <Team
                  teamId={game.homeTeam}
                  variant="city"
                  size={size === "sm" ? "sm" : "md"}
                  className="text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Scores Row */}
          <div className="relative">
            <div
              className={cn(
                "font-mono font-bold text-center leading-none",
                classes.score,
                blinkScore && "animate-pulse text-yellow-400"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <span
                  className={cn(
                    "bg-gray-100 px-3 py-2 rounded border-2 border-gray-300 text-gray-900",
                    game.awayScore > game.homeScore &&
                      game.status === "finished" &&
                      "border-yellow-500 bg-yellow-50"
                  )}
                >
                  {game.awayScore}
                </span>
                <span className="text-gray-500">-</span>
                <span
                  className={cn(
                    "bg-gray-100 px-3 py-2 rounded border-2 border-gray-300 text-gray-900",
                    game.homeScore > game.awayScore &&
                      game.status === "finished" &&
                      "border-yellow-500 bg-yellow-50"
                  )}
                >
                  {game.homeScore}
                </span>
              </div>
            </div>
          </div>

          {/* Game Time/Status */}
          {game.status === "live" && currentTime && (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <ClockIcon className="w-4 h-4" />

              <span className={cn(classes.details, "font-mono font-bold")}>
                {currentTime}
              </span>
            </div>
          )}

          {/* Upcoming game details */}
          {game.status === "upcoming" && showDetails && (
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <ClockIcon className="w-4 h-4" />

                <span className={classes.details}>
                  {game.date} • {game.time}
                </span>
              </div>
              {game.venue && (
                <div className="flex items-center justify-center gap-2">
                  <UsersIcon className="w-4 h-4" />

                  <span className={classes.details}>{game.venue}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Interactive Controls */}
        {interactive && game.status === "live" && (
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? (
                <PauseIcon className="w-4 h-4" />
              ) : (
                <PlayIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        )}

        {/* Team colors accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div
            className="flex-1"
            style={{ backgroundColor: awayTeam?.colors[0] || "#64748b" }}
          />

          <div
            className="flex-1"
            style={{ backgroundColor: homeTeam?.colors[0] || "#64748b" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

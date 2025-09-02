import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ClockIcon,
  StarIcon,
  TrendingUpIcon,
  FlameIcon,
  TargetIcon,
  ChevronRightIcon,
  CalendarIcon,
} from "lucide-react";
import Team from "@/polymet/components/team";

interface TopPlayer {
  id: string;
  name: string;
  position: string;
  team: string;
  avatar: string;
  projectedPoints: number;
  salary: number;
  ownership: number;
  reason: string;
  confidence: "high" | "medium" | "low";
}

interface UpcomingGame {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  startTime: string;
  venue: string;
  league: string;
  gameImportance: "high" | "medium" | "low";
  topPlayers: TopPlayer[];
  totalPlayers: number;
  isTonight?: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: string;
  progress: number;
  maxProgress: number;
  isDaily: boolean;
}

interface UpcomingGamesPicksProps {
  games: UpcomingGame[];
  challenges: Challenge[];
  onPickPlayer: (playerId: string, gameId: string) => void;
  onViewAllPlayers: (gameId: string) => void;
  onViewChallenge: (challengeId: string) => void;
}

export default function UpcomingGamesPicks({
  games,
  challenges,
  onPickPlayer,
  onViewAllPlayers,
  onViewChallenge,
}: UpcomingGamesPicksProps) {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 shadow-sm";
      case "medium":
        return "text-orange-700 bg-gradient-to-r from-orange-100 to-amber-100 shadow-sm";
      case "low":
        return "text-red-700 bg-gradient-to-r from-red-100 to-pink-100 shadow-sm";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getGameImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "border-l-4 border-gradient-to-b from-red-500 to-orange-500 shadow-md";
      case "medium":
        return "border-l-4 border-gradient-to-b from-orange-500 to-amber-500 shadow-md";
      case "low":
        return "border-l-4 border-gradient-to-b from-blue-500 to-teal-500 shadow-md";
      default:
        return "";
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("es-PR", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isToday = (timeString: string) => {
    const gameDate = new Date(timeString);
    const today = new Date();
    return gameDate.toDateString() === today.toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-end">
        <Badge className="bg-blue-100 text-blue-800 shadow-sm">
          {games.length} juegos hoy
        </Badge>
      </div>

      {/* Games List */}
      <div className="space-y-4">
        {games.map((game) => (
          <Card
            key={game.id}
            className={`transition-all duration-300 hover:shadow-lg bg-white border border-gray-200 shadow-sm ${selectedGameId === game.id ? "ring-2 ring-blue-500 shadow-xl" : ""}`}
          >
            <CardContent className="p-4">
              {/* Game Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Team teamId={game.awayTeam} variant="name" size="sm" />

                      <span>@</span>
                      <Team teamId={game.homeTeam} variant="name" size="sm" />
                    </div>
                    {game.isTonight && (
                      <Badge className="bg-red-500 text-white animate-pulse shadow-md">
                        ESTA NOCHE
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />

                      {formatTime(game.startTime)}
                    </div>
                    <div>{game.venue}</div>
                    <Badge variant="outline" className="text-xs">
                      {game.league}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setSelectedGameId(
                      selectedGameId === game.id ? null : game.id
                    )
                  }
                >
                  <ChevronRightIcon
                    className={`h-4 w-4 transition-transform ${
                      selectedGameId === game.id ? "rotate-90" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Top 3 Fantasy Players */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <StarIcon className="h-4 w-4 text-blue-500" />
                    Top Fantasy Picks
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewAllPlayers(game.id)}
                  >
                    Ver todos ({game.totalPlayers})
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {game.topPlayers.slice(0, 3).map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full shadow-md">
                        {index + 1}
                      </div>

                      {/* Player Info */}
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-10 h-10 rounded-full"
                      />

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {player.name}
                          </span>
                          <Badge
                            className={getConfidenceColor(player.confidence)}
                          >
                            {player.confidence.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Team
                            teamId={player.team}
                            variant="name"
                            size="xs"
                            className="text-gray-600"
                          />

                          <span>
                            {" "}
                            • {player.position} • $
                            {player.salary.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {player.reason}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {player.projectedPoints.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">proj pts</div>
                        <div className="text-xs text-gray-500">
                          {player.ownership}% own
                        </div>
                      </div>

                      {/* Pick Button */}
                      <Button
                        size="sm"
                        onClick={() => onPickPlayer(player.id, game.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                      >
                        Pick
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Game Details */}
              {selectedGameId === game.id && (
                <div className="border-t pt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Venue:</span>
                      <p className="text-gray-600">{game.venue}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">League:</span>
                      <p className="text-gray-600">{game.league}</p>
                    </div>
                  </div>

                  {/* Game Insights */}
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 shadow-sm">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <TargetIcon className="h-4 w-4" />
                      Game Insights
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• High-scoring game expected (O/U 215.5)</li>
                      <li>• {game.homeTeam} favored by 3.5 points</li>
                      <li>• Both teams average 110+ points per game</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily/Weekly Challenges */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FlameIcon className="h-5 w-5 text-orange-600" />
          Challenges Activos
        </h2>

        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="bg-white border border-gray-200 shadow-sm"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      challenge.isDaily
                        ? "bg-orange-500 text-white shadow-sm"
                        : "bg-purple-500 text-white shadow-sm"
                    }
                  >
                    {challenge.isDaily ? "DIARIO" : "SEMANAL"}
                  </Badge>
                  <h3 className="font-semibold text-gray-900">
                    {challenge.title}
                  </h3>
                </div>
                <Badge className="bg-green-500 text-white shadow-sm">
                  {challenge.reward}
                </Badge>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                {challenge.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">
                    Progreso: {challenge.progress}/{challenge.maxProgress}
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500 shadow-sm"
                      style={{
                        width: `${(challenge.progress / challenge.maxProgress) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewChallenge(challenge.id)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
                >
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

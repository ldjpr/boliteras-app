import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
  ClockIcon,
  TrophyIcon,
  FlameIcon,
  UserIcon,
  UsersIcon,
  CalendarIcon,
} from "lucide-react";

interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  avatar: string;
  points: number;
  projectedPoints: number;
  status: "active" | "bench" | "injured" | "bye";
  isLive: boolean;
  gameInfo?: string;
}

interface FantasyTeam {
  id: string;
  name: string;
  owner: string;
  avatar: string;
  score: number;
  projectedScore: number;
  record: string;
  starters: Player[];
  bench: Player[];
  isCurrentUser: boolean;
}

interface Matchup {
  id: string;
  week: number;
  team1: FantasyTeam;
  team2: FantasyTeam;
  status: "upcoming" | "live" | "final";
  gameTime?: string;
  remainingTime?: string;
}

interface FantasyLeagueMatchupProps {
  matchup: Matchup;
  onViewPlayer?: (playerId: string) => void;
  onViewFullStats?: (teamId: string) => void;
}

export default function FantasyLeagueMatchup({
  matchup,
  onViewPlayer,
  onViewFullStats,
}: FantasyLeagueMatchupProps) {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<"starters" | "bench">(
    "starters"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-500 text-white";
      case "upcoming":
        return "bg-blue-500 text-white";
      case "final":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPlayerStatusBadge = (player: Player) => {
    if (player.isLive) {
      return (
        <Badge className="bg-green-500 text-white text-xs px-1 py-0">
          <PlayIcon className="w-2 h-2 mr-1" />
          LIVE
        </Badge>
      );
    }
    if (player.status === "injured") {
      return (
        <Badge className="bg-red-500 text-white text-xs px-1 py-0">INJ</Badge>
      );
    }
    if (player.status === "bye") {
      return (
        <Badge className="bg-gray-500 text-white text-xs px-1 py-0">BYE</Badge>
      );
    }
    return null;
  };

  const renderPlayer = (player: Player, isStarter: boolean = true) => (
    <div
      key={player.id}
      className={`flex items-center justify-between p-2 rounded-lg ${
        player.isLive ? "bg-green-50 border border-green-200" : "bg-gray-50"
      } ${!isStarter ? "opacity-75" : ""}`}
      onClick={() => onViewPlayer?.(player.id)}
    >
      <div className="flex items-center gap-3 flex-1">
        <Avatar className="w-8 h-8">
          <AvatarImage src={player.avatar} />

          <AvatarFallback className="text-xs">
            {player.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">{player.name}</span>
            <Badge variant="outline" className="text-xs px-1 py-0">
              {player.position}
            </Badge>
            {getPlayerStatusBadge(player)}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {player.team} {player.gameInfo && `• ${player.gameInfo}`}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div
          className={`font-bold text-sm ${player.isLive ? "text-green-600" : "text-gray-900"}`}
        >
          {player.points.toFixed(1)}
        </div>
        <div className="text-xs text-gray-500">
          {player.projectedPoints.toFixed(1)} proj
        </div>
      </div>
    </div>
  );

  const renderMyTeamRoster = (team: FantasyTeam) => (
    <div className="space-y-3">
      {/* Active Starters */}
      <div>
        <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <PlayIcon className="w-3 h-3" />
          Titulares Activos ({team.starters.length})
        </h5>
        <div className="space-y-1">
          {team.starters.map((player) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-2 rounded-md text-xs ${
                player.isLive
                  ? "bg-green-100 border border-green-300"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 flex-1">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={player.avatar} />

                  <AvatarFallback className="text-xs">
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-medium truncate">{player.name}</span>
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      {player.position}
                    </Badge>
                    {player.isLive && (
                      <Badge className="bg-green-500 text-white text-xs px-1 py-0">
                        LIVE
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />

                    {player.gameInfo || `${player.team} - Próximo juego`}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-bold ${player.isLive ? "text-green-600" : "text-gray-900"}`}
                >
                  {player.points.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">
                  {player.projectedPoints.toFixed(1)} proj
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bench Players */}
      {team.bench.length > 0 && (
        <div>
          <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <UserIcon className="w-3 h-3" />
            En Banca ({team.bench.length})
          </h5>
          <div className="space-y-1">
            {team.bench.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-2 rounded-md text-xs bg-gray-50 border border-gray-200 opacity-75"
              >
                <div className="flex items-center gap-2 flex-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={player.avatar} />

                    <AvatarFallback className="text-xs">
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-medium truncate">
                        {player.name}
                      </span>
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {player.position}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />

                      {player.gameInfo || `${player.team} - En banca`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-600">
                    {player.points.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {player.projectedPoints.toFixed(1)} proj
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Summary */}
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div>
            <div className="font-bold text-blue-600">
              {team.score.toFixed(1)}
            </div>
            <div className="text-gray-500">Puntos Actuales</div>
          </div>
          <div>
            <div className="font-bold text-green-600">
              {team.projectedScore.toFixed(1)}
            </div>
            <div className="text-gray-500">Proyectados</div>
          </div>
          <div>
            <div className="font-bold text-purple-600">
              {team.starters.filter((p) => p.isLive).length}
            </div>
            <div className="text-gray-500">Jugando Ahora</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeam = (team: FantasyTeam, isLeft: boolean = true) => (
    <div className={`flex-1 ${!isLeft ? "text-right" : ""}`}>
      <div className="flex items-center gap-3 mb-3">
        {isLeft && (
          <>
            <Avatar className="w-10 h-10">
              <AvatarImage src={team.avatar} />

              <AvatarFallback>
                {team.owner
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-bold text-sm">{team.name}</div>
              <div className="text-xs text-gray-500">
                {team.owner} • {team.record}
              </div>
            </div>
          </>
        )}
        {!isLeft && (
          <>
            <div className="flex-1">
              <div className="font-bold text-sm">{team.name}</div>
              <div className="text-xs text-gray-500">
                {team.owner} • {team.record}
              </div>
            </div>
            <Avatar className="w-10 h-10">
              <AvatarImage src={team.avatar} />

              <AvatarFallback>
                {team.owner
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </>
        )}
      </div>

      <div className="space-y-1">
        <div
          className={`text-2xl font-bold ${team.isCurrentUser ? "text-blue-600" : "text-gray-900"}`}
        >
          {team.score.toFixed(1)}
        </div>
        <div className="text-xs text-gray-500">
          {team.projectedScore.toFixed(1)} projected
        </div>
        {matchup.status === "live" && (
          <div className="text-xs text-green-600 font-medium">
            {team.starters.filter((p) => p.isLive).length} jugadores activos
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-sm">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(matchup.status)}>
              {matchup.status === "live" && (
                <FlameIcon className="w-3 h-3 mr-1" />
              )}
              {matchup.status === "upcoming" && (
                <ClockIcon className="w-3 h-3 mr-1" />
              )}
              {matchup.status === "final" && (
                <TrophyIcon className="w-3 h-3 mr-1" />
              )}
              {matchup.status.toUpperCase()}
            </Badge>
            <span className="text-sm font-medium text-gray-600">
              Semana {matchup.week}
            </span>
          </div>
          {matchup.gameTime && (
            <span className="text-xs text-gray-500">{matchup.gameTime}</span>
          )}
        </div>

        {/* Team Matchup */}
        <div className="flex items-center gap-4 mb-4">
          {renderTeam(matchup.team1, true)}

          <div className="text-center">
            <div className="text-lg font-bold text-gray-400">VS</div>
            {matchup.remainingTime && (
              <div className="text-xs text-gray-500 mt-1">
                {matchup.remainingTime}
              </div>
            )}
          </div>

          {renderTeam(matchup.team2, false)}
        </div>

        {/* Expand Button */}
        <Button
          variant="ghost"
          className="w-full text-sm"
          onClick={() =>
            setExpandedTeam(expandedTeam ? null : matchup.team1.id)
          }
        >
          {expandedTeam ? (
            <>
              Ocultar Lineups <ChevronUpIcon className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              Ver Lineups <ChevronDownIcon className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>

        {/* Expanded Lineup */}
        {expandedTeam && (
          <div className="mt-4 space-y-4">
            {/* Tab Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedTab === "starters"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setSelectedTab("starters")}
              >
                Titulares
              </button>
              <button
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedTab === "bench"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setSelectedTab("bench")}
              >
                Banca
              </button>
            </div>

            {/* Player Lists */}
            <div className="grid grid-cols-2 gap-4">
              {/* Team 1 */}
              <div>
                <h4 className="font-medium text-sm text-gray-900 mb-2 flex items-center gap-1">
                  <UserIcon className="w-3 h-3" />

                  {matchup.team1.name}
                </h4>
                <div className="space-y-1">
                  {(selectedTab === "starters"
                    ? matchup.team1.starters
                    : matchup.team1.bench
                  )
                    .slice(0, 5)
                    .map((player) =>
                      renderPlayer(player, selectedTab === "starters")
                    )}
                </div>
              </div>

              {/* Team 2 */}
              <div>
                <h4 className="font-medium text-sm text-gray-900 mb-2 flex items-center gap-1">
                  <UserIcon className="w-3 h-3" />

                  {matchup.team2.name}
                </h4>
                <div className="space-y-1">
                  {(selectedTab === "starters"
                    ? matchup.team2.starters
                    : matchup.team2.bench
                  )
                    .slice(0, 5)
                    .map((player) =>
                      renderPlayer(player, selectedTab === "starters")
                    )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Team Roster Section */}
        {(matchup.team1.isCurrentUser || matchup.team2.isCurrentUser) && (
          <div className="mt-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-blue-800">
                  <UsersIcon className="w-4 h-4" />
                  Mi Equipo -{" "}
                  {matchup.team1.isCurrentUser
                    ? matchup.team1.name
                    : matchup.team2.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {renderMyTeamRoster(
                  matchup.team1.isCurrentUser ? matchup.team1 : matchup.team2
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4">
          <Button
            size="sm"
            className="w-full bg-green-600 hover:bg-green-700 text-white border-0"
            onClick={() => onViewFullStats?.(matchup.team1.id)}
          >
            📊 Ver Estadísticas Completas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

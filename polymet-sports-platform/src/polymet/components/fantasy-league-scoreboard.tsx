import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TrophyIcon,
  FlameIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UsersIcon,
  TargetIcon,
} from "lucide-react";
import FantasyLeagueMatchup from "@/polymet/components/fantasy-league-matchup";

interface LeagueTeam {
  id: string;
  name: string;
  owner: string;
  avatar: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  streak: number;
  streakType: "W" | "L";
  rank: number;
  isCurrentUser: boolean;
  isPlayoffBound: boolean;
}

interface WeeklyMatchup {
  id: string;
  team1: {
    id: string;
    name: string;
    owner: string;
    avatar: string;
    score: number;
    projectedScore: number;
    record: string;
    isCurrentUser: boolean;
    starters: any[];
    bench: any[];
  };
  team2: {
    id: string;
    name: string;
    owner: string;
    avatar: string;
    score: number;
    projectedScore: number;
    record: string;
    isCurrentUser: boolean;
    starters: any[];
    bench: any[];
  };
  status: "upcoming" | "live" | "final";
  week: number;
  gameTime?: string;
  remainingTime?: string;
}

interface FantasyLeagueScoreboardProps {
  teams: LeagueTeam[];
  weeklyMatchups: WeeklyMatchup[];
  currentWeek: number;
  leagueName: string;
  onViewTeam?: (teamId: string) => void;
  onViewMatchup?: (matchupId: string) => void;
  onTrashTalk?: (matchupId: string) => void;
}

export default function FantasyLeagueScoreboard({
  teams,
  weeklyMatchups,
  currentWeek,
  leagueName,
  onViewTeam,
  onViewMatchup,
  onTrashTalk,
}: FantasyLeagueScoreboardProps) {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [selectedTab, setSelectedTab] = useState<
    "scoreboard" | "standings" | "los-mios"
  >("scoreboard");

  const playoffTeams = teams.filter((team) => team.isPlayoffBound);
  const currentUserTeam = teams.find((team) => team.isCurrentUser);

  const renderLosMios = () => {
    if (!currentUserTeam) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontró tu equipo</p>
        </div>
      );
    }

    const userMatchup = weeklyMatchups.find(
      (m) => m.team1.isCurrentUser || m.team2.isCurrentUser
    );

    return (
      <div className="space-y-6 bg-white">
        {/* Team Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                <AvatarImage src={currentUserTeam.avatar} />

                <AvatarFallback className="text-xl font-bold">
                  {currentUserTeam.owner
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{currentUserTeam.name}</h2>
                <p className="text-lg opacity-90">{currentUserTeam.owner}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className="bg-white/20 text-white">
                    Posición #{currentUserTeam.rank}
                  </Badge>
                  <Badge className="bg-white/20 text-white">
                    {currentUserTeam.wins}-{currentUserTeam.losses}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {currentUserTeam.pointsFor.toFixed(1)}
              </div>
              <div className="text-sm opacity-90">Puntos Totales</div>
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {currentUserTeam.wins}
            </div>
            <div className="text-sm text-green-600">Victorias</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-700">
              {currentUserTeam.losses}
            </div>
            <div className="text-sm text-red-600">Derrotas</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">
              {(
                currentUserTeam.pointsFor /
                (currentUserTeam.wins + currentUserTeam.losses)
              ).toFixed(1)}
            </div>
            <div className="text-sm text-blue-600">Promedio</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div
              className={`text-2xl font-bold ${
                currentUserTeam.streakType === "W"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {currentUserTeam.streakType}
              {currentUserTeam.streak}
            </div>
            <div className="text-sm text-purple-600">Racha</div>
          </div>
        </div>

        {/* Current Matchup */}
        {userMatchup && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FlameIcon className="w-5 h-5 text-red-500" />
              Mi Matchup - Semana {userMatchup.week}
            </h3>
            <div className="border-2 border-blue-200 rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50">
              <FantasyLeagueMatchup
                matchup={userMatchup}
                onViewPlayer={(playerId) =>
                  console.log("View player:", playerId)
                }
                onViewFullStats={(teamId) => onViewTeam?.(teamId)}
                onTrashTalk={() => onTrashTalk?.(userMatchup.id)}
              />
            </div>
          </div>
        )}

        {/* Lineup Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-blue-500" />
            Titulares Activos
          </h3>
          {userMatchup &&
          userMatchup.team1.isCurrentUser &&
          userMatchup.team1.starters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userMatchup.team1.starters.map((player) => (
                <div
                  key={player.id}
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    player.isLive
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 shadow-md"
                      : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                      <AvatarImage src={player.avatar} />

                      <AvatarFallback className="text-sm font-medium">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {player.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {player.position} - {player.team}
                      </div>
                      {player.isLive && (
                        <Badge className="bg-red-500 text-white text-xs mt-1">
                          <FlameIcon className="w-3 h-3 mr-1" />
                          LIVE
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center bg-white p-2 rounded border">
                      <div className="font-bold text-lg text-blue-600">
                        {player.points.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">Puntos</div>
                    </div>
                    <div className="text-center bg-white p-2 rounded border">
                      <div className="font-bold text-lg text-purple-600">
                        {player.projectedPoints.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">Proyección</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    {player.gameInfo}
                  </div>
                </div>
              ))}
            </div>
          ) : userMatchup &&
            userMatchup.team2.isCurrentUser &&
            userMatchup.team2.starters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userMatchup.team2.starters.map((player) => (
                <div
                  key={player.id}
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    player.isLive
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 shadow-md"
                      : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                      <AvatarImage src={player.avatar} />

                      <AvatarFallback className="text-sm font-medium">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {player.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {player.position} - {player.team}
                      </div>
                      {player.isLive && (
                        <Badge className="bg-red-500 text-white text-xs mt-1">
                          <FlameIcon className="w-3 h-3 mr-1" />
                          LIVE
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center bg-white p-2 rounded border">
                      <div className="font-bold text-lg text-blue-600">
                        {player.points.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">Puntos</div>
                    </div>
                    <div className="text-center bg-white p-2 rounded border">
                      <div className="font-bold text-lg text-purple-600">
                        {player.projectedPoints.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">Proyección</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    {player.gameInfo}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">
                No hay lineup disponible para mostrar
              </p>
            </div>
          )}
        </div>

        {/* Season Progress */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Progreso de Temporada
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Camino a Playoffs</span>
                <span className="font-medium">
                  {currentUserTeam.isPlayoffBound
                    ? "Clasificado 🏆"
                    : "En lucha 💪"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    currentUserTeam.isPlayoffBound
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : "bg-gradient-to-r from-yellow-500 to-orange-500"
                  }`}
                  style={{
                    width: `${Math.min(100, (currentUserTeam.wins / 8) * 100)}%`,
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-gray-900">
                  {17 - (currentUserTeam.wins + currentUserTeam.losses)}
                </div>
                <div className="text-gray-600">Juegos Restantes</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">
                  {(
                    currentUserTeam.pointsFor - currentUserTeam.pointsAgainst
                  ).toFixed(1)}
                </div>
                <div className="text-gray-600">Diferencial</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">
                  {Math.max(0, 8 - currentUserTeam.wins)}
                </div>
                <div className="text-gray-600">Victorias Necesarias</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStandings = () => (
    <div className="space-y-3 bg-white">
      {teams.map((team, index) => (
        <div
          key={team.id}
          className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:shadow-md ${
            team.isCurrentUser
              ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-md"
              : team.isPlayoffBound
                ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300"
                : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
          }`}
          onClick={() => onViewTeam?.(team.id)}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                team.rank === 1
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                  : team.rank <= 4
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                    : team.rank <= 8
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
              }`}
            >
              {team.rank === 1 ? "👑" : team.rank}
            </div>
            <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
              <AvatarImage src={team.avatar} />

              <AvatarFallback className="text-sm font-medium">
                {team.owner
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-base text-gray-900">
                {team.name}
              </div>
              <div className="text-sm text-gray-600">{team.owner}</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg text-gray-900">
                {team.wins}-{team.losses}
              </div>
              <div className="text-xs text-gray-500">Record</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-blue-600">
                {team.pointsFor.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">Puntos</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-purple-600">
                {(team.pointsFor - team.pointsAgainst).toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">Diff</div>
            </div>
            <div className="text-center">
              <div
                className={`font-bold text-lg ${
                  team.streakType === "W" ? "text-green-600" : "text-red-600"
                }`}
              >
                {team.streakType}
                {team.streak}
              </div>
              <div className="text-xs text-gray-500">Racha</div>
            </div>
            {team.isPlayoffBound && (
              <TrophyIcon className="w-5 h-5 text-green-500" />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderScoreboard = () => {
    const weekMatchups = weeklyMatchups.filter((m) => m.week === selectedWeek);

    return (
      <div className="space-y-6 bg-white">
        {/* Week Navigation */}
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white border-0 disabled:bg-gray-300 disabled:text-gray-500 px-4 py-2"
            onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
            disabled={selectedWeek <= 1}
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Anterior
          </Button>

          <div className="text-center">
            <h3 className="font-bold text-xl text-gray-900">
              Semana {selectedWeek}
            </h3>
            {selectedWeek === currentWeek && (
              <Badge className="bg-red-500 text-white text-sm mt-1">
                <FlameIcon className="w-3 h-3 mr-1" />
                EN VIVO
              </Badge>
            )}
          </div>

          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white border-0 disabled:bg-gray-300 disabled:text-gray-500 px-4 py-2"
            onClick={() => setSelectedWeek(Math.min(17, selectedWeek + 1))}
            disabled={selectedWeek >= 17}
          >
            Siguiente
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Matchups */}
        <div className="space-y-4">
          {weekMatchups.map((matchup) => (
            <div
              key={matchup.id}
              className="border-2 border-gray-200 rounded-lg overflow-hidden"
            >
              <FantasyLeagueMatchup
                matchup={matchup}
                onViewPlayer={(playerId) =>
                  console.log("View player:", playerId)
                }
                onViewFullStats={(teamId) => onViewTeam?.(teamId)}
                onTrashTalk={() => onTrashTalk?.(matchup.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* League Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{leagueName}</h1>
              <p className="text-sm opacity-90">
                Semana {currentWeek} • 12 Equipos
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{playoffTeams.length}/6</div>
              <div className="text-xs opacity-90">Playoffs</div>
            </div>
          </div>

          {currentUserTeam && (
            <div className="mt-3 p-3 bg-white/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={currentUserTeam.avatar} />

                    <AvatarFallback className="text-xs">
                      {currentUserTeam.owner
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">
                    {currentUserTeam.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-bold">#{currentUserTeam.rank}</div>
                  <div className="text-xs opacity-90">
                    {currentUserTeam.wins}-{currentUserTeam.losses}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            selectedTab === "scoreboard"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setSelectedTab("scoreboard")}
        >
          <TargetIcon className="w-4 h-4" />
          Scoreboard
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            selectedTab === "standings"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setSelectedTab("standings")}
        >
          <TrophyIcon className="w-4 h-4" />
          Standings
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            selectedTab === "los-mios"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setSelectedTab("los-mios")}
        >
          <UsersIcon className="w-4 h-4" />
          Los Míos
        </button>
      </div>

      {/* Content */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6 bg-white">
          {selectedTab === "scoreboard"
            ? renderScoreboard()
            : selectedTab === "standings"
              ? renderStandings()
              : renderLosMios()}
        </CardContent>
      </Card>

      {/* League Stats */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="pb-2 bg-white">
          <CardTitle className="text-sm flex items-center gap-2 text-gray-900">
            <UsersIcon className="w-4 h-4" />
            Stats de la Liga
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 bg-white">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-bold text-lg text-blue-600">
                {teams
                  .reduce((sum, team) => sum + team.pointsFor, 0)
                  .toFixed(0)}
              </div>
              <div className="text-xs text-gray-500">Puntos Totales</div>
            </div>
            <div>
              <div className="font-bold text-lg text-green-600">
                {Math.max(...teams.map((team) => team.pointsFor)).toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">Mejor Semana</div>
            </div>
            <div>
              <div className="font-bold text-lg text-purple-600">
                {(
                  teams.reduce((sum, team) => sum + team.pointsFor, 0) /
                  teams.length
                ).toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">Promedio Liga</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

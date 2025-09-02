import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  FlameIcon,
  TrophyIcon,
  UsersIcon,
  ArrowRightIcon,
  PlayIcon,
  CalendarIcon,
  TrendingUpIcon,
  StarIcon,
  BarChart3Icon,
  CrownIcon,
  ShieldIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import our components
import LiveScoreboard from "@/polymet/components/live-scoreboard";
import PlayerCard from "@/polymet/components/player-card";
import FantasyContestCard from "@/polymet/components/fantasy-contest-card";
import CommunityFeed from "@/polymet/components/community-feed";
import Leaderboard from "@/polymet/components/leaderboard";
import FantasyQuickActions from "@/polymet/components/fantasy-quick-actions";

// Import mock data
import {
  liveGames,
  upcomingGames,
  players,
  fantasyContests,
  communityHighlights,
  leaderboard,
} from "@/polymet/data/mock-data";

// Import fantasy league data
import {
  mockFantasyLeague,
  getUserById,
} from "@/polymet/data/fantasy-league-data";

// Import Team component for consistent team display
import Team from "@/polymet/components/team";

export default function HomePage() {
  const [gameOfTheDay, setGameOfTheDay] = useState(liveGames[0]);
  const [featuredPlayers, setFeaturedPlayers] = useState(players.slice(0, 3));
  const [isLive, setIsLive] = useState(true);
  const [activeLeagueTab, setActiveLeagueTab] = useState("scoreboard");

  // Fantasy league data
  const currentUserId = "user-1";
  const currentUser = getUserById(currentUserId);
  const currentUserMatchup = mockFantasyLeague.matchups.find(
    (matchup) =>
      matchup.user1.id === currentUserId || matchup.user2.id === currentUserId
  );

  // Add custom CSS for scrollbar hiding
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update game of the day score occasionally
      if (Math.random() > 0.9) {
        setGameOfTheDay((prev) => ({
          ...prev,
          homeScore: prev.homeScore + (Math.random() > 0.5 ? 2 : 0),
          awayScore: prev.awayScore + (Math.random() > 0.5 ? 2 : 0),
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleJoinContest = (contestId: string) => {
    console.log("Joining contest:", contestId);
    // In real app, this would navigate to contest entry
  };

  const handleSelectPlayer = (player: any) => {
    console.log("Selected player:", player.name);
    // In real app, this would add to fantasy lineup
  };

  const handleViewPlayerProfile = (playerId: string) => {
    console.log("View player profile:", playerId);
    // In real app, this would navigate to player profile page
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section - Game of the Day */}
        <section className="mb-8">
          <div className="relative overflow-hidden rounded-xl bg-blue-600 text-white">
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-red-500 text-white animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
                  EN VIVO
                </Badge>
                <h1 className="text-xl lg:text-2xl font-bold">🏠 El Barrio</h1>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="mb-4">
                  <LiveScoreboard
                    game={gameOfTheDay}
                    size="md"
                    showDetails={true}
                  />
                </div>

                <div className="text-center space-y-3">
                  <h2 className="text-base font-semibold">
                    ¡La rivalidad más intensa del BSN!
                  </h2>
                  <div className="flex gap-3 justify-center">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100">
                      <PlayIcon className="w-4 h-4 mr-2" />
                      Ver en Vivo
                    </Button>
                    <Link to="/la-bolitera">
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-blue-600"
                      >
                        Hacer Pick
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Players */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUpIcon className="w-5 h-5 text-green-500" />
                  Jugadores Destacados
                </h2>
                <Link to="/fantasy">
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Ver todos
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Horizontal Scrollable Container */}
              <div className="relative">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
                  {players.slice(0, 4).map((player) => (
                    <div key={player.id} className="flex-none w-56 snap-start">
                      <PlayerCard
                        player={player}
                        size="sm"
                        onSelect={handleSelectPlayer}
                        showPrediction={true}
                        animated={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Fantasy League Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <TrophyIcon className="w-5 h-5 text-purple-500" />
                  Liga Boricua Elite
                </h2>
                <Link to="/fantasy-league">
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Ver Liga
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* League Info Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg mb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Semana 4 • 12 Equipos</h3>
                    <p className="text-sm opacity-90">4/6 Playoffs</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">#1</div>
                    <div className="text-sm opacity-90">7-1</div>
                  </div>
                </div>
              </div>

              {/* Tabs for Scoreboard, Standings, and My Team */}
              <Tabs
                value={activeLeagueTab}
                onValueChange={setActiveLeagueTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 bg-white border-x border-gray-200 rounded-none">
                  <TabsTrigger value="scoreboard" className="text-sm">
                    <BarChart3Icon className="w-4 h-4 mr-1" />
                    Scoreboard
                  </TabsTrigger>
                  <TabsTrigger value="standings" className="text-sm">
                    <TrophyIcon className="w-4 h-4 mr-1" />
                    Standings
                  </TabsTrigger>
                  <TabsTrigger value="my-team" className="text-sm">
                    <ShieldIcon className="w-4 h-4 mr-1" />
                    Mi Equipo
                  </TabsTrigger>
                </TabsList>

                {/* Scoreboard Tab Content */}
                <TabsContent
                  value="scoreboard"
                  className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-4 mt-0"
                >
                  {currentUserMatchup && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-green-500 text-white text-xs">
                          LIVE
                        </Badge>
                        <span className="text-sm text-gray-600">Semana 4</span>
                      </div>

                      <div className="text-center mb-4">
                        <div className="flex items-center justify-center gap-8">
                          <div className="text-center">
                            <div className="text-sm font-medium mb-1">
                              {currentUserMatchup.user1.username}
                            </div>
                            <div className="text-sm text-gray-600 mb-1">
                              {currentUserMatchup.user1.record}
                            </div>
                            <div className="text-3xl font-bold text-blue-600">
                              {currentUserMatchup.user1Score}
                            </div>
                            <div className="text-xs text-gray-500">
                              {(currentUserMatchup.user1Score * 1.2).toFixed(1)}{" "}
                              projected
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              2 jugadores activos
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-sm text-gray-500 mb-2">VS</div>
                            <div className="text-sm font-medium text-red-600">
                              2:34:15 restantes
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-sm font-medium mb-1">
                              {currentUserMatchup.user2.username}
                            </div>
                            <div className="text-sm text-gray-600 mb-1">
                              {currentUserMatchup.user2.record}
                            </div>
                            <div className="text-3xl font-bold text-purple-600">
                              {currentUserMatchup.user2Score}
                            </div>
                            <div className="text-xs text-gray-500">
                              {(currentUserMatchup.user2Score * 1.1).toFixed(1)}{" "}
                              projected
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              1 jugadores activos
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Standings Tab Content */}
                <TabsContent
                  value="standings"
                  className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-4 mt-0"
                >
                  <div className="space-y-3">
                    {mockFantasyLeague.leaderboard
                      .slice(0, 5)
                      .map((user, index) => (
                        <div
                          key={user.id}
                          className={cn(
                            "flex items-center gap-3 p-2 rounded-lg",
                            user.id === currentUserId
                              ? "bg-blue-50 border border-blue-200"
                              : "hover:bg-gray-50"
                          )}
                        >
                          <div className="text-center min-w-[24px]">
                            {index === 0 && (
                              <CrownIcon className="w-4 h-4 text-yellow-500 mx-auto" />
                            )}
                            {index > 0 && (
                              <span className="text-sm font-bold text-gray-500">
                                #{index + 1}
                              </span>
                            )}
                          </div>

                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar} />

                            <AvatarFallback>{user.username[0]}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {user.username}
                              </span>
                              <span>{user.badge}</span>
                              {user.isOnline && (
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              )}
                            </div>
                            <div className="text-xs text-gray-600">
                              {user.totalPoints.toFixed(1)} pts • {user.wins}-
                              {user.losses}
                            </div>
                          </div>

                          <div className="text-right">
                            {user.winStreak > 0 && (
                              <div className="flex items-center gap-1 text-red-500">
                                <FlameIcon className="w-3 h-3" />

                                <span className="text-xs font-bold">
                                  {user.winStreak}W
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                {/* My Team Tab Content */}
                <TabsContent
                  value="my-team"
                  className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-4 mt-0"
                >
                  <div className="space-y-4">
                    {/* Team Header */}
                    <div className="flex items-center justify-between pb-3 border-b">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={currentUser?.avatar} />

                          <AvatarFallback>
                            {currentUser?.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg">
                            Mi Equipo - Los Cangrejeros
                          </h3>
                          <p className="text-sm text-gray-600">
                            Titulares Activos (5)
                          </p>
                        </div>
                      </div>
                      <Link to="/fantasy-lineup-builder">
                        <Button size="sm" variant="outline">
                          Set Lineup
                        </Button>
                      </Link>
                    </div>

                    {/* Starting Lineup */}
                    <div className="space-y-3">
                      {[
                        {
                          name: "Carlos Rivera",
                          position: "PG",
                          team: "CAN",
                          points: 21.3,
                          projected: 24.8,
                          status: "LIVE",
                          color: "text-green-600",
                        },
                        {
                          name: "Miguel Santos",
                          position: "SG",
                          team: "LEO",
                          points: 18.7,
                          projected: 22.1,
                          status: "LIVE",
                          color: "text-green-600",
                        },
                        {
                          name: "José Rodríguez",
                          position: "SF",
                          team: "VAQ",
                          points: 15.2,
                          projected: 19.5,
                          status: "9:00 PM",
                          color: "text-gray-500",
                        },
                        {
                          name: "Luis García",
                          position: "PF",
                          team: "PIR",
                          points: 22.8,
                          projected: 26.3,
                          status: "9:30 PM",
                          color: "text-gray-500",
                        },
                        {
                          name: "Pedro Martínez",
                          position: "C",
                          team: "CAP",
                          points: 0.0,
                          projected: 12.5,
                          status: "10:00 PM",
                          color: "text-gray-500",
                        },
                      ].map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-blue-600">
                                {player.position}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {player.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                vs {player.team} {player.status}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">
                              {player.points}
                            </div>
                            <div className="text-xs text-gray-500">
                              {player.projected} proj
                            </div>
                          </div>
                          {player.status === "LIVE" && (
                            <Badge className="bg-green-500 text-white text-xs ml-2">
                              LIVE
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Team Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          89.4
                        </div>
                        <div className="text-xs text-gray-600">
                          Puntos Actuales
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          105.8
                        </div>
                        <div className="text-xs text-gray-600">Proyectados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          2
                        </div>
                        <div className="text-xs text-gray-600">En Cancha</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            {/* Próximos Juegos */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-green-500" />
                  Próximos Juegos
                </h2>
              </div>

              {/* Horizontal Scrollable Container */}
              <div className="relative">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
                  {upcomingGames.slice(0, 3).map((game) => (
                    <div key={game.id} className="flex-none w-72 snap-start">
                      <LiveScoreboard
                        game={game}
                        size="md"
                        showDetails={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Fantasy League Quick Actions */}
            <section>
              <FantasyQuickActions currentUserId="user-1" />
            </section>

            {/* Featured Contest */}
            <section>
              <FantasyContestCard
                contest={fantasyContests[0]}
                onJoin={handleJoinContest}
                size="md"
              />
            </section>

            {/* Challenge del Día */}
            <section>
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-5 h-5 text-blue-600" />

                      <h3 className="text-lg font-semibold text-gray-900">
                        Challenge del Día
                      </h3>
                    </div>
                    <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
                      +50 XP
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">
                    "Pick 3 jugadores que anoten 20+ puntos esta noche"
                  </p>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-blue-600 mb-1">
                      <span>Progreso: 1/3 completado</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: "33%" }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Quick Contests */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Contests Rápidos
              </h3>

              <div className="space-y-3">
                {fantasyContests.slice(1, 3).map((contest) => (
                  <FantasyContestCard
                    key={contest.id}
                    contest={contest}
                    onJoin={handleJoinContest}
                    size="sm"
                    showProgress={false}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <section className="mt-12">
          <Card className="bg-blue-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-bold mb-3">
                ¿Listo para ser el próximo Rey Bolitero? 👑
              </h2>
              <p className="text-base mb-4 opacity-90">
                Únete a miles de fanáticos boricuas compitiendo por premios
                increíbles
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/fantasy">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <TrophyIcon className="w-5 h-5 mr-2" />
                    Crear Mi Lineup
                  </Button>
                </Link>
                <Link to="/community">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <UsersIcon className="w-5 h-5 mr-2" />
                    Unirse a la Comunidad
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

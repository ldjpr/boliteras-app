import React, { useState } from "react";
import { Link } from "react-router-dom";
import FantasyContestStatus from "@/polymet/components/fantasy-contest-status";
import MobileLeaderboardCommunity from "@/polymet/components/mobile-leaderboard-community";
import FantasyQuickActionsMobile from "@/polymet/components/fantasy-quick-actions-mobile";
import UpcomingGamesPicks from "@/polymet/components/upcoming-games-picks";
import CommunityPrizePool from "@/polymet/components/community-prize-pool";
import FantasyLeagueScoreboard from "@/polymet/components/fantasy-league-scoreboard";
import {
  players,
  fantasyContests,
  leaderboard,
} from "@/polymet/data/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrophyIcon,
  FlameIcon,
  StarIcon,
  ZapIcon,
  UsersIcon,
  ArrowRightIcon,
  TargetIcon,
} from "lucide-react";

export default function FantasyPage() {
  const [selectedTab, setSelectedTab] = useState<"gana-rapido" | "la-liga">(
    "gana-rapido"
  );

  // Mock data for the enhanced mobile experience
  const mockContests = [
    {
      id: "contest-1",
      name: "El Pick de la Semana",
      status: "live" as const,
      prize: "$500",
      timeRemaining: "2:34:15",
      currentRank: 3,
      totalEntries: 1247,
      liveScore: 87.5,
      maxScore: 120,
      lineup: [
        {
          name: "Carlos Rivera",
          position: "PG",
          points: 18.2,
          isScoring: true,
        },
        { name: "Miguel Santos", position: "SG", points: 15.7 },
        { name: "José Rodríguez", position: "SF", points: 22.1 },
        { name: "Luis García", position: "PF", points: 19.8 },
        { name: "Pedro Martínez", position: "C", points: 11.7 },
      ],
    },
    {
      id: "contest-2",
      name: "Torneo Relámpago",
      status: "upcoming" as const,
      prize: "$100",
      gameTime: "8:00 PM",
      totalEntries: 50,
      lineup: [
        { name: "Ana López", position: "PG", points: 0 },
        { name: "María González", position: "SG", points: 0 },
        { name: "Carmen Ruiz", position: "SF", points: 0 },
        { name: "Sofia Torres", position: "PF", points: 0 },
        { name: "Isabel Morales", position: "C", points: 0 },
      ],
    },
    {
      id: "contest-3",
      name: "Copa Boricua",
      status: "results" as const,
      prize: "$1,000",
      currentRank: 2,
      totalEntries: 2000,
      lineup: [
        { name: "Roberto Clemente", position: "PG", points: 25.4 },
        { name: "Orlando Cepeda", position: "SG", points: 31.2 },
        { name: "Bernie Williams", position: "SF", points: 18.9 },
        { name: "Iván Rodríguez", position: "PF", points: 22.7 },
        { name: "Edgar Martínez", position: "C", points: 28.1 },
      ],
    },
  ];

  const mockUpcomingGames = [
    {
      id: "game-1",
      homeTeam: "Cangrejeros",
      awayTeam: "Leones",
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      venue: "Coliseo Roberto Clemente",
      league: "BSN",
      gameImportance: "high" as const,
      isTonight: true,
      totalPlayers: 24,
      topPlayers: [
        {
          id: "player-1",
          name: "Carlos Rivera",
          position: "PG",
          team: "Cangrejeros",
          avatar: "https://github.com/yusufhilmi.png",
          projectedPoints: 24.8,
          salary: 8500,
          ownership: 23,
          reason: "Averaging 18 assists vs Leones this season",
          confidence: "high" as const,
        },
      ],
    },
  ];

  const mockChallenges = [
    {
      id: "challenge-1",
      title: "Triple Threat",
      description: "Pick 3 jugadores que anoten 20+ puntos esta noche",
      reward: "+50 XP",
      progress: 1,
      maxProgress: 3,
      isDaily: true,
    },
  ];

  const mockLeaderboardUsers = leaderboard.slice(0, 8).map((user, index) => ({
    ...user,
    id: `user-${index + 1}`,
    currentRank: user.rank,
    previousRank: user.rank + (index < 2 ? 1 : index === 2 ? 0 : -1),
    isOnline: Math.random() > 0.5,
    trend: (index < 2 ? "up" : index === 2 ? "stable" : "down") as const,
    isCurrentUser: index === 1,
  }));

  // Event handlers
  const handleViewLineup = (contestId: string) => {
    console.log("View lineup for:", contestId);
  };

  const handleShareWin = (contestId: string) => {
    console.log("Share win for:", contestId);
    if (navigator.share) {
      navigator.share({
        title: "El Bolitero - Mi Victoria",
        text: "🏀 ¡Acabo de ganar en El Bolitero! Dale que vamos pa'rriba 🚀🇵🇷",
      });
    }
  };

  const handleJoinContest = () => {
    console.log("Join new contest");
  };

  const handleShare = (message: string) => {
    if (navigator.share) {
      navigator.share({ text: message });
    } else {
      navigator.clipboard.writeText(message);
    }
  };

  const handleOpenChat = () => {
    console.log("Opening chat");
  };

  const handlePickPlayer = (playerId: string, gameId: string) => {
    console.log("Pick player:", playerId, "from game:", gameId);
  };

  const handleViewAllPlayers = (gameId: string) => {
    console.log("View all players for game:", gameId);
  };

  const handleViewChallenge = (challengeId: string) => {
    console.log("View challenge:", challengeId);
  };

  // Mock prize pools data with Puerto Rican cultural elements
  const mockPrizePools = [
    {
      id: "grande",
      name: "La Bolita Grande",
      amount: 2847.5,
      type: "grande" as const,
      participants: 247,
      lastWinner: "Doña Carmen de Santurce",
      timeAgo: "ayer por la noche",
      nextDraw: "Viernes 8:00 PM",
    },
    {
      id: "mediano",
      name: "El Pote del Barrio",
      amount: 892.25,
      type: "mediano" as const,
      participants: 89,
      lastWinner: "Papi Chulo",
      timeAgo: "3 días",
      nextDraw: "Miércoles 7:30 PM",
    },
    {
      id: "chiquito",
      name: "La Chavitica",
      amount: 156.75,
      type: "chiquito" as const,
      participants: 34,
      lastWinner: "La Vecina María",
      timeAgo: "1 hora",
      nextDraw: "Hoy 6:00 PM",
    },
  ];

  // Mock data for La Liga fantasy league
  const mockLeagueTeams = [
    {
      id: "team-1",
      name: "Los Cangrejeros",
      owner: "ElBoliteroMayor",
      avatar: "https://github.com/yusufhilmi.png",
      wins: 7,
      losses: 1,
      pointsFor: 1247.8,
      pointsAgainst: 1089.2,
      streak: 4,
      streakType: "W" as const,
      rank: 1,
      isCurrentUser: true,
      isPlayoffBound: true,
    },
    {
      id: "team-2",
      name: "Boricua Ballers",
      owner: "BoricuaBaller",
      avatar: "https://github.com/kdrnp.png",
      wins: 6,
      losses: 2,
      pointsFor: 1198.4,
      pointsAgainst: 1156.7,
      streak: 2,
      streakType: "W" as const,
      rank: 2,
      isCurrentUser: false,
      isPlayoffBound: true,
    },
    {
      id: "team-3",
      name: "Santurce Strong",
      owner: "SanturceStrong",
      avatar: "https://github.com/denizbuyuktas.png",
      wins: 5,
      losses: 3,
      pointsFor: 1156.9,
      pointsAgainst: 1134.5,
      streak: 1,
      streakType: "L" as const,
      rank: 3,
      isCurrentUser: false,
      isPlayoffBound: true,
    },
    {
      id: "team-4",
      name: "Vaqueros Nation",
      owner: "VaquerosNation",
      avatar: "https://github.com/shoaibux1.png",
      wins: 5,
      losses: 3,
      pointsFor: 1134.2,
      pointsAgainst: 1167.8,
      streak: 2,
      streakType: "W" as const,
      rank: 4,
      isCurrentUser: false,
      isPlayoffBound: true,
    },
    {
      id: "team-5",
      name: "Leones Pride",
      owner: "LeonesPride",
      avatar: "https://github.com/yahyabedirhan.png",
      wins: 4,
      losses: 4,
      pointsFor: 1098.7,
      pointsAgainst: 1145.3,
      streak: 1,
      streakType: "W" as const,
      rank: 5,
      isCurrentUser: false,
      isPlayoffBound: false,
    },
    {
      id: "team-6",
      name: "Capitanes Elite",
      owner: "CapitanesElite",
      avatar: "https://github.com/polymet-ai.png",
      wins: 4,
      losses: 4,
      pointsFor: 1087.3,
      pointsAgainst: 1123.9,
      streak: 3,
      streakType: "L" as const,
      rank: 6,
      isCurrentUser: false,
      isPlayoffBound: false,
    },
  ];

  const mockLeagueMatchups = [
    {
      id: "matchup-1",
      week: 4,
      status: "live" as const,
      remainingTime: "2:34:15 restantes",
      team1: {
        id: "team-1",
        name: "Los Cangrejeros",
        owner: "ElBoliteroMayor",
        avatar: "https://github.com/yusufhilmi.png",
        score: 89.42,
        projectedScore: 105.75,
        record: "7-1",
        isCurrentUser: true,
        starters: [
          {
            id: "p1",
            name: "Carlos Rivera",
            position: "PG",
            team: "CAN",
            avatar: "https://github.com/yusufhilmi.png",
            points: 21.3,
            projectedPoints: 24.8,
            status: "active",
            isLive: true,
            gameInfo: "vs LEO 2nd 8:12",
          },
          {
            id: "p2",
            name: "Miguel Santos",
            position: "SG",
            team: "LEO",
            avatar: "https://github.com/kdrnp.png",
            points: 18.7,
            projectedPoints: 22.1,
            status: "active",
            isLive: true,
            gameInfo: "@ CAN 2nd 8:12",
          },
          {
            id: "p3",
            name: "José Rodríguez",
            position: "SF",
            team: "VAQ",
            avatar: "https://github.com/denizbuyuktas.png",
            points: 15.2,
            projectedPoints: 19.5,
            status: "active",
            isLive: false,
            gameInfo: "vs ATL 9:00 PM",
          },
          {
            id: "p4",
            name: "Luis García",
            position: "PF",
            team: "GIG",
            avatar: "https://github.com/shoaibux1.png",
            points: 22.8,
            projectedPoints: 26.3,
            status: "active",
            isLive: false,
            gameInfo: "@ PIR 9:30 PM",
          },
          {
            id: "p5",
            name: "Pedro Martínez",
            position: "C",
            team: "CAP",
            avatar: "https://github.com/yahyabedirhan.png",
            points: 11.4,
            projectedPoints: 18.8,
            status: "active",
            isLive: false,
            gameInfo: "vs IND 10:00 PM",
          },
        ],

        bench: [
          {
            id: "b1",
            name: "Roberto Díaz",
            position: "PG",
            team: "IND",
            avatar: "https://github.com/polymet-ai.png",
            points: 0,
            projectedPoints: 12.5,
            status: "bench",
            isLive: false,
            gameInfo: "@ CAP 10:00 PM",
          },
          {
            id: "b2",
            name: "Antonio López",
            position: "SG",
            team: "MAR",
            avatar: "https://github.com/yusufhilmi.png",
            points: 0,
            projectedPoints: 14.2,
            status: "bench",
            isLive: false,
            gameInfo: "vs PIR 11:00 PM",
          },
        ],
      },
      team2: {
        id: "team-2",
        name: "Boricua Ballers",
        owner: "BoricuaBaller",
        avatar: "https://github.com/kdrnp.png",
        score: 65.21,
        projectedScore: 89.9,
        record: "6-2",
        isCurrentUser: false,
        starters: [
          {
            id: "p6",
            name: "Fernando Cruz",
            position: "PG",
            team: "PIR",
            avatar: "https://github.com/denizbuyuktas.png",
            points: 20.22,
            projectedPoints: 21.5,
            status: "active",
            isLive: true,
            gameInfo: "vs GIG 2nd 8:53",
          },
          {
            id: "p7",
            name: "David Morales",
            position: "SG",
            team: "ATL",
            avatar: "https://github.com/shoaibux1.png",
            points: 12.8,
            projectedPoints: 17.3,
            status: "active",
            isLive: false,
            gameInfo: "@ VAQ 9:00 PM",
          },
          {
            id: "p8",
            name: "Raúl Vega",
            position: "SF",
            team: "MAR",
            avatar: "https://github.com/yahyabedirhan.png",
            points: 8.4,
            projectedPoints: 15.7,
            status: "active",
            isLive: false,
            gameInfo: "vs PIR 11:00 PM",
          },
          {
            id: "p9",
            name: "Héctor Ramos",
            position: "PF",
            team: "IND",
            avatar: "https://github.com/polymet-ai.png",
            points: 16.2,
            projectedPoints: 19.8,
            status: "active",
            isLive: false,
            gameInfo: "@ CAP 10:00 PM",
          },
          {
            id: "p10",
            name: "Samuel Torres",
            position: "C",
            team: "CAP",
            avatar: "https://github.com/yusufhilmi.png",
            points: 7.6,
            projectedPoints: 16.6,
            status: "active",
            isLive: false,
            gameInfo: "vs IND 10:00 PM",
          },
        ],

        bench: [
          {
            id: "b3",
            name: "Iván Soto",
            position: "PG",
            team: "LEO",
            avatar: "https://github.com/kdrnp.png",
            points: 0,
            projectedPoints: 11.5,
            status: "bench",
            isLive: false,
            gameInfo: "@ CAN 2nd 8:12",
          },
        ],
      },
    },
    {
      id: "matchup-2",
      week: 4,
      status: "live" as const,
      team1: {
        id: "team-3",
        name: "Santurce Strong",
        owner: "SanturceStrong",
        avatar: "https://github.com/denizbuyuktas.png",
        score: 78.15,
        projectedScore: 92.4,
        record: "5-3",
        isCurrentUser: false,
        starters: [],
        bench: [],
      },
      team2: {
        id: "team-4",
        name: "Vaqueros Nation",
        owner: "VaquerosNation",
        avatar: "https://github.com/shoaibux1.png",
        score: 84.67,
        projectedScore: 88.2,
        record: "5-3",
        isCurrentUser: false,
        starters: [],
        bench: [],
      },
    },
    {
      id: "matchup-3",
      week: 4,
      status: "final" as const,
      team1: {
        id: "team-5",
        name: "Leones Pride",
        owner: "LeonesPride",
        avatar: "https://github.com/yahyabedirhan.png",
        score: 112.45,
        projectedScore: 95.3,
        record: "4-4",
        isCurrentUser: false,
        starters: [],
        bench: [],
      },
      team2: {
        id: "team-6",
        name: "Capitanes Elite",
        owner: "CapitanesElite",
        avatar: "https://github.com/polymet-ai.png",
        score: 87.23,
        projectedScore: 101.8,
        record: "4-4",
        isCurrentUser: false,
        starters: [],
        bench: [],
      },
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Responsive Layout - Mobile to Desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header - Clean Sports Platform Style */}
        <section className="mb-8">
          <div className="relative overflow-hidden rounded-xl bg-blue-600 text-white">
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-red-500 text-white animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
                  FANTASY LIVE
                </Badge>
                <h1 className="text-xl lg:text-2xl font-bold">
                  🏀 El Bolitero Fantasy
                </h1>
              </div>

              <div className="max-w-2xl mx-auto text-center space-y-3">
                <h2 className="text-base font-semibold">
                  "Donde los sueños se hacen realidad" 🇵🇷
                </h2>
                <p className="text-sm opacity-90">
                  Pick 5 jugadores • Compite con orgullo boricua
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="mb-6">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border">
            <button
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                selectedTab === "gana-rapido"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setSelectedTab("gana-rapido")}
            >
              <ZapIcon className="w-4 h-4" />
              Gana Rápido
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                selectedTab === "la-liga"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setSelectedTab("la-liga")}
            >
              <TrophyIcon className="w-4 h-4" />
              La Liga
            </button>
          </div>
        </section>

        {/* Tab Content */}
        {selectedTab === "gana-rapido" ? (
          /* Gana Rápido Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions Panel */}
              <section>
                <FantasyQuickActionsMobile
                  currentUserStats={{
                    activeContests: 3,
                    pendingLineups: 1,
                    availableRewards: 2,
                    currentStreak: 4,
                  }}
                  onJoinContest={handleJoinContest}
                  onEditLineup={() => console.log("Edit lineup")}
                  onClaimRewards={() => console.log("Claim rewards")}
                  onViewChallenges={() => console.log("View challenges")}
                />
              </section>

              {/* Active Contest Status */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <TrophyIcon className="w-5 h-5 text-yellow-500" />
                    Mis Contests
                  </h2>
                </div>
                <FantasyContestStatus
                  contests={mockContests}
                  onViewLineup={handleViewLineup}
                  onShareWin={handleShareWin}
                  onJoinContest={handleJoinContest}
                />
              </section>

              {/* Upcoming Games & Picks */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <StarIcon className="w-5 h-5 text-blue-500" />
                    Próximos Juegos
                  </h2>
                  <Link to="/games">
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Ver todos
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <UpcomingGamesPicks
                  games={mockUpcomingGames}
                  challenges={mockChallenges}
                  onPickPlayer={handlePickPlayer}
                  onViewAllPlayers={handleViewAllPlayers}
                  onViewChallenge={handleViewChallenge}
                />
              </section>

              {/* Community CTA */}
              <Card className="bg-blue-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold mb-2 flex items-center justify-center gap-2">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    "El MVP del Barrio"
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                  </h3>
                  <p className="text-sm opacity-90 mb-2">
                    🏠 "En la cancha y en la vida, siempre con el corazón" 🏀
                  </p>
                  <p className="text-xs opacity-80 mb-3">
                    Únete a la liga más emocionante de Puerto Rico
                  </p>
                  <div className="mt-3">
                    <Button
                      className="bg-white text-blue-600 hover:bg-gray-100 font-bold"
                      onClick={() => setSelectedTab("la-liga")}
                    >
                      <ZapIcon className="h-4 w-4 mr-1" />
                      Ver La Liga
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Community Prize Pool */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TrophyIcon className="w-5 h-5 text-yellow-500" />
                  Prize Pools
                </h3>
                <CommunityPrizePool prizePools={mockPrizePools} />
              </section>

              {/* Live Leaderboard & Community */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-blue-500" />
                  Leaderboard
                </h3>
                <MobileLeaderboardCommunity
                  users={mockLeaderboardUsers}
                  currentUserId="user-2"
                  contestName="El Pick de la Semana"
                  onShare={handleShare}
                  onOpenChat={handleOpenChat}
                />
              </section>

              {/* Personal Progress */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <TrophyIcon className="h-4 w-4 text-yellow-500" />
                      Tu Trayectoria
                    </h3>
                    <Badge className="bg-blue-600 text-white">
                      Veterano 🏆
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Camino al próximo rango
                      </span>
                      <span className="text-gray-900 font-medium">
                        750/1000
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-3/4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4 text-center text-sm">
                    <div>
                      <div className="font-bold text-gray-900">23</div>
                      <div className="text-gray-600 text-xs">Victorias</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">$1,247</div>
                      <div className="text-gray-600 text-xs">Ganado</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">5</div>
                      <div className="text-gray-600 text-xs">Racha</div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-600 italic">
                      "Con paciencia y corazón, todo se puede" 💪
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* La Liga Content */
          <div className="space-y-6">
            {/* Stats de la Liga - Moved to top */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <TrophyIcon className="w-5 h-5 text-yellow-500" />
                  Stats de la Liga
                </h2>
              </div>
              <FantasyLeagueScoreboard
                teams={mockLeagueTeams}
                weeklyMatchups={mockLeagueMatchups}
                currentWeek={4}
                leagueName="Liga Boricua Elite"
                onViewTeam={(teamId) => console.log("View team:", teamId)}
                onViewMatchup={(matchupId) =>
                  console.log("View matchup:", matchupId)
                }
                onTrashTalk={(matchupId) =>
                  console.log("Trash talk for matchup:", matchupId)
                }
              />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

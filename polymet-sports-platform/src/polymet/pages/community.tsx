import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, UsersIcon, FlameIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Import our social components
import SocialHybridFeed from "@/polymet/components/social-hybrid-feed";
import GameFeedStadium from "@/polymet/components/game-feed-stadium";
import Leaderboard from "@/polymet/components/leaderboard";

// Import mock data
import { leaderboard } from "@/polymet/data/mock-data";

export default function CommunityPage() {
  const [currentView, setCurrentView] = useState<"feed" | "stadium">("feed");
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  // Mock data for social feed
  const mockGameChannels = [
    {
      id: "game-1",
      homeTeam: "Cangrejeros",
      awayTeam: "Leones",
      homeScore: 78,
      awayScore: 82,
      status: "live" as const,
      startTime: "Q3 - 2:45 restantes",
      league: "BSN",
      viewers: 2847,
      hotness: "high" as const,
    },
    {
      id: "game-2",
      homeTeam: "Vaqueros",
      awayTeam: "Atléticos",
      homeScore: 65,
      awayScore: 61,
      status: "live" as const,
      startTime: "Q2 - 8:12 restantes",
      league: "BSN",
      viewers: 1923,
      hotness: "medium" as const,
    },
    {
      id: "game-3",
      homeTeam: "Gigantes",
      awayTeam: "Piratas",
      status: "upcoming" as const,
      startTime: "Hoy 9:00 PM",
      league: "BSN",
      viewers: 567,
      hotness: "low" as const,
    },
  ];

  const mockHighlights = [
    {
      id: "highlight-1",
      type: "big_win" as const,
      title: "¡MEGA GANANCIA!",
      description: "Juan hit 500 Bolitas on Vaqueros! 🔥",
      user: {
        name: "Juan El Bolitero",
        avatar: "https://github.com/yusufhilmi.png",
        badge: "👑",
      },
      amount: 500,
      timestamp: "hace 2 min",
      reactions: 47,
      trending: true,
    },
    {
      id: "highlight-2",
      type: "fantasy_leader" as const,
      title: "Nueva Líder Fantasy",
      description: "Ana leads the BSN Semifinals fantasy!",
      user: {
        name: "Ana FantasyQueen",
        avatar: "https://github.com/kdrnp.png",
        badge: "⚡",
      },
      timestamp: "hace 5 min",
      reactions: 23,
      trending: true,
    },
    {
      id: "highlight-3",
      type: "vip_reward" as const,
      title: "Premio VIP Desbloqueado",
      description: "Carlos redeemed season tickets 🎟️",
      user: {
        name: "Carlos VIP",
        avatar: "https://github.com/denizbuyuktas.png",
        badge: "💎",
      },
      timestamp: "hace 12 min",
      reactions: 89,
      trending: false,
    },
    {
      id: "highlight-4",
      type: "milestone" as const,
      title: "¡Milestone Alcanzado!",
      description: "María reached 1000 total wins! 🏆",
      user: {
        name: "María La Campeona",
        avatar: "https://github.com/shoaibux1.png",
        badge: "🏆",
      },
      timestamp: "hace 18 min",
      reactions: 156,
      trending: false,
    },
  ];

  const mockTrendingReactions = [
    { id: "fire", emoji: "🔥", name: "Fuego", cost: 0, animated: false },
    { id: "crown", emoji: "👑", name: "Rey", cost: 5, animated: true },
    { id: "money", emoji: "💰", name: "Dinero", cost: 0, animated: false },
    {
      id: "cangrejeros",
      emoji: "🦀",
      name: "Cangrejos",
      cost: 0,
      animated: false,
      teamBranded: true,
      teamColor: "#dc2626",
    },
    {
      id: "leones",
      emoji: "🦁",
      name: "Leones",
      cost: 0,
      animated: false,
      teamBranded: true,
      teamColor: "#f59e0b",
    },
    {
      id: "vaqueros",
      emoji: "🤠",
      name: "Vaqueros",
      cost: 0,
      animated: false,
      teamBranded: true,
      teamColor: "#059669",
    },
    { id: "basketball", emoji: "🏀", name: "Basket", cost: 0, animated: false },
    { id: "party", emoji: "🎉", name: "Fiesta", cost: 10, animated: true },
    { id: "thunder", emoji: "⚡", name: "Rayo", cost: 15, animated: true },
    { id: "bomb", emoji: "💣", name: "Bomba", cost: 25, animated: true },
    { id: "rocket", emoji: "🚀", name: "Cohete", cost: 50, animated: true },
    { id: "diamond", emoji: "💎", name: "Diamante", cost: 100, animated: true },
  ];

  // Mock data for stadium view
  const mockStadiumGame = {
    id: selectedGameId || "game-1",
    homeTeam: "Cangrejeros",
    awayTeam: "Leones",
    homeScore: 78,
    awayScore: 82,
    quarter: "Q3",
    timeLeft: "2:45",
    league: "BSN",
    venue: "Coliseo Roberto Clemente",
  };

  const mockBolitaLeaders = [
    {
      id: "leader-1",
      username: "ElBoliteroMayor",
      avatar: "https://github.com/yusufhilmi.png",
      badge: "👑",
      currentWinnings: 1247,
      totalBets: 23,
      winRate: 87,
      isLive: true,
      rank: 1,
    },
    {
      id: "leader-2",
      username: "BoricuaBaller",
      avatar: "https://github.com/kdrnp.png",
      badge: "🔥",
      currentWinnings: 892,
      totalBets: 18,
      winRate: 72,
      isLive: true,
      rank: 2,
    },
    {
      id: "leader-3",
      username: "SanturceStrong",
      avatar: "https://github.com/denizbuyuktas.png",
      badge: "🏀",
      currentWinnings: 634,
      totalBets: 15,
      winRate: 68,
      isLive: false,
      rank: 3,
    },
    {
      id: "leader-4",
      username: "VaquerosNation",
      avatar: "https://github.com/shoaibux1.png",
      badge: "🤠",
      currentWinnings: 456,
      totalBets: 12,
      winRate: 58,
      isLive: true,
      rank: 4,
    },
    {
      id: "leader-5",
      username: "CangrejerosFan",
      avatar: "https://github.com/yahyabedirhan.png",
      badge: "🦀",
      currentWinnings: 289,
      totalBets: 9,
      winRate: 44,
      isLive: false,
      rank: 5,
    },
  ];

  const mockStadiumReactions = [
    { id: "fire", emoji: "🔥", name: "Fuego", cost: 0, animated: false },
    { id: "crown", emoji: "👑", name: "Rey", cost: 5, animated: true },
    { id: "money", emoji: "💰", name: "Dinero", cost: 0, animated: false },
    {
      id: "cangrejeros",
      emoji: "🦀",
      name: "Cangrejos",
      cost: 0,
      animated: false,
      teamBranded: true,
      teamColor: "#dc2626",
    },
    {
      id: "leones",
      emoji: "🦁",
      name: "Leones",
      cost: 0,
      animated: false,
      teamBranded: true,
      teamColor: "#f59e0b",
    },
    { id: "basketball", emoji: "🏀", name: "Basket", cost: 0, animated: false },
    { id: "party", emoji: "🎉", name: "Fiesta", cost: 10, animated: true },
    { id: "thunder", emoji: "⚡", name: "Rayo", cost: 15, animated: true },
    {
      id: "bomb",
      emoji: "💣",
      name: "Bomba",
      cost: 25,
      animated: true,
      special: true,
    },
    {
      id: "rocket",
      emoji: "🚀",
      name: "Cohete",
      cost: 50,
      animated: true,
      special: true,
    },
    {
      id: "diamond",
      emoji: "💎",
      name: "Diamante",
      cost: 100,
      animated: true,
      special: true,
    },
    {
      id: "golden_ball",
      emoji: "🏀",
      name: "Golden Ball",
      cost: 50,
      animated: true,
      special: true,
    },
  ];

  // Enhanced leaderboard data with trends
  const enhancedLeaderboard = leaderboard.map((user, index) => ({
    ...user,
    trend:
      index < 2
        ? ("up" as const)
        : index === 2
          ? ("stable" as const)
          : ("down" as const),
    previousRank: user.rank + (index < 2 ? 2 : index === 2 ? 0 : -1),
  }));

  const handleJoinGameFeed = (gameId: string) => {
    setSelectedGameId(gameId);
    setCurrentView("stadium");
  };

  const handleBackToFeed = () => {
    setCurrentView("feed");
    setSelectedGameId(null);
  };

  const handleReact = (highlightId: string, reactionId: string) => {
    console.log("Reacting:", highlightId, reactionId);
    const reaction = mockTrendingReactions.find((r) => r.id === reactionId);
    if (reaction?.cost > 0) {
      // In real app, this would deduct Bolitas from user balance
      console.log(`Spent ${reaction.cost} Bolitas on reaction`);
    }
  };

  const handleStadiumReact = (reactionId: string) => {
    console.log("Stadium reacting:", reactionId);
    const reaction = mockStadiumReactions.find((r) => r.id === reactionId);
    if (reaction?.cost > 0) {
      // In real app, this would deduct Bolitas from user balance
      console.log(`Spent ${reaction.cost} Bolitas on stadium reaction`);
    }
  };

  const handleShare = (highlightId?: string) => {
    if (highlightId) {
      const highlight = mockHighlights.find((h) => h.id === highlightId);
      const shareText = `🏀 ¡Mira esto en El Bolitero!\n\n${highlight?.title}\n${highlight?.description}\n\n¡Dale que vamos pa'rriba! 🇵🇷`;

      if (navigator.share) {
        navigator.share({
          title: "El Bolitero - Social",
          text: shareText,
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert("¡Copiado! Pégalo en WhatsApp o IG 📱");
      }
    } else {
      // Stadium share
      const shareText = `🏀 ¡Estoy viendo ${mockStadiumGame.awayTeam} vs ${mockStadiumGame.homeTeam} en vivo!\n\n${mockStadiumGame.awayScore} - ${mockStadiumGame.homeScore} (${mockStadiumGame.quarter})\n\n¡Únete al estadio digital! 🏟️\n\n#ElBolitero #BSN`;

      if (navigator.share) {
        navigator.share({
          title: "El Bolitero - Estadio Digital",
          text: shareText,
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert("¡Copiado! Pégalo en WhatsApp o IG 📱");
      }
    }
  };

  if (currentView === "stadium") {
    return (
      <GameFeedStadium
        game={mockStadiumGame}
        bolitaLeaders={mockBolitaLeaders}
        reactions={mockStadiumReactions}
        userBolitas={247}
        onBack={handleBackToFeed}
        onReact={handleStadiumReact}
        onShare={() => handleShare()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <UsersIcon className="w-8 h-8 text-blue-600" />

            <h1 className="text-3xl font-bold text-gray-900">
              Comunidad Bolitera
            </h1>
            <FlameIcon className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-lg text-gray-600 mb-6">
            Conecta con otros fanáticos del deporte boricua
          </p>

          {/* Live Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2,847</div>
              <div className="text-sm text-gray-600">Boliteros Online</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-gray-600">Juegos Hoy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">$45K</div>
              <div className="text-sm text-gray-600">En Premios</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Social Feed */}
          <div className="lg:col-span-2">
            <SocialHybridFeed
              gameChannels={mockGameChannels}
              highlights={mockHighlights}
              trendingReactions={mockTrendingReactions}
              onJoinGameFeed={handleJoinGameFeed}
              onReact={handleReact}
              onShare={handleShare}
            />
          </div>

          {/* Right Column - Community Leaderboard */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                🏆 Top Boliteros
                <Badge variant="secondary" className="animate-pulse">
                  LIVE
                </Badge>
              </h2>
              <Leaderboard
                users={enhancedLeaderboard}
                title=""
                showTrends={true}
                highlightTop={3}
                compact={false}
              />
            </div>

            {/* Community Stats */}
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">📊 Stats de Hoy</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Reacciones enviadas:</span>
                  <span className="font-bold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Bolitas ganadas:</span>
                  <span className="font-bold">89,234</span>
                </div>
                <div className="flex justify-between">
                  <span>Juegos con actividad:</span>
                  <span className="font-bold">23/24</span>
                </div>
                <div className="flex justify-between">
                  <span>Nuevos boliteros:</span>
                  <span className="font-bold">+156</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🚀 Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                  Crear Post Viral
                </Button>
                <Button variant="outline" className="w-full">
                  Invitar Amigos
                </Button>
                <Button variant="ghost" className="w-full text-green-600">
                  Ver Mis Logros
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

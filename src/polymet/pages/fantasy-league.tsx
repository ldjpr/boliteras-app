import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrophyIcon,
  CoinsIcon,
  FlameIcon,
  StarIcon,
  ZapIcon,
  CrownIcon,
  UsersIcon,
  ClockIcon,
  GiftIcon,
} from "lucide-react";
import AIPlayerStack from "@/polymet/components/ai-player-stack";
import BolitasWallet from "@/polymet/components/bolitas-wallet";
import BolitasFantasyContests from "@/polymet/components/bolitas-fantasy-contests";
import { players } from "@/polymet/data/mock-data";

export default function FantasyLeaguePage() {
  const [activeTab, setActiveTab] = useState("contests");
  const [userBolitas, setUserBolitas] = useState(2847);

  // Mock contest data with Bolitas
  const mockContests = [
    {
      id: "bsn-semifinals",
      name: "BSN Semifinals Night",
      sport: "Basketball" as const,
      league: "BSN" as const,
      entryFee: 200,
      prizePool: 5000,
      participants: 247,
      maxParticipants: 500,
      startTime: "Hoy 8:00 PM",
      status: "open" as const,
      topPrizes: [
        "Season tickets 2026 + 5000 Bolitas",
        "Jersey firmado + 2000 Bolitas",
        "VIP Meet & Greet + 1000 Bolitas",
      ],

      featured: true,
      urgency: "high" as const,
    },
    {
      id: "lbprc-daily",
      name: "LBPRC Daily Pick",
      sport: "Baseball" as const,
      league: "LBPRC" as const,
      entryFee: 50,
      prizePool: 1200,
      participants: 89,
      maxParticipants: 100,
      startTime: "Hoy 7:30 PM",
      status: "open" as const,
      topPrizes: [
        "Boletos para 4 + 1500 Bolitas",
        "Gorra oficial + 800 Bolitas",
        "500 Bolitas",
      ],
    },
    {
      id: "volleyball-weekend",
      name: "Volleyball Weekend",
      sport: "Volleyball" as const,
      league: "LVSF" as const,
      entryFee: 100,
      prizePool: 2500,
      participants: 156,
      maxParticipants: 200,
      startTime: "Sábado 6:00 PM",
      status: "open" as const,
      topPrizes: [
        "VIP Suite Experience + 3000 Bolitas",
        "Merchandise Pack + 1500 Bolitas",
        "1000 Bolitas",
      ],

      urgency: "medium" as const,
    },
  ];

  // Mock live contests
  const mockLiveContests = [
    {
      id: "live-1",
      name: "El Pick de la Noche",
      currentRank: 3,
      totalEntries: 1247,
      liveScore: 87.5,
      timeRemaining: "2:34:15",
      prizePool: 3000,
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
  ];

  // Mock leaderboard
  const mockLeaderboard = [
    {
      rank: 1,
      username: "ElBoliteroMayor",
      points: 156.7,
      bolitas: 15670,
      badge: "👑",
    },
    {
      rank: 2,
      username: "BoricuaBaller",
      points: 142.3,
      bolitas: 14230,
      badge: "🔥",
    },
    {
      rank: 3,
      username: "SanturceStrong",
      points: 138.9,
      bolitas: 13890,
      badge: "🏀",
    },
    {
      rank: 4,
      username: "VaquerosNation",
      points: 134.2,
      bolitas: 13420,
      badge: "🤠",
    },
    {
      rank: 5,
      username: "CangrejerosFan",
      points: 129.8,
      bolitas: 12980,
      badge: "🦀",
    },
  ];

  // Mock AI players for draft
  const mockAIPlayers = players.slice(0, 6).map((player, index) => ({
    ...player,
    salary: 5000 + index * 800,
    projectedPoints: 18 + index * 2.5,
    ownership: 15 + index * 8,
    aiPrediction: {
      type:
        index < 2
          ? ("hot" as const)
          : index < 4
            ? ("opportunity" as const)
            : ("warning" as const),
      message:
        index < 2
          ? "🔥 Hot streak - great value tonight"
          : index < 4
            ? "📈 Low ownership, high upside"
            : "⚠️ Monitor injury status",
      confidence: 85 - index * 5,
    },
    matchupRating: index < 3 ? ("easy" as const) : ("medium" as const),
    value: 2.8 - index * 0.2,
  }));

  const handleJoinContest = (contestId: string) => {
    const contest = mockContests.find((c) => c.id === contestId);
    if (contest && userBolitas >= contest.entryFee) {
      setUserBolitas((prev) => prev - contest.entryFee);
      alert(
        `¡Te has unido a ${contest.name}! 🏀\n\nCosto: ${contest.entryFee} Bolitas\nBalance restante: ${userBolitas - contest.entryFee} Bolitas\n\n¡Dale que vamos pa'rriba! 🇵🇷`
      );
    } else {
      alert(
        "No tienes suficientes Bolitas para unirte a este contest.\n\n💡 Tip: Ve a la pestaña Wallet para comprar más Bolitas!"
      );
    }
  };

  const handlePlayerSelect = (player: any) => {
    console.log("Selected player:", player.name);
    alert(`¡${player.name} añadido a tu lineup! 🏀`);
  };

  const handleViewProfile = (playerId: string) => {
    console.log("View profile for:", playerId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-blue-50">
      {/* Responsive Layout - Mobile-first with better desktop utilization */}
      <div className="w-full max-w-lg mx-auto bg-white min-h-screen shadow-xl">
        {/* Header with Bolitas Balance */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 p-1">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-blue-700 bg-clip-text text-transparent">
                  🪙 La Bolita Fantasy
                </h1>
                <p className="text-sm text-orange-700 font-medium">
                  Coin-Powered Sports Fantasy
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full shadow-lg">
                  <CoinsIcon className="w-4 h-4" />

                  <span className="font-bold">
                    {userBolitas.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-orange-600 mt-1">Bolitas Balance</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/70 rounded-lg p-3">
                <div className="text-xl font-bold text-orange-900">3</div>
                <div className="text-xs text-orange-700">Active Contests</div>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <div className="text-xl font-bold text-orange-900">12</div>
                <div className="text-xs text-orange-700">Total Wins</div>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <div className="text-xl font-bold text-orange-900">#2</div>
                <div className="text-xs text-orange-700">Best Rank</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex-1 flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 m-2 rounded-lg sticky top-0 z-10">
            <TabsTrigger value="contests" className="text-xs font-medium">
              <TrophyIcon className="w-3 h-3 mr-1" />
              Contests
            </TabsTrigger>
            <TabsTrigger value="live" className="text-xs font-medium">
              <FlameIcon className="w-3 h-3 mr-1" />
              Live
            </TabsTrigger>
            <TabsTrigger value="draft" className="text-xs font-medium">
              <StarIcon className="w-3 h-3 mr-1" />
              Draft
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-xs font-medium">
              <CrownIcon className="w-3 h-3 mr-1" />
              Ranks
            </TabsTrigger>
            <TabsTrigger value="wallet" className="text-xs font-medium">
              <CoinsIcon className="w-3 h-3 mr-1" />
              Wallet
            </TabsTrigger>
          </TabsList>

          {/* Contest Tab */}
          <TabsContent value="contests" className="flex-1 overflow-auto">
            <div className="p-4">
              <BolitasFantasyContests
                contests={mockContests}
                liveContests={[]}
                userBolitas={userBolitas}
                onJoinContest={handleJoinContest}
              />
            </div>
          </TabsContent>

          {/* Live Tab */}
          <TabsContent value="live" className="flex-1 overflow-auto">
            <div className="p-4">
              <BolitasFantasyContests
                contests={[]}
                liveContests={mockLiveContests}
                userBolitas={userBolitas}
                onJoinContest={handleJoinContest}
                onSharePosition={(contestId) => {
                  const shareText =
                    "🏀 ¡Estoy en 3er lugar en La Bolita Fantasy! 🔥\n\n💪 Dale que vamos pa'rriba 🇵🇷\n\n#ElBolitero #FantasyPR";

                  if (navigator.share) {
                    navigator.share({
                      title: "Mi posición en La Bolita Fantasy",
                      text: shareText,
                    });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    alert("¡Posición copiada! Pégala en WhatsApp o IG 📱");
                  }
                }}
              />
            </div>
          </TabsContent>

          {/* Draft Tab */}
          <TabsContent value="draft" className="flex-1 overflow-auto">
            <div className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  AI-Enhanced Draft
                </h2>
                <p className="text-sm text-gray-600">
                  Smart picks with live stats & predictions
                </p>
              </div>

              <AIPlayerStack
                players={mockAIPlayers}
                onPlayerSelect={handlePlayerSelect}
                onViewProfile={handleViewProfile}
              />
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="flex-1 overflow-auto">
            <div className="p-4 space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                  <CrownIcon className="w-5 h-5 text-yellow-500" />
                  Top Boliteros
                </h2>
                <p className="text-sm text-gray-600">
                  Community rankings & bragging rights
                </p>
              </div>

              {mockLeaderboard.map((user, index) => (
                <Card
                  key={user.rank}
                  className={`${index === 0 ? "border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50" : "border border-gray-200"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                              : index === 1
                                ? "bg-gradient-to-r from-gray-300 to-gray-400 text-white"
                                : index === 2
                                  ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {index === 0 ? "👑" : `#${user.rank}`}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 flex items-center gap-1">
                            {user.username}
                            <span>{user.badge}</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            {user.points} fantasy points
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-bold text-orange-600">
                          <CoinsIcon className="w-4 h-4" />

                          {user.bolitas.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500">Bolitas earned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Share Achievement */}
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-sm font-medium text-blue-800 mb-2">
                  🏆 Share your ranking with friends!
                </p>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  Share to WhatsApp 📱
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="flex-1 overflow-auto">
            <div className="p-4">
              <BolitasWallet
                balance={userBolitas}
                dailyEarned={85}
                weeklyStreak={5}
                transactions={[
                  {
                    id: "1",
                    type: "win",
                    amount: 150,
                    description: "Ganaste: BSN Semifinals",
                    timestamp: "Hace 2 horas",
                    status: "completed",
                  },
                  {
                    id: "2",
                    type: "loss",
                    amount: -200,
                    description: "Entry fee: LBPRC Daily",
                    timestamp: "Hace 4 horas",
                    status: "completed",
                  },
                  {
                    id: "3",
                    type: "reward",
                    amount: 25,
                    description: "Bonus diario reclamado",
                    timestamp: "Hace 1 día",
                    status: "completed",
                  },
                  {
                    id: "4",
                    type: "purchase",
                    amount: 500,
                    description: "Compra con ATH Móvil",
                    timestamp: "Hace 2 días",
                    status: "completed",
                  },
                ]}
                onPurchaseBolitas={() => {
                  alert(
                    "¡Abriendo opciones de compra! 💳\n\n• ATH Móvil\n• Tarjeta de crédito\n• Banco Popular"
                  );
                }}
                onClaimDaily={() => {
                  alert(
                    "¡+25 Bolitas reclamadas! 🎁\n\nVuelve mañana para más recompensas."
                  );
                }}
                onWatchAd={() => {
                  alert(
                    "¡Viendo anuncio de Medalla Light! 🍺\n\n+10 Bolitas añadidas a tu cartera."
                  );
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

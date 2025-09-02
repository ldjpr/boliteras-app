import React, { useState } from "react";
import BolitasWallet from "@/polymet/components/bolitas-wallet";
import BettingSlip from "@/polymet/components/betting-slip";
import BettingMarkets from "@/polymet/components/betting-markets";
import BolitasPrizeStore from "@/polymet/components/bolitas-prize-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CoinsIcon,
  TrophyIcon,
  FlameIcon,
  StarIcon,
  ZapIcon,
  TargetIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
} from "lucide-react";

export default function LaBoliteraPage() {
  const [selectedTab, setSelectedTab] = useState("betting");
  const [userBalance, setUserBalance] = useState(1247);
  const [bets, setBets] = useState([]);

  // Mock data for betting
  const mockGames = [
    {
      id: "game-1",
      homeTeam: "Cangrejeros",
      awayTeam: "Leones",
      homeScore: 78,
      awayScore: 82,
      startTime: "Hoy 8:00 PM",
      status: "live" as const,
      league: "BSN" as const,
      venue: "Coliseo Roberto Clemente",
      totalBets: 1247,
      hotMarket: "Ganador del Juego",
      markets: [
        { id: "winner", name: "Ganador del Juego", odds: 2.1, popular: true },
        { id: "total", name: "Más de 160 puntos", odds: 1.8, trending: true },
        { id: "spread", name: "Cangrejeros +3.5", odds: 1.9 },
      ],
    },
    {
      id: "game-2",
      homeTeam: "Vaqueros",
      awayTeam: "Atléticos",
      startTime: "Hoy 9:30 PM",
      status: "upcoming" as const,
      league: "BSN" as const,
      venue: "Coliseo Mario Morales",
      totalBets: 892,
      markets: [
        { id: "winner", name: "Ganador del Juego", odds: 1.7, popular: true },
        { id: "total", name: "Menos de 155 puntos", odds: 2.2 },
        { id: "spread", name: "Vaqueros -5.5", odds: 1.85 },
      ],
    },
  ];

  const mockPropBets = [
    {
      id: "prop-1",
      title: "Carlos Rivera - Más de 20 puntos",
      description: "El PG estrella de los Cangrejeros anote más de 20 puntos",
      odds: 2.8,
      category: "player" as const,
      playerName: "Carlos Rivera",
      gameInfo: "Cangrejeros vs Leones - Hoy 8:00 PM",
      trending: true,
      betsCount: 234,
    },
    {
      id: "prop-2",
      title: "Primer Triple del Juego",
      description: "¿Qué equipo anotará el primer triple?",
      odds: 1.9,
      category: "team" as const,
      gameInfo: "Vaqueros vs Atléticos - Hoy 9:30 PM",
      trending: true,
      betsCount: 189,
    },
  ];

  const mockTransactions = [
    {
      id: "1",
      type: "win" as const,
      amount: 150,
      description: "Ganaste: Cangrejeros vs Leones",
      timestamp: "Hace 2 horas",
      status: "completed" as const,
    },
    {
      id: "2",
      type: "loss" as const,
      amount: -75,
      description: "Perdiste: Pick de Carlos Rivera",
      timestamp: "Hace 4 horas",
      status: "completed" as const,
    },
  ];

  const mockPrizes = [
    {
      id: "merch-1",
      name: "Jersey Oficial Cangrejeros",
      description: "Jersey auténtico del equipo campeón",
      cost: 2500,
      category: "merch" as const,
      imageUrl: "https://github.com/yusufhilmi.png",
      inStock: true,
      popular: true,
    },
    {
      id: "ticket-1",
      name: "Boletos Finals BSN",
      description: "Par de boletos para la final del BSN",
      cost: 5000,
      category: "tickets" as const,
      imageUrl: "https://github.com/yahyabedirhan.png",
      inStock: true,
      popular: true,
    },
  ];

  // Event handlers
  const handlePlaceBet = (gameId, marketId, selection, odds) => {
    const newBet = {
      id: `bet-${Date.now()}`,
      market: "Ganador del Juego",
      selection,
      odds,
      stake: 0,
      potentialPayout: 0,
      gameInfo: {
        homeTeam: "Cangrejeros",
        awayTeam: "Leones",
        startTime: "Hoy 8:00 PM",
      },
    };
    setBets((prev) => [...prev, newBet]);
  };

  const handleUpdateStake = (betId, newStake) => {
    setBets((prev) =>
      prev.map((bet) =>
        bet.id === betId
          ? { ...bet, stake: newStake, potentialPayout: newStake * bet.odds }
          : bet
      )
    );
  };

  const handleRemoveBet = (betId) => {
    setBets((prev) => prev.filter((bet) => bet.id !== betId));
  };

  const handlePlaceBets = () => {
    const totalStake = bets.reduce((sum, bet) => sum + bet.stake, 0);
    setUserBalance((prev) => prev - totalStake);
    setBets([]);
  };

  const totalStake = bets.reduce((sum, bet) => sum + bet.stake, 0);
  const totalPayout = bets.reduce((sum, bet) => sum + bet.potentialPayout, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1 rounded-xl mb-4 shadow-xl">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-700 via-red-600 to-blue-700 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                🪙 La Bolitera 🪙
              </h1>
              <p className="text-orange-800 text-lg font-medium">
                "Donde los sueños se hacen realidad con Bolitas" 🇵🇷
              </p>
              <p className="text-sm text-orange-600 mt-1">
                Apuesta • Gana • Canjea premios increíbles
              </p>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-orange-100 to-red-100 mb-6">
            <TabsTrigger
              value="betting"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <TargetIcon className="w-4 h-4 mr-1" />
              Apostar
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              <CoinsIcon className="w-4 h-4 mr-1" />
              Mi Cartera
            </TabsTrigger>
            <TabsTrigger
              value="prizes"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              <ShoppingBagIcon className="w-4 h-4 mr-1" />
              Premios
            </TabsTrigger>
          </TabsList>

          {/* Betting Tab */}
          <TabsContent value="betting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Betting Markets - Main Content */}
              <div className="lg:col-span-2">
                <BettingMarkets
                  games={mockGames}
                  propBets={mockPropBets}
                  onPlaceBet={handlePlaceBet}
                  onPlacePropBet={handlePlaceBet}
                />
              </div>

              {/* Betting Slip - Sidebar */}
              <div>
                <BettingSlip
                  bets={bets}
                  totalStake={totalStake}
                  totalPayout={totalPayout}
                  userBalance={userBalance}
                  onUpdateStake={handleUpdateStake}
                  onRemoveBet={handleRemoveBet}
                  onPlaceBets={handlePlaceBets}
                  onClearSlip={() => setBets([])}
                  onShareSlip={() => {
                    const shareText = `🏀 Mi boleta en La Bolitera:\n\n${bets
                      .map(
                        (bet) =>
                          `• ${bet.selection} (${bet.odds}x) - ${bet.stake} Bolitas`
                      )
                      .join(
                        "\n"
                      )}\n\n💰 Total: ${totalStake} Bolitas\n🎯 Ganancia potencial: ${totalPayout} Bolitas\n\n¡Dale que vamos pa'rriba! 🇵🇷`;

                    if (navigator.share) {
                      navigator.share({
                        title: "Mi Boleta - La Bolitera",
                        text: shareText,
                      });
                    } else {
                      navigator.clipboard.writeText(shareText);
                      alert("¡Boleta copiada! Pégala en WhatsApp o IG 📱");
                    }
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <BolitasWallet
                balance={userBalance}
                dailyEarned={85}
                weeklyStreak={5}
                transactions={mockTransactions}
                onPurchaseBolitas={() =>
                  alert(
                    "¡Abriendo opciones de compra! 💳\n\n• ATH Móvil\n• Tarjeta de crédito\n• Banco Popular"
                  )
                }
                onClaimDaily={() => {
                  setUserBalance((prev) => prev + 25);
                  alert("¡+25 Bolitas reclamadas! 🎁");
                }}
                onWatchAd={() => {
                  setUserBalance((prev) => prev + 10);
                  alert("¡+10 Bolitas por ver anuncio! 🍺");
                }}
              />
            </div>
          </TabsContent>

          {/* Prizes Tab */}
          <TabsContent value="prizes" className="space-y-6">
            <BolitasPrizeStore
              userBalance={userBalance}
              prizes={mockPrizes}
              onRedeemPrize={(prizeId) => {
                const prize = mockPrizes.find((p) => p.id === prizeId);
                if (prize && userBalance >= prize.cost) {
                  setUserBalance((prev) => prev - prize.cost);
                  alert(
                    `¡Premio canjeado! 🎉\n\n${prize.name}\nCosto: ${prize.cost.toLocaleString()} Bolitas`
                  );
                }
              }}
            />
          </TabsContent>
        </Tabs>

        {/* Cultural Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-500 via-white to-red-500 p-1">
            <CardContent className="bg-white p-6 rounded-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                🇵🇷 "Donde Puerto Rico juega junto" 🇵🇷
              </h3>
              <p className="text-gray-600 mb-4">
                Apoya el deporte boricua mientras vives la emoción de apostar
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">2,847</div>
                  <div className="text-sm text-gray-600">Boliteros Activos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">$45,230</div>
                  <div className="text-sm text-gray-600">En Premios</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfacción</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

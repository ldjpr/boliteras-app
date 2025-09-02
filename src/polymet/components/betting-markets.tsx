import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrophyIcon,
  ClockIcon,
  FlameIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
  TargetIcon,
} from "lucide-react";
import Team from "@/polymet/components/team";

interface BettingMarket {
  id: string;
  name: string;
  odds: number;
  popular?: boolean;
  trending?: boolean;
}

interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  startTime: string;
  status: "upcoming" | "live" | "finished";
  league: "BSN" | "LBPRC" | "Volleyball" | "Baseball";
  venue: string;
  markets: BettingMarket[];
  totalBets: number;
  hotMarket?: string;
}

interface PropBet {
  id: string;
  title: string;
  description: string;
  odds: number;
  category: "player" | "team" | "game";
  playerName?: string;
  gameInfo: string;
  trending?: boolean;
  betsCount: number;
}

interface BettingMarketsProps {
  games: Game[];
  propBets: PropBet[];
  onPlaceBet: (
    gameId: string,
    marketId: string,
    selection: string,
    odds: number
  ) => void;
  onPlacePropBet: (propBetId: string) => void;
  className?: string;
}

export default function BettingMarkets({
  games,
  propBets,
  onPlaceBet,
  onPlacePropBet,
  className = "",
}: BettingMarketsProps) {
  const [selectedTab, setSelectedTab] = useState("today");

  const getLeagueColor = (league: string) => {
    switch (league) {
      case "BSN":
        return "bg-orange-500";
      case "LBPRC":
        return "bg-blue-500";
      case "Volleyball":
        return "bg-purple-500";
      case "Baseball":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-red-500 text-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-1" />
            EN VIVO
          </Badge>
        );

      case "upcoming":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-700">
            <ClockIcon className="w-3 h-3 mr-1" />
            Próximo
          </Badge>
        );

      case "finished":
        return <Badge variant="secondary">Final</Badge>;

      default:
        return null;
    }
  };

  const todaysGames = games.filter((game) => game.status !== "finished");
  const liveGames = games.filter((game) => game.status === "live");
  const trendingPropBets = propBets.filter((bet) => bet.trending);

  return (
    <div className={`space-y-6 ${className}`}>
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-orange-100 to-blue-100">
          <TabsTrigger
            value="today"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
          >
            <TrophyIcon className="w-4 h-4 mr-1" />
            Hoy ({todaysGames.length})
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            <FlameIcon className="w-4 h-4 mr-1" />
            En Vivo ({liveGames.length})
          </TabsTrigger>
          <TabsTrigger
            value="props"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
          >
            <TargetIcon className="w-4 h-4 mr-1" />
            Props ({propBets.length})
          </TabsTrigger>
        </TabsList>

        {/* Today's Games */}
        <TabsContent value="today" className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              🏀 Juegos de Hoy
            </h2>
            <p className="text-sm text-gray-600">
              Apuesta en los mejores juegos del deporte boricua
            </p>
          </div>

          {todaysGames.map((game) => (
            <Card
              key={game.id}
              className="bg-gradient-to-br from-white to-orange-50 border border-orange-200 shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${getLeagueColor(game.league)} text-white text-xs`}
                    >
                      {game.league}
                    </Badge>
                    {getStatusBadge(game.status)}
                    {game.hotMarket && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <FlameIcon className="w-3 h-3 mr-1" />
                        HOT
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <UsersIcon className="w-3 h-3" />
                    {game.totalBets} apuestas
                  </div>
                </div>
                <CardTitle className="text-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-gray-900 flex items-center gap-2">
                      <Team teamId={game.awayTeam} variant="name" size="sm" />

                      <span>vs</span>
                      <Team teamId={game.homeTeam} variant="name" size="sm" />
                    </div>
                    {game.status === "live" && (
                      <div className="text-2xl font-bold text-red-600">
                        {game.awayScore} - {game.homeScore}
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-normal text-gray-600 mt-1">
                    {game.startTime} • {game.venue}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {game.markets.map((market) => (
                    <div
                      key={market.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {market.name}
                        </span>
                        {market.popular && (
                          <Badge
                            variant="outline"
                            className="text-xs border-orange-300 text-orange-700"
                          >
                            <StarIcon className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {market.trending && (
                          <Badge
                            variant="outline"
                            className="text-xs border-green-300 text-green-700"
                          >
                            <TrendingUpIcon className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <Button
                        onClick={() =>
                          onPlaceBet(
                            game.id,
                            market.id,
                            market.name,
                            market.odds
                          )
                        }
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 font-bold text-sm px-4 py-2"
                      >
                        {market.odds}x
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Live Games */}
        <TabsContent value="live" className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              🔴 En Vivo
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </h2>
            <p className="text-sm text-gray-600">
              Apuestas en tiempo real mientras sucede la acción
            </p>
          </div>

          {liveGames.length === 0 ? (
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">⏰</div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  No hay juegos en vivo
                </h3>
                <p className="text-sm text-gray-600">
                  Los juegos en vivo aparecerán aquí cuando empiecen
                </p>
              </CardContent>
            </Card>
          ) : (
            liveGames.map((game) => (
              <Card
                key={game.id}
                className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300 shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full mr-1" />
                      EN VIVO
                    </Badge>
                    <div className="text-xs text-gray-600">
                      {game.totalBets} apuestas activas
                    </div>
                  </div>
                  <CardTitle className="text-lg">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <Team teamId={game.awayTeam} variant="name" size="sm" />

                        <span>vs</span>
                        <Team teamId={game.homeTeam} variant="name" size="sm" />
                      </div>
                      <div className="text-3xl font-bold text-red-600">
                        {game.awayScore} - {game.homeScore}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {game.markets.slice(0, 3).map((market) => (
                      <div
                        key={market.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-red-200 hover:border-red-400 transition-colors"
                      >
                        <span className="font-medium text-gray-900">
                          {market.name}
                        </span>
                        <Button
                          onClick={() =>
                            onPlaceBet(
                              game.id,
                              market.id,
                              market.name,
                              market.odds
                            )
                          }
                          className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 font-bold text-sm px-4 py-2 animate-pulse"
                        >
                          {market.odds}x
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Prop Bets */}
        <TabsContent value="props" className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              🎯 Apuestas Especiales
            </h2>
            <p className="text-sm text-gray-600">
              Picks específicos de jugadores y situaciones del juego
            </p>
          </div>

          {/* Trending Props */}
          {trendingPropBets.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <TrendingUpIcon className="w-4 h-4 text-green-600" />
                Trending Ahora
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {trendingPropBets.map((propBet) => (
                  <Card
                    key={propBet.id}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                              <TrendingUpIcon className="w-3 h-3 mr-1" />
                              TRENDING
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {propBet.category}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {propBet.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {propBet.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{propBet.gameInfo}</span>
                            <span className="flex items-center gap-1">
                              <UsersIcon className="w-3 h-3" />
                              {propBet.betsCount} apuestas
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={() => onPlacePropBet(propBet.id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 font-bold ml-4"
                        >
                          {propBet.odds}x
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Props */}
          <div className="grid grid-cols-1 gap-3">
            {propBets.map((propBet) => (
              <Card
                key={propBet.id}
                className="bg-white border border-gray-200 hover:border-purple-300 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-purple-300 text-purple-700"
                        >
                          {propBet.category}
                        </Badge>
                        {propBet.playerName && (
                          <Badge variant="outline" className="text-xs">
                            {propBet.playerName}
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {propBet.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {propBet.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{propBet.gameInfo}</span>
                        <span className="flex items-center gap-1">
                          <UsersIcon className="w-3 h-3" />
                          {propBet.betsCount} apuestas
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => onPlacePropBet(propBet.id)}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 font-bold ml-4"
                    >
                      {propBet.odds}x
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

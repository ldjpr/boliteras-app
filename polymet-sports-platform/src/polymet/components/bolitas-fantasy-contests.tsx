import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrophyIcon,
  CoinsIcon,
  UsersIcon,
  ClockIcon,
  StarIcon,
  FlameIcon,
  GiftIcon,
  ZapIcon,
  CrownIcon,
} from "lucide-react";

interface Contest {
  id: string;
  name: string;
  sport: "Basketball" | "Baseball" | "Volleyball";
  league: "BSN" | "LBPRC" | "LVSF";
  entryFee: number;
  prizePool: number;
  participants: number;
  maxParticipants: number;
  startTime: string;
  status: "open" | "live" | "completed";
  featured?: boolean;
  topPrizes: string[];
  theme?: string;
  urgency?: "high" | "medium" | "low";
}

interface LiveContest {
  id: string;
  name: string;
  currentRank: number;
  totalEntries: number;
  liveScore: number;
  timeRemaining: string;
  prizePool: number;
  lineup: {
    name: string;
    position: string;
    points: number;
    isScoring?: boolean;
  }[];
}

interface BolitasFantasyContestsProps {
  contests: Contest[];
  liveContests: LiveContest[];
  userBolitas: number;
  onJoinContest: (contestId: string) => void;
  onSharePosition?: (contestId: string) => void;
  className?: string;
}

export default function BolitasFantasyContests({
  contests,
  liveContests,
  userBolitas,
  onJoinContest,
  onSharePosition,
  className = "",
}: BolitasFantasyContestsProps) {
  const [activeView, setActiveView] = useState<"available" | "live">(
    "available"
  );

  const getSportIcon = (sport: Contest["sport"]) => {
    switch (sport) {
      case "Basketball":
        return "🏀";
      case "Baseball":
        return "⚾";
      case "Volleyball":
        return "🏐";
      default:
        return "🏆";
    }
  };

  const getUrgencyColor = (urgency?: Contest["urgency"]) => {
    switch (urgency) {
      case "high":
        return "border-red-400 bg-red-50";
      case "medium":
        return "border-orange-400 bg-orange-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  const getParticipationPercentage = (participants: number, max: number) => {
    return Math.round((participants / max) * 100);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            🪙 La Bolita Fantasy
          </h2>
          <p className="text-sm text-gray-600">
            Coin-powered sports fantasy • Puerto Rican style
          </p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            size="sm"
            variant={activeView === "available" ? "default" : "ghost"}
            onClick={() => setActiveView("available")}
            className="text-xs"
          >
            <TrophyIcon className="w-3 h-3 mr-1" />
            Available
          </Button>
          <Button
            size="sm"
            variant={activeView === "live" ? "default" : "ghost"}
            onClick={() => setActiveView("live")}
            className="text-xs"
          >
            <FlameIcon className="w-3 h-3 mr-1" />
            Live ({liveContests.length})
          </Button>
        </div>
      </div>

      {/* Available Contests */}
      {activeView === "available" && (
        <div className="space-y-4">
          {contests.map((contest) => (
            <Card
              key={contest.id}
              className={`${contest.featured ? "border-2 border-orange-400 shadow-lg" : "border border-gray-200"} ${getUrgencyColor(contest.urgency)}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                      {contest.featured && (
                        <StarIcon className="w-4 h-4 text-orange-500" />
                      )}
                      <span>{getSportIcon(contest.sport)}</span>
                      {contest.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {contest.league}
                      </Badge>
                      {contest.urgency === "high" && (
                        <Badge className="bg-red-500 text-white text-xs animate-pulse">
                          🔥 URGENT
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold">
                      {contest.entryFee} Bolitas
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {contest.startTime}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-3">
                {/* Prize Pool & Participation */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-lg font-bold text-green-700 flex items-center justify-center gap-1">
                      <CoinsIcon className="w-4 h-4" />

                      {contest.prizePool.toLocaleString()}
                    </div>
                    <p className="text-xs text-green-600">Prize Pool</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-lg font-bold text-blue-700 flex items-center justify-center gap-1">
                      <UsersIcon className="w-4 h-4" />
                      {contest.participants}/{contest.maxParticipants}
                    </div>
                    <p className="text-xs text-blue-600">Players</p>
                  </div>
                </div>

                {/* Participation Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Contest filling up</span>
                    <span>
                      {getParticipationPercentage(
                        contest.participants,
                        contest.maxParticipants
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={getParticipationPercentage(
                      contest.participants,
                      contest.maxParticipants
                    )}
                    className="h-2"
                  />
                </div>

                {/* Top Prizes */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-orange-200">
                  <p className="text-xs font-semibold text-orange-800 mb-2 flex items-center gap-1">
                    <GiftIcon className="w-3 h-3" />
                    Top Prizes:
                  </p>
                  <div className="space-y-1">
                    {contest.topPrizes.slice(0, 3).map((prize, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span
                          className={`font-bold ${
                            index === 0
                              ? "text-yellow-600"
                              : index === 1
                                ? "text-gray-600"
                                : "text-orange-600"
                          }`}
                        >
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                        </span>
                        <span className="text-gray-700">{prize}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Join Button */}
                <Button
                  onClick={() => onJoinContest(contest.id)}
                  disabled={userBolitas < contest.entryFee}
                  className={`w-full font-bold ${
                    userBolitas < contest.entryFee
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  }`}
                >
                  {userBolitas < contest.entryFee ? (
                    <>
                      <CoinsIcon className="w-4 h-4 mr-2" />
                      Need {contest.entryFee - userBolitas} More Bolitas
                    </>
                  ) : (
                    <>
                      <ZapIcon className="w-4 h-4 mr-2" />
                      Join Contest ({contest.entryFee} Bolitas)
                    </>
                  )}
                </Button>

                {/* Cultural Message */}
                {contest.featured && (
                  <div className="text-center p-2 bg-gradient-to-r from-blue-100 to-red-100 rounded-lg border border-gray-200">
                    <p className="text-xs font-medium text-gray-800">
                      🏝️ "Dale que vamos pa'rriba" 🇵🇷
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Community Encouragement */}
          <div className="bg-gradient-to-r from-orange-100 via-amber-100 to-red-100 p-4 rounded-lg border-2 border-orange-300 text-center">
            <h3 className="font-bold text-orange-900 mb-2 flex items-center justify-center gap-2">
              <CrownIcon className="w-5 h-5 text-yellow-600" />
              "El MVP del Barrio"
            </h3>
            <p className="text-sm text-orange-800 mb-2">
              🏠 "En la cancha y en la vida, siempre con el corazón" 🏀
            </p>
            <p className="text-xs text-orange-700">
              Únete a la liga más emocionante de Puerto Rico
            </p>
          </div>
        </div>
      )}

      {/* Live Contests */}
      {activeView === "live" && (
        <div className="space-y-4">
          {liveContests.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-6 text-center">
                <FlameIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />

                <h3 className="font-semibold text-gray-900 mb-2">
                  No Live Contests
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Join a contest to see live scoring here!
                </p>
                <Button
                  onClick={() => setActiveView("available")}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Browse Contests
                </Button>
              </CardContent>
            </Card>
          ) : (
            liveContests.map((contest) => (
              <Card
                key={contest.id}
                className="border-2 border-red-400 shadow-lg bg-gradient-to-r from-red-50 to-orange-50"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    {contest.name}
                    <Badge className="bg-red-500 text-white text-xs">
                      LIVE
                    </Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0 space-y-3">
                  {/* Live Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 bg-white/70 rounded-lg">
                      <div className="text-lg font-bold text-red-600">
                        #{contest.currentRank}
                      </div>
                      <p className="text-xs text-gray-600">Your Rank</p>
                    </div>
                    <div className="text-center p-2 bg-white/70 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {contest.liveScore}
                      </div>
                      <p className="text-xs text-gray-600">Live Score</p>
                    </div>
                    <div className="text-center p-2 bg-white/70 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">
                        {contest.timeRemaining}
                      </div>
                      <p className="text-xs text-gray-600">Time Left</p>
                    </div>
                  </div>

                  {/* Live Lineup */}
                  <div className="bg-white/70 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <StarIcon className="w-3 h-3" />
                      Your Lineup:
                    </p>
                    <div className="space-y-1">
                      {contest.lineup.map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-xs"
                        >
                          <span
                            className={`font-medium ${player.isScoring ? "text-green-600" : "text-gray-700"}`}
                          >
                            {player.isScoring && "🔥"} {player.name} (
                            {player.position})
                          </span>
                          <span
                            className={`font-bold ${player.isScoring ? "text-green-600" : "text-gray-600"}`}
                          >
                            {player.points} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prize Info & Share */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-600">Prize Pool: </span>
                      <span className="font-bold text-green-600">
                        {contest.prizePool} Bolitas
                      </span>
                    </div>
                    {onSharePosition && (
                      <Button
                        size="sm"
                        onClick={() => onSharePosition(contest.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Share 📱
                      </Button>
                    )}
                  </div>

                  {/* Motivational Message */}
                  <div className="text-center p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                    <p className="text-xs font-medium text-gray-800">
                      💪 "¡Tú puedes, sigue luchando!" 🇵🇷
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrophyIcon,
  ClockIcon,
  FlameIcon,
  ShareIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

interface Contest {
  id: string;
  name: string;
  status: "live" | "upcoming" | "results";
  prize: string;
  timeRemaining?: string;
  gameTime?: string;
  currentRank?: number;
  totalEntries: number;
  liveScore?: number;
  maxScore?: number;
  lineup?: Array<{
    name: string;
    position: string;
    points: number;
    isScoring?: boolean;
  }>;
}

interface FantasyContestStatusProps {
  contests: Contest[];
  onViewLineup: (contestId: string) => void;
  onShareWin: (contestId: string) => void;
  onJoinContest: (contestId: string) => void;
}

export default function FantasyContestStatus({
  contests,
  onViewLineup,
  onShareWin,
  onJoinContest,
}: FantasyContestStatusProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [pulsingPlayers, setPulsingPlayers] = useState<Set<string>>(new Set());

  // Simulate real-time score updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly pulse players who are scoring
      const liveContests = contests.filter((c) => c.status === "live");
      liveContests.forEach((contest) => {
        if (contest.lineup) {
          contest.lineup.forEach((player) => {
            if (Math.random() < 0.1) {
              // 10% chance to pulse
              setPulsingPlayers(
                (prev) => new Set([...prev, `${contest.id}-${player.name}`])
              );
              setTimeout(() => {
                setPulsingPlayers((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(`${contest.id}-${player.name}`);
                  return newSet;
                });
              }, 2000);
            }
          });
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [contests]);

  const nextContest = () => {
    setCurrentIndex((prev) => (prev + 1) % contests.length);
  };

  const prevContest = () => {
    setCurrentIndex((prev) => (prev - 1 + contests.length) % contests.length);
  };

  const toggleFlip = (contestId: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(contestId)) {
        newSet.delete(contestId);
      } else {
        newSet.add(contestId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500";
      case "upcoming":
        return "bg-blue-500";
      case "results":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "EN VIVO";
      case "upcoming":
        return "PRÓXIMO";
      case "results":
        return "RESULTADOS";
      default:
        return status.toUpperCase();
    }
  };

  if (contests.length === 0) return null;

  const currentContest = contests[currentIndex];
  const isFlipped = flippedCards.has(currentContest.id);

  return (
    <div className="relative">
      {/* Contest Navigation */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevContest}
            disabled={contests.length <= 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {contests.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextContest}
            disabled={contests.length <= 1}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contest Card */}
      <Card
        className={`relative overflow-hidden cursor-pointer transition-all duration-500 transform bg-white border border-gray-200 shadow-sm hover:shadow-md ${
          isFlipped ? "scale-105" : ""
        }`}
        onClick={() => toggleFlip(currentContest.id)}
      >
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge
            className={`${getStatusColor(currentContest.status)} text-white font-bold`}
          >
            {currentContest.status === "live" && (
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
            )}
            {getStatusText(currentContest.status)}
          </Badge>
        </div>

        <CardContent className="p-6">
          {!isFlipped ? (
            // Front of card
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {currentContest.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <TrophyIcon className="h-4 w-4 text-yellow-500" />

                    {currentContest.prize}
                  </div>
                  {currentContest.timeRemaining && (
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4 text-blue-500" />

                      {currentContest.timeRemaining}
                    </div>
                  )}
                </div>
              </div>

              {/* Live Score Display */}
              {currentContest.status === "live" && currentContest.liveScore && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Score Actual
                    </span>
                    <span className="text-sm text-gray-500">
                      #{currentContest.currentRank} de{" "}
                      {currentContest.totalEntries}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {currentContest.liveScore.toFixed(1)}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${(currentContest.liveScore / (currentContest.maxScore || 100)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Upcoming Contest Info */}
              {currentContest.status === "upcoming" && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Próximo Draft
                      </p>
                      <p className="text-lg font-bold text-blue-700">
                        {currentContest.gameTime}
                      </p>
                    </div>
                    <FlameIcon className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
              )}

              {/* Results Ready */}
              {currentContest.status === "results" && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Resultados Listos
                      </p>
                      <p className="text-lg font-bold text-green-700">
                        #{currentContest.currentRank} Lugar
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShareWin(currentContest.id);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <ShareIcon className="h-4 w-4 mr-1" />
                      Compartir
                    </Button>
                  </div>
                </div>
              )}

              <div className="text-center">
                <p className="text-xs text-gray-500">Toca para ver lineup</p>
              </div>
            </div>
          ) : (
            // Back of card - Lineup view
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Mi Lineup</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewLineup(currentContest.id);
                  }}
                >
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Ver Detalles
                </Button>
              </div>

              {currentContest.lineup && (
                <div className="space-y-2">
                  {currentContest.lineup.map((player, index) => {
                    const isPulsing = pulsingPlayers.has(
                      `${currentContest.id}-${player.name}`
                    );
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-500 ${
                          isPulsing
                            ? "bg-yellow-100 shadow-lg ring-2 ring-yellow-400"
                            : "bg-gray-50"
                        } ${player.isScoring ? "animate-pulse" : ""}`}
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {player.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {player.position}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold ${
                              isPulsing ? "text-yellow-700" : "text-gray-900"
                            }`}
                          >
                            {player.points.toFixed(1)}
                          </p>
                          {isPulsing && (
                            <p className="text-xs text-yellow-600 font-medium">
                              ¡Anotando!
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="text-center">
                <p className="text-xs text-gray-500">Toca para volver</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contest Dots Indicator */}
      {contests.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {contests.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

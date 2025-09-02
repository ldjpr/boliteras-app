import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftIcon,
  TrophyIcon,
  FlameIcon,
  CrownIcon,
  ShareIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Team from "@/polymet/components/team";

interface GameInfo {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  quarter: string;
  timeLeft: string;
  league: string;
  venue: string;
}

interface BolitaLeader {
  id: string;
  username: string;
  avatar: string;
  badge?: string;
  currentWinnings: number;
  totalBets: number;
  winRate: number;
  isLive: boolean;
  rank: number;
}

interface GameReaction {
  id: string;
  emoji: string;
  name: string;
  cost: number;
  animated: boolean;
  teamBranded?: boolean;
  teamColor?: string;
  special?: boolean;
}

interface FallingReaction {
  id: string;
  emoji: string;
  x: number;
  y: number;
  animated: boolean;
  timestamp: number;
}

interface GameFeedStadiumProps {
  game: GameInfo;
  bolitaLeaders: BolitaLeader[];
  reactions: GameReaction[];
  userBolitas: number;
  onBack: () => void;
  onReact: (reactionId: string) => void;
  onShare: () => void;
  className?: string;
}

export default function GameFeedStadium({
  game,
  bolitaLeaders,
  reactions,
  userBolitas,
  onBack,
  onReact,
  onShare,
  className,
}: GameFeedStadiumProps) {
  const [fallingReactions, setFallingReactions] = useState<FallingReaction[]>(
    []
  );
  const [reactionCount, setReactionCount] = useState(0);
  const [isScoreUpdating, setIsScoreUpdating] = useState(false);

  // Simulate live reactions from other users
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomReaction =
          reactions[Math.floor(Math.random() * reactions.length)];
        addFallingReaction(randomReaction.emoji, randomReaction.animated);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [reactions]);

  // Simulate score updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsScoreUpdating(true);
        setTimeout(() => setIsScoreUpdating(false), 2000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const addFallingReaction = (emoji: string, animated: boolean = false) => {
    const newReaction: FallingReaction = {
      id: `reaction-${Date.now()}-${Math.random()}`,
      emoji,
      x: Math.random() * 80 + 10, // 10% to 90% width
      y: 0,
      animated,
      timestamp: Date.now(),
    };

    setFallingReactions((prev) => [...prev, newReaction]);

    // Remove reaction after animation completes
    setTimeout(() => {
      setFallingReactions((prev) =>
        prev.filter((r) => r.id !== newReaction.id)
      );
    }, 3000);
  };

  const handleReaction = (reactionId: string) => {
    const reaction = reactions.find((r) => r.id === reactionId);
    if (!reaction) return;

    // Check if user has enough Bolitas for premium reactions
    if (reaction.cost > userBolitas) {
      alert(`Necesitas ${reaction.cost} Bolitas para esta reacción! 🪙`);
      return;
    }

    // Add falling reaction
    addFallingReaction(reaction.emoji, reaction.animated);

    // Update reaction count
    setReactionCount((prev) => prev + 1);

    // Call parent handler
    onReact(reactionId);
  };

  const getTeamColor = (team: string) => {
    const colors: { [key: string]: string } = {
      Cangrejeros: "text-red-600",
      Leones: "text-yellow-600",
      Vaqueros: "text-green-600",
      Atléticos: "text-blue-600",
      Gigantes: "text-purple-600",
      Piratas: "text-gray-800",
    };
    return colors[team] || "text-gray-600";
  };

  return (
    <div
      className={cn(
        "relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden",
        className
      )}
    >
      {/* Falling Reactions Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {fallingReactions.map((reaction) => (
          <div
            key={reaction.id}
            className={cn(
              "absolute text-4xl animate-bounce",
              reaction.animated && "animate-pulse"
            )}
            style={{
              left: `${reaction.x}%`,
              top: `${reaction.y}%`,
              animation: "fall 3s linear forwards",
            }}
          >
            {reaction.emoji}
          </div>
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-white/20">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Volver al Feed
          </Button>

          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="animate-pulse">
              🔴 EN VIVO
            </Badge>
            <Badge variant="secondary">{game.league}</Badge>
          </div>

          <Button
            variant="ghost"
            onClick={onShare}
            className="text-white hover:bg-white/20"
          >
            <ShareIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Live Score Section */}
      <div className="relative z-10 p-6">
        <Card className="bg-black/50 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold mb-2">{game.venue}</h1>
              <div className="text-sm text-gray-300">
                {game.quarter} • {game.timeLeft}
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold mb-2">
                  <Team
                    teamId={game.awayTeam}
                    variant="name"
                    size="md"
                    className="text-white"
                  />
                </div>
                <div
                  className={cn(
                    "text-4xl font-bold transition-all duration-500",
                    isScoreUpdating && "animate-pulse text-yellow-400"
                  )}
                >
                  {game.awayScore}
                </div>
              </div>

              <div className="text-2xl font-bold text-gray-400">VS</div>

              <div className="text-center">
                <div className="text-lg font-bold mb-2">
                  <Team
                    teamId={game.homeTeam}
                    variant="name"
                    size="md"
                    className="text-white"
                  />
                </div>
                <div
                  className={cn(
                    "text-4xl font-bold transition-all duration-500",
                    isScoreUpdating && "animate-pulse text-yellow-400"
                  )}
                >
                  {game.homeScore}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-300 mb-2">
                {reactionCount.toLocaleString()} reacciones en este juego
              </div>
              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

                <span className="text-xs text-green-400">
                  2,847 boliteros conectados
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mini Leaderboard */}
      <div className="relative z-10 px-6 mb-6">
        <Card className="bg-black/50 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrophyIcon className="w-5 h-5 text-yellow-500" />
              Top Boliteros en este Juego
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {bolitaLeaders.slice(0, 5).map((leader) => (
                <div
                  key={leader.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                        leader.rank === 1
                          ? "bg-yellow-500 text-black"
                          : leader.rank === 2
                            ? "bg-gray-400 text-black"
                            : leader.rank === 3
                              ? "bg-orange-600 text-white"
                              : "bg-gray-600 text-white"
                      )}
                    >
                      {leader.rank === 1 ? "👑" : leader.rank}
                    </div>
                    <img
                      src={leader.avatar}
                      alt={leader.username}
                      className="w-8 h-8 rounded-full border border-white/20"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">
                        {leader.username}
                      </span>
                      {leader.badge && (
                        <span className="text-sm">{leader.badge}</span>
                      )}
                      {leader.isLive && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {leader.winRate}% win rate • {leader.totalBets} apuestas
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-green-400">
                      +{leader.currentWinnings.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Bolitas</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reaction Panel */}
      <div className="relative z-10 px-6 pb-6">
        <Card className="bg-black/50 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              🎭 Reacciones del Estadio
              <Badge variant="outline" className="text-xs">
                {userBolitas.toLocaleString()} 🪙
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-4">
              {reactions.map((reaction) => (
                <Button
                  key={reaction.id}
                  variant="outline"
                  className={cn(
                    "h-16 flex flex-col items-center justify-center gap-1 relative overflow-hidden transition-all duration-300 border-white/20 hover:bg-white/10",
                    reaction.teamBranded && "border-2",
                    reaction.special &&
                      "ring-2 ring-yellow-400 ring-opacity-50",
                    reaction.cost > userBolitas &&
                      "opacity-50 cursor-not-allowed"
                  )}
                  style={{
                    borderColor: reaction.teamColor || undefined,
                  }}
                  onClick={() => handleReaction(reaction.id)}
                  disabled={reaction.cost > userBolitas}
                >
                  <span
                    className={cn(
                      "text-2xl transition-transform duration-200",
                      reaction.animated && "hover:scale-125"
                    )}
                  >
                    {reaction.emoji}
                  </span>
                  <div className="text-xs font-medium text-white">
                    {reaction.name}
                  </div>
                  {reaction.cost > 0 && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-1 -right-1 text-xs h-5 px-1 bg-yellow-500 text-black"
                    >
                      {reaction.cost}🪙
                    </Badge>
                  )}
                  {reaction.special && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse" />
                  )}
                </Button>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                ¡Tus reacciones aparecen en tiempo real para todos! 🎉
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300"
              >
                Comprar más Bolitas para reacciones premium →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom CSS for falling animation */}
      <style jsx>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-20px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

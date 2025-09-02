import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlayIcon,
  TrophyIcon,
  FlameIcon,
  HeartIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Team from "@/polymet/components/team";

interface GameChannel {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: "live" | "upcoming" | "final";
  startTime: string;
  league: string;
  viewers: number;
  hotness: "high" | "medium" | "low";
}

interface SocialHighlight {
  id: string;
  type: "big_win" | "fantasy_leader" | "vip_reward" | "milestone";
  title: string;
  description: string;
  user: {
    name: string;
    avatar: string;
    badge?: string;
  };
  amount?: number;
  timestamp: string;
  reactions: number;
  trending: boolean;
}

interface TrendingReaction {
  id: string;
  emoji: string;
  name: string;
  cost: number;
  animated: boolean;
  teamBranded?: boolean;
  teamColor?: string;
}

interface SocialHybridFeedProps {
  gameChannels: GameChannel[];
  highlights: SocialHighlight[];
  trendingReactions: TrendingReaction[];
  onJoinGameFeed: (gameId: string) => void;
  onReact: (highlightId: string, reactionId: string) => void;
  onShare: (highlightId: string) => void;
  className?: string;
}

export default function SocialHybridFeed({
  gameChannels,
  highlights,
  trendingReactions,
  onJoinGameFeed,
  onReact,
  onShare,
  className,
}: SocialHybridFeedProps) {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [selectedReactions, setSelectedReactions] = useState<string[]>([]);

  // Auto-scroll game channels
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGameIndex((prev) => (prev + 1) % gameChannels.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [gameChannels.length]);

  const handleGameNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentGameIndex(
        (prev) => (prev - 1 + gameChannels.length) % gameChannels.length
      );
    } else {
      setCurrentGameIndex((prev) => (prev + 1) % gameChannels.length);
    }
  };

  const handleReaction = (highlightId: string, reactionId: string) => {
    setSelectedReactions((prev) => [...prev, `${highlightId}-${reactionId}`]);
    onReact(highlightId, reactionId);

    // Remove reaction after animation
    setTimeout(() => {
      setSelectedReactions((prev) =>
        prev.filter((r) => r !== `${highlightId}-${reactionId}`)
      );
    }, 1000);
  };

  const getHighlightIcon = (type: string) => {
    switch (type) {
      case "big_win":
        return "💰";
      case "fantasy_leader":
        return "👑";
      case "vip_reward":
        return "🎟️";
      case "milestone":
        return "🏆";
      default:
        return "🎉";
    }
  };

  const getHighlightColor = (type: string) => {
    switch (type) {
      case "big_win":
        return "from-yellow-400 to-orange-500";
      case "fantasy_leader":
        return "from-purple-400 to-pink-500";
      case "vip_reward":
        return "from-blue-400 to-indigo-500";
      case "milestone":
        return "from-green-400 to-emerald-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Top Section - Game Channels */}
      <section className="relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            🔴 Canales de Juegos
          </h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleGameNavigation("prev")}
              className="h-8 w-8 p-0"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleGameNavigation("next")}
              className="h-8 w-8 p-0"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentGameIndex * 100}%)` }}
          >
            {gameChannels.map((game) => (
              <Card
                key={game.id}
                className="flex-none w-full cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => onJoinGameFeed(game.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          game.status === "live" ? "destructive" : "secondary"
                        }
                        className={cn(
                          game.status === "live" && "animate-pulse"
                        )}
                      >
                        {game.status === "live" ? "🔴 EN VIVO" : "📅 PRÓXIMO"}
                      </Badge>
                      <Badge variant="outline">{game.league}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      {game.viewers.toLocaleString()} viendo
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          <Team
                            teamId={game.awayTeam}
                            variant="name"
                            size="sm"
                            className="text-gray-900"
                          />
                        </div>
                        {game.awayScore !== undefined && (
                          <div className="text-2xl font-bold text-blue-600">
                            {game.awayScore}
                          </div>
                        )}
                      </div>
                      <div className="text-gray-400 font-bold">VS</div>
                      <div className="text-left">
                        <div className="font-bold text-lg">
                          <Team
                            teamId={game.homeTeam}
                            variant="name"
                            size="sm"
                            className="text-gray-900"
                          />
                        </div>
                        {game.homeScore !== undefined && (
                          <div className="text-2xl font-bold text-red-600">
                            {game.homeScore}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {game.startTime}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onJoinGameFeed(game.id);
                    }}
                  >
                    <PlayIcon className="w-4 h-4 mr-2" />
                    Entrar al Estadio Digital
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Game indicators */}
        <div className="flex justify-center mt-3 gap-2">
          {gameChannels.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentGameIndex ? "bg-blue-500 w-6" : "bg-gray-300"
              )}
              onClick={() => setCurrentGameIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Middle Section - Highlights & Wins */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            ⚡ Highlights de la Bolita
          </h2>
          <Badge variant="secondary" className="animate-pulse">
            🔥 Trending
          </Badge>
        </div>

        <div className="space-y-3">
          {highlights.map((highlight) => (
            <Card
              key={highlight.id}
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
                highlight.trending && "ring-2 ring-orange-400 ring-opacity-50"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r opacity-10",
                  getHighlightColor(highlight.type)
                )}
              />

              <CardContent className="relative p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={highlight.user.avatar}
                    alt={highlight.user.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">
                        {getHighlightIcon(highlight.type)}
                      </span>
                      <span className="font-bold text-gray-900">
                        {highlight.user.name}
                      </span>
                      {highlight.user.badge && (
                        <span className="text-sm">{highlight.user.badge}</span>
                      )}
                      {highlight.trending && (
                        <Badge
                          variant="destructive"
                          className="text-xs animate-pulse"
                        >
                          HOT
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {highlight.description}
                    </p>

                    {highlight.amount && (
                      <div className="text-lg font-bold text-green-600 mb-2">
                        +{highlight.amount.toLocaleString()} Bolitas 🪙
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {highlight.timestamp}
                      </span>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <HeartIcon className="w-4 h-4 text-red-500" />

                          {highlight.reactions}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onShare(highlight.id)}
                          className="h-8 px-2"
                        >
                          <ShareIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom Section - Trending Reactions */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            🎭 Reacciones Trending
          </h2>
          <Badge variant="outline">Tap para usar</Badge>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {trendingReactions.map((reaction) => (
            <Button
              key={reaction.id}
              variant="outline"
              className={cn(
                "h-16 flex flex-col items-center justify-center gap-1 relative overflow-hidden transition-all duration-300",
                reaction.teamBranded && "border-2",
                reaction.animated && "hover:scale-110",
                selectedReactions.includes(`highlight-${reaction.id}`) &&
                  "animate-bounce bg-yellow-100"
              )}
              style={{
                borderColor: reaction.teamColor || undefined,
              }}
              onClick={() => handleReaction("highlight", reaction.id)}
            >
              <span className="text-2xl">{reaction.emoji}</span>
              <div className="text-xs font-medium">{reaction.name}</div>
              {reaction.cost > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-1 -right-1 text-xs h-5 px-1"
                >
                  {reaction.cost}🪙
                </Badge>
              )}
              {reaction.animated && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse" />
              )}
            </Button>
          ))}
        </div>

        <div className="mt-3 text-center">
          <Button variant="ghost" size="sm" className="text-blue-600">
            Ver más reacciones →
          </Button>
        </div>
      </section>
    </div>
  );
}

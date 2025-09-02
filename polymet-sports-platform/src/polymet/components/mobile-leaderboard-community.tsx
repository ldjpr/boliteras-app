import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrophyIcon,
  ShareIcon,
  MessageCircleIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  CrownIcon,
  FlameIcon,
  ChevronRightIcon,
} from "lucide-react";

interface LeaderboardUser {
  id: string;
  username: string;
  avatar: string;
  currentRank: number;
  previousRank: number;
  points: number;
  wins: number;
  badge: string;
  isOnline: boolean;
  trend: "up" | "down" | "stable";
  isCurrentUser?: boolean;
}

interface MobileLeaderboardCommunityProps {
  users: LeaderboardUser[];
  currentUserId: string;
  contestName?: string;
  onShare: (message: string) => void;
  onOpenChat: () => void;
  showFullLeaderboard?: boolean;
}

export default function MobileLeaderboardCommunity({
  users,
  currentUserId,
  contestName = "la liga",
  onShare,
  onOpenChat,
  showFullLeaderboard = false,
}: MobileLeaderboardCommunityProps) {
  const [animatingRanks, setAnimatingRanks] = useState<Set<string>>(new Set());

  // Simulate live rank changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly animate some rank changes
      const usersToAnimate = users.filter(() => Math.random() < 0.1);
      usersToAnimate.forEach((user) => {
        setAnimatingRanks((prev) => new Set([...prev, user.id]));
        setTimeout(() => {
          setAnimatingRanks((prev) => {
            const newSet = new Set(prev);
            newSet.delete(user.id);
            return newSet;
          });
        }, 2000);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [users]);

  const currentUser = users.find((u) => u.id === currentUserId);
  const topUsers = showFullLeaderboard ? users : users.slice(0, 5);

  const getTrendIcon = (trend: string, isAnimating: boolean) => {
    if (isAnimating) {
      return <FlameIcon className="h-4 w-4 text-orange-500 animate-pulse" />;
    }

    switch (trend) {
      case "up":
        return <TrendingUpIcon className="h-4 w-4 text-green-500" />;

      case "down":
        return <TrendingDownIcon className="h-4 w-4 text-red-500" />;

      case "stable":
        return <MinusIcon className="h-4 w-4 text-gray-400" />;

      default:
        return null;
    }
  };

  const getRankDisplay = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-orange-400 via-coral-500 to-red-500 rounded-full shadow-md">
          <CrownIcon className="h-4 w-4 text-white" />
        </div>
      );
    }

    const bgColor =
      rank <= 3
        ? "bg-gradient-to-r from-orange-500 to-red-600 shadow-md"
        : "bg-gradient-to-r from-gray-500 to-gray-600";

    return (
      <div
        className={`flex items-center justify-center w-8 h-8 ${bgColor} rounded-full`}
      >
        <span className="text-white font-bold text-sm">#{rank}</span>
      </div>
    );
  };

  const generateShareMessage = (user: LeaderboardUser) => {
    const messages = [
      `🏀 Mi Bolita: #${user.currentRank} en ${contestName} esta noche 🔥`,
      `⚡ Subiendo en el ranking! #${user.currentRank} en ${contestName} 🚀`,
      `🎯 ${user.points} puntos y contando en ${contestName}! 💪`,
      `👑 Top ${user.currentRank} en ${contestName} - ¡Dale que vamos pa' arriba! 🇵🇷`,
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleShare = (user: LeaderboardUser) => {
    const message = generateShareMessage(user);
    onShare(message);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <TrophyIcon className="h-5 w-5 text-yellow-500" />
          Ranking en Vivo
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenChat}
          className="flex items-center gap-1"
        >
          <MessageCircleIcon className="h-4 w-4" />
          Chat
        </Button>
      </div>

      {/* Current User Highlight (if not in top 5) */}
      {currentUser && currentUser.currentRank > 5 && !showFullLeaderboard && (
        <Card className="border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-coral-50 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                {getRankDisplay(currentUser.currentRank)}
                {currentUser.isOnline && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-10 h-10 rounded-full"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-orange-900">
                    {currentUser.username} (Tú)
                  </span>
                  <span>{currentUser.badge}</span>
                </div>
                <div className="text-sm text-orange-700">
                  {currentUser.points.toFixed(1)} pts • {currentUser.wins} wins
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getTrendIcon(
                  currentUser.trend,
                  animatingRanks.has(currentUser.id)
                )}
                <Button
                  size="sm"
                  onClick={() => handleShare(currentUser)}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-md"
                >
                  <ShareIcon className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Boliteros */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            {topUsers.map((user, index) => {
              const isCurrentUser = user.id === currentUserId;
              const isAnimating = animatingRanks.has(user.id);

              return (
                <div
                  key={user.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                    isCurrentUser
                      ? "bg-gradient-to-br from-orange-50 to-coral-50 border-2 border-orange-200 shadow-md"
                      : "bg-gradient-to-br from-gray-50 to-gray-100 hover:from-orange-50 hover:to-coral-50"
                  } ${isAnimating ? "scale-105 shadow-lg" : ""}`}
                >
                  <div className="relative">
                    {getRankDisplay(user.currentRank)}
                    {user.isOnline && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${
                          isCurrentUser ? "text-orange-900" : "text-gray-900"
                        }`}
                      >
                        {user.username}
                        {isCurrentUser && " (Tú)"}
                      </span>
                      <span>{user.badge}</span>
                      {user.currentRank === 1 && (
                        <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs shadow-sm">
                          MVP
                        </Badge>
                      )}
                    </div>
                    <div
                      className={`text-sm ${
                        isCurrentUser ? "text-orange-700" : "text-gray-600"
                      }`}
                    >
                      {user.points.toFixed(1)} pts • {user.wins} wins
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getTrendIcon(user.trend, isAnimating)}
                    {isCurrentUser && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(user)}
                        className="border-orange-300 text-orange-600 hover:bg-orange-50 shadow-sm"
                      >
                        <ShareIcon className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* View Full Leaderboard */}
      {!showFullLeaderboard && users.length > 5 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            /* Navigate to full leaderboard */
          }}
        >
          Ver Ranking Completo
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Button>
      )}

      {/* Community Stats */}
      <Card className="bg-gradient-to-r from-orange-500 via-coral-500 to-blue-600 text-white shadow-lg">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            🏆 Stats de la Comunidad
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">
                {users.filter((u) => u.isOnline).length}
              </div>
              <div className="text-xs opacity-90">Online Ahora</div>
            </div>
            <div>
              <div className="text-lg font-bold">
                {users.reduce((sum, u) => sum + u.wins, 0)}
              </div>
              <div className="text-xs opacity-90">Total Wins</div>
            </div>
            <div>
              <div className="text-lg font-bold">
                {Math.round(users.reduce((sum, u) => sum + u.points, 0))}
              </div>
              <div className="text-xs opacity-90">Total Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Share Templates */}
      {currentUser && (
        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-300 shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              📱 Share Rápido
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left border-green-400 text-green-800 hover:bg-green-100 shadow-sm"
                onClick={() =>
                  onShare(
                    `🏀 ¡Estoy #${currentUser.currentRank} en ${contestName}! Dale que vamos pa' arriba 🚀🇵🇷`
                  )
                }
              >
                <ShareIcon className="h-3 w-3 mr-2" />
                WhatsApp: "¡Estoy #{currentUser.currentRank} en {contestName}!"
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left border-green-400 text-green-800 hover:bg-green-100 shadow-sm"
                onClick={() =>
                  onShare(
                    `📸 Story: Mi ranking en ${contestName} 🏀 #${currentUser.currentRank} 🔥`
                  )
                }
              >
                <ShareIcon className="h-3 w-3 mr-2" />
                IG Story: "Mi ranking en {contestName}"
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

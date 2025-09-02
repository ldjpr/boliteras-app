import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  TrophyIcon,
  CrownIcon,
  FlameIcon,
  StarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  MedalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardProps {
  users: Array<{
    rank: number;
    username: string;
    points: number;
    wins: number;
    avatar: string;
    badge: string;
    trend?: "up" | "down" | "stable";
    previousRank?: number;
  }>;
  title?: string;
  showTrends?: boolean;
  highlightTop?: number;
  compact?: boolean;
}

export default function Leaderboard({
  users,
  title = "Top Boliteros",
  showTrends = true,
  highlightTop = 3,
  compact = false,
}: LeaderboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "season"
  >("week");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <CrownIcon className="w-5 h-5 text-yellow-500 fill-current" />;

      case 2:
        return <MedalIcon className="w-5 h-5 text-gray-400 fill-current" />;

      case 3:
        return <MedalIcon className="w-5 h-5 text-amber-600 fill-current" />;

      default:
        return null;
    }
  };

  const getTrendIcon = (
    trend: string | undefined,
    rank: number,
    previousRank?: number
  ) => {
    if (!showTrends || !trend) return null;

    const iconClass = "w-4 h-4";

    switch (trend) {
      case "up":
        return <TrendingUpIcon className={cn(iconClass, "text-green-500")} />;

      case "down":
        return <TrendingDownIcon className={cn(iconClass, "text-red-500")} />;

      default:
        return <MinusIcon className={cn(iconClass, "text-gray-400")} />;
    }
  };

  const getRankChange = (rank: number, previousRank?: number) => {
    if (!previousRank || !showTrends) return null;

    const change = previousRank - rank;
    if (change === 0) return null;

    return (
      <span
        className={cn(
          "text-xs font-medium",
          change > 0 ? "text-green-600" : "text-red-600"
        )}
      >
        {change > 0 ? `+${change}` : change}
      </span>
    );
  };

  const getAvatarFallback = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  const isHighlighted = (rank: number) => rank <= highlightTop;

  return (
    <Card className="w-full">
      <CardHeader className={cn("pb-4", compact && "pb-2")}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrophyIcon className="w-5 h-5 text-yellow-500" />

            {title}
          </CardTitle>

          {!compact && (
            <div className="flex gap-1">
              {(["week", "month", "season"] as const).map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "ghost"}
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period === "week"
                    ? "Semana"
                    : period === "month"
                      ? "Mes"
                      : "Temporada"}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className={cn("space-y-3", compact && "space-y-2")}>
        {users.map((user, index) => (
          <div
            key={user.username}
            className={cn(
              "flex items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:shadow-md",
              isHighlighted(user.rank)
                ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                : "bg-gray-50 hover:bg-gray-100",
              compact && "p-2 gap-3"
            )}
          >
            {/* Rank */}
            <div className="flex items-center justify-center w-8 h-8 relative">
              {getRankIcon(user.rank) || (
                <span
                  className={cn(
                    "font-bold text-lg",
                    isHighlighted(user.rank)
                      ? "text-yellow-700"
                      : "text-gray-600"
                  )}
                >
                  {user.rank}
                </span>
              )}

              {/* Special effects for top ranks */}
              {user.rank === 1 && (
                <div className="absolute -top-1 -right-1">
                  <StarIcon className="w-3 h-3 text-yellow-400 fill-current animate-pulse" />
                </div>
              )}
            </div>

            {/* Avatar */}
            <Avatar
              className={cn(
                "border-2",
                isHighlighted(user.rank)
                  ? "border-yellow-400"
                  : "border-gray-200",
                compact ? "w-8 h-8" : "w-10 h-10"
              )}
            >
              <AvatarImage src={user.avatar} alt={user.username} />

              <AvatarFallback className="bg-blue-500 text-white text-sm">
                {getAvatarFallback(user.username)}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className={cn(
                    "font-semibold truncate",
                    compact ? "text-sm" : "text-base",
                    isHighlighted(user.rank)
                      ? "text-yellow-800"
                      : "text-gray-900"
                  )}
                >
                  {user.username}
                </h3>

                {user.badge && (
                  <span className="text-lg" title="User Badge">
                    {user.badge}
                  </span>
                )}

                {getTrendIcon(user.trend, user.rank, user.previousRank)}
                {getRankChange(user.rank, user.previousRank)}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">
                  {user.points.toLocaleString()} pts
                </span>
                <span>{user.wins} victorias</span>
              </div>
            </div>

            {/* Special Badges */}
            <div className="flex flex-col items-end gap-1">
              {user.rank === 1 && (
                <Badge className="bg-yellow-500 text-yellow-900 text-xs">
                  <FlameIcon className="w-3 h-3 mr-1" />
                  Rey
                </Badge>
              )}

              {user.wins > 20 && (
                <Badge
                  variant="outline"
                  className="text-xs border-green-500 text-green-700"
                >
                  Hot Streak
                </Badge>
              )}

              {!compact && user.trend === "up" && (
                <Badge
                  variant="outline"
                  className="text-xs border-blue-500 text-blue-700"
                >
                  Rising
                </Badge>
              )}
            </div>
          </div>
        ))}

        {/* Show More Button */}
        {!compact && users.length >= 5 && (
          <div className="text-center pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700"
            >
              Ver más boliteros
            </Button>
          </div>
        )}
      </CardContent>

      {/* Footer Stats */}
      {!compact && (
        <div className="border-t bg-gray-50 px-6 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total de participantes activos</span>
            <span className="font-semibold">2,847 boliteros</span>
          </div>
        </div>
      )}
    </Card>
  );
}

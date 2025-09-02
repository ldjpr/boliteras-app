import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  EditIcon,
  MessageCircleIcon,
  TrophyIcon,
  FlameIcon,
  UsersIcon,
  ZapIcon,
  DollarSignIcon,
  BarChart3Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockFantasyLeague,
  getUserById,
} from "@/polymet/data/fantasy-league-data";

interface FantasyQuickActionsProps {
  currentUserId?: string;
  className?: string;
}

export default function FantasyQuickActions({
  currentUserId = "user-1",
  className,
}: FantasyQuickActionsProps) {
  const currentUser = getUserById(currentUserId);
  const currentMatchup = mockFantasyLeague.matchups.find(
    (matchup) =>
      matchup.user1.id === currentUserId || matchup.user2.id === currentUserId
  );

  const quickActions = [
    {
      title: "Set Lineup",
      description: "Pick your 5 players",
      icon: EditIcon,
      href: "/fantasy-league",
      color: "bg-blue-500",
      badge: "Required",
      urgent: true,
    },
    {
      title: "Live Matchup",
      description: currentMatchup
        ? `vs ${currentMatchup.user1.id === currentUserId ? currentMatchup.user2.username : currentMatchup.user1.username}`
        : "No active matchup",
      icon: ZapIcon,
      href: "/fantasy-league",
      color: "bg-red-500",
      badge: currentMatchup?.status === "live" ? "LIVE" : null,
      urgent: currentMatchup?.status === "live",
    },
    {
      title: "Trash Talk",
      description: `${currentMatchup?.trash_talk.length || 0} new messages`,
      icon: MessageCircleIcon,
      href: "/fantasy-league",
      color: "bg-purple-500",
      badge: currentMatchup?.trash_talk.length
        ? `${currentMatchup.trash_talk.length}`
        : null,
    },
    {
      title: "Leaderboard",
      description: `You're #${currentUser?.rank}`,
      icon: TrophyIcon,
      href: "/fantasy-league",
      color: "bg-yellow-500",
      badge: currentUser?.rank === 1 ? "👑" : null,
    },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Fantasy League</h2>
          <p className="text-sm text-gray-600">
            Week {mockFantasyLeague.currentWeek} • {mockFantasyLeague.name}
          </p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          ${mockFantasyLeague.prizePool} Prize Pool
        </Badge>
      </div>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">
                {currentUser?.wins}-{currentUser?.losses}
              </div>
              <div className="text-xs text-gray-600">Record</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                #{currentUser?.rank}
              </div>
              <div className="text-xs text-gray-600">Rank</div>
            </div>
            <div>
              <div className="text-lg font-bold flex items-center justify-center gap-1 text-gray-900">
                {currentUser?.winStreak > 0 ? (
                  <>
                    <FlameIcon className="w-4 h-4 text-orange-500" />

                    {currentUser.winStreak}
                  </>
                ) : (
                  "0"
                )}
              </div>
              <div className="text-xs text-gray-600">Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, index) => (
          <Link key={index} to={action.href}>
            <Card
              className={cn(
                "cursor-pointer transition-all hover:scale-105 bg-white border-gray-200",
                action.urgent && "ring-1 ring-red-500"
              )}
            >
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      action.color
                    )}
                  >
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-medium text-xs text-gray-900 truncate">
                        {action.title}
                      </h3>
                      {action.badge && (
                        <Badge
                          className={cn(
                            "text-xs px-1 py-0 h-4 text-xs",
                            action.badge === "LIVE" &&
                              "bg-red-500 text-white animate-pulse",
                            action.badge === "Required" &&
                              "bg-orange-500 text-white",
                            action.badge === "👑" && "bg-yellow-500 text-white",
                            !["LIVE", "Required", "👑"].includes(
                              action.badge
                            ) && "bg-gray-500 text-white"
                          )}
                        >
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 truncate">
                      {action.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* League Activity */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900 text-sm">
              League Activity
            </h3>
            <div className="flex items-center gap-1 text-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs">Live</span>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <UsersIcon className="w-3 h-3 text-gray-400" />

              <span className="text-gray-600 flex-1">
                <strong>BoricuaBaller</strong> set their lineup
              </span>
              <span className="text-xs text-gray-500">2m ago</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircleIcon className="w-3 h-3 text-gray-400" />

              <span className="text-gray-600 flex-1">
                <strong>SanturceStrong</strong> sent trash talk
              </span>
              <span className="text-xs text-gray-500">5m ago</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3Icon className="w-3 h-3 text-gray-400" />

              <span className="text-gray-600 flex-1">
                <strong>Carlos Rivera</strong> scored 12 fantasy points
              </span>
              <span className="text-xs text-gray-500">8m ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

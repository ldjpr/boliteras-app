import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  EditIcon,
  TrophyIcon,
  FlameIcon,
  ClockIcon,
  ZapIcon,
  GiftIcon,
  StarIcon,
} from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  urgent?: boolean;
  badge?: string | number;
  disabled?: boolean;
  onClick: () => void;
}

interface FantasyQuickActionsMobileProps {
  currentUserStats?: {
    activeContests: number;
    pendingLineups: number;
    availableRewards: number;
    currentStreak: number;
  };
  onJoinContest: () => void;
  onEditLineup: () => void;
  onClaimRewards: () => void;
  onViewChallenges: () => void;
}

export default function FantasyQuickActionsMobile({
  currentUserStats = {
    activeContests: 3,
    pendingLineups: 1,
    availableRewards: 2,
    currentStreak: 4,
  },
  onJoinContest,
  onEditLineup,
  onClaimRewards,
  onViewChallenges,
}: FantasyQuickActionsMobileProps) {
  const [pulsingActions, setPulsingActions] = useState<Set<string>>(new Set());

  // Simulate urgent notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Pulse urgent actions
      if (currentUserStats.pendingLineups > 0) {
        setPulsingActions((prev) => new Set([...prev, "edit-lineup"]));
        setTimeout(() => {
          setPulsingActions((prev) => {
            const newSet = new Set(prev);
            newSet.delete("edit-lineup");
            return newSet;
          });
        }, 3000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentUserStats.pendingLineups]);

  const quickActions: QuickAction[] = [
    {
      id: "join-contest",
      label: "Join New Contest",
      icon: <PlusIcon className="h-5 w-5" />,

      color: "text-white",
      bgColor: "bg-blue-600 hover:bg-blue-700 shadow-md",
      onClick: onJoinContest,
    },
    {
      id: "edit-lineup",
      label: "Edit Lineup",
      icon: <EditIcon className="h-5 w-5" />,

      color: "text-white",
      bgColor:
        currentUserStats.pendingLineups > 0
          ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
          : "bg-blue-600 hover:bg-blue-700 shadow-md",
      urgent: currentUserStats.pendingLineups > 0,
      badge:
        currentUserStats.pendingLineups > 0
          ? currentUserStats.pendingLineups
          : undefined,
      onClick: onEditLineup,
    },
    {
      id: "claim-rewards",
      label: "Claim Rewards",
      icon: <GiftIcon className="h-5 w-5" />,

      color: "text-white",
      bgColor: "bg-blue-600 hover:bg-blue-700 shadow-md",
      badge:
        currentUserStats.availableRewards > 0
          ? currentUserStats.availableRewards
          : undefined,
      disabled: currentUserStats.availableRewards === 0,
      onClick: onClaimRewards,
    },
    {
      id: "challenges",
      label: "Daily Challenges",
      icon: <StarIcon className="h-5 w-5" />,

      color: "text-white",
      bgColor: "bg-blue-600 hover:bg-blue-700 shadow-md",
      onClick: onViewChallenges,
    },
  ];

  const isPulsing = (actionId: string) => pulsingActions.has(actionId);

  return (
    <div className="space-y-4">
      {/* Header with User Stats */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <ZapIcon className="h-5 w-5 text-blue-600" />
          Quick Actions
        </h2>
        {currentUserStats.currentStreak > 0 && (
          <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md">
            <FlameIcon className="h-3 w-3 mr-1" />
            {currentUserStats.currentStreak} Win Streak
          </Badge>
        )}
      </div>

      {/* Quick Stats Bar */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">
                {currentUserStats.activeContests}
              </div>
              <div className="text-xs opacity-90">Active Contests</div>
            </div>
            <div>
              <div className="text-lg font-bold">
                ${(currentUserStats.activeContests * 127.5).toFixed(0)}
              </div>
              <div className="text-xs opacity-90">Total Winnings</div>
            </div>
            <div>
              <div className="text-lg font-bold">
                #{Math.floor(Math.random() * 50) + 1}
              </div>
              <div className="text-xs opacity-90">Best Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => {
          const isActionPulsing = isPulsing(action.id);

          return (
            <Button
              key={action.id}
              onClick={action.onClick}
              disabled={action.disabled}
              className={`
                relative h-20 p-4 flex flex-col items-center justify-center gap-2 
                ${action.bgColor} ${action.color} 
                hover:scale-105 transition-all duration-300 
                ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}
                ${isActionPulsing ? "animate-pulse ring-4 ring-blue-300" : ""}
                ${action.urgent ? "shadow-lg" : ""}
              `}
            >
              {/* Urgent Indicator */}
              {action.urgent && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              )}

              {/* Badge */}
              {action.badge && (
                <Badge className="absolute -top-2 -right-2 bg-white text-gray-900 text-xs min-w-[20px] h-5 flex items-center justify-center">
                  {action.badge}
                </Badge>
              )}

              {/* Icon */}
              <div className={`${isActionPulsing ? "animate-bounce" : ""}`}>
                {action.icon}
              </div>

              {/* Label */}
              <span className="text-xs font-medium text-center leading-tight">
                {action.label}
              </span>

              {/* Urgent Text */}
              {action.urgent && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-red-500 px-2 py-0.5 rounded-full">
                    <ClockIcon className="h-2 w-2" />

                    <span className="text-[10px] font-bold">URGENT</span>
                  </div>
                </div>
              )}
            </Button>
          );
        })}
      </div>

      {/* Upcoming Deadlines */}
      <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-md">
        <CardContent className="p-4">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            Próximos Deadlines
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-yellow-700">El Pick de la Semana</span>
              <Badge className="bg-amber-300 text-white shadow-sm">
                2:34:15
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-yellow-700">Torneo Relámpago</span>
              <Badge className="bg-amber-300 text-white shadow-sm">
                45 min
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Challenge Preview */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-blue-800 flex items-center gap-2">
              <StarIcon className="h-4 w-4" />
              Challenge del Día
            </h3>
            <Badge className="bg-blue-600 text-white">+50 XP</Badge>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            "Pick 3 jugadores que anoten 20+ puntos esta noche"
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-blue-600">
              Progreso: 1/3 completado
            </div>
            <div className="w-24 bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-1/3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Notification */}
      {currentUserStats.currentStreak >= 3 && (
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrophyIcon className="h-8 w-8" />

              <div>
                <h3 className="font-bold">¡Nuevo Achievement!</h3>
                <p className="text-sm opacity-90">
                  "Hot Streak Master" - {currentUserStats.currentStreak} wins
                  seguidos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Progress } from "@/components/ui/progress";
import { StarIcon, TrophyIcon, FlameIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  reward: string;
  xpReward: number;
  isCompleted: boolean;
  difficulty: "easy" | "medium" | "hard";
  timeLeft?: string;
}

interface DailyChallengeProps {
  challenge: DailyChallenge;
  onViewDetails?: (challengeId: string) => void;
  onClaimReward?: (challengeId: string) => void;
  className?: string;
}

export default function DailyChallenge({
  challenge,
  onViewDetails,
  onClaimReward,
  className,
}: DailyChallengeProps) {
  const progressPercentage = (challenge.progress / challenge.maxProgress) * 100;
  const isNearCompletion = progressPercentage >= 80;
  const canClaim = challenge.isCompleted && challenge.progress >= challenge.maxProgress;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Fácil";
      case "medium":
        return "Medio";
      case "hard":
        return "Difícil";
      default:
        return "Normal";
    }
  };

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      {/* Background gradient based on completion */}
      <div
        className={cn(
          "absolute inset-0 opacity-5",
          canClaim
            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
            : isNearCompletion
              ? "bg-gradient-to-r from-blue-400 to-purple-500"
              : "bg-gradient-to-r from-gray-400 to-gray-500"
        )}
      />

      <CardContent className="p-4 relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-900">
                Challenge del Día
              </span>
            </div>
            <Badge
              className={cn(
                "text-xs text-white",
                getDifficultyColor(challenge.difficulty)
              )}
            >
              {getDifficultyLabel(challenge.difficulty)}
            </Badge>
          </div>

          {/* XP Reward Badge */}
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            +{challenge.xpReward} XP
          </Badge>
        </div>

        {/* Challenge Content */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 mb-1 text-sm">
            "{challenge.title}"
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">
              Progreso: {challenge.progress}/{challenge.maxProgress} completado
            </span>
            {challenge.timeLeft && (
              <span className="text-xs text-gray-500">{challenge.timeLeft}</span>
            )}
          </div>

          <div className="relative">
            <Progress
              value={progressPercentage}
              className="h-2"
            />
            {isNearCompletion && (
              <div className="absolute -top-1 right-0 transform translate-x-1">
                <FlameIcon className="w-3 h-3 text-orange-500 animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {canClaim ? (
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                onClick={() => onClaimReward?.(challenge.id)}
              >
                <TrophyIcon className="w-3 h-3 mr-1" />
                Reclamar
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                onClick={() => onViewDetails?.(challenge.id)}
              >
                Ver Detalles
                <ArrowRightIcon className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>

          {/* Completion Status */}
          {canClaim && (
            <div className="flex items-center gap-1 text-green-600">
              <TrophyIcon className="w-3 h-3" />
              <span className="text-xs font-medium">¡Completado!</span>
            </div>
          )}
        </div>

        {/* Completion Effect */}
        {canClaim && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrophyIcon,
  UsersIcon,
  DollarSignIcon,
  ClockIcon,
  StarIcon,
  FlameIcon,
  TargetIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FantasyContestCardProps {
  contest: {
    id: string;
    name: string;
    prize: string;
    entries: number;
    maxEntries: number;
    entryFee: string;
    endTime: string;
    featured?: boolean;
  };
  onJoin?: (contestId: string) => void;
  showProgress?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function FantasyContestCard({
  contest,
  onJoin,
  showProgress = true,
  size = "md",
}: FantasyContestCardProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTime = new Date(contest.endTime).getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );

        if (hours < 2) {
          setIsUrgent(true);
        }

        if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`);
        } else {
          setTimeLeft(`${minutes}m`);
        }
      } else {
        setTimeLeft("Cerrado");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [contest.endTime]);

  const fillPercentage = (contest.entries / contest.maxEntries) * 100;
  const isAlmostFull = fillPercentage > 80;
  const isFull = contest.entries >= contest.maxEntries;

  const sizeClasses = {
    sm: {
      container: "p-2",
      title: "text-sm",
      prize: "text-base",
      details: "text-xs",
    },
    md: {
      container: "p-3",
      title: "text-sm",
      prize: "text-lg",
      details: "text-xs",
    },
    lg: {
      container: "p-4",
      title: "text-base",
      prize: "text-xl",
      details: "text-sm",
    },
  };

  const classes = sizeClasses[size];

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-white border-gray-200",
        contest.featured && "ring-1 ring-yellow-400",
        isUrgent && "border-red-400",
        "hover:scale-105"
      )}
    >
      {/* Featured badge */}
      {contest.featured && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-yellow-500 text-white text-xs">
            <StarIcon className="w-3 h-3 mr-1" />
            DESTACADO
          </Badge>
        </div>
      )}

      {/* Urgent indicator */}
      {isUrgent && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-red-500 text-white animate-pulse text-xs">
            <FlameIcon className="w-3 h-3 mr-1" />
            URGENTE
          </Badge>
        </div>
      )}

      <CardHeader className={cn(classes.container, "pb-1")}>
        <CardTitle
          className={cn(classes.title, "font-bold text-gray-900 leading-tight")}
        >
          {contest.name}
        </CardTitle>
      </CardHeader>

      <CardContent className={cn(classes.container, "pt-0 space-y-3")}>
        {/* Prize Display */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrophyIcon
              className={cn(
                "text-yellow-500",
                size === "sm"
                  ? "w-4 h-4"
                  : size === "md"
                    ? "w-5 h-5"
                    : "w-6 h-6"
              )}
            />

            <span className={cn(classes.prize, "font-bold text-green-600")}>
              {contest.prize}
            </span>
          </div>
          <p className={cn(classes.details, "text-gray-500")}>Premio Total</p>
        </div>

        {/* Entry Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSignIcon className="w-4 h-4 text-blue-500" />

              <span
                className={cn(classes.title, "font-semibold text-gray-900")}
              >
                {contest.entryFee}
              </span>
            </div>
            <p className={cn(classes.details, "text-gray-500")}>Entrada</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ClockIcon
                className={cn(
                  "w-4 h-4",
                  isUrgent ? "text-red-500" : "text-gray-500"
                )}
              />

              <span
                className={cn(
                  classes.title,
                  "font-semibold",
                  isUrgent ? "text-red-600" : "text-gray-900"
                )}
              >
                {timeLeft}
              </span>
            </div>
            <p className={cn(classes.details, "text-gray-500")}>
              Tiempo restante
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <UsersIcon className="w-4 h-4 text-gray-500" />

                <span className={cn(classes.details, "text-gray-600")}>
                  {contest.entries.toLocaleString()} /{" "}
                  {contest.maxEntries.toLocaleString()}
                </span>
              </div>
              <span
                className={cn(
                  classes.details,
                  "font-medium",
                  isAlmostFull ? "text-orange-600" : "text-gray-600"
                )}
              >
                {fillPercentage.toFixed(0)}%
              </span>
            </div>
            <Progress
              value={fillPercentage}
              className={cn("h-2", isAlmostFull && "bg-orange-100")}
            />

            {isAlmostFull && !isFull && (
              <p
                className={cn(
                  classes.details,
                  "text-orange-600 font-medium text-center"
                )}
              >
                ¡Casi lleno! Solo quedan {contest.maxEntries - contest.entries}{" "}
                espacios
              </p>
            )}
          </div>
        )}

        {/* Action Button */}
        <Button
          className={cn(
            "w-full font-semibold",
            contest.featured && "bg-yellow-500 hover:bg-yellow-600 text-white",
            isUrgent && !contest.featured && "bg-red-500 hover:bg-red-600",
            isFull && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => onJoin && !isFull && onJoin(contest.id)}
          disabled={isFull}
        >
          {isFull ? (
            <>
              <TargetIcon className="w-4 h-4 mr-2" />
              LLENO
            </>
          ) : (
            <>
              <TargetIcon className="w-4 h-4 mr-2" />
              UNIRSE AHORA
            </>
          )}
        </Button>

        {/* Additional Info */}
        <div
          className={cn(
            classes.details,
            "text-center text-gray-500 border-t pt-2"
          )}
        >
          <p>Pick 5 jugadores • Gana puntos por estadísticas</p>
        </div>
      </CardContent>

      {/* Background for featured contests */}
      {contest.featured && (
        <div className="absolute inset-0 bg-yellow-50 opacity-30 pointer-events-none" />
      )}
    </Card>
  );
}

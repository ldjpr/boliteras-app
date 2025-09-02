import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FlameIcon,
  DollarSignIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  SearchIcon,
  FilterIcon,
  ShuffleIcon,
  SaveIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  ZapIcon,
  ShieldIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  fantasyPlayers,
  FantasyPlayer,
  FantasyLineup,
  getPlayerById,
} from "@/polymet/data/fantasy-league-data";

interface FantasyLineupBuilderProps {
  salaryCap?: number;
  onSaveLineup?: (lineup: FantasyLineup) => void;
  existingLineup?: FantasyLineup;
}

interface LineupSlot {
  position: "pg" | "sg" | "sf" | "pf" | "c";
  label: string;
  player: FantasyPlayer | null;
}

export default function FantasyLineupBuilder({
  salaryCap = 50000,
  onSaveLineup,
  existingLineup,
}: FantasyLineupBuilderProps) {
  const [lineup, setLineup] = useState<LineupSlot[]>([
    { position: "pg", label: "Point Guard", player: null },
    { position: "sg", label: "Shooting Guard", player: null },
    { position: "sf", label: "Small Forward", player: null },
    { position: "pf", label: "Power Forward", player: null },
    { position: "c", label: "Center", player: null },
  ]);

  const [availablePlayers, setAvailablePlayers] = useState(fantasyPlayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("fantasyPoints");
  const [selectedSlot, setSelectedSlot] = useState<LineupSlot | null>(null);
  const [showPlayerDetails, setShowPlayerDetails] =
    useState<FantasyPlayer | null>(null);

  // Calculate lineup stats
  const totalSalary = lineup.reduce(
    (sum, slot) => sum + (slot.player?.price || 0),
    0
  );
  const projectedPoints = lineup.reduce(
    (sum, slot) => sum + (slot.player?.fantasyPoints || 0),
    0
  );
  const remainingSalary = salaryCap - totalSalary;
  const salaryPercentage = (totalSalary / salaryCap) * 100;
  const isValidLineup =
    lineup.every((slot) => slot.player !== null) && totalSalary <= salaryCap;

  // Filter and sort players
  const filteredPlayers = availablePlayers
    .filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition =
        selectedPosition === "all" ||
        player.position.toLowerCase() === selectedPosition;
      const notInLineup = !lineup.some((slot) => slot.player?.id === player.id);
      return matchesSearch && matchesPosition && notInLineup;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "fantasyPoints":
          return b.fantasyPoints - a.fantasyPoints;
        case "price":
          return b.price - a.price;
        case "value":
          return b.fantasyPoints / b.price - a.fantasyPoints / a.price;
        case "ownership":
          return b.ownership - a.ownership;
        default:
          return 0;
      }
    });

  // Auto-optimize lineup
  const optimizeLineup = () => {
    const newLineup = [...lineup];
    const positions = ["pg", "sg", "sf", "pf", "c"] as const;

    // Clear current lineup
    newLineup.forEach((slot) => (slot.player = null));

    // Greedy algorithm for optimization
    let remainingBudget = salaryCap;

    positions.forEach((position) => {
      const positionPlayers = fantasyPlayers
        .filter(
          (p) =>
            p.position.toLowerCase() === position && p.price <= remainingBudget
        )
        .sort((a, b) => b.fantasyPoints / b.price - a.fantasyPoints / a.price);

      if (positionPlayers.length > 0) {
        const bestPlayer = positionPlayers[0];
        const slotIndex = newLineup.findIndex(
          (slot) => slot.position === position
        );
        if (slotIndex !== -1) {
          newLineup[slotIndex].player = bestPlayer;
          remainingBudget -= bestPlayer.price;
        }
      }
    });

    setLineup(newLineup);
  };

  // Add player to lineup
  const addPlayerToSlot = (player: FantasyPlayer, slot: LineupSlot) => {
    if (totalSalary - (slot.player?.price || 0) + player.price > salaryCap) {
      return; // Can't afford
    }

    const newLineup = lineup.map((s) =>
      s.position === slot.position ? { ...s, player } : s
    );
    setLineup(newLineup);
    setSelectedSlot(null);
  };

  // Remove player from lineup
  const removePlayerFromSlot = (slot: LineupSlot) => {
    const newLineup = lineup.map((s) =>
      s.position === slot.position ? { ...s, player: null } : s
    );
    setLineup(newLineup);
  };

  // Save lineup
  const saveLineup = () => {
    if (!isValidLineup) return;

    const lineupData: FantasyLineup = {
      userId: "user-1", // In real app, get from auth
      players: {
        pg: lineup.find((s) => s.position === "pg")!.player!,
        sg: lineup.find((s) => s.position === "sg")!.player!,
        sf: lineup.find((s) => s.position === "sf")!.player!,
        pf: lineup.find((s) => s.position === "pf")!.player!,
        c: lineup.find((s) => s.position === "c")!.player!,
      },
      totalSalary,
      projectedPoints,
      isLocked: false,
      lastUpdated: new Date().toISOString(),
    };

    onSaveLineup?.(lineupData);
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUpIcon className="w-3 h-3 text-green-500" />;

      case "down":
        return <TrendingUpIcon className="w-3 h-3 text-red-500 rotate-180" />;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold">Set Your Lineup</h1>
            <p className="text-sm opacity-90">Pick 5 jugadores • Week 11</p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={optimizeLineup}
            className="bg-white/20 text-white border-white/30"
          >
            <ShuffleIcon className="w-4 h-4 mr-1" />
            Optimize
          </Button>
        </div>

        {/* Salary Cap */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Salary Used</span>
            <span>
              ${totalSalary.toLocaleString()} / ${salaryCap.toLocaleString()}
            </span>
          </div>
          <Progress value={salaryPercentage} className="h-2 bg-white/20" />

          <div className="flex justify-between text-xs opacity-90">
            <span>Remaining: ${remainingSalary.toLocaleString()}</span>
            <span>Projected: {projectedPoints.toFixed(1)} pts</span>
          </div>
        </div>
      </div>

      {/* Lineup Slots */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Your Lineup</h2>
          {isValidLineup && (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircleIcon className="w-3 h-3 mr-1" />
              Valid
            </Badge>
          )}
        </div>

        {lineup.map((slot) => (
          <Card
            key={slot.position}
            className={cn(
              "cursor-pointer transition-all",
              !slot.player && "border-dashed border-gray-300 bg-gray-50",
              slot.player && "border-solid"
            )}
            onClick={() => setSelectedSlot(slot)}
          >
            <CardContent className="p-3">
              {slot.player ? (
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={slot.player.avatar} />

                    <AvatarFallback>{slot.player.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {slot.player.name}
                      </span>
                      {slot.player.hotStreak && (
                        <FlameIcon className="w-3 h-3 text-red-500" />
                      )}
                      {slot.player.injury && (
                        <AlertTriangleIcon className="w-3 h-3 text-yellow-500" />
                      )}
                      {getTrendIcon(slot.player.trend)}
                    </div>
                    <div className="text-xs text-gray-600">
                      {slot.player.team} • {slot.player.position} • #
                      {slot.player.jersey}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">
                      ${slot.player.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {slot.player.fantasyPoints} FP
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePlayerFromSlot(slot);
                    }}
                  >
                    <XCircleIcon className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center py-4 text-gray-500">
                  <div className="text-center">
                    <div className="text-sm font-medium">{slot.label}</div>
                    <div className="text-xs">Tap to select player</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Save Button */}
      <div className="p-4">
        <Button
          className="w-full"
          disabled={!isValidLineup}
          onClick={saveLineup}
        >
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Lineup
        </Button>
      </div>

      {/* Player Selection Dialog */}
      <Dialog open={!!selectedSlot} onOpenChange={() => setSelectedSlot(null)}>
        <DialogContent className="max-w-sm mx-auto max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg">
              Select {selectedSlot?.label}
            </DialogTitle>
          </DialogHeader>

          {selectedSlot && (
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Filters */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <Input
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fantasyPoints">
                        Fantasy Points
                      </SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="value">Value</SelectItem>
                      <SelectItem value="ownership">Ownership</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedPosition}
                    onValueChange={setSelectedPosition}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Positions</SelectItem>
                      <SelectItem value="pg">Point Guard</SelectItem>
                      <SelectItem value="sg">Shooting Guard</SelectItem>
                      <SelectItem value="sf">Small Forward</SelectItem>
                      <SelectItem value="pf">Power Forward</SelectItem>
                      <SelectItem value="c">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Player List */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredPlayers.map((player) => {
                  const canAfford =
                    totalSalary -
                      (selectedSlot.player?.price || 0) +
                      player.price <=
                    salaryCap;
                  const positionMatch =
                    player.position.toLowerCase() === selectedSlot.position;

                  return (
                    <Card
                      key={player.id}
                      className={cn(
                        "cursor-pointer transition-all",
                        !canAfford && "opacity-50",
                        !positionMatch && "opacity-30",
                        canAfford && positionMatch && "hover:bg-blue-50"
                      )}
                      onClick={() => {
                        if (canAfford && positionMatch) {
                          addPlayerToSlot(player, selectedSlot);
                        }
                      }}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={player.avatar} />

                            <AvatarFallback>{player.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {player.name}
                              </span>
                              {player.hotStreak && (
                                <FlameIcon className="w-3 h-3 text-red-500" />
                              )}
                              {player.injury && (
                                <AlertTriangleIcon className="w-3 h-3 text-yellow-500" />
                              )}
                              {getTrendIcon(player.trend)}
                            </div>
                            <div className="text-xs text-gray-600">
                              {player.team} • {player.position} •{" "}
                              {player.ownership}% owned
                            </div>
                            {player.news && (
                              <div className="text-xs text-blue-600 mt-1">
                                {player.news}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">
                              ${player.price.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {player.fantasyPoints} FP
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowPlayerDetails(player);
                            }}
                          >
                            <ZapIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Player Details Dialog */}
      <Dialog
        open={!!showPlayerDetails}
        onOpenChange={() => setShowPlayerDetails(null)}
      >
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">Player Stats</DialogTitle>
          </DialogHeader>
          {showPlayerDetails && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={showPlayerDetails.avatar} />

                  <AvatarFallback>{showPlayerDetails.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{showPlayerDetails.name}</h3>
                  <p className="text-sm text-gray-600">
                    {showPlayerDetails.team} • #{showPlayerDetails.jersey} •{" "}
                    {showPlayerDetails.position}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Fantasy Points</div>
                  <div className="text-lg font-bold text-blue-600">
                    {showPlayerDetails.fantasyPoints}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Price</div>
                  <div className="text-lg font-bold text-green-600">
                    ${showPlayerDetails.price.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Points</div>
                  <div>{showPlayerDetails.stats.points}</div>
                </div>
                <div>
                  <div className="font-medium">Rebounds</div>
                  <div>{showPlayerDetails.stats.rebounds}</div>
                </div>
                <div>
                  <div className="font-medium">Assists</div>
                  <div>{showPlayerDetails.stats.assists}</div>
                </div>
                <div>
                  <div className="font-medium">FG%</div>
                  <div>
                    {(
                      showPlayerDetails.stats.fieldGoalPercentage * 100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span>Ownership:</span>
                <Progress
                  value={showPlayerDetails.ownership}
                  className="flex-1 h-2"
                />

                <span>{showPlayerDetails.ownership}%</span>
              </div>

              {showPlayerDetails.news && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-800">
                    {showPlayerDetails.news}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

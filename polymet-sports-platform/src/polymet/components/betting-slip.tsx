import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CoinsIcon,
  TrashIcon,
  TrendingUpIcon,
  ShareIcon,
  CheckCircleIcon,
  XIcon,
  PlusIcon,
  MinusIcon,
} from "lucide-react";

interface Bet {
  id: string;
  market: string;
  selection: string;
  odds: number;
  stake: number;
  potentialPayout: number;
  gameInfo: {
    homeTeam: string;
    awayTeam: string;
    startTime: string;
  };
}

interface BettingSlipProps {
  bets: Bet[];
  totalStake: number;
  totalPayout: number;
  userBalance: number;
  onUpdateStake: (betId: string, newStake: number) => void;
  onRemoveBet: (betId: string) => void;
  onPlaceBets: () => void;
  onClearSlip: () => void;
  onShareSlip: () => void;
  isPlacing?: boolean;
  className?: string;
}

export default function BettingSlip({
  bets,
  totalStake,
  totalPayout,
  userBalance,
  onUpdateStake,
  onRemoveBet,
  onPlaceBets,
  onClearSlip,
  onShareSlip,
  isPlacing = false,
  className = "",
}: BettingSlipProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [quickStakeAmount, setQuickStakeAmount] = useState(25);

  const canPlaceBets =
    bets.length > 0 && totalStake <= userBalance && totalStake > 0;

  const handlePlaceBets = () => {
    if (canPlaceBets) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        onPlaceBets();
      }, 1500);
    }
  };

  const handleQuickStake = (betId: string, amount: number) => {
    onUpdateStake(betId, amount);
  };

  const adjustStake = (betId: string, increment: number) => {
    const bet = bets.find((b) => b.id === betId);
    if (bet) {
      const newStake = Math.max(0, bet.stake + increment);
      onUpdateStake(betId, newStake);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Betting Slip Header */}
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-red-50 border-2 border-blue-300 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <CoinsIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-blue-900 font-bold">Mi Boleta</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {bets.length} {bets.length === 1 ? "Pick" : "Picks"}
              </Badge>
              {bets.length > 0 && (
                <Button
                  onClick={onClearSlip}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {bets.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="font-semibold text-gray-700 mb-2">
                ¡Hora de apostar!
              </h3>
              <p className="text-sm text-gray-600">
                Selecciona tus picks favoritos para empezar
              </p>
              <p className="text-xs text-blue-600 mt-2 italic">
                "Con fe y Bolitas, todo se puede" 🇵🇷
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bets.map((bet) => (
                <div
                  key={bet.id}
                  className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  {/* Bet Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {bet.gameInfo.homeTeam} vs {bet.gameInfo.awayTeam}
                      </p>
                      <p className="text-xs text-gray-600">
                        {bet.market}: {bet.selection}
                      </p>
                      <p className="text-xs text-blue-600">
                        {bet.gameInfo.startTime}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {bet.odds}x
                      </Badge>
                      <Button
                        onClick={() => onRemoveBet(bet.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                      >
                        <XIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Stake Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => adjustStake(bet.id, -5)}
                        variant="outline"
                        size="sm"
                        className="p-1 h-6 w-6"
                        disabled={bet.stake <= 0}
                      >
                        <MinusIcon className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={bet.stake}
                        onChange={(e) =>
                          onUpdateStake(bet.id, parseInt(e.target.value) || 0)
                        }
                        className="text-center h-8 text-sm"
                        placeholder="0"
                        min="0"
                        max={userBalance}
                      />

                      <Button
                        onClick={() => adjustStake(bet.id, 5)}
                        variant="outline"
                        size="sm"
                        className="p-1 h-6 w-6"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </Button>
                      <span className="text-xs text-gray-600">Bolitas</span>
                    </div>

                    {/* Quick Stake Buttons */}
                    <div className="flex gap-1">
                      {[10, 25, 50, 100].map((amount) => (
                        <Button
                          key={amount}
                          onClick={() => handleQuickStake(bet.id, amount)}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 px-2"
                          disabled={amount > userBalance}
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>

                    {/* Potential Payout */}
                    {bet.stake > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          Ganancia potencial:
                        </span>
                        <span className="font-bold text-green-600">
                          {bet.potentialPayout} Bolitas
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Slip Summary */}
          {bets.length > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  Total apostado:
                </span>
                <span className="font-bold text-blue-600">
                  {totalStake} Bolitas
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  Ganancia potencial:
                </span>
                <span className="font-bold text-green-600">
                  {totalPayout} Bolitas
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Balance disponible:</span>
                <span
                  className={`font-medium ${userBalance >= totalStake ? "text-green-600" : "text-red-600"}`}
                >
                  {userBalance} Bolitas
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button
                  onClick={onShareSlip}
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <ShareIcon className="h-4 w-4 mr-1" />
                  Compartir
                </Button>
                <Button
                  onClick={handlePlaceBets}
                  disabled={!canPlaceBets || isPlacing}
                  className={`font-bold ${
                    canPlaceBets
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {isPlacing ? (
                    "Apostando..."
                  ) : (
                    <>
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      ¡Dale!
                    </>
                  )}
                </Button>
              </div>

              {/* Validation Messages */}
              {totalStake > userBalance && (
                <div className="text-center p-2 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-700">
                    ❌ No tienes suficientes Bolitas
                  </p>
                  <p className="text-xs text-red-600">
                    Necesitas {totalStake - userBalance} Bolitas más
                  </p>
                </div>
              )}

              {canPlaceBets && (
                <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-700 italic">
                    "¡Que la suerte te acompañe, bolitero!" 🍀
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Animated Coin Drop */}
      {showAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🪙💫</div>
        </div>
      )}
    </div>
  );
}

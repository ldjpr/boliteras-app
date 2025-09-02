import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CoinsIcon,
  PlusIcon,
  TrendingUpIcon,
  GiftIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "win" | "loss" | "purchase" | "reward" | "referral";
  amount: number;
  description: string;
  timestamp: string;
  status: "completed" | "pending";
}

interface BolitasWalletProps {
  balance: number;
  dailyEarned: number;
  weeklyStreak: number;
  transactions: Transaction[];
  onPurchaseBolitas: () => void;
  onClaimDaily: () => void;
  onWatchAd: () => void;
  className?: string;
}

export default function BolitasWallet({
  balance,
  dailyEarned,
  weeklyStreak,
  transactions,
  onPurchaseBolitas,
  onClaimDaily,
  onWatchAd,
  className = "",
}: BolitasWalletProps) {
  const [showTransactions, setShowTransactions] = useState(false);

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "win":
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;

      case "loss":
        return <XCircleIcon className="h-4 w-4 text-red-600" />;

      case "purchase":
        return <CoinsIcon className="h-4 w-4 text-blue-600" />;

      case "reward":
        return <GiftIcon className="h-4 w-4 text-purple-600" />;

      case "referral":
        return <StarIcon className="h-4 w-4 text-yellow-600" />;

      default:
        return <CoinsIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: Transaction["type"]) => {
    switch (type) {
      case "win":
      case "reward":
      case "referral":
        return "text-green-600";
      case "loss":
        return "text-red-600";
      case "purchase":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Wallet Card */}
      <Card className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-2 border-orange-300 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                <CoinsIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-orange-900 font-bold">
                Mi Cartera de Bolitas
              </span>
            </div>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              Activa
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Balance Display */}
          <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-orange-200">
            <div className="text-3xl font-bold text-orange-900 mb-1">
              {balance.toLocaleString()}
              <span className="text-lg ml-1">Bolitas</span>
            </div>
            <p className="text-sm text-orange-700">"Tu fortuna boricua" 🇵🇷</p>
          </div>

          {/* Daily Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xl font-bold text-green-700">
                +{dailyEarned}
              </div>
              <p className="text-xs text-green-600">Hoy ganaste</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xl font-bold text-blue-700 flex items-center justify-center gap-1">
                <TrendingUpIcon className="h-4 w-4" />

                {weeklyStreak}
              </div>
              <p className="text-xs text-blue-600">Días seguidos</p>
            </div>
          </div>

          {/* Earning Opportunities */}
          <div className="space-y-2">
            <h4 className="font-semibold text-orange-900 text-sm">
              💰 Gana Más Bolitas
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <Button
                onClick={onClaimDaily}
                variant="outline"
                size="sm"
                className="justify-start bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-700 hover:from-green-100 hover:to-emerald-100"
              >
                <GiftIcon className="h-4 w-4 mr-2" />
                Reclamar Diario (+25 Bolitas)
              </Button>
              <Button
                onClick={onWatchAd}
                variant="outline"
                size="sm"
                className="justify-start bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 text-purple-700 hover:from-purple-100 hover:to-pink-100"
              >
                <StarIcon className="h-4 w-4 mr-2" />
                Ver Anuncio (+10 Bolitas)
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onPurchaseBolitas}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 font-semibold"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Comprar
            </Button>
            <Button
              onClick={() => setShowTransactions(!showTransactions)}
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <ClockIcon className="h-4 w-4 mr-1" />
              Historial
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      {showTransactions && (
        <Card className="bg-white border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-900">
              📊 Historial de Transacciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${getTransactionColor(transaction.type)}`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount} Bolitas
                    </p>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {transaction.status === "completed"
                        ? "Completado"
                        : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

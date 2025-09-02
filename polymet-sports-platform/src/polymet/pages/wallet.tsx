import React from "react";
import BolitasWallet from "@/polymet/components/bolitas-wallet";

export default function WalletPage() {
  const mockTransactions = [
    {
      id: "1",
      type: "win" as const,
      amount: 150,
      description: "Ganaste: Cangrejeros vs Leones",
      timestamp: "Hace 2 horas",
      status: "completed" as const,
    },
    {
      id: "2",
      type: "loss" as const,
      amount: -75,
      description: "Perdiste: Pick de Carlos Rivera",
      timestamp: "Hace 4 horas",
      status: "completed" as const,
    },
    {
      id: "3",
      type: "reward" as const,
      amount: 25,
      description: "Bonus diario reclamado",
      timestamp: "Hace 1 día",
      status: "completed" as const,
    },
    {
      id: "4",
      type: "purchase" as const,
      amount: 500,
      description: "Compra con ATH Móvil",
      timestamp: "Hace 2 días",
      status: "completed" as const,
    },
    {
      id: "5",
      type: "referral" as const,
      amount: 100,
      description: "Referido: @BoricuaBaller",
      timestamp: "Hace 3 días",
      status: "completed" as const,
    },
    {
      id: "6",
      type: "win" as const,
      amount: 200,
      description: "Ganaste: Fantasy Contest BSN",
      timestamp: "Hace 4 días",
      status: "completed" as const,
    },
    {
      id: "7",
      type: "purchase" as const,
      amount: 250,
      description: "Recarga ATH Móvil",
      timestamp: "Hace 1 semana",
      status: "completed" as const,
    },
  ];

  const handlePurchaseBolitas = () => {
    console.log("Opening purchase modal");
    alert(
      "¡Abriendo opciones de compra! 💳\n\n• ATH Móvil\n• Tarjeta de crédito\n• Banco Popular"
    );
  };

  const handleClaimDaily = () => {
    console.log("Claiming daily reward");
    alert("¡+25 Bolitas reclamadas! 🎁\n\nVuelve mañana para más recompensas.");
  };

  const handleWatchAd = () => {
    console.log("Watching ad for Bolitas");
    alert(
      "¡Viendo anuncio de Medalla Light! 🍺\n\n+10 Bolitas añadidas a tu cartera."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mi Billetera Bolitas
          </h1>
          <p className="text-gray-600">
            Gestiona tu balance, historial y oportunidades de ganancia
          </p>
        </div>

        {/* Wallet Component */}
        <BolitasWallet
          balance={1247}
          dailyEarned={85}
          weeklyStreak={5}
          transactions={mockTransactions}
          onPurchaseBolitas={handlePurchaseBolitas}
          onClaimDaily={handleClaimDaily}
          onWatchAd={handleWatchAd}
        />

        {/* Additional Wallet Features */}
        <div className="mt-8 space-y-6">
          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📊 Estadísticas Rápidas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+$347</div>
                <div className="text-sm text-gray-600">Este mes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-gray-600">Picks ganados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">78%</div>
                <div className="text-sm text-gray-600">Win rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">5</div>
                <div className="text-sm text-gray-600">Racha actual</div>
              </div>
            </div>
          </div>

          {/* Earning Opportunities */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              💰 Oportunidades de Ganancia
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    🎁
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      Bonus Diario
                    </div>
                    <div className="text-sm text-gray-600">
                      +25 Bolitas gratis
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClaimDaily}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  Reclamar
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    📺
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Ver Anuncio</div>
                    <div className="text-sm text-gray-600">
                      +10 Bolitas por video
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleWatchAd}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Ver Video
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    👥
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      Invitar Amigos
                    </div>
                    <div className="text-sm text-gray-600">
                      +100 Bolitas por referido
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors">
                  Invitar
                </button>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              💳 Métodos de Pago
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-orange-300 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">📱</div>
                <div className="font-medium text-gray-800">ATH Móvil</div>
                <div className="text-sm text-gray-600">Pago instantáneo</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-orange-300 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">💳</div>
                <div className="font-medium text-gray-800">Tarjeta</div>
                <div className="text-sm text-gray-600">Visa, Mastercard</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-orange-300 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">🏦</div>
                <div className="font-medium text-gray-800">Banco Popular</div>
                <div className="text-sm text-gray-600">Transferencia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

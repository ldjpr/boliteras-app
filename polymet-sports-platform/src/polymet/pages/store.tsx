import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingBagIcon,
  TrophyIcon,
  TicketIcon,
  GiftIcon,
  StarIcon,
  FlameIcon,
  ClockIcon,
  PackageIcon,
} from "lucide-react";

import BolitasPrizeStore from "@/polymet/components/bolitas-prize-store";

export default function StorePage() {
  const [userBalance] = useState(1247);

  const mockPrizes = [
    // Merch
    {
      id: "merch-1",
      name: "Jersey Oficial Cangrejeros",
      description:
        "Jersey auténtico del equipo campeón con nombre personalizado",
      cost: 2500,
      category: "merch" as const,
      imageUrl: "cangrejeros-jersey",
      inStock: true,
      stockCount: 12,
      popular: true,
    },
    {
      id: "merch-2",
      name: "Gorra Capitanes Edición Limitada",
      description: "Gorra oficial de Arecibo con bordado especial dorado",
      cost: 800,
      originalCost: 1000,
      discount: 20,
      category: "merch" as const,
      imageUrl: "capitanes-cap",
      inStock: true,
      limitedTime: true,
      timeLeft: "2 días restantes",
    },
    {
      id: "merch-3",
      name: "Camiseta Leones Vintage",
      description: "Diseño retro de Ponce de los años 90 en algodón premium",
      cost: 1200,
      category: "merch" as const,
      imageUrl: "leones-vintage",
      inStock: true,
      stockCount: 3,
    },
    {
      id: "merch-4",
      name: "Sudadera Vaqueros",
      description: "Sudadera con capucha oficial de Bayamón",
      cost: 1800,
      category: "merch" as const,
      imageUrl: "vaqueros-hoodie",
      inStock: false,
    },
    {
      id: "merch-5",
      name: "Shorts Atenienses",
      description: "Shorts oficiales de Manatí con tecnología Dri-FIT",
      cost: 900,
      category: "merch" as const,
      imageUrl: "atenienses-shorts",
      inStock: true,
      stockCount: 15,
    },
    {
      id: "merch-6",
      name: "Mochila Gigantes",
      description:
        "Mochila deportiva de Carolina con compartimento para laptop",
      cost: 1400,
      category: "merch" as const,
      imageUrl: "gigantes-backpack",
      inStock: true,
      stockCount: 8,
    },
    {
      id: "merch-7",
      name: "Jersey Retro Indios",
      description: "Jersey vintage de Mayagüez con diseño clásico",
      cost: 2200,
      category: "merch" as const,
      imageUrl: "indios-retro",
      inStock: true,
      stockCount: 6,
      popular: true,
    },
    {
      id: "merch-8",
      name: "Camiseta Criollos",
      description: "Camiseta oficial de Caguas con logo bordado",
      cost: 950,
      category: "merch" as const,
      imageUrl: "criollos-tshirt",
      inStock: true,
      stockCount: 20,
    },

    // Tickets
    {
      id: "ticket-1",
      name: "Boletos Finals BSN",
      description: "Par de boletos para la final del BSN en el Coliseo",
      cost: 5000,
      category: "tickets" as const,
      imageUrl: "coliseo-roberto-clemente",
      inStock: true,
      stockCount: 8,
      popular: true,
    },
    {
      id: "ticket-2",
      name: "Juego Regular BSN",
      description:
        "Boleto individual para cualquier juego de temporada regular",
      cost: 1500,
      category: "tickets" as const,
      imageUrl: "bsn-regular-season",
      inStock: true,
      stockCount: 25,
    },
    {
      id: "ticket-3",
      name: "Paquete Familiar LBPRC",
      description: "4 boletos para juego de béisbol + concesiones",
      cost: 3200,
      category: "tickets" as const,
      imageUrl: "estadio-hiram-bithorn",
      inStock: true,
      stockCount: 5,
    },
    {
      id: "ticket-4",
      name: "Palco VIP Coliseo",
      description: "Experiencia VIP con comida y bebidas incluidas",
      cost: 8000,
      category: "tickets" as const,
      imageUrl: "vip-suite-coliseo",
      inStock: true,
      stockCount: 2,
      popular: true,
    },

    // VIP Experiences
    {
      id: "vip-1",
      name: "Meet & Greet con Jugadores",
      description: "Conoce a las estrellas del BSN en persona",
      cost: 8000,
      category: "vip" as const,
      imageUrl: "bsn-meet-greet",
      inStock: true,
      stockCount: 2,
      limitedTime: true,
      timeLeft: "1 semana restante",
    },
    {
      id: "vip-2",
      name: "Acceso VIP Coliseo",
      description: "Palco VIP con comida y bebidas incluidas",
      cost: 6500,
      category: "vip" as const,
      imageUrl: "coliseo-vip-access",
      inStock: true,
      popular: true,
      stockCount: 4,
    },
    {
      id: "vip-3",
      name: "Entrenamiento Privado",
      description: "Sesión de entrenamiento con ex-jugadores profesionales",
      cost: 12000,
      category: "vip" as const,
      imageUrl: "private-training-session",
      inStock: true,
      stockCount: 1,
    },

    // Sponsor Prizes
    {
      id: "sponsor-1",
      name: "Combo Medalla Light",
      description: "Pack de 12 cervezas Medalla Light + cooler oficial",
      cost: 600,
      category: "sponsor" as const,
      imageUrl: "medalla-light-logo",
      inStock: true,
      popular: true,
      stockCount: 50,
    },
    {
      id: "sponsor-2",
      name: "Gift Card Banco Popular",
      description: "Tarjeta de regalo de $50 para usar en cualquier comercio",
      cost: 2000,
      category: "sponsor" as const,
      imageUrl: "banco-popular-logo",
      inStock: true,
      stockCount: 20,
    },
    {
      id: "sponsor-3",
      name: "Recarga ATH Móvil",
      description: "Recarga de $25 directa a tu cuenta ATH Móvil",
      cost: 1000,
      category: "sponsor" as const,
      imageUrl: "ath-movil-logo",
      inStock: true,
      stockCount: 100,
    },
    {
      id: "sponsor-4",
      name: "Combo Pizza Hut",
      description: "Pizza grande + 2 refrescos + breadsticks",
      cost: 800,
      category: "sponsor" as const,
      imageUrl: "pizza-hut-logo",
      inStock: true,
      stockCount: 30,
    },
  ];

  const handleRedeemPrize = (prizeId: string) => {
    const prize = mockPrizes.find((p) => p.id === prizeId);
    if (prize) {
      console.log("Redeeming prize:", prize.name);
      alert(
        `¡Premio canjeado! 🎉\n\n${prize.name}\nCosto: ${prize.cost.toLocaleString()} Bolitas\n\nRecibirás instrucciones por email para reclamar tu premio.`
      );
    }
  };

  const categoryStats = {
    merch: mockPrizes.filter((p) => p.category === "merch").length,
    tickets: mockPrizes.filter((p) => p.category === "tickets").length,
    vip: mockPrizes.filter((p) => p.category === "vip").length,
    sponsor: mockPrizes.filter((p) => p.category === "sponsor").length,
  };

  const totalItems = mockPrizes.length;
  const popularItems = mockPrizes.filter((p) => p.popular).length;
  const limitedItems = mockPrizes.filter((p) => p.limitedTime).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingBagIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Tienda Oficial
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            Canjea tus Bolitas por merch auténtico y experiencias exclusivas
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <PackageIcon className="w-5 h-5 text-orange-500" />

                  <span className="text-2xl font-bold text-gray-900">
                    {totalItems}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Productos Total</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-red-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <StarIcon className="w-5 h-5 text-red-500" />

                  <span className="text-2xl font-bold text-gray-900">
                    {popularItems}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Populares</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ClockIcon className="w-5 h-5 text-yellow-500" />

                  <span className="text-2xl font-bold text-gray-900">
                    {limitedItems}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Tiempo Limitado</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FlameIcon className="w-5 h-5 text-green-500" />

                  <span className="text-2xl font-bold text-green-600">
                    {userBalance.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Tus Bolitas</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <ShoppingBagIcon className="w-4 h-4" />
              Todos ({totalItems})
            </TabsTrigger>
            <TabsTrigger value="merch" className="flex items-center gap-2">
              <TrophyIcon className="w-4 h-4" />
              Merch ({categoryStats.merch})
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <TicketIcon className="w-4 h-4" />
              Boletos ({categoryStats.tickets})
            </TabsTrigger>
            <TabsTrigger value="vip" className="flex items-center gap-2">
              <StarIcon className="w-4 h-4" />
              VIP ({categoryStats.vip})
            </TabsTrigger>
            <TabsTrigger value="sponsor" className="flex items-center gap-2">
              <GiftIcon className="w-4 h-4" />
              Sponsor ({categoryStats.sponsor})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <BolitasPrizeStore
              userBalance={userBalance}
              prizes={mockPrizes}
              onRedeemPrize={handleRedeemPrize}
            />
          </TabsContent>

          <TabsContent value="merch">
            <BolitasPrizeStore
              userBalance={userBalance}
              prizes={mockPrizes.filter((p) => p.category === "merch")}
              onRedeemPrize={handleRedeemPrize}
            />
          </TabsContent>

          <TabsContent value="tickets">
            <BolitasPrizeStore
              userBalance={userBalance}
              prizes={mockPrizes.filter((p) => p.category === "tickets")}
              onRedeemPrize={handleRedeemPrize}
            />
          </TabsContent>

          <TabsContent value="vip">
            <BolitasPrizeStore
              userBalance={userBalance}
              prizes={mockPrizes.filter((p) => p.category === "vip")}
              onRedeemPrize={handleRedeemPrize}
            />
          </TabsContent>

          <TabsContent value="sponsor">
            <BolitasPrizeStore
              userBalance={userBalance}
              prizes={mockPrizes.filter((p) => p.category === "sponsor")}
              onRedeemPrize={handleRedeemPrize}
            />
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                ¿Necesitas más Bolitas? 🪙
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Participa en contests, completa challenges diarios, y gana más
                Bolitas para canjear por premios increíbles
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  <TrophyIcon className="w-5 h-5 mr-2" />
                  Ver Contests
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <GiftIcon className="w-5 h-5 mr-2" />
                  Challenges Diarios
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

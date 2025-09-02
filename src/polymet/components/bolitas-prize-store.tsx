import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShirtIcon,
  TicketIcon,
  StarIcon,
  GiftIcon,
  TrophyIcon,
  ClockIcon,
  FlameIcon,
  CoinsIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
} from "lucide-react";
import WordArtTeam from "@/polymet/components/word-art-team";
import { teams } from "@/polymet/data/mock-data";

interface PrizeItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: "merch" | "tickets" | "vip" | "sponsor";
  imageUrl: string;
  inStock: boolean;
  stockCount?: number;
  popular?: boolean;
  limitedTime?: boolean;
  timeLeft?: string;
  originalCost?: number;
  discount?: number;
}

interface BolitasPrizeStoreProps {
  userBalance: number;
  prizes: PrizeItem[];
  onRedeemPrize: (prizeId: string) => void;
  className?: string;
}

export default function BolitasPrizeStore({
  userBalance,
  prizes,
  onRedeemPrize,
  className = "",
}: BolitasPrizeStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState("merch");

  const categorizedPrizes = {
    merch: prizes.filter((p) => p.category === "merch"),
    tickets: prizes.filter((p) => p.category === "tickets"),
    vip: prizes.filter((p) => p.category === "vip"),
    sponsor: prizes.filter((p) => p.category === "sponsor"),
  };

  const canAfford = (cost: number) => userBalance >= cost;

  // Map merchandise items to teams based on their names
  const getTeamFromMerchName = (merchName: string) => {
    const teamKeywords = {
      cangrejeros: ["cangrejeros", "cangrejo"],
      capitanes: ["capitanes", "arecibo"],
      atenienses: ["atenienses", "manatí"],
      vaqueros: ["vaqueros", "bayamón"],
      leones: ["leones", "ponce"],
      gigantes: ["gigantes", "carolina"],
      changos: ["changos", "naranjito"],
      plataneros: ["plataneros", "corozal"],
      criollos: ["criollos", "caguas"],
      indios: ["indios", "mayagüez"],
    };

    const lowerName = merchName.toLowerCase();
    for (const [teamId, keywords] of Object.entries(teamKeywords)) {
      if (keywords.some((keyword) => lowerName.includes(keyword))) {
        return teams.find((team) => team.id === teamId);
      }
    }

    // Default fallback for generic BSN items
    return teams.find((team) => team.id === "cangrejeros");
  };

  const getWordArtStyle = (index: number) => {
    const styles = ["gradient", "metallic", "neon", "chrome", "rainbow"];
    return styles[index % styles.length];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "merch":
        return <ShirtIcon className="w-4 h-4" />;

      case "tickets":
        return <TicketIcon className="w-4 h-4" />;

      case "vip":
        return <StarIcon className="w-4 h-4" />;

      case "sponsor":
        return <GiftIcon className="w-4 h-4" />;

      default:
        return <ShoppingBagIcon className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "merch":
        return "Merch Oficial";
      case "tickets":
        return "Boletos";
      case "vip":
        return "Experiencias VIP";
      case "sponsor":
        return "Premios Sponsor";
      default:
        return "Otros";
    }
  };

  // Function to get appropriate display content for non-merch items
  const getDisplayContent = (prize: PrizeItem) => {
    // For sponsor items, show sponsor name/logo
    if (prize.category === "sponsor") {
      const sponsorInfo = {
        "medalla-light-logo": {
          name: "Medalla Light",
          emoji: "🍺",
          color: "from-yellow-400 to-orange-500",
        },
        "banco-popular-logo": {
          name: "Banco Popular",
          emoji: "🏦",
          color: "from-blue-500 to-blue-700",
        },
        "ath-movil-logo": {
          name: "ATH Móvil",
          emoji: "📱",
          color: "from-green-500 to-emerald-600",
        },
        "pizza-hut-logo": {
          name: "Pizza Hut",
          emoji: "🍕",
          color: "from-red-500 to-red-700",
        },
      };
      const info = sponsorInfo[prize.imageUrl as keyof typeof sponsorInfo];
      if (info) {
        return (
          <div
            className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${info.color} text-white p-4`}
          >
            <div className="text-4xl mb-2">{info.emoji}</div>
            <div className="text-lg font-bold text-center">{info.name}</div>
          </div>
        );
      }
    }

    // For tickets, show venue/event info
    if (prize.category === "tickets") {
      const venueInfo = {
        "coliseo-roberto-clemente": {
          name: "Coliseo Roberto Clemente",
          emoji: "🏟️",
          color: "from-blue-600 to-purple-600",
        },
        "bsn-regular-season": {
          name: "BSN",
          emoji: "🏀",
          color: "from-orange-500 to-red-500",
        },
        "estadio-hiram-bithorn": {
          name: "Estadio Hiram Bithorn",
          emoji: "⚾",
          color: "from-green-600 to-blue-600",
        },
        "vip-suite-coliseo": {
          name: "VIP Suite",
          emoji: "👑",
          color: "from-purple-600 to-pink-600",
        },
      };
      const info = venueInfo[prize.imageUrl as keyof typeof venueInfo];
      if (info) {
        return (
          <div
            className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${info.color} text-white p-4`}
          >
            <div className="text-4xl mb-2">{info.emoji}</div>
            <div className="text-sm font-bold text-center">{info.name}</div>
          </div>
        );
      }
    }

    // For VIP experiences, show experience type
    if (prize.category === "vip") {
      const vipInfo = {
        "bsn-meet-greet": {
          name: "Meet & Greet",
          emoji: "🤝",
          color: "from-purple-500 to-pink-500",
        },
        "coliseo-vip-access": {
          name: "VIP Access",
          emoji: "⭐",
          color: "from-yellow-500 to-orange-500",
        },
        "private-training-session": {
          name: "Training Session",
          emoji: "🏋️",
          color: "from-blue-500 to-indigo-600",
        },
      };
      const info = vipInfo[prize.imageUrl as keyof typeof vipInfo];
      if (info) {
        return (
          <div
            className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${info.color} text-white p-4`}
          >
            <div className="text-4xl mb-2">{info.emoji}</div>
            <div className="text-sm font-bold text-center">{info.name}</div>
          </div>
        );
      }
    }

    // Fallback for any unrecognized items
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600">
        <div className="text-center">
          <div className="text-4xl mb-2">🎁</div>
          <div className="text-sm font-medium">Premio</div>
        </div>
      </div>
    );
  };

  const PrizeCard = ({ prize }: { prize: PrizeItem }) => (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white border-2 ${
        !canAfford(prize.cost)
          ? "opacity-70 border-gray-200"
          : "hover:scale-105 border-gray-100 hover:border-orange-200"
      } ${!prize.inStock ? "grayscale" : ""}`}
    >
      {/* Special Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {prize.popular && (
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
            <StarIcon className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        )}
        {prize.limitedTime && (
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs animate-pulse">
            <FlameIcon className="w-3 h-3 mr-1" />
            Limitado
          </Badge>
        )}
        {prize.discount && (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
            -{prize.discount}%
          </Badge>
        )}
      </div>

      {/* Stock Status */}
      {!prize.inStock && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-gray-600 text-white text-xs font-semibold">
            Agotado
          </Badge>
        </div>
      )}

      <CardHeader className="p-0">
        <div className="aspect-square bg-gradient-to-br from-blue-100 via-purple-100 to-red-100 flex items-center justify-center relative overflow-hidden border-2 border-white">
          {prize.category === "merch"
            ? (() => {
                const team = getTeamFromMerchName(prize.name);
                const teamColors = team?.colors || ["#FF6B35", "#004E89"];
                const teamName = team?.name || "BSN";

                // Convert hex colors to CSS gradient
                const gradientStyle = {
                  background: `linear-gradient(135deg, ${teamColors[0]}, ${teamColors[1]})`,
                };

                return (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center text-white p-4"
                    style={gradientStyle}
                  >
                    <div className="text-4xl mb-2">🏀</div>
                    <div className="text-sm font-bold text-center uppercase tracking-wide">
                      {teamName}
                    </div>
                  </div>
                );
              })()
            : getDisplayContent(prize)}
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">
              {prize.name}
            </h3>
            <p className="text-xs text-gray-700 mt-1 line-clamp-2 font-medium">
              {prize.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <CoinsIcon className="w-4 h-4 text-yellow-600" />

                <span className="font-bold text-gray-900 text-base">
                  {prize.cost.toLocaleString()}
                </span>
              </div>
              {prize.originalCost && (
                <span className="text-xs text-gray-600 line-through font-medium">
                  {prize.originalCost.toLocaleString()}
                </span>
              )}
            </div>
            {prize.stockCount && prize.stockCount <= 5 && (
              <Badge
                variant="outline"
                className="text-xs text-orange-700 border-orange-400 bg-orange-50 font-semibold"
              >
                Quedan {prize.stockCount}
              </Badge>
            )}
          </div>

          {/* Time Left for Limited Items */}
          {prize.limitedTime && prize.timeLeft && (
            <div className="flex items-center gap-1 text-xs text-red-700 bg-red-50 px-2 py-1 rounded-full font-semibold">
              <ClockIcon className="w-3 h-3" />

              <span>{prize.timeLeft}</span>
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={() => onRedeemPrize(prize.id)}
            disabled={!canAfford(prize.cost) || !prize.inStock}
            className={`w-full text-sm font-bold transition-all duration-200 ${
              canAfford(prize.cost) && prize.inStock
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-600 cursor-not-allowed border border-gray-300"
            }`}
          >
            {!prize.inStock ? (
              "Agotado"
            ) : !canAfford(prize.cost) ? (
              <span className="text-gray-700 font-semibold">
                Necesitas {(prize.cost - userBalance).toLocaleString()} más
              </span>
            ) : (
              <>
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Canjear
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Balance */}
      <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">🏪 Tienda de Premios</h2>
              <p className="text-sm opacity-90">
                Canjea tus Bolitas por premios increíbles
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold flex items-center gap-2">
                <CoinsIcon className="w-6 h-6" />

                {userBalance.toLocaleString()}
              </div>
              <p className="text-xs opacity-90">Tu balance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-orange-100 to-red-100">
          <TabsTrigger
            value="merch"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
          >
            {getCategoryIcon("merch")}
            <span className="ml-1 hidden sm:inline">Merch</span>
          </TabsTrigger>
          <TabsTrigger
            value="tickets"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            {getCategoryIcon("tickets")}
            <span className="ml-1 hidden sm:inline">Boletos</span>
          </TabsTrigger>
          <TabsTrigger
            value="vip"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            {getCategoryIcon("vip")}
            <span className="ml-1 hidden sm:inline">VIP</span>
          </TabsTrigger>
          <TabsTrigger
            value="sponsor"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
          >
            {getCategoryIcon("sponsor")}
            <span className="ml-1 hidden sm:inline">Sponsor</span>
          </TabsTrigger>
        </TabsList>

        {Object.entries(categorizedPrizes).map(([category, categoryPrizes]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                {getCategoryIcon(category)}
                {getCategoryName(category)}
              </h3>
              <p className="text-sm text-gray-700 font-medium">
                {category === "merch" &&
                  "Jerseys, gorras y merch oficial de tus equipos favoritos"}
                {category === "tickets" &&
                  "Boletos para juegos de BSN, LBPRC y más deportes"}
                {category === "vip" && "Experiencias exclusivas y acceso VIP"}
                {category === "sponsor" &&
                  "Productos y ofertas especiales de nuestros sponsors"}
              </p>
            </div>

            {categoryPrizes.length === 0 ? (
              <Card className="bg-gray-50">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">
                    Próximamente
                  </h3>
                  <p className="text-sm text-gray-700 font-medium">
                    Nuevos premios en esta categoría muy pronto
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryPrizes.map((prize) => (
                  <PrizeCard key={prize.id} prize={prize} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Puerto Rican Cultural Footer */}
      <Card className="bg-gradient-to-r from-blue-500 via-white to-red-500 p-1">
        <div className="bg-white p-4 rounded-sm text-center">
          <h3 className="font-bold text-gray-900 mb-2">
            🇵🇷 "Donde cada Bolita cuenta" 🇵🇷
          </h3>
          <p className="text-sm text-gray-700 font-medium">
            Apoya el deporte boricua mientras ganas premios increíbles
          </p>
        </div>
      </Card>
    </div>
  );
}

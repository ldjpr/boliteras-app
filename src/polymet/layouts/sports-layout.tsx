import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  HomeIcon,
  TrophyIcon,
  TargetIcon,
  ShoppingBagIcon,
  BarChart3Icon,
  BellIcon,
  FlameIcon,
  StarIcon,
  CrownIcon,
  WalletIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import BettingMarkets from "@/polymet/components/betting-markets";
import BettingSlip from "@/polymet/components/betting-slip";

interface SportsLayoutProps {
  children: React.ReactNode;
}

export default function SportsLayout({ children }: SportsLayoutProps) {
  const [notifications] = useState(3); // Mock notification count
  const [userBalance] = useState(125.5); // Mock user balance
  const [showBettingSlip, setShowBettingSlip] = useState(false);
  const [bets, setBets] = useState<any[]>([]);
  const location = useLocation();

  // Mock betting data
  const mockGames = [
    {
      id: "game-1",
      homeTeam: "Cangrejeros",
      awayTeam: "Leones",
      homeScore: 78,
      awayScore: 82,
      startTime: "Hoy 8:00 PM",
      status: "live" as const,
      league: "BSN" as const,
      venue: "Coliseo Roberto Clemente",
      totalBets: 1247,
      hotMarket: "Ganador del Juego",
      markets: [
        {
          id: "winner",
          name: "Ganador del Juego",
          odds: 2.1,
          popular: true,
        },
        {
          id: "total",
          name: "Más de 160 puntos",
          odds: 1.8,
          trending: true,
        },
      ],
    },
    {
      id: "game-2",
      homeTeam: "Vaqueros",
      awayTeam: "Atléticos",
      startTime: "Hoy 9:30 PM",
      status: "upcoming" as const,
      league: "BSN" as const,
      venue: "Coliseo Mario Morales",
      totalBets: 892,
      markets: [
        {
          id: "winner",
          name: "Ganador del Juego",
          odds: 1.7,
          popular: true,
        },
      ],
    },
  ];

  const mockPropBets = [
    {
      id: "prop-1",
      title: "Carlos Rivera - Más de 20 puntos",
      description: "El PG estrella de los Cangrejeros anote más de 20 puntos",
      odds: 2.8,
      category: "player" as const,
      playerName: "Carlos Rivera",
      gameInfo: "Cangrejeros vs Leones - Hoy 8:00 PM",
      trending: true,
      betsCount: 234,
    },
  ];

  const navigationItems = [
    {
      name: "El barrio",
      href: "/",
      icon: HomeIcon,
      badge: null,
      description: "Feed principal y juegos en vivo",
    },
    {
      name: "La Liga",
      href: "/fantasy",
      icon: TrophyIcon,
      badge: "HOT",
      description: "Contests y picks de jugadores",
    },
    {
      name: "Apuestas",
      href: "/la-bolitera",
      icon: TargetIcon,
      badge: "LIVE",
      description: "Mercados de apuestas en vivo",
    },
    {
      name: "Juegos",
      href: "/games",
      icon: BarChart3Icon,
      badge: "LIVE",
      description: "Scores y estadísticas",
    },
    {
      name: "La tiendita",
      href: "/store",
      icon: ShoppingBagIcon,
      badge: null,
      description: "Merch y productos oficiales",
    },
  ];

  const handlePlaceBet = (
    gameId: string,
    marketId: string,
    selection: string,
    odds: number
  ) => {
    const newBet = {
      id: `${gameId}-${marketId}-${Date.now()}`,
      market: "Ganador del Juego",
      selection,
      odds,
      stake: 25,
      potentialPayout: 25 * odds,
      gameInfo: {
        homeTeam: mockGames.find((g) => g.id === gameId)?.homeTeam || "Team A",
        awayTeam: mockGames.find((g) => g.id === gameId)?.awayTeam || "Team B",
        startTime: mockGames.find((g) => g.id === gameId)?.startTime || "TBD",
      },
    };
    setBets([...bets, newBet]);
    setShowBettingSlip(true);
  };

  const handlePlacePropBet = (propBetId: string) => {
    const propBet = mockPropBets.find((p) => p.id === propBetId);
    if (propBet) {
      const newBet = {
        id: `prop-${propBetId}-${Date.now()}`,
        market: "Prop Bet",
        selection: propBet.title,
        odds: propBet.odds,
        stake: 25,
        potentialPayout: 25 * propBet.odds,
        gameInfo: {
          homeTeam: "Prop",
          awayTeam: "Bet",
          startTime: propBet.gameInfo,
        },
      };
      setBets([...bets, newBet]);
      setShowBettingSlip(true);
    }
  };

  const handleUpdateStake = (betId: string, newStake: number) => {
    setBets(
      bets.map((bet) =>
        bet.id === betId
          ? { ...bet, stake: newStake, potentialPayout: newStake * bet.odds }
          : bet
      )
    );
  };

  const handleRemoveBet = (betId: string) => {
    setBets(bets.filter((bet) => bet.id !== betId));
  };

  const handlePlaceBets = () => {
    console.log("Placing bets:", bets);
    setBets([]);
    setShowBettingSlip(false);
    alert("¡Apuestas confirmadas! 🎉");
  };

  const handleClearSlip = () => {
    setBets([]);
  };

  const handleShareSlip = () => {
    const shareText = `🎯 Mi boleta en La Bolita:\n\n${bets.map((bet) => `• ${bet.selection} (${bet.odds}x) - ${bet.stake} Bolitas`).join("\n")}\n\n¡Dale que vamos pa'rriba! 🇵🇷`;
    if (navigator.share) {
      navigator.share({ title: "Mi Boleta - La Bolita", text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("¡Boleta copiada! Pégala en WhatsApp o IG 📱");
    }
  };

  const totalStake = bets.reduce((sum, bet) => sum + bet.stake, 0);
  const totalPayout = bets.reduce((sum, bet) => sum + bet.potentialPayout, 0);

  const isActivePath = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 pb-16 lg:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-100/95 via-orange-100/95 to-sky-100/95 backdrop-blur-sm border-b border-amber-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 via-orange-500 to-sky-600 rounded-lg flex items-center justify-center shadow-md">
                  <FlameIcon className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-sky-700 bg-clip-text text-transparent">
                    La Bolita
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">
                    Puerto Rico Sports
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                    isActivePath(item.href)
                      ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 shadow-md border border-amber-200"
                      : "text-gray-700 hover:text-amber-800 hover:bg-amber-50/50"
                  )}
                >
                  <item.icon className="w-4 h-4" />

                  {item.name}
                  {item.badge && (
                    <Badge
                      className={cn(
                        "text-xs px-1.5 py-0.5 h-5",
                        item.badge === "HOT" &&
                          "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm",
                        item.badge === "NEW" &&
                          "bg-gradient-to-r from-sky-500 to-blue-500 text-white animate-pulse shadow-sm",
                        item.badge === "LIVE" &&
                          "bg-gradient-to-r from-emerald-500 to-teal-500 text-white animate-pulse shadow-sm"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {/* Balance Display */}
              <Link
                to="/wallet"
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1.5 rounded-lg border border-emerald-200 shadow-sm hover:from-emerald-100 hover:to-teal-100 hover:border-emerald-300 transition-all duration-200 cursor-pointer"
              >
                <WalletIcon className="w-4 h-4 text-emerald-600" />

                <span className="text-sm font-semibold text-emerald-700">
                  ${userBalance.toFixed(2)}
                </span>
              </Link>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <BellIcon className="w-5 h-5" />

                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10 border-2 border-amber-200 shadow-md">
                      <AvatarImage
                        src="https://github.com/yusufhilmi.png"
                        alt="Usuario"
                      />

                      <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                        LB
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <CrownIcon className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">ElBoliteroMayor</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        2,847 puntos • Rank #1 👑
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/wallet" className="flex items-center">
                      <WalletIcon className="mr-2 h-4 w-4" />

                      <span>Mi Billetera</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <StarIcon className="mr-2 h-4 w-4" />

                    <span>Mis Picks</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />

                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <LogOutIcon className="mr-2 h-4 w-4" />

                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button - Hidden since we use bottom nav */}
              <div className="lg:hidden w-6"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Bottom Navigation - Mobile Only (Instagram Style) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-50/95 via-orange-50/95 to-sky-50/95 backdrop-blur-sm border-t border-amber-200 shadow-xl">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.map((item) => {
            // Special handling for betting markets
            if (item.name === "Apuestas") {
              return (
                <button
                  key={item.name}
                  onClick={() => setShowBettingSlip(!showBettingSlip)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 px-1 py-2 text-xs font-medium transition-all duration-200 relative",
                    showBettingSlip || isActivePath(item.href)
                      ? "text-amber-600"
                      : "text-gray-600 hover:text-amber-700"
                  )}
                >
                  <div className="relative">
                    <item.icon
                      className={cn(
                        "w-6 h-6",
                        showBettingSlip || isActivePath(item.href)
                          ? "text-amber-600"
                          : "text-gray-500"
                      )}
                    />

                    {bets.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {bets.length}
                      </div>
                    )}
                    {item.badge && (
                      <div
                        className={cn(
                          "absolute -top-1 -right-1 w-2 h-2 rounded-full",
                          item.badge === "HOT" &&
                            "bg-gradient-to-r from-orange-500 to-amber-500",
                          item.badge === "NEW" &&
                            "bg-gradient-to-r from-sky-500 to-blue-500 animate-pulse",
                          item.badge === "LIVE" &&
                            "bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"
                        )}
                      ></div>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs leading-none",
                      showBettingSlip || isActivePath(item.href)
                        ? "text-amber-600 font-semibold"
                        : "text-gray-500"
                    )}
                  >
                    La bolitera
                  </span>
                  {(showBettingSlip || isActivePath(item.href)) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                  )}
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-1 py-2 text-xs font-medium transition-all duration-200 relative",
                  isActivePath(item.href)
                    ? "text-amber-600"
                    : "text-gray-600 hover:text-amber-700"
                )}
              >
                <div className="relative">
                  <item.icon
                    className={cn(
                      "w-6 h-6",
                      isActivePath(item.href)
                        ? "text-amber-600"
                        : "text-gray-500"
                    )}
                  />

                  {item.badge && (
                    <div
                      className={cn(
                        "absolute -top-1 -right-1 w-2 h-2 rounded-full",
                        item.badge === "HOT" &&
                          "bg-gradient-to-r from-orange-500 to-amber-500",
                        item.badge === "NEW" &&
                          "bg-gradient-to-r from-sky-500 to-blue-500 animate-pulse",
                        item.badge === "LIVE" &&
                          "bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"
                      )}
                    ></div>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs leading-none",
                    isActivePath(item.href)
                      ? "text-amber-600 font-semibold"
                      : "text-gray-500"
                  )}
                >
                  {item.name === "El barrio"
                    ? "El barrio"
                    : item.name === "La Liga"
                      ? "La Liga"
                      : item.name === "Comunidad"
                        ? "Social"
                        : item.name === "Juegos"
                          ? "Los puntos"
                          : item.name === "La tiendita"
                            ? "La tiendita"
                            : item.name}
                </span>
                {isActivePath(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Betting Markets & Slip Overlay - Mobile Only */}
      {showBettingSlip && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowBettingSlip(false)}
        >
          <div
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-xl shadow-2xl max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">La Bolita</h2>
              <Button
                onClick={() => setShowBettingSlip(false)}
                variant="ghost"
                size="sm"
                className="text-gray-500"
              >
                ✕
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                {/* Betting Markets */}
                <div className="space-y-4">
                  <BettingMarkets
                    games={mockGames}
                    propBets={mockPropBets}
                    onPlaceBet={handlePlaceBet}
                    onPlacePropBet={handlePlacePropBet}
                  />
                </div>

                {/* Betting Slip */}
                <div className="space-y-4">
                  <BettingSlip
                    bets={bets}
                    totalStake={totalStake}
                    totalPayout={totalPayout}
                    userBalance={userBalance * 100} // Convert to Bolitas
                    onUpdateStake={handleUpdateStake}
                    onRemoveBet={handleRemoveBet}
                    onPlaceBets={handlePlaceBets}
                    onClearSlip={handleClearSlip}
                    onShareSlip={handleShareSlip}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 via-orange-500 to-sky-600 rounded-lg flex items-center justify-center shadow-md">
                  <FlameIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">La Bolita</h2>
                  <p className="text-sm text-gray-400">
                    Puerto Rico Sports Platform
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                La plataforma de fantasy sports más auténtica de Puerto Rico.
                Conectando la pasión boricua por el deporte con la emoción de
                competir.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>🇵🇷 Hecho en Borinquen</span>
                <span>•</span>
                <span>Con ❤️ para los fanáticos</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link
                    to="/fantasy"
                    className="hover:text-white transition-colors"
                  >
                    Fantasy Contests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/games"
                    className="hover:text-white transition-colors"
                  >
                    Juegos en Vivo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community"
                    className="hover:text-white transition-colors"
                  >
                    Comunidad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/store"
                    className="hover:text-white transition-colors"
                  >
                    Tienda Oficial
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Términos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Juego Responsable
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 La Bolita. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <Badge
                variant="outline"
                className="text-gray-400 border-gray-600"
              >
                ATH Móvil Integrado
              </Badge>
              <Badge
                variant="outline"
                className="text-gray-400 border-gray-600"
              >
                Licencia DACO
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

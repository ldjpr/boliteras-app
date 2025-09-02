import React, { useState } from "react";
import LiveScoreboard from "@/polymet/components/live-scoreboard";
import Team from "@/polymet/components/team";
import { liveGames, upcomingGames, teams } from "@/polymet/data/mock-data";
import {
  CalendarIcon,
  TrophyIcon,
  BarChart3Icon,
  ClockIcon,
} from "lucide-react";

const GamesPage = () => {
  const [activeTab, setActiveTab] = useState("live");

  // Mock team standings data
  const bsnStandings = [
    {
      teamId: "cangrejeros",
      wins: 18,
      losses: 6,
      winPercentage: 0.75,
      streak: "W3",
    },
    {
      teamId: "capitanes",
      wins: 16,
      losses: 8,
      winPercentage: 0.667,
      streak: "W1",
    },
    {
      teamId: "vaqueros",
      wins: 15,
      losses: 9,
      winPercentage: 0.625,
      streak: "L2",
    },
    {
      teamId: "atenienses",
      wins: 14,
      losses: 10,
      winPercentage: 0.583,
      streak: "W2",
    },
    {
      teamId: "leones",
      wins: 12,
      losses: 12,
      winPercentage: 0.5,
      streak: "L1",
    },
    {
      teamId: "atleticos",
      wins: 10,
      losses: 14,
      winPercentage: 0.417,
      streak: "L3",
    },
    {
      teamId: "gigantes",
      wins: 8,
      losses: 16,
      winPercentage: 0.333,
      streak: "W1",
    },
    {
      teamId: "piratas",
      wins: 7,
      losses: 17,
      winPercentage: 0.292,
      streak: "L4",
    },
  ];

  // Mock player stats
  const topScorers = [
    {
      name: "Carlos Rivera",
      team: "cangrejeros",
      ppg: 24.8,
      avatar: "https://github.com/yusufhilmi.png",
    },
    {
      name: "Miguel Santos",
      team: "capitanes",
      ppg: 22.3,
      avatar: "https://github.com/kdrnp.png",
    },
    {
      name: "José Rodríguez",
      team: "vaqueros",
      ppg: 21.7,
      avatar: "https://github.com/denizbuyuktas.png",
    },
    {
      name: "Luis García",
      team: "atenienses",
      ppg: 20.9,
      avatar: "https://github.com/shoaibux1.png",
    },
    {
      name: "Pedro Martínez",
      team: "leones",
      ppg: 19.4,
      avatar: "https://github.com/yahyabedirhan.png",
    },
  ];

  const topRebounders = [
    {
      name: "Luis García",
      team: "atenienses",
      rpg: 12.1,
      avatar: "https://github.com/shoaibux1.png",
    },
    {
      name: "Miguel Santos",
      team: "capitanes",
      rpg: 10.8,
      avatar: "https://github.com/kdrnp.png",
    },
    {
      name: "Roberto Díaz",
      team: "gigantes",
      rpg: 9.7,
      avatar: "https://github.com/polymet-ai.png",
    },
    {
      name: "Antonio López",
      team: "piratas",
      rpg: 9.2,
      avatar: "https://github.com/yusufhilmi.png",
    },
    {
      name: "Fernando Cruz",
      team: "atleticos",
      rpg: 8.9,
      avatar: "https://github.com/kdrnp.png",
    },
  ];

  const tabs = [
    { id: "live", label: "En Vivo", icon: ClockIcon, badge: liveGames.length },
    {
      id: "upcoming",
      label: "Próximos",
      icon: CalendarIcon,
      badge: upcomingGames.length,
    },
    { id: "standings", label: "Posiciones", icon: TrophyIcon },
    { id: "stats", label: "Estadísticas", icon: BarChart3Icon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Juegos y Estadísticas
        </h1>
        <p className="text-gray-600">
          Scores en vivo y estadísticas detalladas del BSN y más
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />

              {tab.label}
              {tab.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content based on active tab */}
      {activeTab === "live" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-semibold text-gray-800">
              Juegos en Vivo ({liveGames.length})
            </h2>
          </div>
          {liveGames.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {liveGames.map((game) => (
                <LiveScoreboard
                  key={game.id}
                  game={game}
                  size="md"
                  interactive={true}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />

              <p className="text-gray-600">
                No hay juegos en vivo en este momento
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "upcoming" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Próximos Juegos ({upcomingGames.length})
          </h2>
          {upcomingGames.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingGames.map((game) => (
                <LiveScoreboard
                  key={game.id}
                  game={game}
                  size="md"
                  showDetails={true}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />

              <p className="text-gray-600">No hay juegos programados</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "standings" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Posiciones BSN - Temporada 2024
          </h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Equipo
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      G
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      P
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      %
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Racha
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bsnStandings.map((standing, index) => (
                    <tr key={standing.teamId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </span>
                          {index < 3 && (
                            <TrophyIcon className="w-4 h-4 text-yellow-500 ml-2" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Team
                          teamId={standing.teamId}
                          variant="full"
                          showColors={true}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                        {standing.wins}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                        {standing.losses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                        {(standing.winPercentage * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            standing.streak.startsWith("W")
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {standing.streak}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "stats" && (
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Líderes Estadísticos BSN
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Scorers */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3Icon className="w-5 h-5 text-orange-500" />
                Máximos Anotadores
              </h3>
              <div className="space-y-4">
                {topScorers.map((player, index) => (
                  <div key={player.name} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-10 h-10 rounded-full"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{player.name}</p>
                      <Team teamId={player.team} variant="name" size="sm" />
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">
                        {player.ppg}
                      </p>
                      <p className="text-xs text-gray-500">PPG</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Rebounders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3Icon className="w-5 h-5 text-blue-500" />
                Máximos Reboteadores
              </h3>
              <div className="space-y-4">
                {topRebounders.map((player, index) => (
                  <div key={player.name} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-10 h-10 rounded-full"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{player.name}</p>
                      <Team teamId={player.team} variant="name" size="sm" />
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">
                        {player.rpg}
                      </p>
                      <p className="text-xs text-gray-500">RPG</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* League Stats Summary */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Estadísticas de la Liga
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm opacity-90">Equipos</div>
              </div>
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm opacity-90">Juegos Jugados</div>
              </div>
              <div>
                <div className="text-2xl font-bold">89.2</div>
                <div className="text-sm opacity-90">Promedio Puntos</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2.4M</div>
                <div className="text-sm opacity-90">Fanáticos</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesPage;

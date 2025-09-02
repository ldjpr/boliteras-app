// Mock data for Puerto Rican Sports Platform
export const leagues = [
  {
    id: "bsn",
    name: "BSN",
    fullName: "Baloncesto Superior Nacional",
    color: "hsl(220, 91%, 35%)",
  },
  {
    id: "lvsm",
    name: "LVSM",
    fullName: "Liga de Voleibol Superior Masculino",
    color: "hsl(0, 84%, 60%)",
  },
  {
    id: "baseball",
    name: "Baseball",
    fullName: "Liga de Béisbol Profesional",
    color: "hsl(45, 93%, 47%)",
  },
];

export const teams = [
  // BSN Teams
  {
    id: "cangrejeros",
    name: "Cangrejeros",
    league: "bsn",
    city: "Santurce",
    colors: ["#FF6B35", "#004E89"],
  },
  {
    id: "capitanes",
    name: "Capitanes",
    league: "bsn",
    city: "Arecibo",
    colors: ["#8B0000", "#FFD700"],
  },
  {
    id: "atenienses",
    name: "Atenienses",
    league: "bsn",
    city: "Manatí",
    colors: ["#000080", "#C0C0C0"],
  },
  {
    id: "vaqueros",
    name: "Vaqueros",
    league: "bsn",
    city: "Bayamón",
    colors: ["#228B22", "#FFFFFF"],
  },
  {
    id: "leones",
    name: "Leones",
    league: "bsn",
    city: "Ponce",
    colors: ["#8B0000", "#000000"],
  },
  {
    id: "gigantes",
    name: "Gigantes",
    league: "bsn",
    city: "Carolina",
    colors: ["#4169E1", "#FFD700"],
  },

  // LVSM Teams
  {
    id: "changos",
    name: "Changos",
    league: "lvsm",
    city: "Naranjito",
    colors: ["#FF8C00", "#000000"],
  },
  {
    id: "plataneros",
    name: "Plataneros",
    league: "lvsm",
    city: "Corozal",
    colors: ["#32CD32", "#FFFF00"],
  },

  // Baseball Teams
  {
    id: "criollos",
    name: "Criollos",
    league: "baseball",
    city: "Caguas",
    colors: ["#8B0000", "#FFD700"],
  },
  {
    id: "indios",
    name: "Indios",
    league: "baseball",
    city: "Mayagüez",
    colors: ["#FF4500", "#000080"],
  },
];

export const players = [
  // BSN Players
  {
    id: "player-1",
    name: "Carlos Rivera",
    team: "cangrejeros",
    position: "PG",
    jersey: 7,
    stats: {
      points: 18.5,
      assists: 7.2,
      rebounds: 4.1,
      steals: 2.3,
      fieldGoalPercentage: 44.8,
      threePointPercentage: 39.7,
      freeThrowPercentage: 82.4,
      gamesPlayed: 70,
      minutes: 32.2,
    },
    trend: "up",
    hotStreak: true,
    prediction: "Likely to score 20+ pts tonight based on matchup analysis",
    avatar: "https://github.com/yusufhilmi.png",
  },
  {
    id: "player-2",
    name: "Miguel Santos",
    team: "capitanes",
    position: "C",
    jersey: 23,
    stats: {
      points: 22.1,
      assists: 2.8,
      rebounds: 11.4,
      blocks: 2.1,
      steals: 0.8,
      fieldGoalPercentage: 52.3,
      threePointPercentage: 0.0,
      freeThrowPercentage: 78.9,
      gamesPlayed: 68,
      minutes: 28.5,
    },
    trend: "up",
    hotStreak: false,
    prediction:
      "Strong rebounding performance expected against smaller frontcourt",
    avatar: "https://github.com/kdrnp.png",
  },
  {
    id: "player-3",
    name: "José Morales",
    team: "atenienses",
    position: "SF",
    jersey: 15,
    stats: {
      points: 16.8,
      assists: 4.5,
      rebounds: 6.7,
      steals: 1.8,
      blocks: 0.9,
      fieldGoalPercentage: 41.2,
      threePointPercentage: 35.6,
      freeThrowPercentage: 85.1,
      gamesPlayed: 72,
      minutes: 30.8,
    },
    trend: "down",
    hotStreak: false,
    prediction: "Due for a bounce-back game after recent struggles",
    avatar: "https://github.com/yahyabedirhan.png",
  },
  {
    id: "player-4",
    name: "David Vega",
    team: "vaqueros",
    position: "SG",
    jersey: 3,
    stats: {
      points: 19.3,
      assists: 3.2,
      rebounds: 5.1,
      steals: 1.5,
      blocks: 0.4,
      fieldGoalPercentage: 46.7,
      threePointPercentage: 42.1,
      freeThrowPercentage: 88.3,
      gamesPlayed: 69,
      minutes: 31.5,
    },
    trend: "up",
    hotStreak: true,
    prediction: "🔥 Hot shooter - 4+ threes likely in pace-up spot",
    avatar: "https://github.com/denizbuyuktas.png",
  },
  {
    id: "player-5",
    name: "Luis Hernández",
    team: "leones",
    position: "PF",
    jersey: 21,
    stats: {
      points: 14.7,
      assists: 2.1,
      rebounds: 9.8,
      blocks: 1.9,
      steals: 1.1,
      fieldGoalPercentage: 48.9,
      threePointPercentage: 31.2,
      freeThrowPercentage: 74.6,
      gamesPlayed: 71,
      minutes: 27.3,
    },
    trend: "stable",
    hotStreak: false,
    prediction: "Solid double-double potential with strong interior presence",
    avatar: "https://github.com/shoaibux1.png",
  },
];

export const liveGames = [
  {
    id: "game-1",
    homeTeam: "cangrejeros",
    awayTeam: "capitanes",
    homeScore: 78,
    awayScore: 82,
    quarter: 4,
    timeLeft: "2:45",
    status: "live",
    league: "bsn",
  },
  {
    id: "game-2",
    homeTeam: "vaqueros",
    awayTeam: "atenienses",
    homeScore: 65,
    awayScore: 61,
    quarter: 3,
    timeLeft: "8:12",
    status: "live",
    league: "bsn",
  },
];

export const upcomingGames = [
  {
    id: "game-3",
    homeTeam: "leones",
    awayTeam: "gigantes",
    date: "2024-01-20",
    time: "7:30 PM",
    venue: "Coliseo Juan Pachín Vicéns",
    status: "upcoming",
    league: "bsn",
  },
  {
    id: "game-4",
    homeTeam: "changos",
    awayTeam: "plataneros",
    date: "2024-01-21",
    time: "6:00 PM",
    venue: "Coliseo Municipal",
    status: "upcoming",
    league: "lvsm",
  },
];

export const fantasyContests = [
  {
    id: "contest-1",
    name: "El Pick de la Semana",
    prize: "$500",
    entries: 1247,
    maxEntries: 2000,
    entryFee: "$5",
    endTime: "2024-01-20T19:30:00Z",
    featured: true,
  },
  {
    id: "contest-2",
    name: "Barrio Challenge",
    prize: "$100",
    entries: 89,
    maxEntries: 100,
    entryFee: "$2",
    endTime: "2024-01-21T18:00:00Z",
    featured: false,
  },
];

export const leaderboard = [
  {
    rank: 1,
    username: "ElBoliteroMayor",
    points: 2847,
    wins: 23,
    avatar: "https://github.com/yusufhilmi.png",
    badge: "👑",
  },
  {
    rank: 2,
    username: "CangrejerosForever",
    points: 2691,
    wins: 19,
    avatar: "https://github.com/kdrnp.png",
    badge: "🔥",
  },
  {
    rank: 3,
    username: "PonceLeones",
    points: 2534,
    wins: 18,
    avatar: "https://github.com/yahyabedirhan.png",
    badge: "⭐",
  },
  {
    rank: 4,
    username: "VaquerosNation",
    points: 2398,
    wins: 16,
    avatar: "https://github.com/denizbuyuktas.png",
    badge: "💪",
  },
  {
    rank: 5,
    username: "BoricuaBaller",
    points: 2201,
    wins: 14,
    avatar: "https://github.com/shoaibux1.png",
    badge: "🏀",
  },
];

export const communityHighlights = [
  {
    id: "highlight-1",
    type: "meme",
    content: "Cuando tu pick favorito anota 30 puntos 🔥",
    author: "ElBoliteroMayor",
    likes: 234,
    comments: 45,
    timestamp: "2 hours ago",
  },
  {
    id: "highlight-2",
    type: "prediction",
    content: "Los Cangrejeros van a ganar por 15+ esta noche. ¡Apuesten!",
    author: "CangrejerosForever",
    likes: 156,
    comments: 23,
    timestamp: "4 hours ago",
  },
  {
    id: "highlight-3",
    type: "celebration",
    content: "¡GANAMOS EL CONTEST! 🎉 Gracias Carlos Rivera por los 28 puntos",
    author: "PonceLeones",
    likes: 89,
    comments: 12,
    timestamp: "1 day ago",
  },
];

export const merchandise = [
  {
    id: "merch-1",
    name: "Cangrejeros Jersey Retro",
    price: 65,
    image: "/api/placeholder/300/300",
    category: "jerseys",
    team: "cangrejeros",
    featured: true,
  },
  {
    id: "merch-2",
    name: "BSN Championship Hat",
    price: 25,
    image: "/api/placeholder/300/300",
    category: "accessories",
    league: "bsn",
    featured: false,
  },
  {
    id: "merch-3",
    name: "El Bolitero Tee - Artist Collab",
    price: 35,
    image: "/api/placeholder/300/300",
    category: "apparel",
    limited: true,
    featured: true,
  },
];

export const scoringSystem = {
  basketball: {
    basket: 2,
    threePointer: 3,
    assist: 1,
    rebound: 1,
    steal: 2,
    block: 2,
    mvpBonus: 10,
    doubleDouble: 5,
    tripleDouble: 15,
  },
  volleyball: {
    kill: 3,
    ace: 4,
    block: 2,
    dig: 1,
    assist: 1,
    mvpBonus: 10,
  },
  baseball: {
    hit: 2,
    homeRun: 8,
    rbi: 2,
    run: 2,
    stolenBase: 3,
    strikeout: 1,
    mvpBonus: 10,
  },
};

// Add more players for the enhanced cards
export const additionalPlayers = [
  {
    id: "player-6",
    name: "Roberto Díaz",
    team: "gigantes",
    position: "PG",
    jersey: 11,
    stats: {
      points: 15.9,
      assists: 8.1,
      rebounds: 3.8,
      steals: 2.1,
      blocks: 0.2,
      fieldGoalPercentage: 43.5,
      threePointPercentage: 37.8,
      freeThrowPercentage: 86.7,
      gamesPlayed: 73,
      minutes: 29.4,
    },
    trend: "up",
    hotStreak: false,
    prediction: "Excellent court vision - expect 10+ assists tonight",
    avatar: "https://github.com/polymet-ai.png",
  },
];

// Helper functions
export const getTeamById = (id) => teams.find((team) => team.id === id);
export const getPlayersByTeam = (teamId) =>
  players.filter((player) => player.team === teamId);
export const getLeagueById = (id) => leagues.find((league) => league.id === id);
export const getLiveGamesByLeague = (leagueId) =>
  liveGames.filter((game) => game.league === leagueId);

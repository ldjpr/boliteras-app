// Fantasy League Data for 12-Person Interactive Leagues
export interface FantasyPlayer {
  id: string;
  name: string;
  position: string;
  team: string;
  jersey: number;
  avatar: string;
  stats: {
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    fieldGoalPercentage: number;
  };
  fantasyPoints: number;
  price: number;
  ownership: number; // percentage owned across all leagues
  trend: "up" | "down" | "stable";
  hotStreak: boolean;
  injury: boolean;
  news?: string;
}

export interface LeagueUser {
  id: string;
  username: string;
  avatar: string;
  rank: number;
  totalPoints: number;
  wins: number;
  losses: number;
  winStreak: number;
  achievements: string[];
  badge: string;
  isOnline: boolean;
  lastActive: string;
  favoriteTeam: string;
  level: number;
  xp: number;
  rivalries: string[]; // user IDs of rivals
}

export interface FantasyLineup {
  userId: string;
  players: {
    pg: FantasyPlayer; // Point Guard
    sg: FantasyPlayer; // Shooting Guard
    sf: FantasyPlayer; // Small Forward
    pf: FantasyPlayer; // Power Forward
    c: FantasyPlayer; // Center
  };
  totalSalary: number;
  projectedPoints: number;
  isLocked: boolean;
  lastUpdated: string;
}

export interface WeeklyMatchup {
  id: string;
  week: number;
  user1: LeagueUser;
  user2: LeagueUser;
  user1Score: number;
  user2Score: number;
  status: "upcoming" | "live" | "completed";
  trash_talk: TrashTalk[];
  predictions: Prediction[];
}

export interface TrashTalk {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
  reactions: { emoji: string; count: number; users: string[] }[];
  isGif: boolean;
  gifUrl?: string;
}

export interface Prediction {
  id: string;
  userId: string;
  prediction: string;
  confidence: number; // 1-10
  timestamp: string;
  result?: "correct" | "incorrect";
  points?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  points: number;
  unlockedBy: string[];
}

export interface FantasyLeague {
  id: string;
  name: string;
  users: LeagueUser[];
  currentWeek: number;
  totalWeeks: number;
  season: string;
  prizePool: number;
  entryFee: number;
  lineups: FantasyLineup[];
  matchups: WeeklyMatchup[];
  leaderboard: LeagueUser[];
  draftDate: string;
  playoffWeeks: number[];
  settings: {
    salaryCapEnabled: boolean;
    salaryCap: number;
    tradeDeadline: string;
    playoffTeams: number;
    scoringSystem: "standard" | "ppr" | "custom";
  };
  socialFeed: SocialPost[];
  powerRankings: PowerRanking[];
}

export interface SocialPost {
  id: string;
  userId: string;
  type: "lineup_set" | "trash_talk" | "celebration" | "trade_proposal" | "meme";
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  imageUrl?: string;
  isGif?: boolean;
  mentions: string[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface PowerRanking {
  rank: number;
  userId: string;
  previousRank: number;
  trend: "up" | "down" | "stable";
  reasoning: string;
  strengthOfSchedule: number;
}

// Mock Data
export const fantasyPlayers: FantasyPlayer[] = [
  {
    id: "player-1",
    name: "Carlos Rivera",
    position: "PG",
    team: "Cangrejeros",
    jersey: 1,
    avatar: "https://github.com/yusufhilmi.png",
    stats: {
      points: 18.5,
      rebounds: 4.2,
      assists: 8.1,
      steals: 2.1,
      blocks: 0.3,
      fieldGoalPercentage: 0.485,
    },
    fantasyPoints: 42.8,
    price: 9500,
    ownership: 78,
    trend: "up",
    hotStreak: true,
    injury: false,
    news: "🔥 On a 5-game hot streak with 20+ points each game",
  },
  {
    id: "player-2",
    name: "Miguel Santos",
    position: "C",
    team: "Leones",
    jersey: 33,
    avatar: "https://github.com/kdrnp.png",
    stats: {
      points: 16.8,
      rebounds: 11.2,
      assists: 2.5,
      steals: 0.8,
      blocks: 2.4,
      fieldGoalPercentage: 0.612,
    },
    fantasyPoints: 38.9,
    price: 8800,
    ownership: 65,
    trend: "stable",
    hotStreak: false,
    injury: false,
  },
  {
    id: "player-3",
    name: "José Martínez",
    position: "SF",
    team: "Atenienses",
    jersey: 23,
    avatar: "https://github.com/yahyabedirhan.png",
    stats: {
      points: 22.1,
      rebounds: 6.8,
      assists: 4.2,
      steals: 1.5,
      blocks: 0.9,
      fieldGoalPercentage: 0.478,
    },
    fantasyPoints: 45.2,
    price: 10200,
    ownership: 89,
    trend: "up",
    hotStreak: true,
    injury: false,
    news: "⚡ Leading scorer in the league",
  },
  {
    id: "player-4",
    name: "Luis Vázquez",
    position: "SG",
    team: "Vaqueros",
    jersey: 2,
    avatar: "https://github.com/denizbuyuktas.png",
    stats: {
      points: 19.3,
      rebounds: 3.1,
      assists: 5.7,
      steals: 1.8,
      blocks: 0.2,
      fieldGoalPercentage: 0.441,
    },
    fantasyPoints: 36.4,
    price: 8200,
    ownership: 52,
    trend: "down",
    hotStreak: false,
    injury: true,
    news: "🏥 Day-to-day with ankle sprain",
  },
  {
    id: "player-5",
    name: "Roberto Díaz",
    position: "PF",
    team: "Capitanes",
    jersey: 4,
    avatar: "https://github.com/shoaibux1.png",
    stats: {
      points: 14.6,
      rebounds: 9.8,
      assists: 3.2,
      steals: 1.1,
      blocks: 1.8,
      fieldGoalPercentage: 0.523,
    },
    fantasyPoints: 34.7,
    price: 7600,
    ownership: 43,
    trend: "up",
    hotStreak: false,
    injury: false,
  },
];

export const leagueUsers: LeagueUser[] = [
  {
    id: "user-1",
    username: "ElBoliteroMayor",
    avatar: "https://github.com/yusufhilmi.png",
    rank: 1,
    totalPoints: 1247.8,
    wins: 8,
    losses: 2,
    winStreak: 4,
    achievements: ["hot_streak", "high_scorer", "draft_master"],
    badge: "👑",
    isOnline: true,
    lastActive: "now",
    favoriteTeam: "Cangrejeros",
    level: 15,
    xp: 2847,
    rivalries: ["user-3", "user-7"],
  },
  {
    id: "user-2",
    username: "BoricuaBaller",
    avatar: "https://github.com/kdrnp.png",
    rank: 2,
    totalPoints: 1198.5,
    wins: 7,
    losses: 3,
    winStreak: 2,
    achievements: ["comeback_kid", "trash_talker"],
    badge: "🔥",
    isOnline: true,
    lastActive: "2 min ago",
    favoriteTeam: "Leones",
    level: 12,
    xp: 2156,
    rivalries: ["user-1", "user-4"],
  },
  {
    id: "user-3",
    username: "SanturceStrong",
    avatar: "https://github.com/yahyabedirhan.png",
    rank: 3,
    totalPoints: 1156.2,
    wins: 6,
    losses: 4,
    winStreak: 1,
    achievements: ["underdog", "loyal_fan"],
    badge: "⚡",
    isOnline: false,
    lastActive: "15 min ago",
    favoriteTeam: "Atenienses",
    level: 10,
    xp: 1892,
    rivalries: ["user-1", "user-8"],
  },
  {
    id: "user-4",
    username: "VaquerosNation",
    avatar: "https://github.com/denizbuyuktas.png",
    rank: 4,
    totalPoints: 1134.7,
    wins: 6,
    losses: 4,
    winStreak: 0,
    achievements: ["consistent", "team_player"],
    badge: "🤠",
    isOnline: true,
    lastActive: "now",
    favoriteTeam: "Vaqueros",
    level: 11,
    xp: 2034,
    rivalries: ["user-2", "user-9"],
  },
  {
    id: "user-5",
    username: "CapitanesFan",
    avatar: "https://github.com/shoaibux1.png",
    rank: 5,
    totalPoints: 1089.3,
    wins: 5,
    losses: 5,
    winStreak: 0,
    achievements: ["balanced"],
    badge: "⚓",
    isOnline: false,
    lastActive: "1 hour ago",
    favoriteTeam: "Capitanes",
    level: 9,
    xp: 1567,
    rivalries: ["user-6"],
  },
  // Add 7 more users to make 12 total
  {
    id: "user-6",
    username: "IslaVerde",
    avatar: "https://github.com/polymet-ai.png",
    rank: 6,
    totalPoints: 1067.8,
    wins: 5,
    losses: 5,
    winStreak: 1,
    achievements: ["rookie"],
    badge: "🌴",
    isOnline: true,
    lastActive: "5 min ago",
    favoriteTeam: "Cangrejeros",
    level: 8,
    xp: 1423,
    rivalries: ["user-5"],
  },
  {
    id: "user-7",
    username: "PonceLeones",
    avatar: "https://github.com/yusufhilmi.png",
    rank: 7,
    totalPoints: 1045.2,
    wins: 4,
    losses: 6,
    winStreak: 0,
    achievements: ["fighter"],
    badge: "🦁",
    isOnline: false,
    lastActive: "30 min ago",
    favoriteTeam: "Leones",
    level: 7,
    xp: 1298,
    rivalries: ["user-1"],
  },
  {
    id: "user-8",
    username: "AreciboCapitanes",
    avatar: "https://github.com/kdrnp.png",
    rank: 8,
    totalPoints: 1023.6,
    wins: 4,
    losses: 6,
    winStreak: 0,
    achievements: ["persistent"],
    badge: "🏀",
    isOnline: true,
    lastActive: "now",
    favoriteTeam: "Capitanes",
    level: 6,
    xp: 1156,
    rivalries: ["user-3"],
  },
  {
    id: "user-9",
    username: "BayamonVaqueros",
    avatar: "https://github.com/yahyabedirhan.png",
    rank: 9,
    totalPoints: 998.4,
    wins: 3,
    losses: 7,
    winStreak: 0,
    achievements: ["optimist"],
    badge: "🐎",
    isOnline: false,
    lastActive: "2 hours ago",
    favoriteTeam: "Vaqueros",
    level: 5,
    xp: 987,
    rivalries: ["user-4"],
  },
  {
    id: "user-10",
    username: "GuaynaboMets",
    avatar: "https://github.com/denizbuyuktas.png",
    rank: 10,
    totalPoints: 976.1,
    wins: 3,
    losses: 7,
    winStreak: 0,
    achievements: ["newcomer"],
    badge: "⚾",
    isOnline: true,
    lastActive: "10 min ago",
    favoriteTeam: "Atenienses",
    level: 4,
    xp: 834,
    rivalries: [],
  },
  {
    id: "user-11",
    username: "CarolinaGigantes",
    avatar: "https://github.com/shoaibux1.png",
    rank: 11,
    totalPoints: 954.7,
    wins: 2,
    losses: 8,
    winStreak: 0,
    achievements: ["determined"],
    badge: "🏈",
    isOnline: false,
    lastActive: "4 hours ago",
    favoriteTeam: "Leones",
    level: 3,
    xp: 723,
    rivalries: [],
  },
  {
    id: "user-12",
    username: "MayaguezIndios",
    avatar: "https://github.com/polymet-ai.png",
    rank: 12,
    totalPoints: 932.3,
    wins: 2,
    losses: 8,
    winStreak: 0,
    achievements: ["learning"],
    badge: "🏺",
    isOnline: false,
    lastActive: "6 hours ago",
    favoriteTeam: "Vaqueros",
    level: 2,
    xp: 612,
    rivalries: [],
  },
];

export const achievements: Achievement[] = [
  {
    id: "hot_streak",
    name: "Fuego Boricua",
    description: "Win 4 games in a row",
    icon: "🔥",
    rarity: "rare",
    points: 100,
    unlockedBy: ["user-1"],
  },
  {
    id: "high_scorer",
    name: "Anotador Supremo",
    description: "Score 200+ points in a week",
    icon: "🏀",
    rarity: "epic",
    points: 200,
    unlockedBy: ["user-1"],
  },
  {
    id: "draft_master",
    name: "Maestro del Draft",
    description: "Have 3+ players in top 10 scorers",
    icon: "🎯",
    rarity: "legendary",
    points: 500,
    unlockedBy: ["user-1"],
  },
  {
    id: "comeback_kid",
    name: "El Comeback Kid",
    description: "Win after being down by 50+ points",
    icon: "⚡",
    rarity: "rare",
    points: 150,
    unlockedBy: ["user-2"],
  },
  {
    id: "trash_talker",
    name: "Rey del Trash Talk",
    description: "Send 50+ trash talk messages",
    icon: "💬",
    rarity: "common",
    points: 50,
    unlockedBy: ["user-2"],
  },
];

export const currentWeekMatchups: WeeklyMatchup[] = [
  {
    id: "matchup-1",
    week: 11,
    user1: leagueUsers[0],
    user2: leagueUsers[2],
    user1Score: 156.8,
    user2Score: 142.3,
    status: "live",
    trash_talk: [
      {
        id: "tt-1",
        userId: "user-1",
        message:
          "¡Tu lineup está más frío que el aire acondicionado del Coliseo! 🧊",
        timestamp: "2 hours ago",
        reactions: [
          { emoji: "😂", count: 3, users: ["user-3", "user-4", "user-5"] },
          { emoji: "🔥", count: 1, users: ["user-2"] },
        ],

        isGif: false,
      },
      {
        id: "tt-2",
        userId: "user-3",
        message: "Espérate que mis jugadores apenas están calentando... 🔥",
        timestamp: "1 hour ago",
        reactions: [{ emoji: "💪", count: 2, users: ["user-6", "user-7"] }],

        isGif: false,
      },
    ],

    predictions: [
      {
        id: "pred-1",
        userId: "user-4",
        prediction: "ElBoliteroMayor gana por 20+",
        confidence: 8,
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    id: "matchup-2",
    week: 11,
    user1: leagueUsers[1],
    user2: leagueUsers[3],
    user1Score: 134.2,
    user2Score: 128.7,
    status: "live",
    trash_talk: [
      {
        id: "tt-3",
        userId: "user-2",
        message: "Los Vaqueros van a pastar en mi victoria 🤠",
        timestamp: "30 min ago",
        reactions: [
          {
            emoji: "🤣",
            count: 4,
            users: ["user-1", "user-5", "user-8", "user-9"],
          },
        ],

        isGif: false,
      },
    ],

    predictions: [],
  },
];

export const socialFeed: SocialPost[] = [
  {
    id: "post-1",
    userId: "user-1",
    type: "lineup_set",
    content:
      "🔥 Lineup locked and loaded! Carlos Rivera va a dominar esta semana. ¡Prepárense para la masacre!",
    timestamp: "1 hour ago",
    likes: 8,
    comments: [
      {
        id: "comment-1",
        userId: "user-3",
        content: "Veremos si Rivera puede contra mi defensa 😤",
        timestamp: "45 min ago",
        likes: 2,
      },
    ],

    mentions: [],
  },
  {
    id: "post-2",
    userId: "user-2",
    type: "meme",
    content:
      'Yo: "Solo voy a hacer cambios pequeños"\nTambién yo: *Cambia todo el lineup 5 minutos antes del lock* 😅',
    timestamp: "2 hours ago",
    likes: 15,
    comments: [
      {
        id: "comment-2",
        userId: "user-4",
        content: "JAJAJA esto soy yo SIEMPRE 🤣",
        timestamp: "1 hour ago",
        likes: 3,
      },
    ],

    mentions: [],
  },
  {
    id: "post-3",
    userId: "user-6",
    type: "celebration",
    content:
      "¡PRIMERA VICTORIA DE LA TEMPORADA! 🎉 Gracias Miguel Santos por esos 45 puntos de fantasy. ¡Los Leones rugieron!",
    timestamp: "3 hours ago",
    likes: 12,
    comments: [],
    mentions: [],
  },
];

export const mockFantasyLeague: FantasyLeague = {
  id: "league-boricua-ballers",
  name: "Boricua Ballers Elite",
  users: leagueUsers,
  currentWeek: 11,
  totalWeeks: 16,
  season: "2024",
  prizePool: 1200,
  entryFee: 100,
  lineups: [],
  matchups: currentWeekMatchups,
  leaderboard: leagueUsers.sort((a, b) => b.totalPoints - a.totalPoints),
  draftDate: "2024-01-15",
  playoffWeeks: [14, 15, 16],
  settings: {
    salaryCapEnabled: true,
    salaryCap: 50000,
    tradeDeadline: "2024-03-01",
    playoffTeams: 6,
    scoringSystem: "standard",
  },
  socialFeed,
  powerRankings: [
    {
      rank: 1,
      userId: "user-1",
      previousRank: 1,
      trend: "stable",
      reasoning: "Dominando con lineup consistente y decisiones inteligentes",
      strengthOfSchedule: 7.2,
    },
    {
      rank: 2,
      userId: "user-2",
      previousRank: 3,
      trend: "up",
      reasoning: "Hot streak de 2 semanas, excelente manejo de waivers",
      strengthOfSchedule: 6.8,
    },
    {
      rank: 3,
      userId: "user-3",
      previousRank: 2,
      trend: "down",
      reasoning: "Lesiones clave afectaron el rendimiento reciente",
      strengthOfSchedule: 8.1,
    },
  ],
};

// Helper functions
export const getUserById = (id: string): LeagueUser | undefined => {
  return leagueUsers.find((user) => user.id === id);
};

export const getPlayerById = (id: string): FantasyPlayer | undefined => {
  return fantasyPlayers.find((player) => player.id === id);
};

export const getOnlineUsers = (): LeagueUser[] => {
  return leagueUsers.filter((user) => user.isOnline);
};

export const getUserRivals = (userId: string): LeagueUser[] => {
  const user = getUserById(userId);
  if (!user) return [];
  return user.rivalries
    .map((rivalId) => getUserById(rivalId))
    .filter(Boolean) as LeagueUser[];
};

export const getTopPerformers = (limit: number = 5): FantasyPlayer[] => {
  return fantasyPlayers
    .sort((a, b) => b.fantasyPoints - a.fantasyPoints)
    .slice(0, limit);
};

export const getHotStreakPlayers = (): FantasyPlayer[] => {
  return fantasyPlayers.filter((player) => player.hotStreak);
};

export const getInjuredPlayers = (): FantasyPlayer[] => {
  return fantasyPlayers.filter((player) => player.injury);
};

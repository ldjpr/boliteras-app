import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TrophyIcon,
  FlameIcon,
  MessageCircleIcon,
  UsersIcon,
  BarChart3Icon,
  ZapIcon,
  CrownIcon,
  HeartIcon,
  ShareIcon,
  SendIcon,
  EyeIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  StarIcon,
  ShieldIcon,
  SwordIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockFantasyLeague,
  LeagueUser,
  WeeklyMatchup,
  SocialPost,
  FantasyPlayer,
  getUserById,
  getOnlineUsers,
  getTopPerformers,
  getHotStreakPlayers,
} from "@/polymet/data/fantasy-league-data";

interface FantasyLeagueDashboardProps {
  league?: typeof mockFantasyLeague;
  currentUserId?: string;
}

export default function FantasyLeagueDashboard({
  league = mockFantasyLeague,
  currentUserId = "user-1",
}: FantasyLeagueDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMatchup, setSelectedMatchup] = useState<WeeklyMatchup | null>(
    null
  );
  const [trashTalkMessage, setTrashTalkMessage] = useState("");
  const [liveScores, setLiveScores] = useState<Record<string, number>>({});

  // Simulate live score updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newScores: Record<string, number> = {};
      league.matchups.forEach((matchup) => {
        if (matchup.status === "live") {
          newScores[`${matchup.id}-user1`] =
            matchup.user1Score + Math.random() * 5;
          newScores[`${matchup.id}-user2`] =
            matchup.user2Score + Math.random() * 5;
        }
      });
      setLiveScores(newScores);
    }, 3000);

    return () => clearInterval(interval);
  }, [league.matchups]);

  const currentUser = getUserById(currentUserId);
  const onlineUsers = getOnlineUsers();
  const topPerformers = getTopPerformers(3);
  const hotStreakPlayers = getHotStreakPlayers();

  const getCurrentUserMatchup = () => {
    return league.matchups.find(
      (matchup) =>
        matchup.user1.id === currentUserId || matchup.user2.id === currentUserId
    );
  };

  const currentMatchup = getCurrentUserMatchup();

  const sendTrashTalk = () => {
    if (!trashTalkMessage.trim() || !selectedMatchup) return;

    // In a real app, this would send to backend
    console.log("Sending trash talk:", trashTalkMessage);
    setTrashTalkMessage("");
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUpIcon className="w-4 h-4 text-green-500" />;

      case "down":
        return <TrendingDownIcon className="w-4 h-4 text-red-500" />;

      default:
        return <MinusIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold">{league.name}</h1>
            <p className="text-sm opacity-90">
              Week {league.currentWeek} • ${league.prizePool} Prize Pool
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Your Rank</div>
            <div className="text-2xl font-bold">#{currentUser?.rank}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold">
              {currentUser?.wins}-{currentUser?.losses}
            </div>
            <div className="text-xs opacity-90">Record</div>
          </div>
          <div>
            <div className="text-lg font-bold">
              {currentUser?.totalPoints.toFixed(0)}
            </div>
            <div className="text-xs opacity-90">Total Points</div>
          </div>
          <div>
            <div className="text-lg font-bold flex items-center justify-center gap-1">
              {currentUser?.winStreak > 0 ? (
                <>
                  <FlameIcon className="w-4 h-4" />

                  {currentUser.winStreak}
                </>
              ) : (
                "0"
              )}
            </div>
            <div className="text-xs opacity-90">Win Streak</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 m-2 rounded-lg">
          <TabsTrigger value="overview" className="text-xs">
            <BarChart3Icon className="w-4 h-4 mr-1" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="matchups" className="text-xs">
            <SwordIcon className="w-4 h-4 mr-1" />
            Matchups
          </TabsTrigger>
          <TabsTrigger value="social" className="text-xs">
            <MessageCircleIcon className="w-4 h-4 mr-1" />
            Social
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="text-xs">
            <TrophyIcon className="w-4 h-4 mr-1" />
            Rankings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="p-4 space-y-4">
          {/* Current Matchup */}
          {currentMatchup && (
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Your Live Matchup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentMatchup.user1.avatar} />

                      <AvatarFallback>
                        {currentMatchup.user1.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">
                        {currentMatchup.user1.username}
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        {liveScores[`${currentMatchup.id}-user1`]?.toFixed(1) ||
                          currentMatchup.user1Score}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">VS</div>
                    <Badge variant="destructive" className="text-xs">
                      LIVE
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="font-medium text-sm">
                        {currentMatchup.user2.username}
                      </div>
                      <div className="text-lg font-bold text-purple-600">
                        {liveScores[`${currentMatchup.id}-user2`]?.toFixed(1) ||
                          currentMatchup.user2Score}
                      </div>
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentMatchup.user2.avatar} />

                      <AvatarFallback>
                        {currentMatchup.user2.username[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedMatchup(currentMatchup)}
                >
                  <MessageCircleIcon className="w-4 h-4 mr-2" />
                  Trash Talk ({currentMatchup.trash_talk.length})
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Hot Players */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FlameIcon className="w-4 h-4 text-red-500" />
                Hot Streak Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hotStreakPlayers.slice(0, 3).map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-3 p-2 bg-red-50 rounded-lg"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={player.avatar} />

                      <AvatarFallback>{player.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-600">
                        {player.team} • {player.position}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600 text-sm">
                        {player.fantasyPoints}
                      </div>
                      <div className="text-xs text-gray-500">FP</div>
                    </div>
                    <FlameIcon className="w-4 h-4 text-red-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Online Users */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online Now ({onlineUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {onlineUsers.slice(0, 6).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full"
                  >
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={user.avatar} />

                      <AvatarFallback className="text-xs">
                        {user.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{user.username}</span>
                  </div>
                ))}
                {onlineUsers.length > 6 && (
                  <div className="bg-gray-100 px-2 py-1 rounded-full">
                    <span className="text-xs text-gray-600">
                      +{onlineUsers.length - 6} more
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Matchups Tab */}
        <TabsContent value="matchups" className="p-4 space-y-4">
          {league.matchups.map((matchup) => (
            <Card
              key={matchup.id}
              className={cn(
                "cursor-pointer transition-all",
                matchup.status === "live" && "border-red-200 bg-red-50"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={matchup.user1.avatar} />

                      <AvatarFallback>
                        {matchup.user1.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">
                        {matchup.user1.username}
                      </div>
                      <div className="text-lg font-bold">
                        {liveScores[`${matchup.id}-user1`]?.toFixed(1) ||
                          matchup.user1Score}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">VS</div>
                    {matchup.status === "live" && (
                      <Badge
                        variant="destructive"
                        className="text-xs animate-pulse"
                      >
                        LIVE
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="font-medium text-sm">
                        {matchup.user2.username}
                      </div>
                      <div className="text-lg font-bold">
                        {liveScores[`${matchup.id}-user2`]?.toFixed(1) ||
                          matchup.user2Score}
                      </div>
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={matchup.user2.avatar} />

                      <AvatarFallback>
                        {matchup.user2.username[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>💬 {matchup.trash_talk.length} messages</span>
                  <span>🔮 {matchup.predictions.length} predictions</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedMatchup(matchup)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social" className="p-4 space-y-4">
          {league.socialFeed.map((post) => {
            const author = getUserById(post.userId);
            return (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={author?.avatar} />

                      <AvatarFallback>{author?.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {author?.username}
                        </span>
                        <span>{author?.badge}</span>
                        <span className="text-xs text-gray-500">
                          {post.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4">
                        <Button size="sm" variant="ghost" className="h-8 px-2">
                          <HeartIcon className="w-4 h-4 mr-1" />

                          {post.likes}
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 px-2">
                          <MessageCircleIcon className="w-4 h-4 mr-1" />

                          {post.comments.length}
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 px-2">
                          <ShareIcon className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="p-4 space-y-3">
          {league.leaderboard.map((user, index) => (
            <Card
              key={user.id}
              className={cn(
                "transition-all",
                user.id === currentUserId && "border-blue-200 bg-blue-50"
              )}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="text-center min-w-[24px]">
                    {index === 0 && (
                      <CrownIcon className="w-5 h-5 text-yellow-500 mx-auto" />
                    )}
                    {index > 0 && (
                      <span className="text-sm font-bold text-gray-500">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />

                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {user.username}
                      </span>
                      <span>{user.badge}</span>
                      {user.isOnline && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      {user.totalPoints.toFixed(1)} pts • {user.wins}-
                      {user.losses} • Level {user.level}
                    </div>
                  </div>

                  <div className="text-right">
                    {user.winStreak > 0 && (
                      <div className="flex items-center gap-1 text-red-500">
                        <FlameIcon className="w-3 h-3" />

                        <span className="text-xs font-bold">
                          {user.winStreak}W
                        </span>
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {user.achievements.length} achievements
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Trash Talk Dialog */}
      <Dialog
        open={!!selectedMatchup}
        onOpenChange={() => setSelectedMatchup(null)}
      >
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">Trash Talk Zone 🔥</DialogTitle>
          </DialogHeader>
          {selectedMatchup && (
            <div className="space-y-4">
              {/* Matchup Header */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={selectedMatchup.user1.avatar} />
                  </Avatar>
                  <span className="text-sm font-medium">
                    {selectedMatchup.user1.username}
                  </span>
                </div>
                <span className="text-xs text-gray-500">VS</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {selectedMatchup.user2.username}
                  </span>
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={selectedMatchup.user2.avatar} />
                  </Avatar>
                </div>
              </div>

              {/* Messages */}
              <div className="max-h-40 overflow-y-auto space-y-2">
                {selectedMatchup.trash_talk.map((message) => {
                  const author = getUserById(message.userId);
                  return (
                    <div key={message.id} className="flex gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={author?.avatar} />
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {message.reactions.map((reaction, idx) => (
                            <Button
                              key={idx}
                              size="sm"
                              variant="ghost"
                              className="h-6 px-1"
                            >
                              <span className="text-xs">
                                {reaction.emoji} {reaction.count}
                              </span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Send Message */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Send some trash talk... 🔥"
                  value={trashTalkMessage}
                  onChange={(e) => setTrashTalkMessage(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  onKeyPress={(e) => e.key === "Enter" && sendTrashTalk()}
                />

                <Button size="sm" onClick={sendTrashTalk}>
                  <SendIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

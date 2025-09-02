import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  HeartIcon,
  MessageCircleIcon,
  ShareIcon,
  TrendingUpIcon,
  FlameIcon,
  TrophyIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommunityFeedProps {
  highlights: Array<{
    id: string;
    type: "meme" | "prediction" | "celebration" | "achievement";
    content: string;
    author: string;
    likes: number;
    comments: number;
    timestamp: string;
    avatar?: string;
    badge?: string;
  }>;
  onLike?: (highlightId: string) => void;
  onComment?: (highlightId: string) => void;
  onShare?: (highlightId: string) => void;
  showActions?: boolean;
}

export default function CommunityFeed({
  highlights,
  onLike,
  onComment,
  onShare,
  showActions = true,
}: CommunityFeedProps) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (highlightId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(highlightId)) {
        newSet.delete(highlightId);
      } else {
        newSet.add(highlightId);
      }
      return newSet;
    });
    onLike?.(highlightId);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meme":
        return "😂";
      case "prediction":
        return "🔮";
      case "celebration":
        return "🎉";
      case "achievement":
        return "🏆";
      default:
        return "💬";
    }
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      meme: { label: "Meme", color: "bg-purple-100 text-purple-800" },
      prediction: { label: "Predicción", color: "bg-blue-100 text-blue-800" },
      celebration: {
        label: "Celebración",
        color: "bg-green-100 text-green-800",
      },
      achievement: { label: "Logro", color: "bg-yellow-100 text-yellow-800" },
    };

    const badge = badges[type as keyof typeof badges] || badges.meme;
    return (
      <Badge className={cn("text-xs", badge.color)}>
        {getTypeIcon(type)} {badge.label}
      </Badge>
    );
  };

  const getAvatarFallback = (author: string) => {
    return author
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4">
      {highlights.map((highlight) => (
        <Card
          key={highlight.id}
          className="hover:shadow-md transition-shadow duration-200"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={
                      highlight.avatar ||
                      `https://github.com/${highlight.author.toLowerCase().replace(/\s+/g, "")}.png`
                    }
                    alt={highlight.author}
                  />

                  <AvatarFallback className="bg-blue-500 text-white text-sm">
                    {getAvatarFallback(highlight.author)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {highlight.author}
                    </h3>
                    {highlight.badge && (
                      <span className="text-lg" title="User Badge">
                        {highlight.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeBadge(highlight.type)}
                    <span className="text-xs text-gray-500">
                      {highlight.timestamp}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Content */}
            <div className="mb-4">
              <p className="text-gray-800 leading-relaxed">
                {highlight.content}
              </p>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <HeartIcon className="w-4 h-4" />

                  {highlight.likes + (likedPosts.has(highlight.id) ? 1 : 0)}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircleIcon className="w-4 h-4" />

                  {highlight.comments}
                </span>
              </div>

              {/* Action Buttons */}
              {showActions && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 px-3 text-xs",
                      likedPosts.has(highlight.id)
                        ? "text-red-600 hover:text-red-700"
                        : "text-gray-600 hover:text-red-600"
                    )}
                    onClick={() => handleLike(highlight.id)}
                  >
                    <HeartIcon
                      className={cn(
                        "w-4 h-4 mr-1",
                        likedPosts.has(highlight.id) && "fill-current"
                      )}
                    />
                    Me gusta
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs text-gray-600 hover:text-blue-600"
                    onClick={() => onComment?.(highlight.id)}
                  >
                    <MessageCircleIcon className="w-4 h-4 mr-1" />
                    Comentar
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs text-gray-600 hover:text-green-600"
                    onClick={() => onShare?.(highlight.id)}
                  >
                    <ShareIcon className="w-4 h-4 mr-1" />
                    Compartir
                  </Button>
                </div>
              )}
            </div>

            {/* Special Effects for Hot Posts */}
            {highlight.likes > 200 && (
              <div className="mt-3 p-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 text-sm text-orange-700">
                  <FlameIcon className="w-4 h-4" />

                  <span className="font-medium">¡Post en fuego!</span>
                  <TrendingUpIcon className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Achievement Highlight */}
            {highlight.type === "achievement" && (
              <div className="mt-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 text-sm text-yellow-800">
                  <TrophyIcon className="w-5 h-5 text-yellow-600" />

                  <span className="font-medium">
                    ¡Nuevo logro desbloqueado!
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

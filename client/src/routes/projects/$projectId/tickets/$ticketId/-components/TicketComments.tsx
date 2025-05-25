import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useTicketDetails } from "./useTicketDetails";

export function TicketComments() {
  const [newComment, setNewComment] = useState("");

  const { comments, addComment, isAddingComment } = useTicketDetails();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      addComment(newComment.trim());
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Comments ({comments?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        <div className="space-y-3">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isAddingComment}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isAddingComment ? "Adding..." : "Add Comment"}
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {!comments || comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No comments yet</p>
              <p className="text-sm">Be the first to add a comment</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 p-4 bg-muted/50 rounded-lg"
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="text-xs">
                    {getUserInitials(comment.author.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">
                      {comment.author.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </Badge>
                  </div>

                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

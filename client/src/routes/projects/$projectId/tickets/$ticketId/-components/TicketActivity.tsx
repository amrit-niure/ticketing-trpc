import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Activity,
  Edit,
  MessageSquare,
  Paperclip,
  UserPlus,
  UserMinus,
  AlertCircle,
  Clock,
  Plus,
  Trash2,
  ArrowUpDown,
  X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { ActivityLog } from "@/lib/api";

interface TicketActivityProps {
  activities: ActivityLog[];
}

export function TicketActivity({ activities }: TicketActivityProps) {
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const getActivityIcon = (action: string) => {
    switch (action) {
      case "CREATED":
        return Plus;
      case "STATUS_CHANGED":
        return AlertCircle;
      case "PRIORITY_CHANGED":
        return ArrowUpDown;
      case "ASSIGNED":
        return UserPlus;
      case "UNASSIGNED":
        return UserMinus;
      case "COMMENT_ADDED":
        return MessageSquare;
      case "ATTACHMENT_ADDED":
        return Paperclip;
      case "ATTACHMENT_DELETED":
        return Trash2;
      case "UPDATED":
        return Edit;
      case "DELETED":
        return X;
      default:
        return Activity;
    }
  };

  const getActivityColor = (action: string) => {
    switch (action) {
      case "CREATED":
        return "text-emerald-600";
      case "STATUS_CHANGED":
        return "text-orange-600";
      case "PRIORITY_CHANGED":
        return "text-yellow-600";
      case "ASSIGNED":
        return "text-green-600";
      case "UNASSIGNED":
        return "text-red-600";
      case "COMMENT_ADDED":
        return "text-blue-600";
      case "ATTACHMENT_ADDED":
        return "text-purple-600";
      case "ATTACHMENT_DELETED":
        return "text-red-500";
      case "UPDATED":
        return "";
      case "DELETED":
        return "text-red-700";
      default:
        return "";
    }
  };
  const getActivityLabel = (action: string) => {
    switch (action) {
      case "CREATED":
        return "created this ticket";
      case "STATUS_CHANGED":
        return "changed the status";
      case "PRIORITY_CHANGED":
        return "changed the priority";
      case "ASSIGNED":
        return "assigned the ticket";
      case "UNASSIGNED":
        return "unassigned the ticket";
      case "COMMENT_ADDED":
        return "added a comment";
      case "ATTACHMENT_ADDED":
        return "added an attachment";
      case "ATTACHMENT_DELETED":
        return "deleted an attachment";
      case "UPDATED":
        return "updated the ticket";
      case "DELETED":
        return "deleted this ticket";
      default:
        return "performed an action";
    }
  };

  const formatActivityDescription = (activity: ActivityLog) => {
    const baseLabel = getActivityLabel(activity.action);

    if (activity.details) {
      // Extract meaningful information from details
      if (
        activity.action === "STATUS_CHANGED" ||
        activity.action === "PRIORITY_CHANGED"
      ) {
        return (
          <span>
            {baseLabel}: <strong>{activity.details.split(" to ")[1]}</strong>
          </span>
        );
      } else if (
        activity.action === "ASSIGNED" ||
        activity.action === "UNASSIGNED"
      ) {
        return (
          <span>
            {baseLabel}:{" "}
            <strong>
              {activity.details.split(" to ")[1] ||
                activity.details.split(" from ")[1]}
            </strong>
          </span>
        );
      } else if (
        activity.action === "ATTACHMENT_ADDED" ||
        activity.action === "ATTACHMENT_DELETED"
      ) {
        const fileName = activity.details.match(
          /File (.*?) (?:uploaded|deleted)/
        )?.[1];
        return (
          <span>
            {baseLabel}: <strong>{fileName}</strong>
          </span>
        );
      }
    }

    return <span>{baseLabel}</span>;
  };

  // Sort activities by date (newest first)
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Activity ({activities.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No activity yet</p>
            <p className="text-sm">
              Activity will appear here as changes are made
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {" "}
            {sortedActivities.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.action);
              const iconColor = getActivityColor(activity.action);
              const isLast = index === sortedActivities.length - 1;

              return (
                <div key={activity.id} className="relative">
                  {/* Timeline line */}
                  {!isLast && (
                    <div className="absolute left-4 top-8 w-px h-full bg-border" />
                  )}

                  <div className="flex gap-3">
                    {/* Activity icon */}
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center ${iconColor}`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Activity content */}
                    <div className="flex-1 space-y-1 pb-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {getUserInitials(activity.user.name)}
                          </AvatarFallback>
                        </Avatar>

                        <span className="font-medium text-sm">
                          {activity.user.name}
                        </span>

                        <span className="text-sm text-muted-foreground">
                          {formatActivityDescription(activity)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground ml-8">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(activity.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

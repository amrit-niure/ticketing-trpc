import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTicketDetails } from "./useTicketDetails";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { TicketHeader } from "./TicketHeader";
import { TicketDetailsForm } from "./TicketDetailsForm";
import { TicketComments } from "./TicketComments";
import { TicketAttachments } from "./TicketAttachments";
import { TicketActivity } from "./TicketActivity";

export function TicketDetailsPage() {
  const { projectId } = useParams({
    from: "/projects/$projectId/tickets/$ticketId/",
  });
  const [activeTab, setActiveTab] = useState("details");
  const {
    ticket,
    users,
    comments,
    attachments,
    activityLogs,
    isLoading,
    isError,
    error,
    isEditing,
    setIsEditing,
    updateTicket,
    deleteTicket,
    refetch,
    isUpdating,
    isDeleting,
    updateError,
  } = useTicketDetails();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !ticket) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <TicketHeader
        ticket={ticket}
        projectId={projectId}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        onDelete={deleteTicket}
        isDeleting={isDeleting}
      />

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="comments">
                  Comments ({comments?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="attachments">
                  Attachments ({attachments?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="activity">
                  Activity ({activityLogs?.length || 0})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-6">
                <TicketDetailsForm
                  ticket={ticket}
                  users={users || []}
                  isEditing={isEditing}
                  onUpdate={(data: any) => updateTicket(data)}
                  isUpdating={isUpdating}
                  updateError={updateError}
                />
              </TabsContent>{" "}
              <TabsContent value="comments">
                <TicketComments />
              </TabsContent>
              <TabsContent value="attachments">
                <TicketAttachments />
              </TabsContent>
              <TabsContent value="activity">
                <TicketActivity activities={activityLogs || []} />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

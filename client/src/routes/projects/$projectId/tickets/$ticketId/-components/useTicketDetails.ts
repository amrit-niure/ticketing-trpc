import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { ticketsAPI, usersAPI, type Ticket, type User, type Comment, type Attachment, type ActivityLog } from "@/lib/api";

export function useTicketDetails() {
    const { projectId, ticketId } = useParams({ from: "/projects/$projectId/tickets/$ticketId/" });
    const [isEditing, setIsEditing] = useState(false);
    const queryClient = useQueryClient();

    // Fetch ticket details
    const {
        data: ticket,
        isLoading: isTicketLoading,
        isError: isTicketError,
        error: ticketError,
        refetch: refetchTicket,
    } = useQuery<Ticket>({
        queryKey: ["ticket", ticketId],
        queryFn: () => ticketsAPI.getById(ticketId),
        enabled: !!ticketId,
    });

    // Fetch users for assignee dropdown
    const {
        data: users,
        isLoading: isUsersLoading,
    } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => usersAPI.getAll(),
    });

    // Fetch comments
    const {
        data: comments,
        isLoading: isCommentsLoading,
    } = useQuery<Comment[]>({
        queryKey: ["comments", ticketId],
        queryFn: () => ticketsAPI.getComments(ticketId),
        enabled: !!ticketId,
    });

    // Fetch attachments
    const {
        data: attachments,
        isLoading: isAttachmentsLoading,
    } = useQuery<Attachment[]>({
        queryKey: ["attachments", ticketId],
        queryFn: () => ticketsAPI.getAttachments(ticketId),
        enabled: !!ticketId,
    });

    // Fetch activity logs
    const {
        data: activityLogs,
        isLoading: isActivityLoading,
    } = useQuery<ActivityLog[]>({
        queryKey: ["activity", ticketId],
        queryFn: () => ticketsAPI.getActivityLogs(ticketId),
        enabled: !!ticketId,
    });    // Update ticket mutation
    const updateTicketMutation = useMutation({
        mutationFn: (data: Partial<Ticket>) => ticketsAPI.update(ticketId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
            queryClient.invalidateQueries({ queryKey: ["tickets", projectId] });
            queryClient.invalidateQueries({ queryKey: ["activity", ticketId] });
            setIsEditing(false);
        },
    });// Add comment mutation
    const addCommentMutation = useMutation({
        mutationFn: (content: string) => ticketsAPI.addComment(ticketId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", ticketId] });
            queryClient.invalidateQueries({ queryKey: ["activity", ticketId] });
        },
    });    // Add attachment mutation
    const addAttachmentMutation = useMutation({
        mutationFn: (file: File) => ticketsAPI.uploadAttachment(ticketId, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attachments", ticketId] });
            queryClient.invalidateQueries({ queryKey: ["activity", ticketId] });
        },
    });

    // Delete attachment mutation
    const deleteAttachmentMutation = useMutation({
        mutationFn: (attachmentId: string) => ticketsAPI.deleteAttachment(ticketId, attachmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attachments", ticketId] });
            queryClient.invalidateQueries({ queryKey: ["activity", ticketId] });
        },
    });

    // Delete ticket mutation
    const deleteTicketMutation = useMutation({
        mutationFn: () => ticketsAPI.delete(ticketId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets", projectId] });
        },
    });

    const updateTicket = (data: Partial<Ticket>) => {
        updateTicketMutation.mutate(data);
    };

    const addComment = (content: string) => {
        addCommentMutation.mutate(content);
    }; const addAttachment = (file: File) => {
        addAttachmentMutation.mutate(file);
    };

    const deleteAttachment = (attachmentId: string) => {
        deleteAttachmentMutation.mutate(attachmentId);
    };

    const deleteTicket = () => {
        deleteTicketMutation.mutate();
    }; return {
        // Data
        ticket,
        users,
        comments,
        attachments,
        activityLogs,
        projectId,
        ticketId,

        // Loading states
        isLoading: isTicketLoading || isUsersLoading,
        isError: isTicketError,
        error: ticketError,
        isCommentsLoading,
        isAttachmentsLoading,
        isActivityLoading,

        // Edit state
        isEditing,
        setIsEditing,

        // Actions
        updateTicket,
        addComment,
        addAttachment,
        deleteAttachment,
        deleteTicket,
        refetch: refetchTicket,

        // Mutation states
        isUpdating: updateTicketMutation.isPending,
        isAddingComment: addCommentMutation.isPending,
        isAddingAttachment: addAttachmentMutation.isPending,
        isDeletingAttachment: deleteAttachmentMutation.isPending,
        isDeleting: deleteTicketMutation.isPending,

        // Errors
        updateError: updateTicketMutation.error,
        commentError: addCommentMutation.error,
        attachmentError: addAttachmentMutation.error,
        deleteAttachmentError: deleteAttachmentMutation.error,
        deleteError: deleteTicketMutation.error,
    };
}

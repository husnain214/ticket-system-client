import type {
  AgentTaskStatus,
  AgentType,
  EscalationStatus,
  EventType,
  TicketCategory,
  TicketPriority,
  TicketStatus,
  UserRole,
} from "./enums";

export interface User {
  id: string;
  email: string;
  isActive: boolean;
  isSuperuser: boolean;
  isVerified: boolean;

  role: UserRole;
  createdAt: string;

  apiTokens: ApiToken[];
  assignedEscalations: Escalation[];
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;

  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;

  agentTasks: AgentTask[];
  events: TicketEvent[];
  escalation: Escalation | null;
}

export interface TicketFilters {
  status: TicketStatus | null;
  category: TicketCategory | null;
}

export interface TicketEvent {
  id: string;
  ticketId: string;
  eventType: EventType;
  message: string | null;
  createdAt: string;

  ticket?: Ticket;
}

export interface Escalation {
  id: string;
  ticketId: string;
  assignedTo: string | null;
  escalatedByAgent: string | null;
  reason: string | null;
  status: EscalationStatus;

  createdAt: string;
  resolvedAt: string | null;

  ticket?: Ticket;
  assignedToUser?: User | null;
}

export interface AgentTask {
  id: string;
  ticketId: string;
  agentType: AgentType;
  status: AgentTaskStatus;
  result: string | null;

  startedAt: string | null;
  completedAt: string | null;

  ticket?: Ticket;
}

export interface ApiToken {
  id: string;
  createdBy: string;
  tokenHash: string;
  label: string | null;

  expiresAt: string;
  lastUsedAt: string | null;

  createdByUser?: User;
}

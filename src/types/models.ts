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
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;

  role: UserRole;
  createdAt: string;

  api_tokens: ApiToken[];
  assigned_escalations: Escalation[];
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;

  created_at: string;
  updated_at: string;
  resolved_at: string | null;

  agent_tasks: AgentTask[];
  events: TicketEvent[];
  escalation: Escalation | null;
}

export interface TicketFilters {
  status: TicketStatus | null;
  category: TicketCategory | null;
}

export interface TicketEvent {
  id: string;
  ticket_id: string;
  event_type: EventType;
  message: string | null;
  created_at: string;

  ticket?: Ticket;
}

export interface Escalation {
  id: string;
  ticket_id: string;
  assigned_to: string | null;
  escalated_by_agent: string | null;
  reason: string | null;
  status: EscalationStatus;

  created_at: string;
  resolved_at: string | null;

  ticket?: Ticket;
  assigned_to_user?: User | null;
}

export interface AgentTask {
  id: string;
  ticket_id: string;
  agent_type: AgentType;
  status: AgentTaskStatus;
  result: string | null;

  started_at: string | null;
  completed_at: string | null;

  ticket?: Ticket;
}

export interface ApiToken {
  id: string;
  created_by: string;
  token_hash: string;
  label: string | null;

  expires_at: string;
  last_used_at: string | null;

  created_by_user?: User;
}

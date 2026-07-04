export enum UserRole {
  ADMIN = "admin",
  OPERATOR = "operator",
}

export enum TicketStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  RESOLVED = "resolved",
  ESCALATED = "escalated",
  CLOSED = "closed",
}

export enum TicketCategory {
  BILLING = "billing",
  TECHNICAL = "technical",
  GENERAL = "general",
}

export enum TicketPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum AgentType {
  ORCHESTRATOR = "orchestrator_agent",
  BILLING_AGENT = "billing_agent",
  TECH_AGENT = "tech_agent",
  ESCALATION_AGENT = "escalation_agent",
}

export enum AgentTaskStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum EscalationStatus {
  OPEN = "open",
  ASSIGNED = "assigned",
  RESOLVED = "resolved",
}

export enum EventType {
  CREATED = "created",
  ROUTED = "routed",
  AGENT_STARTED = "agent_started",
  AGENT_RESOLVED = "agent_resolved",
  ESCALATED = "escalated",
  ASSIGNED = "assigned",
  CLOSED = "closed",
}

import { api } from "@/lib/axios";
import type { CreateTicketType } from "@/lib/zod/tickets.schemas";

async function fetchTickets(status: string | null, category: string | null) {
  try {
    const { data } = await api.get("/tickets", {
      params: {
        ...(category && { category }),
        ...(status && { status }),
      },
    });

    return data;
  } catch {
    throw new Error("Something went wrong");
  }
}

async function fetchTicketById(ticketId: string) {
  try {
    const { data } = await api.get(`/tickets/${ticketId}`);
    return data;
  } catch {
    throw new Error("Something went wrong");
  }
}

async function fetchAnalytics() {
  try {
    const { data } = await api.get("/analytics");
    return data;
  } catch {
    throw new Error("Something went wrong");
  }
}

async function createTicket(formData: CreateTicketType) {
  try {
    const response = await api.post("/tickets", formData);
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export { fetchTickets, fetchAnalytics, fetchTicketById, createTicket };

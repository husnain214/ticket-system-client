import { config } from "@/lib/config";

async function fetchTickets(status: string | null, category: string | null) {
  const queryParams = new URLSearchParams({
    ...(category && { category }),
    ...(status && { status }),
  }).toString();

  const response = await fetch(`${config.apiUrl}/tickets?${queryParams}`);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
}

async function fetchTicketById(ticketId: string) {
  const response = await fetch(`${config.apiUrl}/tickets/${ticketId}`);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
}

async function fetchAnalytics() {
  const response = await fetch(`${config.apiUrl}/analytics`);

  if (!response.ok) throw new Error("Something went wrong");
  return response.json();
}

export { fetchTickets, fetchAnalytics, fetchTicketById };

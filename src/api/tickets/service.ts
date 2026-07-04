import { config } from "../config";

async function fetchTickets(category: string | null, status: string | null) {
  const queryParams = new URLSearchParams({
    ...(category && { category }),
    ...(status && { status }),
  }).toString();

  const response = await fetch(`${config.apiUrl}/tickets?${queryParams}`);

  if (!response.ok) throw new Error("Something went wrong");
  return response.json();
}

export { fetchTickets };

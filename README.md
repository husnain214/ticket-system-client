# Ticket Resolution Engine — Dashboard

Real-time operations dashboard for monitoring AI-automated ticket resolution. Connects to the FastAPI backend via REST and WebSocket for live visibility into agent activity, ticket status, and escalations.

**Backend repo:** [ticket-system-api](https://github.com/yourname/ticket-system-api) · **Live:** https://your-cloudfront-url.com

---

## Features

- Live ticket feed with instant status updates via WebSocket — no polling
- Agent resolution details, escalation reasons, and full event timeline per ticket
- Metrics bar showing total tickets, resolution rate, escalations, and queue depth
- Filter tickets by status and category
- Role-based UI — admin controls hidden from operators
- Persistent JWT authentication with session rehydration on refresh
- Suspense-driven loading with skeleton screens
- Toast notifications when agents resolve or escalate tickets
- Auto-reconnecting WebSocket with live connection indicator

---

## Stack

React · TypeScript · TanStack Router · TanStack Query · Tailwind CSS v4 · React Hook Form · Zod · Lucide React · Sonner · Docker · Nginx · GitHub Actions · AWS S3 · AWS CloudFront

---

## Local setup

### Prerequisites

- Node 20+
- Backend API running at `http://localhost:8000`

### 1. Clone and install

```bash
git clone https://github.com/yourname/ticket-system-dashboard
cd ticket-system-dashboard
npm install
```

### 2. Configure environment

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

### 3. Start the dev server

```bash
npm run dev
```

Opens at `http://localhost:5173`

---

## Docker

```bash
# build with env vars
docker build \
  --build-arg VITE_API_URL=http://localhost:8000 \
  --build-arg VITE_WS_URL=ws://localhost:8000 \
  -t ticket-dashboard .

# run
docker run -p 3000:80 ticket-dashboard
```

---

## Project structure

```
src/
├── api/
│   ├── auth/
│   │   ├── auth.service.ts       # login, register, forgot/reset password
│   │   └── auth.queries.ts       # useLogin, useLogout, useCurrentUser
│   ├── tickets/
│   │   ├── tickets.service.ts    # fetch functions
│   │   ├── tickets.queries.ts    # useTickets, useTicket
│   │   └── tickets.mutations.ts  # useCreateTicket
│   └── users/
│       └── users.service.ts      # getCurrentUser
├── components/
│   ├── ui/                       # Badge, Button, Input, Sidebar, AuthCard
│   ├── dashboard/                # Metrics, FilterTabs, TicketCard, TicketSidebar
│   └── errors/                   # ServerError, NotFound
├── hooks/
│   └── useWebSocket.ts
├── lib/
│   ├── api.ts                    # apiFetch wrapper
│   ├── config.ts                 # env vars
│   └── constants.ts              # TOKEN_KEY
├── providers/
│   ├── auth-provider.tsx         # auth guard + user initialization
│   └── websocket-provider.tsx    # WebSocket connection + cache updates
├── routes/
│   ├── __root.tsx
│   ├── _app/
│   │   ├── route.tsx             # authenticated layout + header
│   │   └── index.tsx             # dashboard page
│   └── _auth/
│       ├── login.tsx
│       ├── signup.tsx
│       ├── forgot-password.tsx
│       ├── verify-email.tsx
│       └── reset-password.tsx
├── types/
│   ├── enums.ts
│   └── models.ts
└── stores/
    └── auth.store.ts
```

---

## Route structure

| URL                         | Page               | Auth required |
| --------------------------- | ------------------ | ------------- |
| `/`                         | Dashboard          | Yes           |
| `/login`                    | Login              | No            |
| `/signup`                   | Sign up            | No            |
| `/forgot-password`          | Forgot password    | No            |
| `/verify-email?token=...`   | Email verification | No            |
| `/reset-password?token=...` | Reset password     | No            |

---

## Authentication flow

```
App loads
  → check localStorage for token
  → token exists → fetch /users/me → render dashboard
  → token missing → redirect to /login
  → token expired → clear token → redirect to /login
```

---

## Real-time updates

WebSocket connects on authenticated layout mount. When an agent resolves or escalates a ticket:

1. Ticket status updates instantly in the dashboard grid via React Query cache patch
2. Toast notification appears with agent type and resolution preview
3. Individual ticket query invalidated so detail sidebar shows fresh data

---

## CI/CD

GitHub Actions pipeline on push to `main`:

```
test (tsc + eslint + build check) → build → sync to S3 → invalidate CloudFront
```

Deployments are blocked if type checks or linting fail.

---

## Deployment

Frontend is built as a static React app and served globally via AWS CloudFront with S3 as the origin.

```
GitHub → S3 (static files) → CloudFront (CDN + HTTPS)
```

`index.html` is served with `no-cache` headers so users always get the latest deployment. All other assets are cached for 1 year with immutable headers.

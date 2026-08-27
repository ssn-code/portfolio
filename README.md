# SSN Portfolio Monorepo

This repository contains the complete portfolio codebase organized as a clean npm workspaces monorepo:
* **`frontend/`**: The React + TypeScript client SPA styled with Tailwind CSS.
* **`backend/`**: A Node.js + Express backend service in TypeScript that handles secure contact submissions, rate-limits requests, persists message transactions to Neon PostgreSQL, and dispatches email notifications via Resend.

---

## Technical Stack
* **Frontend:** React, TypeScript, Vite, Framer Motion, Lucide Icons
* **Backend:** Node.js, Express, TypeScript, Zod, tsx, express-rate-limit
* **Database:** Neon PostgreSQL (using node-postgres `pg`)
* **Email Broker:** Resend Node.js SDK

---

## Neon PostgreSQL & Resend Integration Setup

### 1. Database Setup (Neon)
1. Register/Login to [Neon Console](https://neon.tech/).
2. Create a new PostgreSQL project.
3. Copy the database connection string from the Neon dashboard (e.g., `postgresql://user:password@subdomain.neon.tech/neondb?sslmode=require`).
4. Execute the schema queries defined in [backend/schema.sql](file:///d:/projects/portfolio/backend/schema.sql) in your Neon SQL editor to build the target table:
   ```sql
   CREATE TABLE contact_messages (
       id SERIAL PRIMARY KEY,
       name VARCHAR(80) NOT NULL,
       email VARCHAR(320) NOT NULL,
       role VARCHAR(120),
       message TEXT NOT NULL,
       status VARCHAR(20) NOT NULL DEFAULT 'new',
       created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );
   ```

### 2. Email Setup (Resend)
1. Sign up for a [Resend](https://resend.com/) account.
2. Obtain your **Resend API Key** from the developer dashboard.
3. Verify your domain on Resend (or use `onboarding@resend.dev` as a testing fallback sender if using the sandbox account).

---

## Local Environment Configuration

### Backend Setup
1. Create a `.env` file in the `backend/` directory using the variables outlined in [`backend/.env.example`](file:///d:/projects/portfolio/backend/.env.example):
   ```env
   PORT=5000
   DATABASE_URL=postgresql://your_neon_connection_string
   RESEND_API_KEY=re_your_resend_api_key
   CONTACT_EMAIL=your-email@example.com
   RESEND_FROM_EMAIL=portfolio@yourverifieddomain.com
   FRONTEND_ORIGIN=http://localhost:3000
   ```

### Frontend Setup
1. Create a `.env` file in the `frontend/` directory using the variables outlined in [`frontend/.env.example`](file:///d:/projects/portfolio/frontend/.env.example):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

---

## Running the Application Locally

1. **Install workspace dependencies:**
   Run the installation command in the root folder:
   ```bash
   npm install
   ```

2. **Start both services in development:**
   Run the dev command from the root workspace:
   ```bash
   npm run dev
   ```
   This will concurrently boot:
   * **Frontend:** [http://localhost:3000](http://localhost:3000)
   * **Backend:** [http://localhost:5000](http://localhost:5000)

3. **Verify backend status:**
   Verify connection health via: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## Testing the Contact System
1. Go to the contact section at the bottom of the page.
2. Fill out the **Name**, **Email**, **Role** (optional), and **Message** inputs.
3. Click **Transmit Message**.
4. Confirm successful transmission is displayed. Check your configured Neon PostgreSQL database table (`contact_messages`) to verify the row is created and your inbox (`CONTACT_EMAIL`) for the HTML notification message.
5. Submit another query immediately to verify that the **Rate Limiter** correctly returns an HTTP 429 error and blocks spam.

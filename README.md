# NeuroFit AI

A React/Next.js web app that allows users to generate personalized fitness programs via voice interaction with an AI assistant powered by Vapi. Uses Clerk for authentication and Convex for backend services.

---

## Features

* Voice conversation with AI assistant (NeuroFit AI)
* Real-time message transcription
* Personalized fitness program generation
* User authentication with Clerk
* Smooth UI with Tailwind CSS

---

## Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS
* **AI Workflow:** Vapi
* **Authentication:** Clerk
* **Backend:** Convex

---

## Prerequisites

* Node.js >= 18
* npm or yarn
* Vapi account & workflow setup
* Clerk account & API keys
* Convex project & deployment

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/xavierzaidane/neurofit-ai.git
cd neurofit-ai
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vapi
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key

# Convex
CONVEX_DEPLOYMENT=dev:oceanic-snail-89
NEXT_PUBLIC_CONVEX_URL=https://oceanic-snail-89.convex.cloud
```

> Replace all keys with your actual credentials.

---

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 5. Build for production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

## Usage

1. Sign up or log in via Clerk.
2. Go to **Generate Program** page.
3. Click **Start Call** to interact with the AI assistant.
4. Speak to NeuroFit AI to create your personalized fitness program.
5. Messages and AI responses appear in the chat container.
6. When the call ends, you'll be redirected to your profile page automatically.

---



## Environment Variable Reference

| Variable                            | Description                 |
| ----------------------------------- | --------------------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend key          |
| `CLERK_SECRET_KEY`                  | Clerk backend key           |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`     | Sign-in route               |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL`     | Sign-up route               |
| `NEXT_PUBLIC_VAPI_WORKFLOW_ID`      | Vapi workflow ID            |
| `NEXT_PUBLIC_VAPI_API_KEY`          | Vapi API key                |
| `CONVEX_DEPLOYMENT`                 | Convex deployment reference |
| `NEXT_PUBLIC_CONVEX_URL`            | Convex endpoint             |

---


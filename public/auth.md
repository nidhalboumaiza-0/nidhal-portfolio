# Nidhal BOUMAIZA Portfolio auth.md

## Overview
This document specifies authentication policies, machine-readable interfaces, and agent authorization procedures for **Nidhal BOUMAIZA's Portfolio and Candidate API**.

- **Host**: `https://nidhal-portfolio.vercel.app`
- **Audience**: AI Agents, LLM crawlers, automated recruitment evaluation systems, and developer indexing bots.
- **Resource Identifier**: `https://nidhal-portfolio.vercel.app/api`

---

## Public Access Policy (Zero-Auth)
All standard portfolio data is open and freely accessible without authentication:
- **Candidate Profile**: `GET /api/profile` (JSON)
- **Projects & Production Apps**: `GET /api/projects` (JSON)
- **Internships & Experience**: `GET /api/experience` (JSON)
- **API Catalog**: `GET /.well-known/api-catalog` (linkset+json)
- **ARD Capability Manifest**: `GET /.well-known/ai-catalog.json` (JSON)
- **MCP Server Card**: `GET /.well-known/mcp/server-card.json` (JSON)
- **Agent Skills Discovery**: `GET /.well-known/agent-skills/index.json` (JSON)
- **Curriculum Vitae (PDF)**:
  - English Modern: `/NIDHAL_BOUMAIZA_CV_EN.pdf`
  - French Modern: `/NIDHAL_BOUMAIZA_CV_FR.pdf`
  - English Classic: `/NIDHAL_BOUMAIZA_CV_CLASSIC_EN.pdf`
  - French Classic: `/NIDHAL_BOUMAIZA_CV_CLASSIC_FR.pdf`

---

## Agent Registration & Scopes
Autonomous agents sending automated recruitment inquiries or scheduling interviews may register or assert identity:
- **Registration Endpoint**: `POST /api/agents/register`
- **Supported Identity Types**: `identity_assertion`, `bearer`, `anonymous`
- **Credential Types**: `bearer_token`, `api_key`
- **Supported Scopes**:
  - `read:profile`: Access detailed candidate metadata and resume links.
  - `read:projects`: Access project breakdown and store links.
  - `contact:send`: Submit automated recruitment inquiries or interview invitations to Nidhal.

---

## Metadata Endpoints
- **OAuth Protected Resource Metadata (PRM)**: `/.well-known/oauth-protected-resource` (RFC 9728)
- **OAuth 2.0 Authorization Server**: `/.well-known/oauth-authorization-server` (RFC 8414)
- **OpenID Connect Discovery**: `/.well-known/openid-configuration`
- **Message Signatures Directory (Web Bot Auth)**: `/.well-known/http-message-signatures-directory`

<img src="./.github/screenshots/header.png#gh-light-mode-only" width="100%" alt="Header light mode"/>
<img src="./.github/screenshots/header-dark.png#gh-dark-mode-only" width="100%" alt="Header dark mode"/>

___

# Conviq

The modern customer support platform, an open-source alternative to Intercom, Zendesk, Salesforce Service Cloud etc.

<p>
  <img src="https://img.shields.io/circleci/build/github/ridloabelian/conviq" alt="CircleCI Badge">
    <a href="https://hub.docker.com/r/conviq/conviq/"><img src="https://img.shields.io/docker/pulls/conviq/conviq" alt="Docker Pull Badge"></a>
  <a href="https://hub.docker.com/r/conviq/conviq/"><img src="https://img.shields.io/docker/cloud/build/conviq/conviq" alt="Docker Build Badge"></a>
  <img src="https://img.shields.io/github/commit-activity/m/ridloabelian/conviq" alt="Commits-per-month">
  <a title="Crowdin" target="_self" href="https://conviq.crowdin.com/conviq"><img src="https://badges.crowdin.net/e/37ced7eba411064bd792feb3b7a28b16/localized.svg"></a>
  <a href="https://discord.gg/cJXdrwS"><img src="https://img.shields.io/discord/647412545203994635" alt="Discord"></a>
  <a href="https://status.conviq.com"><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fconviq%2Fstatus%2Fmaster%2Fapi%2Fconviq%2Fuptime.json" alt="uptime"></a>
  <a href="https://status.conviq.com"><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fconviq%2Fstatus%2Fmaster%2Fapi%2Fconviq%2Fresponse-time.json" alt="response time"></a>
  <a href="https://artifacthub.io/packages/helm/conviq/conviq"><img src="https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/artifact-hub" alt="Artifact HUB"></a>
</p>


<p>
  <a href="https://heroku.com/deploy?template=https://github.com/ridloabelian/conviq/tree/develop" alt="Deploy to Heroku">
     <img width="150" alt="Deploy" src="https://www.herokucdn.com/deploy/button.svg"/>
  </a>
  <a href="https://marketplace.digitalocean.com/apps/conviq?refcode=f2238426a2a8" alt="Deploy to DigitalOcean">
     <img width="200" alt="Deploy to DO" src="https://www.deploytodo.com/do-btn-blue.svg"/>
  </a>
</p>

<img src="./.github/screenshots/dashboard.png#gh-light-mode-only" width="100%" alt="Chat dashboard dark mode"/>
<img src="./.github/screenshots/dashboard-dark.png#gh-dark-mode-only" width="100%" alt="Chat dashboard"/>

---

Conviq is the modern, open-source, and self-hosted customer support platform designed to help businesses deliver exceptional customer support experience. Built for scale and flexibility, Conviq gives you full control over your customer data while providing powerful tools to manage conversations across channels.

### ✨ Captain – AI Agent for Support

Supercharge your support with Captain, Conviq’s AI agent. Captain helps automate responses, handle common queries, and reduce agent workload—ensuring customers get instant, accurate answers. With Captain, your team can focus on complex conversations while routine questions are resolved automatically. Read more about Captain [here](https://chwt.app/captain-docs).

### 💬 Omnichannel Support Desk

Conviq centralizes all customer conversations into one powerful inbox, no matter where your customers reach out from. It supports live chat on your website, email, Facebook, Instagram, Twitter, WhatsApp, Telegram, Line, SMS etc.

### 📚 Help center portal

Publish help articles, FAQs, and guides through the built-in Help Center Portal. Enable customers to find answers on their own, reduce repetitive queries, and keep your support team focused on more complex issues.

### 🗂️ Other features

#### Collaboration & Productivity

- Private Notes and @mentions for internal team discussions.
- Labels to organize and categorize conversations.
- Keyboard Shortcuts and a Command Bar for quick navigation.
- Canned Responses to reply faster to frequently asked questions.
- Auto-Assignment to route conversations based on agent availability.
- Multi-lingual Support to serve customers in multiple languages.
- Custom Views and Filters for better inbox organization.
- Business Hours and Auto-Responders to manage response expectations.
- Teams and Automation tools for scaling support workflows.
- Agent Capacity Management to balance workload across the team.

#### Customer Data & Segmentation
- Contact Management with profiles and interaction history.
- Contact Segments and Notes for targeted communication.
- Campaigns to proactively engage customers.
- Custom Attributes for storing additional customer data.
- Pre-Chat Forms to collect user information before starting conversations.

#### Integrations
- Slack Integration to manage conversations directly from Slack.
- Dialogflow Integration for chatbot automation.
- Dashboard Apps to embed internal tools within Conviq.
- Shopify Integration to view and manage customer orders right within Conviq.
- Use Google Translate to translate messages from your customers in realtime.
- Create and manage Linear tickets within Conviq.

#### Reports & Insights
- Live View of ongoing conversations for real-time monitoring.
- Conversation, Agent, Inbox, Label, and Team Reports for operational visibility.
- CSAT Reports to measure customer satisfaction.
- Downloadable Reports for offline analysis and reporting.


## Documentation

Detailed documentation is available at [conviq.com/help-center](https://www.conviq.com/help-center).

## 🌐 Marketing Website & Billing (Mayar.id Integration)

Conviq features a modern, high-performance, and localized Marketing Website and billing system built with **Next.js 16** (located in the `/website` directory). It is optimized for static export and deployment via **Cloudflare Pages** and **Cloudflare Functions**.

### Key Highlights:
- **Localized Indonesian Blog (`/blog`)**: High-fidelity, animated blog layout featuring content filters (Semua, WhatsApp, AI, Layanan Pelanggan, Open-Source), dynamic search, and an optimized client-side article sharing component.
- **Embedded Support Widget**: The Conviq Live Chat SDK is loaded globally, ensuring visitors can chat with support agents in real-time.
- **Mayar.id Indonesia Billing**: Seamless payment flow integrated with Mayar's Invoice API. Supports Indonesian payment methods (Virtual Accounts, QRIS, E-wallets) for Growth, Business, and Premium tiers.
- **Automated Provisioning Engine**: Fully integrated with the Rails Enterprise overlay via a secure Webhook Receiver. Automatically provisions licenses (`captain_responses` limit) and updates self-hosted `InstallationConfig` keys upon successful payment.

### Developing the Marketing Site locally:

1. **Enter the project folder**:
   ```bash
   cd website
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Run the local development server**:
   ```bash
   pnpm dev
   ```
4. **Compile the optimized production static build**:
   ```bash
   pnpm build
   ```

---

## Security

Looking to report a vulnerability? Please refer our [SECURITY.md](./SECURITY.md) file.

## Community

If you need help or just want to hang out, come, say hi on our [Discord](https://discord.gg/cJXdrwS) server.

## Contributors

Thanks goes to all these [wonderful people](https://www.conviq.com/docs/contributors):

<a href="https://github.com/ridloabelian/conviq/graphs/contributors"><img src="https://opencollective.com/conviq/contributors.svg?width=890&button=false" /></a>

*Conviq* &copy; 2017-2026, Conviq Inc - Released under the MIT License.

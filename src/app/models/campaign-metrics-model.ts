export class CampaignMetrics {
  emailsSent: number;
  emailsPending: number;
  emailsFailed: number;

  constructor() {
    this.emailsSent = 0;
    this.emailsPending = 0;
    this.emailsFailed = 0;
  }

  incrementEmailsSent() {
    this.emailsSent++;
  }

  incrementEmailsPending() {
    this.emailsPending++;
  }

  incrementEmailsFailed() {
    this.emailsFailed++;
  }

  reset() {
    this.emailsSent = 0;
    this.emailsPending = 0;
    this.emailsFailed = 0;
  }
}

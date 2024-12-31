import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { CampaignMetrics } from './models/campaign-metrics-model';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceId = 'service_q91lhry';
  private templateId = 'template_gs9y7qq';
  private userId = 'your_user_id';
  private publicKey = 'uB2I3yJz3BBsgnQB_';
  private metrics: CampaignMetrics;

  constructor() {
    this.metrics = new CampaignMetrics();
  }

  sendEmail(formData: any): Promise<void> {
    this.metrics.incrementEmailsPending();

    // Send the email using EmailJS
    return emailjs
      .send(this.serviceId, this.templateId, formData, this.publicKey)
      .then((response: EmailJSResponseStatus) => {
        // If the email was sent successfully, update the metrics
        this.metrics.incrementEmailsSent();
        console.log('Email sent successfully:', response);
      })
      .catch((error: any) => {
        // If there was an error, update the metrics and log the error
        this.metrics.incrementEmailsFailed();
        const errorMessage = `Failed to send email: ${error.text || error}`;
        this.logError(errorMessage);
        console.error('Error sending email:', errorMessage);
        throw error; // Re-throw error for further handling if needed
      });
  }
  // Simulate sending an email
  // sendEmail(email: string, formData: any): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     this.metrics.incrementEmailsPending();

  //     setTimeout(() => {
  //       const randomSuccess = Math.random() > 0.2;

  //       if (randomSuccess) {
  //         this.metrics.incrementEmailsSent();
  //         resolve();
  //       } else {
  //         this.metrics.incrementEmailsFailed();
  //         const errorMessage = 'Failed to send email to ' + email;
  //         this.logError(errorMessage);
  //         reject(errorMessage);
  //       }
  //     }, 2000);
  //   });
  // }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async sendEmailsWithDelay(
    emails: { to_email: string; subject: string; message: string }[],
    delayMs: number
  ): Promise<void> {
    for (const email of emails) {
      try {
        await this.sendEmail(email);
        console.log(`Email sent to ${email.to_email}`);
      } catch (error) {
        console.error(`Failed to send email to ${email.to_email}`, error);
      }
      await this.delay(delayMs);
    }
  }

  // Method to log errors
  private logError(errorMessage: string): void {
    console.error('Email Error:', errorMessage);
    // Log the error into the localStorage (or any other storage you choose)
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${errorMessage}`;
    let errorLogs = JSON.parse(localStorage.getItem('emailErrors') || '[]');
    errorLogs.push(logEntry, errorMessage);
    localStorage.setItem('emailErrors', JSON.stringify(errorLogs));
  }

  // Get the current campaign metrics
  getMetrics(): CampaignMetrics {
    return this.metrics;
  }

  // Reset metrics
  resetMetrics(): void {
    this.metrics.reset();
  }
}

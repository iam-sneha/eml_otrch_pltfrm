import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service'; // Import the EmailService
import { CampaignMetrics } from '../models/campaign-metrics-model'; // Import the CampaignMetrics class
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  metrics: CampaignMetrics;
  timer: any;

  constructor(private emailService: EmailService) {
    this.metrics = new CampaignMetrics();
  }

  ngOnInit(): void {
    this.updateMetrics();
    // Update metrics every 5 seconds
    this.timer = setInterval(() => {
      this.updateMetrics();
    }, 5000);
  }

  ngOnDestroy(): void {
    // Clear the timer when the component is destroyed
    clearInterval(this.timer);
  }

  updateMetrics(): void {
    this.metrics = this.emailService.getMetrics();
  }

  resetMetrics(): void {
    this.emailService.resetMetrics();
    this.updateMetrics();
  }
}

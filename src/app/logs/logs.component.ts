import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LogsComponent implements OnInit {
  errorLogs: string[] = ['Error 1', 'Error 2', 'Error 3'];

  ngOnInit(): void {
    this.loadLogs();
  }

  // Load the error logs from local storage
  loadLogs(): void {
    const logs = JSON.parse(localStorage.getItem('emailErrors') || '[]');
    this.errorLogs = logs;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CsvUploadComponent } from '../csv-upload/csv-upload.component';
import { TemplateEditorComponent } from '../template-editor/template-editor.component';
import { EmailFormComponent } from '../email-form/email-form.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LogsComponent } from '../logs/logs.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CsvUploadComponent,
    TemplateEditorComponent,
    EmailFormComponent,
    DashboardComponent,
    LogsComponent,
  ],
})
export class HomeComponent implements OnInit {
  param: string | null = null;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  logout() {
    this.authService.logout();
  }
  csvData: any;

  handleCsvUpload(event: any): void {
    const fileList = event.target.files; // Example for file input
    if (fileList && fileList.length > 0) {
      // Process fileList as needed
    }
  }
  ngOnInit() {
    this.param = this.route.snapshot.paramMap.get('id');
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as Papa from 'papaparse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class CsvUploadComponent {
  csvForm: FormGroup;
  csvData: any[] = [];
  csvHeaders: string[] = [];

  @Output() csvUploaded = new EventEmitter<any[]>();

  constructor(private fb: FormBuilder) {
    this.csvForm = this.fb.group({
      file: [null, Validators.required],
    });
  }

  handleFileInput(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          this.csvHeaders = result.meta.fields || [];
          this.csvData = result.data;
          this.validateCSV();
        },
        error: () => alert('Error reading the file'),
      });
    }
  }

  validateCSV() {
    if (
      !this.csvHeaders.includes('email') ||
      !this.csvHeaders.includes('first_name')
    ) {
      alert('CSV must include "email" and "first_name" columns.');
      this.csvData = [];
    } else {
      this.csvUploaded.emit(this.csvData);
    }
  }

  onUpload() {
    if (this.csvData.length) {
      console.log('CSV Data Uploaded:', this.csvData);
    }
  }
}

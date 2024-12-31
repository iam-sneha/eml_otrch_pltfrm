import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class TemplateEditorComponent {
  @Input() csvData: any;

  emailTemplate: string = 'Hello {first_name},\n\nYour email is {email}.';
  previewData: string = '';

  previewTemplate() {
    if (!this.csvData.length) {
      alert('Upload a CSV file first.');
      return;
    }

    const sample = this.csvData[0];
    this.previewData = this.emailTemplate.replace(
      /{(\w+)}/g,
      (_, key) => sample[key] || `{${key}}`
    );
  }
}

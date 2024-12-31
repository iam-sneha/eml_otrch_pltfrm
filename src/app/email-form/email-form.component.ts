import { Component } from '@angular/core';
import { EmailService } from '../email.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class EmailFormComponent {
  emailForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    // Initialize the form with email validation
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
    });
  }

  sendEmail(form: any): void {
    if (form.valid) {
      const emailData = {
        to_email: form.value.to_email,
        subject: form.value.subject,
        message: form.value.message,
      };
      // Call email service to send email
      this.emailService.sendEmail(emailData).then(
        () => {
          this.successMessage = 'Email sent successfully!';
        },
        (error) => {
          this.errorMessage = 'Failed to send email. Please try again.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Form is invalid. Please fill all required fields.';
    }

    const emailList = [
      {
        to_email: 'example1@example.com',
        subject: 'Subject 1',
        message: 'Message 1',
      },
      {
        to_email: 'example2@example.com',
        subject: 'Subject 2',
        message: 'Message 2',
      },
    ];
    this.emailService.sendEmailsWithDelay(emailList, 2000); // 2-second delay
  }
  onSubmit(form: any): void {
    // Prepare form data
    const formData = {
      user_email: form.value.email, // Assuming the form has an input with name 'email'
    };

    this.emailService
      .sendEmail(formData)
      .then((response) => {
        this.successMessage = 'Email sent successfully!';
        this.errorMessage = null;
      })
      .catch((error) => {
        console.error('Failed to send email', error);
        this.errorMessage = 'Failed to send email. Please try again.';
        this.successMessage = null;
      });
    if (this.emailForm.invalid) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    const email = this.emailForm.value.email;
    this.emailService
      .sendEmail(email)
      .then(() => {
        this.successMessage = 'Email sent successfully!';
        this.errorMessage = ''; // Reset error message
      })
      .catch((error) => {
        this.errorMessage = `Failed to send email: ${error}`;
        this.successMessage = ''; // Reset success message
      });
  }
}

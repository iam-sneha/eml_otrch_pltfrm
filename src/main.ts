import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import emailjs from 'emailjs-com';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent }, // Define the login route
    ]),
  ],
}).catch((err) => console.error(err));

emailjs.init('YOUR_PUBLIC_KEY');
function sendEmail() {
  const templateParams = {
    to_name: 'John Doe',
  };

  emailjs
    .send('service_id', 'template_id', templateParams, 'YOUR_PUBLIC_KEY')
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
    });
}

// Example usage
sendEmail();
